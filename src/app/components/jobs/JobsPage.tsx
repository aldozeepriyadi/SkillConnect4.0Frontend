import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Brain,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  Briefcase,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle,
  X,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockJobs } from "../../data/mockData";
import { Job } from "../../context/AppContext";

const COLORS: Record<string, string> = {
  TC: "from-blue-500 to-indigo-600",
  AI: "from-purple-500 to-pink-600",
  CS: "from-orange-500 to-red-500",
  SH: "from-green-500 to-teal-600",
  FC: "from-yellow-500 to-orange-500",
  CT: "from-cyan-500 to-blue-500",
};

export function JobsPage() {
  const { state, selectJob } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedJobDetail, setSelectedJobDetail] = useState<Job | null>(null);
  const [aiProcessing, setAiProcessing] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    const matchSearch =
      search === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || job.type === filterType;
    return matchSearch && matchType;
  });

  const handleApply = async (job: Job) => {
    setAiProcessing(true);
    selectJob(job);
    await new Promise((r) => setTimeout(r, 2000));
    setAiProcessing(false);
    navigate("/screening");
  };

  const getMatchColor = (match: number) => {
    if (match >= 85) return "text-green-600 bg-green-50 border-green-200";
    if (match >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getMatchBg = (match: number) => {
    if (match >= 85) return "bg-green-500";
    if (match >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (aiProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
            <div className="absolute inset-3 bg-white/20 rounded-full animate-ping" style={{ animationDelay: "0.3s" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">AI Memproses Lamaran Anda</h2>
          <p className="text-white/70 text-sm">Mendeteksi kelengkapan berkas dan relevansi pekerjaan...</p>
          <div className="mt-6 flex justify-center gap-2">
            {["Analisis Profil", "Cek Dokumen", "Hitung Skor", "Finalisasi"].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                <span className="text-xs text-white/50">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Pekerjaan AI</h1>
              <p className="text-sm text-gray-500">
                Dicocokkan khusus untuk {state.user?.name || "Anda"} berdasarkan profil dan keahlian
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100 w-fit">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-indigo-700">
              AI menemukan <strong>{filteredJobs.length}</strong> pekerjaan yang cocok untuk Anda
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari posisi atau perusahaan..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-9 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
              >
                <option value="all">Semua Tipe</option>
                <option value="Full-time">Full-time</option>
                <option value="Remote">Remote</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJobDetail(job)}
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-md ${
                  selectedJobDetail?.id === job.id
                    ? "border-indigo-300 shadow-md ring-1 ring-indigo-100"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${COLORS[job.logo] || "from-gray-400 to-gray-600"} rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getMatchColor(job.match)} flex-shrink-0`}>
                        <Star className="w-3 h-3 fill-current" />
                        {job.match}% match
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                    {/* Match bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Tingkat Kecocokan AI</span>
                        <span className="text-xs font-medium text-gray-600">{job.match}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`${getMatchBg(job.match)} h-1.5 rounded-full transition-all`}
                          style={{ width: `${job.match}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Job Detail Panel */}
          <div className="lg:col-span-1">
            {selectedJobDetail ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${COLORS[selectedJobDetail.logo] || "from-gray-400 to-gray-600"} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {selectedJobDetail.logo}
                  </div>
                  <button onClick={() => setSelectedJobDetail(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-lg font-bold text-gray-900">{selectedJobDetail.title}</h2>
                <p className="text-gray-500 text-sm mb-4">{selectedJobDetail.company}</p>

                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border mb-4 ${getMatchColor(selectedJobDetail.match)}`}>
                  <Brain className="w-4 h-4" />
                  <span className="text-sm font-semibold">Skor AI: {selectedJobDetail.match}% Cocok</span>
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { icon: MapPin, label: selectedJobDetail.location },
                    { icon: DollarSign, label: selectedJobDetail.salary },
                    { icon: Briefcase, label: selectedJobDetail.type },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <item.icon className="w-4 h-4 text-gray-400" />
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Skill Dibutuhkan:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJobDetail.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Deskripsi Pekerjaan:</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedJobDetail.description}</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleApply(selectedJobDetail)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Lamar Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Simpan Lowongan
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7 text-indigo-400" />
                </div>
                <p className="text-gray-500 text-sm">Klik pada kartu pekerjaan untuk melihat detail lengkap dan melamar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
