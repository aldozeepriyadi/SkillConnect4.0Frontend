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
import { LoginRequired } from "./components/guards/LoginRequired";
import { ProfileRequired } from "./components/guards/ProfileRequired";
import { NotFound } from "./components/NotFound";

function ProtectedProfilePage() {
  return (
    <LoginRequired>
      <ProfilePage />
    </LoginRequired>
  );
}

function ProtectedDashboardPage() {
  return (
    <ProfileRequired>
      <DashboardPage />
    </ProfileRequired>
  );
}

function ProtectedJobsPage() {
  return (
    <ProfileRequired>
      <JobsPage />
    </ProfileRequired>
  );
}

function ProtectedScreeningPage() {
  return (
    <ProfileRequired>
      <ScreeningPage />
    </ProfileRequired>
  );
}

function ProtectedSkillGapPage() {
  return (
    <ProfileRequired>
      <SkillGapPage />
    </ProfileRequired>
  );
}

function ProtectedTrainingPage() {
  return (
    <ProfileRequired>
      <TrainingPage />
    </ProfileRequired>
  );
}

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
      { path: "profile", Component: ProtectedProfilePage },
      { path: "jobs", Component: ProtectedJobsPage },
      { path: "screening", Component: ProtectedScreeningPage },
      { path: "skillgap", Component: ProtectedSkillGapPage },
      { path: "training", Component: ProtectedTrainingPage },
      { path: "dashboard", Component: ProtectedDashboardPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
