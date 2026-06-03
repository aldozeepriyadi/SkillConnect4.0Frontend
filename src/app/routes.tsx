import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { LandingPage } from "./components/landing/LandingPage";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { CompanyRegisterPage } from "./components/auth/CompanyRegisterPage";
import { ProfilePage } from "./components/profile/ProfilePage";
import { JobsPage } from "./components/jobs/JobsPage";
import { ScreeningPage } from "./components/screening/ScreeningPage";
import { SkillGapPage } from "./components/skillgap/SkillGapPage";
import { TrainingPage } from "./components/training/TrainingPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { CompanyDashboard } from "./components/company/CompanyDashboard";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "company/register", Component: CompanyRegisterPage },
      { path: "company/dashboard", Component: CompanyDashboard },
      { path: "profile", Component: ProfilePage },
      { path: "jobs", Component: JobsPage },
      { path: "screening", Component: ScreeningPage },
      { path: "skillgap", Component: SkillGapPage },
      { path: "training", Component: TrainingPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
