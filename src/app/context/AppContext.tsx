import React, { createContext, useContext, useState, ReactNode } from "react";
import { apiClient, ScreeningResult, SkillGapItem } from "../api/client";

export interface Education {
  level: string;
  major: string;
  school: string;
  year: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Training {
  name: string;
  provider: string;
  year: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  educations: Education[];
  experiences: Experience[];
  trainings: Training[];
  skills: string[];
  desiredRole: string;
  desiredSalary: string;
  cv: string;
  cvFileName: string;
  portfolio: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  match: number;
  matchLabel?: string;
  skills: string[];
  description: string;
  logo: string;
  status?: string;
  matchedSkills?: string[];
  missingSkills?: string[];
  explanation?: string[];
}

export type LoginType = "jobseeker" | "company";

export interface CompanyInfo {
  name: string;
  email: string;
  companyName: string;
  industry: string;
  logo: string;
}

export interface AppState {
  isLoggedIn: boolean;
  loginType: LoginType | null;
  user: { name: string; email: string } | null;
  company: CompanyInfo | null;
  profile: UserProfile | null;
  selectedJob: Job | null;
  screeningStatus: "pending" | "passed" | "failed" | null;
  screeningResult: ScreeningResult | null;
  skillGap: SkillGapItem[];
  currentStep: number;
}

interface AppContextType {
  state: AppState;
  hasCompletedProfile: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsCompany: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  registerCompany: (name: string, email: string, password: string, companyName: string, industry: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  saveProfile: (profile: UserProfile) => Promise<boolean>;
  selectJob: (job: Job) => void;
  runScreening: () => Promise<void>;
  setStep: (step: number) => void;
}

const defaultState: AppState = {
  isLoggedIn: false,
  loginType: null,
  user: null,
  company: null,
  profile: null,
  selectedJob: null,
  screeningStatus: null,
  screeningResult: null,
  skillGap: [],
  currentStep: 0,
};

const AppContext = createContext<AppContextType | null>(null);

export function isProfileComplete(profile: UserProfile | null) {
  if (!profile) return false;
  return Boolean(
    profile.name?.trim() &&
      profile.email?.trim() &&
      profile.phone?.trim() &&
      profile.location?.trim() &&
      profile.desiredRole?.trim() &&
      profile.desiredSalary?.trim() &&
      profile.skills?.length > 0 &&
      profile.educations?.length > 0 &&
      profile.experiences?.length > 0 &&
      (profile.cv || profile.cvFileName)
  );
}

function authUserToState(res: Awaited<ReturnType<typeof apiClient.login>>) {
  const isCompany = res.user.role === "recruiter";
  return {
    isLoggedIn: true,
    loginType: isCompany ? "company" as LoginType : "jobseeker" as LoginType,
    user: isCompany ? null : { name: res.user.name, email: res.user.email },
    company: isCompany
      ? {
          name: res.user.name,
          email: res.user.email,
          companyName: res.company?.name || "Perusahaan",
          industry: res.company?.industry || "Teknologi",
          logo: res.company?.logo || (res.company?.name || "P").charAt(0).toUpperCase(),
        }
      : null,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(defaultState);
  const hasCompletedProfile = () => isProfileComplete(state.profile);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.login(email, password, "jobseeker");
      const authState = authUserToState(res);
      let profile: UserProfile | null = null;
      try {
        profile = await apiClient.getProfile();
      } catch {
        profile = null;
      }
      setState((prev) => ({
        ...prev,
        ...authState,
        profile,
        currentStep: profile ? 2 : 1,
      }));
      return true;
    } catch {
      return false;
    }
  };

  const loginAsCompany = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.login(email, password, "recruiter");
      setState((prev) => ({ ...prev, ...authUserToState(res) }));
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      const res = await apiClient.register(name, email, password, phone);
      setState((prev) => ({
        ...prev,
        ...authUserToState(res),
        currentStep: 1,
      }));
      return true;
    } catch {
      return false;
    }
  };

  const registerCompany = async (
    name: string,
    email: string,
    password: string,
    companyName: string,
    industry: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      const res = await apiClient.registerCompany(name, email, password, companyName, industry, phone);
      setState((prev) => ({ ...prev, ...authUserToState(res) }));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setState(defaultState);
  };

  const saveProfile = async (profile: UserProfile): Promise<boolean> => {
    try {
      const saved = await apiClient.saveProfile(profile);
      setState((prev) => ({
        ...prev,
        profile: saved,
        currentStep: 2,
      }));
      return true;
    } catch {
      return false;
    }
  };

  const selectJob = (job: Job) => {
    setState((prev) => ({
      ...prev,
      selectedJob: job,
      screeningStatus: "pending",
      screeningResult: null,
      skillGap: [],
      currentStep: 3,
    }));
  };

  const runScreening = async () => {
    const job = state.selectedJob;
    if (!job) return;
    try {
      const result = await apiClient.runScreening(job.id);
      setState((prev) => ({
        ...prev,
        selectedJob: result.job,
        screeningStatus: result.passed ? "passed" : "failed",
        screeningResult: result,
        skillGap: result.skill_gap,
        currentStep: result.passed ? 4 : 5,
      }));
    } catch {
      const passed = job.match >= 75;
      setState((prev) => ({
        ...prev,
        screeningStatus: passed ? "passed" : "failed",
        currentStep: passed ? 4 : 5,
      }));
    }
  };

  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  return (
    <AppContext.Provider
      value={{ state, hasCompletedProfile, login, loginAsCompany, register, registerCompany, logout, saveProfile, selectJob, runScreening, setStep }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
