import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Brain,
  Star,
  Clock,
  Users,
  Tag,
  BookOpen,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Award,
  Sparkles,
  Filter,
} from "lucide-react";
import { trainingRecommendations } from "../../data/mockData";

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  "All Levels": "bg-gray-100 text-gray-700",
  Advanced: "bg-purple-100 text-purple-700",
};

const PRICE_COLORS: Record<string, string> = {
  Gratis: "bg-green-100 text-green-700 border-green-200",
};

export function TrainingPage() {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [filterLevel, setFilterLevel] = useState("all");

  const filteredTrainings = trainingRecommendations.filter(
    (t) => filterLevel === "all" || t.level === filterLevel
  );

  const handleEnroll = (id: string) => {
    setEnrolled((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Pelatihan Skill</h1>
              <p className="text-sm text-gray-500">
                AI merekomendasikan kursus terbaik untuk menutup skill gap Anda
              </p>
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-5 mb-8 text-white flex items-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold mb-1">AI Menemukan Pelatihan Terbaik untuk Anda</p>
            <p className="text-white/80 text-sm leading-relaxed">
              Berdasarkan analisis skill gap, AI kami memilih <strong>{trainingRecommendations.length} kursus</strong> yang 
              paling relevan. Jika Anda menyelesaikan semua pelatihan ini, peluang karir Anda bisa meningkat hingga{" "}
              <strong>300%</strong>.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pelatihan Direkomendasikan", value: trainingRecommendations.length, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Sudah Terdaftar", value: enrolled.length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
            { label: "Rata-rata Rating", value: "4.7★", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-4 text-center`}>
              <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-2`} />
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Filter:</span>
          {["all", "Beginner", "Intermediate", "All Levels"].map((level) => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterLevel === level
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {level === "all" ? "Semua" : level}
            </button>
          ))}
        </div>

        {/* Training Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredTrainings.map((training) => (
            <div
              key={training.id}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${
                enrolled.includes(training.id) ? "border-green-300 ring-1 ring-green-100" : "border-gray-100 hover:shadow-md"
              }`}
            >
              {/* Card Header */}
              <div className={`p-5 ${enrolled.includes(training.id) ? "bg-green-50" : "bg-gradient-to-br from-indigo-50 to-purple-50"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 leading-tight">{training.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{training.provider}</p>
                  </div>
                  {enrolled.includes(training.id) && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>

                {/* AI Relevance Score */}
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs text-indigo-700 font-medium">Relevansi AI: {training.relevance}%</span>
                  <div className="flex-1 bg-white/50 rounded-full h-1.5">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full"
                      style={{ width: `${training.relevance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {training.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white text-indigo-600 rounded-md text-xs border border-indigo-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{training.description}</p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {training.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Award className="w-3.5 h-3.5" />
                    <span className={`px-1.5 py-0.5 rounded-md ${LEVEL_COLORS[training.level] || "bg-gray-100 text-gray-600"}`}>
                      {training.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                    {training.rating} Rating
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5" />
                    {training.students} Pelajar
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${
                    training.price === "Gratis"
                      ? PRICE_COLORS["Gratis"]
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}>
                    {training.price}
                  </span>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
                      <ExternalLink className="w-3 h-3" />
                      Detail
                    </button>
                    <button
                      onClick={() => handleEnroll(training.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        enrolled.includes(training.id)
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                      }`}
                    >
                      {enrolled.includes(training.id) ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Terdaftar
                        </>
                      ) : (
                        <>
                          <Tag className="w-3 h-3" />
                          Daftar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-indigo-600" />
            Learning Path yang Direkomendasikan AI
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 to-purple-200"></div>
            <div className="space-y-6 pl-12 relative">
              {[
                {
                  week: "Minggu 1-2",
                  action: "Mulai dengan Effective Communication in Tech (gratis)",
                  tag: "Soft Skills",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  week: "Minggu 3-8",
                  action: "Ikuti Data Analysis with Python untuk skill data",
                  tag: "Teknis",
                  color: "bg-indigo-100 text-indigo-700",
                },
                {
                  week: "Bulan 2-3",
                  action: "Ambil sertifikasi AWS Cloud Practitioner",
                  tag: "Sertifikasi",
                  color: "bg-orange-100 text-orange-700",
                },
                {
                  week: "Bulan 1-3",
                  action: "Paralel: Machine Learning Fundamentals dari Google",
                  tag: "ML/AI",
                  color: "bg-purple-100 text-purple-700",
                },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-7 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="text-xs text-gray-400 min-w-fit">{step.week}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${step.color}`}>{step.tag}</span>
                    <p className="text-sm text-gray-700 w-full mt-1">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/skillgap")}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Lihat Skill Gap
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Selesai - Ke Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
