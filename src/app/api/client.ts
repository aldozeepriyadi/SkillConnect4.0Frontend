import type { Job, UserProfile } from "../context/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const TOKEN_KEY = "skillconnect_access_token";

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: "jobseeker" | "recruiter" | "admin";
}

export interface ApiCompany {
  id: number;
  name: string;
  industry: string;
  logo: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: ApiUser;
  company?: ApiCompany | null;
}

export interface ScreeningResult {
  job: Job;
  score: number;
  label: string;
  passed: boolean;
  matched_skills: string[];
  missing_skills: string[];
  skill_gap: SkillGapItem[];
  explanation: string[];
  components: Record<string, number>;
}

export interface SkillGapItem {
  skill: string;
  current: number;
  required: number;
  gap: number;
  priority?: string;
}

export interface TrainingRecommendation {
  id: string;
  title: string;
  provider: string;
  category?: string;
  duration: string;
  level: string;
  rating: number;
  students: string;
  price: string;
  relevance: number;
  tags: string[];
  description: string;
  url?: string;
  reason?: string;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.detail || message;
    } catch {
      // keep fallback message
    }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

function toBackendProfile(profile: UserProfile) {
  return {
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    educations: profile.educations,
    experiences: profile.experiences,
    trainings: profile.trainings,
    skills: profile.skills,
    desired_role: profile.desiredRole,
    desired_salary: profile.desiredSalary,
    cv: profile.cv,
    cv_file_name: profile.cvFileName,
    portfolio: profile.portfolio,
  };
}

function fromBackendProfile(payload: any): UserProfile {
  return {
    name: payload.name || "",
    email: payload.email || "",
    phone: payload.phone || "",
    location: payload.location || "",
    educations: payload.educations || [],
    experiences: payload.experiences || [],
    trainings: payload.trainings || [],
    skills: payload.skills || payload.extracted_skills || [],
    desiredRole: payload.desired_role || "",
    desiredSalary: payload.desired_salary || "",
    cv: payload.cv || "",
    cvFileName: payload.cv_file_name || "",
    portfolio: payload.portfolio || "",
  };
}

function normalizeTraining(item: any): TrainingRecommendation {
  return {
    id: String(item.id),
    title: item.title,
    provider: item.provider,
    category: item.category,
    duration: item.duration || "-",
    level: item.level || "All Levels",
    rating: Number(item.rating || 4.6),
    students: item.students || "-",
    price: item.price || "Gratis",
    relevance: Number(item.relevance || 70),
    tags: item.tags || [],
    description: item.description || "",
    url: item.url,
    reason: item.reason,
  };
}

export const apiClient = {
  getToken,
  setToken,
  clearToken,
  async register(name: string, email: string, password: string, phone?: string) {
    const res = await request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone, consent_accepted: true }),
    });
    setToken(res.access_token);
    return res;
  },
  async registerCompany(name: string, email: string, password: string, companyName: string, industry: string, phone?: string) {
    const res = await request<AuthResponse>("/auth/register-company", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        company_name: companyName,
        industry,
        phone,
        consent_accepted: true,
      }),
    });
    setToken(res.access_token);
    return res;
  },
  async login(email: string, password: string, role?: "jobseeker" | "recruiter") {
    const res = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
    setToken(res.access_token);
    return res;
  },
  async saveProfile(profile: UserProfile) {
    const res = await request<any>("/profile", {
      method: "PUT",
      body: JSON.stringify(toBackendProfile(profile)),
    });
    return fromBackendProfile(res);
  },
  async getProfile() {
    const res = await request<any | null>("/profile");
    return res ? fromBackendProfile(res) : null;
  },
  async getJobs() {
    return request<Job[]>("/jobs");
  },
  async runScreening(jobId: string) {
    return request<ScreeningResult>(`/matching/${jobId}/screening`, {
      method: "POST",
    });
  },
  async getSkillGap(jobId: string) {
    return request<{
      skill_gap: SkillGapItem[];
      matched_skills: string[];
      missing_skills: string[];
      explanation: string[];
      score: number;
      label: string;
      job: Job;
    }>(`/skill-gap?job_id=${jobId}`);
  },
  async getTrainingRecommendations(jobId?: string) {
    const query = jobId ? `?job_id=${jobId}` : "";
    const res = await request<any[]>(`/training/recommendations${query}`);
    return res.map(normalizeTraining);
  },
  async getTrainingCatalog() {
    const res = await request<any[]>("/training");
    return res.map(normalizeTraining);
  },
  async getRecruiterDashboard() {
    return request<any>("/recruiter/dashboard");
  },
};

export { API_BASE_URL };
