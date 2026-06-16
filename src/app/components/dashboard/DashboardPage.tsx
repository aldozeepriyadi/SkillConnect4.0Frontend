import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Brain,
  Briefcase,
  TrendingUp,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  User,
  ChevronRight,
  Zap,
  Target,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockJobs, trainingRecommendations } from "../../data/mockData";
import { apiClient, TrainingRecommendation } from "../../api/client";
import { Job } from "../../context/AppContext";

export function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [trainings, setTrainings] = useState<TrainingRecommendation[]>(trainingRecommendations);

  useEffect(() => {
    apiClient.getJobs().then((data) => setJobs(data.length ? data : mockJobs)).catch(() => setJobs(mockJobs));
    apiClient
      .getTrainingRecommendations(state.selectedJob?.id)
      .then((data) => setTrainings(data.length ? data : trainingRecommendations))
      .catch(() => setTrainings(trainingRecommendations));
  }, [state.selectedJob?.id]);

  const topJobs = jobs.slice(0, 3);
  const topTrainings = trainings.slice(0, 2);

  const flowSteps = [
    {
      id: 0,
      label: "Mulai",
      desc: "Akun dibuat",
      done: true,
    },
    {
      id: 1,
      label: "Isi Profil",
      desc: "Lengkapi data diri",
      done: !!state.profile,
      path: "/profile",
    },
    {
      id: 2,
      label: "Rekomendasi Kerja",
      desc: "AI cocokkan pekerjaan",
      done: !!state.selectedJob,
      path: "/jobs",
    },
    {
      id: 3,
      label: "AI Screening",
      desc: "Cek kelayakan berkas",
      done: state.screeningStatus !== null,
      path: "/screening",
    },
    {
      id: 4,
      label: state.screeningStatus === "passed" ? "Notifikasi Lolos" : "Analisis Skill Gap",
      desc: state.screeningStatus === "passed" ? "Perusahaan akan hubungi Anda" : "Lihat gap kemampuan",
      done: state.currentStep >= 4,
      path: state.screeningStatus === "passed" ? "/screening" : "/skillgap",
    },
    {
      id: 5,
      label: "Pelatihan Skill",
      desc: "Tingkatkan kemampuan",
      done: state.currentStep >= 5,
      path: "/training",
    },
  ];

  const currentFlowStep = flowSteps.findIndex((s) => !s.done);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                {state.user?.name.charAt(0) || "U"}
              </div>
              <div>
                <p className="text-white/70 text-sm">Selamat datang kembali,</p>
                <h1 className="text-xl font-bold">{state.user?.name || "Pengguna"} 👋</h1>
                <p className="text-white/70 text-xs mt-0.5">{state.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold">
                  {state.screeningStatus === "passed" ? "🎉" : state.profile ? "🔍" : "📝"}
                </p>
                <p className="text-xs text-white/70 mt-0.5">
                  {state.screeningStatus === "passed"
                    ? "Lolos Screening"
                    : state.profile
                    ? "Mencari Kerja"
                    : "Belum Isi Profil"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flow Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Alur Perjalanan Karir Anda
              </h2>
              <div className="space-y-3">
                {flowSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
                      step.done
                        ? "bg-green-50 border border-green-100"
                        : i === currentFlowStep
                        ? "bg-indigo-50 border border-indigo-200"
                        : "bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.done
                          ? "bg-green-500"
                          : i === currentFlowStep
                          ? "bg-indigo-600"
                          : "bg-gray-200"
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-xs text-white font-bold">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${step.done ? "text-green-700" : i === currentFlowStep ? "text-indigo-700" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-400">{step.desc}</p>
                    </div>
                    {!step.done && step.path && i === currentFlowStep && (
                      <button
                        onClick={() => navigate(step.path!)}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-1"
                      >
                        Mulai
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                    {step.done && (
                      <span className="text-xs text-green-600 font-medium">Selesai ✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Job Recommendations Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Rekomendasi Pekerjaan AI
                </h2>
                <button
                  onClick={() => navigate("/jobs")}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  Lihat semua
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {topJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => navigate("/jobs")}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                      style={{ background: `hsl(${parseInt(job.id) * 60}, 70%, 50%)` }}
                    >
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company} · {job.location}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-gray-700">{job.match}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Rekomendasi Pelatihan
                </h2>
                <button
                  onClick={() => navigate("/training")}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  Lihat semua
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {topTrainings.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-medium text-gray-800">{t.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                        t.price === "Gratis" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {t.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {t.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3 text-indigo-500" />
                        {t.relevance}% relevan
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Profil Saya
              </h2>
              <div className="space-y-3 mb-4">
                {[
                  { label: "Kelengkapan Profil", value: state.profile ? "85%" : "0%", done: !!state.profile },
                  { label: "CV Diunggah", value: state.profile?.cv ? "Ya" : "Belum", done: !!state.profile?.cv },
                  { label: "Skill Terisi", value: `${state.profile?.skills.length || 0} skill`, done: (state.profile?.skills.length || 0) > 0 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-sm font-medium ${item.done ? "text-green-600" : "text-gray-400"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/profile")}
                className="w-full py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors"
              >
                {state.profile ? "Update Profil" : "Lengkapi Profil"}
              </button>
            </div>

            {/* Application Status */}
            {state.selectedJob && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Status Lamaran
                </h2>
                <div className="p-4 bg-gray-50 rounded-xl mb-3">
                  <p className="text-sm font-medium text-gray-800">{state.selectedJob.title}</p>
                  <p className="text-xs text-gray-500">{state.selectedJob.company}</p>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  state.screeningStatus === "passed"
                    ? "bg-green-50 text-green-700"
                    : state.screeningStatus === "failed"
                    ? "bg-orange-50 text-orange-700"
                    : "bg-gray-50 text-gray-600"
                }`}>
                  {state.screeningStatus === "passed" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {state.screeningStatus === "passed"
                      ? "Lolos Screening"
                      : state.screeningStatus === "failed"
                      ? "Belum Lolos - Perbaiki Skill"
                      : "Menunggu Proses"}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
              <div className="space-y-2">
                {[
                  { label: "Lihat Rekomendasi Kerja", path: "/jobs", icon: Briefcase, color: "text-indigo-600" },
                  { label: "Analisis Skill Gap", path: "/skillgap", icon: TrendingUp, color: "text-orange-600" },
                  { label: "Pelatihan Skill", path: "/training", icon: BookOpen, color: "text-green-600" },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                    <span className="text-sm text-gray-700">{action.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
