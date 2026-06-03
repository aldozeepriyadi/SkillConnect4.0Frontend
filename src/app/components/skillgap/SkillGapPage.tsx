import { useNavigate } from "react-router";
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Target,
  BarChart3,
  CheckCircle,
  Info,
} from "lucide-react";
import { skillGapData } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { Logo } from "../Logo";

export function SkillGapPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  const totalGap = skillGapData.reduce((acc, s) => acc + s.gap, 0);
  const avgGap = Math.round(totalGap / skillGapData.length);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analisis Skill Gap</h1>
              <p className="text-sm text-gray-500">
                Dianalisis oleh AI berdasarkan posisi{" "}
                <strong>{state.selectedJob?.title || "yang Anda minati"}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Skill Dianalisis",
              value: skillGapData.length,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              icon: BarChart3,
            },
            {
              label: "Skill Perlu Ditingkatkan",
              value: skillGapData.filter((s) => s.gap > 20).length,
              color: "text-red-600",
              bg: "bg-red-50",
              icon: AlertTriangle,
            },
            {
              label: "Rata-rata Gap",
              value: `${avgGap}%`,
              color: "text-orange-600",
              bg: "bg-orange-50",
              icon: Target,
            },
            {
              label: "Skill Hampir Cukup",
              value: skillGapData.filter((s) => s.gap <= 20).length,
              color: "text-green-600",
              bg: "bg-green-50",
              icon: CheckCircle,
            },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-4 border border-white`}>
              <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* AI Insight Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-5 mb-8 text-white flex items-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Logo size="md" />
          </div>
          <div>
            <p className="font-semibold mb-1">Insight dari AI SkillConnect4.0</p>
            <p className="text-white/80 text-sm leading-relaxed">
              Berdasarkan analisis mendalam terhadap profil Anda dan kebutuhan industri, 
              terdapat <strong>kesenjangan utama</strong> pada skill Machine Learning dan Cloud Computing. 
              Dengan mengikuti pelatihan yang direkomendasikan, peluang Anda lolos screening dapat meningkat hingga <strong>85%</strong>.
            </p>
          </div>
        </div>

        {/* Skill Gap Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Detail Analisis Skill Gap
          </h2>
          <div className="space-y-6">
            {skillGapData.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{item.skill}</span>
                    {item.gap > 30 && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                        Prioritas
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-semibold ${item.gap > 30 ? "text-red-600" : item.gap > 15 ? "text-orange-600" : "text-green-600"}`}>
                    Gap: {item.gap}%
                  </span>
                </div>
                <div className="space-y-1.5">
                  {/* Current Level */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20 flex-shrink-0">Level Saat Ini</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${item.current}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8 text-right">{item.current}%</span>
                  </div>
                  {/* Required Level */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20 flex-shrink-0">Dibutuhkan</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-700"
                        style={{ width: `${item.required}%` }}
                      ></div>
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-300 to-red-400 rounded-full opacity-40 transition-all duration-700"
                        style={{ width: `${item.current}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8 text-right">{item.required}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-blue-400 rounded-sm"></div>
              <span className="text-xs text-gray-500">Level Anda Saat Ini</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-green-400 rounded-sm"></div>
              <span className="text-xs text-gray-500">Level yang Dibutuhkan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-red-300 rounded-sm opacity-60"></div>
              <span className="text-xs text-gray-500">Gap yang Perlu Ditutup</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Rekomendasi AI untuk Menutup Gap
          </h2>
          <div className="space-y-3">
            {[
              {
                skill: "Machine Learning",
                action: "Ikuti kursus ML Fundamentals dan praktikkan dengan proyek nyata",
                priority: "Tinggi",
                color: "red",
              },
              {
                skill: "Cloud Computing",
                action: "Dapatkan sertifikasi AWS Cloud Practitioner dalam 2 bulan",
                priority: "Tinggi",
                color: "red",
              },
              {
                skill: "Data Analysis",
                action: "Perkuat dengan Python Pandas dan visualisasi data menggunakan Matplotlib",
                priority: "Sedang",
                color: "orange",
              },
              {
                skill: "Communication",
                action: "Ikuti workshop komunikasi teknis dan latih presentasi rutin",
                priority: "Rendah",
                color: "green",
              },
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                  rec.color === "red"
                    ? "bg-red-100 text-red-700"
                    : rec.color === "orange"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {rec.priority}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{rec.skill}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{rec.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/jobs")}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Kembali ke Lowongan
          </button>
          <button
            onClick={() => navigate("/training")}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <TrendingUp className="w-4 h-4" />
            Lihat Rekomendasi Pelatihan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
