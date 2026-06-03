import React, { createContext, useContext, useState, ReactNode } from "react";

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
  cv: string; // base64 atau data URL dari PDF
  cvFileName: string; // nama file CV
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
  skills: string[];
  description: string;
  logo: string;
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
  currentStep: number;
}

interface AppContextType {
  state: AppState;
  login: (email: string, password: string) => boolean;
  loginAsCompany: (email: string, password: string, companyName: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  registerCompany: (name: string, email: string, password: string, companyName: string, industry: string) => boolean;
  logout: () => void;
  saveProfile: (profile: UserProfile) => void;
  selectJob: (job: Job) => void;
  runScreening: () => void;
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
  currentStep: 0,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  const login = (email: string, _password: string): boolean => {
    const name = email.split("@")[0];
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      loginType: "jobseeker",
      user: { name: name.charAt(0).toUpperCase() + name.slice(1), email },
      company: null,
      currentStep: prev.profile ? 2 : 1,
    }));
    return true;
  };

  const loginAsCompany = (email: string, _password: string, companyName: string): boolean => {
    const name = email.split("@")[0];
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      loginType: "company",
      company: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        companyName,
        industry: "Teknologi",
        logo: companyName.charAt(0).toUpperCase(),
      },
      user: null,
    }));
    return true;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      loginType: "jobseeker",
      user: { name, email },
      company: null,
      currentStep: 1,
    }));
    return true;
  };

  const registerCompany = (
    name: string,
    email: string,
    _password: string,
    companyName: string,
    industry: string
  ): boolean => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      loginType: "company",
      company: {
        name,
        email,
        companyName,
        industry,
        logo: companyName.charAt(0).toUpperCase(),
      },
      user: null,
    }));
    return true;
  };

  const logout = () => {
    setState(defaultState);
  };

  const saveProfile = (profile: UserProfile) => {
    setState((prev) => ({
      ...prev,
      profile,
      currentStep: 2,
    }));
  };

  const selectJob = (job: Job) => {
    setState((prev) => ({
      ...prev,
      selectedJob: job,
      screeningStatus: "pending",
      currentStep: 3,
    }));
  };

  const runScreening = () => {
    const job = state.selectedJob;
    const passed = job ? job.match >= 75 : false;
    setState((prev) => ({
      ...prev,
      screeningStatus: passed ? "passed" : "failed",
      currentStep: passed ? 4 : 5,
    }));
  };

  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  return (
    <AppContext.Provider
      value={{ state, login, loginAsCompany, register, registerCompany, logout, saveProfile, selectJob, runScreening, setStep }}
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
