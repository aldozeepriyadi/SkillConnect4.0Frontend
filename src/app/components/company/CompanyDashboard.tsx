import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Users,
  Briefcase,
  CheckCircle,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Eye,
  Star,
  MapPin,
  GraduationCap,
  Clock,
  TrendingUp,
  Bell,
  ChevronRight,
  Brain,
  Award,
  X,
  Send,
  MessageSquare,
  UserCheck,
  UserX,
  ExternalLink,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import {
  mockCandidates,
  mockJobPostings,
  mockActivityLogs,
  Candidate,
} from "../../data/companyData";
import { Logo } from "../Logo";
import { apiClient } from "../../api/client";

type FilterStatus = "all" | "new" | "contacted" | "interview" | "hired";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  new: { label: "Baru", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Sparkles },
  contacted: { label: "Dihubungi", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200", icon: Send },
  interview: { label: "Wawancara", color: "text-orange-700", bg: "bg-orange-50 border-orange-200", icon: Calendar },
  hired: { label: "Diterima", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: UserCheck },
  rejected: { label: "Belum Lolos", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: UserX },
};

const AVATAR_COLORS = [
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-yellow-500 to-amber-600",
];

type DashboardTab = "candidates" | "jobs" | "analytics";

export function CompanyDashboard() {
  const { state, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>("candidates");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(
    mockCandidates.filter((c) => c.aiScore >= 75)
  );
  const [jobPostings, setJobPostings] = useState(mockJobPostings);
  const [contactModal, setContactModal] = useState<{ type: "email" | "phone" | "interview"; candidate: Candidate } | null>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const company = state.company;

  useEffect(() => {
    apiClient
      .getRecruiterDashboard()
      .then((data) => {
        if (data.candidates?.length) setCandidates(data.candidates);
        if (data.jobPostings?.length) setJobPostings(data.jobPostings);
      })
      .catch(() => {
        setCandidates(mockCandidates.filter((c) => c.aiScore >= 75));
        setJobPostings(mockJobPostings);
      });
  }, []);

  const filteredCandidates = candidates.filter((c) => {
    const matchSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.appliedJob.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSendContact = () => {
    if (!contactModal) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactModal(null);
      setContactMessage("");
      setInterviewDate("");
      setInterviewTime("");
    }, 2000);
  };

  const statsData = [
    { label: "Total Kandidat", value: candidates.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", change: "+8 minggu ini" },
    { label: "Kandidat Baru", value: candidates.filter((c) => c.status === "new").length, icon: Sparkles, color: "text-blue-600", bg: "bg-blue-50", change: "+3 hari ini" },
    { label: "Wawancara", value: candidates.filter((c) => c.status === "interview").length, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50", change: "Minggu ini" },
    { label: "Berhasil Direkrut", value: candidates.filter((c) => c.status === "hired").length, icon: UserCheck, color: "text-green-600", bg: "bg-green-50", change: "Total" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 88) return "text-green-600";
    if (score >= 78) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 88) return "bg-green-500";
    if (score >= 78) return "bg-yellow-500";
    return "bg-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Company Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
            <Logo size="md"/>
              <div>
                <span className="text-sm font-bold text-gray-900">SkillConnect4.0</span>
                <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                  Perusahaan
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: "candidates", label: "Kandidat", icon: Users },
                { id: "jobs", label: "Lowongan", icon: Briefcase },
                { id: "analytics", label: "Analitik", icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === "candidates" && candidates.filter((c) => c.status === "new").length > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                      {candidates.filter((c) => c.status === "new").length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                {company?.logo || "P"}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-gray-800">{company?.companyName || "Perusahaan"}</p>
                <p className="text-xs text-gray-400">{company?.industry || "Teknologi"}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="text-xs text-gray-500 hover:text-red-600 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* ===== CANDIDATES TAB ===== */}
        {activeTab === "candidates" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsData.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.change}</p>
                </div>
              ))}
            </div>

            {/* AI Badge */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mb-6 text-white">
              <Brain className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Semua kandidat di bawah telah lolos AI Screening</p>
                <p className="text-white/70 text-xs">
                  Diseleksi otomatis berdasarkan kelengkapan berkas, relevansi skill, dan skor kecocokan ≥ 75%
                </p>
              </div>
              <div className="ml-auto flex-shrink-0 bg-white/20 rounded-xl px-3 py-1.5">
                <p className="text-xs font-semibold">{candidates.length} Kandidat</p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama, posisi, atau skill..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "new", "contacted", "interview", "hired"] as FilterStatus[]).map((f) => {
                  const LABELS: Record<FilterStatus, string> = {
                    all: "Semua",
                    new: "Baru",
                    contacted: "Dihubungi",
                    interview: "Wawancara",
                    hired: "Diterima",
                  };
                  const count = f === "all" ? candidates.length : candidates.filter((c) => c.status === f).length;
                  return (
                    <button
                      key={f}
                      onClick={() => setStatusFilter(f)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                        statusFilter === f
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {LABELS[f]} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidate Grid + Detail */}
            <div className="grid lg:grid-cols-5 gap-6">
              {/* List */}
              <div className="lg:col-span-3 space-y-3">
                {filteredCandidates.length === 0 && (
                  <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                    <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Tidak ada kandidat yang sesuai filter</p>
                  </div>
                )}
                {filteredCandidates.map((candidate, idx) => {
                  const statusConf = STATUS_CONFIG[candidate.status] || STATUS_CONFIG.new;
                  const StatusIcon = statusConf.icon;
                  return (
                    <div
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate)}
                      className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedCandidate?.id === candidate.id
                          ? "border-blue-300 ring-1 ring-blue-100"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}
                        >
                          {candidate.avatar}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-sm text-gray-500">{candidate.appliedJob} · {candidate.location}</p>
                            </div>
                            {/* AI Score */}
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border`}>
                                <Brain className="w-3 h-3 text-indigo-500" />
                                <span className={`text-sm font-bold ${getScoreColor(candidate.aiScore)}`}>
                                  {candidate.aiScore}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs">
                                +{candidate.skills.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Status Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConf.bg} ${statusConf.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusConf.label}
                            </span>
                            <span className="text-xs text-gray-400">{candidate.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-2">
                {selectedCandidate ? (
                  <CandidateDetail
                    candidate={selectedCandidate}
                    avatarColor={AVATAR_COLORS[candidates.indexOf(selectedCandidate) % AVATAR_COLORS.length]}
                    onClose={() => setSelectedCandidate(null)}
                    onContact={(type) => setContactModal({ type, candidate: selectedCandidate })}
                    getScoreColor={getScoreColor}
                    getScoreBg={getScoreBg}
                  />
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center sticky top-24">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-7 h-7 text-blue-300" />
                    </div>
                    <p className="text-gray-400 text-sm">
                      Klik pada kartu kandidat untuk melihat profil lengkap dan menghubungi mereka
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== JOBS TAB ===== */}
        {activeTab === "jobs" && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kelola Lowongan</h1>
                <p className="text-sm text-gray-500 mt-1">Kelola posting lowongan dan lihat jumlah kandidat</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                + Posting Lowongan Baru
              </button>
            </div>
            <div className="space-y-4">
              {jobPostings.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.status === "active"
                            ? "bg-green-100 text-green-700"
                            : job.status === "closed"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {job.status === "active" ? "Aktif" : job.status === "closed" ? "Ditutup" : "Draft"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {job.department} · {job.location} · {job.type}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-blue-400" />
                          <strong className="text-gray-900">{job.candidates}</strong> total kandidat
                          {job.newCandidates > 0 && (
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                              +{job.newCandidates} baru
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          Deadline: {new Date(job.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => setActiveTab("candidates")}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        Lihat Kandidat
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Edit Lowongan
                      </button>
                    </div>
                  </div>
                  {/* Progress bar — candidates contacted */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                      <span>Progress Rekrutmen</span>
                      <span>{Math.round((job.candidates - job.newCandidates) / job.candidates * 100)}% diproses</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${Math.round((job.candidates - job.newCandidates) / job.candidates * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ANALYTICS TAB ===== */}
        {activeTab === "analytics" && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900">Analitik Rekrutmen</h1>
              <p className="text-sm text-gray-500 mt-1">Pantau efektivitas proses rekrutmen Anda</p>
            </div>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Lamaran Masuk", value: "79", trend: "+12%", icon: Users, color: "indigo" },
                { label: "Lolos AI Screening", value: "24", trend: "30%", icon: Brain, color: "blue" },
                { label: "Berhasil Diwawancara", value: "9", trend: "37%", icon: Calendar, color: "orange" },
                { label: "Conversion Rekrutmen", value: "1", trend: "11%", icon: Award, color: "green" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 bg-${item.color}-50 rounded-xl flex items-center justify-center mb-3`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                  <p className={`text-xs text-green-600 mt-1 font-medium`}>{item.trend} konversi</p>
                </div>
              ))}
            </div>
            {/* Funnel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Funnel Rekrutmen
              </h2>
              {[
                { stage: "Total Pelamar", count: 79, pct: 100, color: "bg-gray-400" },
                { stage: "Lolos AI Screening", count: 24, pct: 30, color: "bg-blue-500" },
                { stage: "Sudah Dihubungi", count: 15, pct: 62, color: "bg-indigo-500" },
                { stage: "Wawancara Terjadwal", count: 9, pct: 60, color: "bg-orange-500" },
                { stage: "Penawaran Dikirim", count: 3, pct: 33, color: "bg-green-500" },
                { stage: "Berhasil Bergabung", count: 1, pct: 33, color: "bg-emerald-500" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 mb-4">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-sm text-gray-600">{s.stage}</p>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 ${s.color} rounded-full flex items-center justify-end pr-2 transition-all`}
                      style={{ width: `${(s.count / 79) * 100}%` }}
                    >
                      <span className="text-xs text-white font-semibold">{s.count}</span>
                    </div>
                  </div>
                  {i > 0 && (
                    <span className="text-xs text-gray-400 w-12 flex-shrink-0">{s.pct}%</span>
                  )}
                </div>
              ))}
            </div>
            {/* Activity Log */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                Log Aktivitas Terbaru
              </h2>
              <div className="space-y-4">
                {mockActivityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      log.type === "new_candidate" ? "bg-blue-100" :
                      log.type === "contact" ? "bg-indigo-100" :
                      log.type === "interview" ? "bg-orange-100" :
                      log.type === "hired" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {log.type === "new_candidate" && <Sparkles className="w-4 h-4 text-blue-600" />}
                      {log.type === "contact" && <Send className="w-4 h-4 text-indigo-600" />}
                      {log.type === "interview" && <Calendar className="w-4 h-4 text-orange-600" />}
                      {log.type === "hired" && <UserCheck className="w-4 h-4 text-green-600" />}
                      {log.type === "rejected" && <UserX className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        <strong>{log.candidateName}</strong> — {log.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact / Interview Modal */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  contactModal.type === "email" ? "bg-indigo-100" :
                  contactModal.type === "phone" ? "bg-green-100" : "bg-orange-100"
                }`}>
                  {contactModal.type === "email" && <Mail className="w-5 h-5 text-indigo-600" />}
                  {contactModal.type === "phone" && <Phone className="w-5 h-5 text-green-600" />}
                  {contactModal.type === "interview" && <Calendar className="w-5 h-5 text-orange-600" />}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {contactModal.type === "email" ? "Kirim Email" :
                     contactModal.type === "phone" ? "Hubungi via Telepon" : "Jadwalkan Wawancara"}
                  </h2>
                  <p className="text-xs text-gray-500">kepada {contactModal.candidate.name}</p>
                </div>
              </div>
              <button onClick={() => { setContactModal(null); setContactSent(false); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSent ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <p className="font-semibold text-gray-900">
                  {contactModal.type === "interview" ? "Undangan Wawancara Terkirim!" : "Berhasil Dikirim!"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {contactModal.candidate.name} akan segera dihubungi.
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {/* Candidate info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                    {contactModal.candidate.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{contactModal.candidate.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{contactModal.candidate.email}</span>
                      <span>{contactModal.candidate.phone}</span>
                    </div>
                  </div>
                </div>

                {contactModal.type === "interview" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Wawancara</label>
                      <input
                        type="date"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Waktu</label>
                      <input
                        type="time"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Format Wawancara</label>
                      <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                        <option>Video Call (Google Meet)</option>
                        <option>Video Call (Zoom)</option>
                        <option>Tatap Muka di Kantor</option>
                        <option>Telepon</option>
                      </select>
                    </div>
                  </div>
                )}

                {contactModal.type === "phone" && (
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-sm text-green-800 font-medium mb-1">Nomor Telepon Kandidat:</p>
                    <p className="text-lg font-bold text-green-700">{contactModal.candidate.phone}</p>
                    <p className="text-xs text-green-600 mt-2">Hubungi pada jam kerja (09:00 – 17:00 WIB)</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {contactModal.type === "phone" ? "Catatan Panggilan" : "Pesan"}
                  </label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={4}
                    placeholder={
                      contactModal.type === "email"
                        ? `Halo ${contactModal.candidate.name}, kami tertarik dengan profil Anda untuk posisi ${contactModal.candidate.appliedJob}...`
                        : contactModal.type === "interview"
                        ? `Halo ${contactModal.candidate.name}, kami ingin mengundang Anda untuk wawancara...`
                        : "Catatan hasil panggilan telepon..."
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setContactModal(null)}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSendContact}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity ${
                      contactModal.type === "email" ? "bg-gradient-to-r from-indigo-600 to-purple-600" :
                      contactModal.type === "phone" ? "bg-gradient-to-r from-green-600 to-teal-600" :
                      "bg-gradient-to-r from-orange-500 to-red-500"
                    }`}
                  >
                    {contactModal.type === "email" && <><Send className="w-4 h-4" /> Kirim Email</>}
                    {contactModal.type === "phone" && <><Phone className="w-4 h-4" /> Catat Panggilan</>}
                    {contactModal.type === "interview" && <><Calendar className="w-4 h-4" /> Kirim Undangan</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Candidate Detail Panel ── */
function CandidateDetail({
  candidate,
  avatarColor,
  onClose,
  onContact,
  getScoreColor,
  getScoreBg,
}: {
  candidate: Candidate;
  avatarColor: string;
  onClose: () => void;
  onContact: (type: "email" | "phone" | "interview") => void;
  getScoreColor: (n: number) => string;
  getScoreBg: (n: number) => string;
}) {
  const [activeSection, setActiveSection] = useState<"profile" | "scores" | "actions">("profile");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 bg-gradient-to-br ${avatarColor} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {candidate.avatar}
            </div>
            <div className="text-white">
              <h2 className="font-bold">{candidate.name}</h2>
              <p className="text-white/70 text-sm">{candidate.appliedJob}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-white/60" />
                <span className="text-xs text-white/60">{candidate.location}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* AI Score big */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-white/20">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-white" />
            <span className="text-white/80 text-sm">AI Screening Score</span>
          </div>
          <span className={`text-2xl font-bold text-white`}>{candidate.aiScore}%</span>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { id: "profile", label: "Profil" },
          { id: "scores", label: "Skor Detail" },
          { id: "actions", label: "Aksi" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${
              activeSection === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5 max-h-[60vh] overflow-y-auto">
        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">{candidate.summary}</p>

            <div className="space-y-2">
              {[
                { icon: GraduationCap, label: "Pendidikan", value: `${candidate.education} ${candidate.major}` },
                { icon: Briefcase, label: "Pengalaman", value: candidate.experience },
                { icon: Mail, label: "Email", value: candidate.email },
                { icon: Phone, label: "Telepon", value: candidate.phone },
                { icon: Clock, label: "Terakhir Aktif", value: candidate.lastActive },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {candidate.cv && (
                <a href={candidate.cv} target="_blank" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 hover:bg-gray-100 font-medium">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Lihat CV
                </a>
              )}
              {candidate.portfolio && (
                <a href={candidate.portfolio} target="_blank" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 hover:bg-gray-100 font-medium">
                  <Globe className="w-3.5 h-3.5" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        )}

        {/* Scores Section */}
        {activeSection === "scores" && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 mb-2">
              <p className="text-xs text-blue-700 font-medium">Skor dihitung secara otomatis oleh AI SkillConnect4.0 berdasarkan analisis profil mendalam.</p>
            </div>
            {[
              { label: "AI Match Score", score: candidate.aiScore, desc: "Kecocokan keseluruhan dengan posisi" },
              { label: "Kelengkapan Berkas", score: candidate.docScore, desc: "CV, portfolio, dan dokumen pendukung" },
              { label: "Relevansi Skill", score: candidate.skillScore, desc: "Kesesuaian skill dengan kebutuhan posisi" },
              { label: "Skor Screening", score: candidate.screeningScore, desc: "Hasil screening AI secara keseluruhan" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>{item.score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${getScoreBg(item.score)} h-2 rounded-full transition-all`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-2 font-semibold">Ekspektasi Gaji</p>
              <p className="text-sm font-semibold text-gray-800">{candidate.desiredSalary}</p>
            </div>
          </div>
        )}

        {/* Actions Section */}
        {activeSection === "actions" && (
          <div className="space-y-4">
            {/* Contact Buttons */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Hubungi Kandidat</p>
              <div className="space-y-2">
                <button
                  onClick={() => onContact("email")}
                  className="w-full flex items-center gap-3 p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-indigo-800">Kirim Email</p>
                    <p className="text-xs text-indigo-500">{candidate.email}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400 ml-auto" />
                </button>

                <button
                  onClick={() => onContact("phone")}
                  className="w-full flex items-center gap-3 p-3.5 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-green-800">Hubungi via Telepon</p>
                    <p className="text-xs text-green-500">{candidate.phone}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-green-400 ml-auto" />
                </button>

                <button
                  onClick={() => onContact("interview")}
                  className="w-full flex items-center gap-3 p-3.5 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-orange-800">Jadwalkan Wawancara</p>
                    <p className="text-xs text-orange-500">Kirim undangan wawancara</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-orange-400 ml-auto" />
                </button>

                <button
                  onClick={() => onContact("email")}
                  className="w-full flex items-center gap-3 p-3.5 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-purple-800">Kirim Pesan Chat</p>
                    <p className="text-xs text-purple-500">Melalui platform SkillConnect4.0</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 ml-auto" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mini Globe icon used inside detail
function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
