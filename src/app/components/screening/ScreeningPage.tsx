import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Brain,
  CheckCircle,
  XCircle,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  Star,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Logo } from "../Logo";

export function ScreeningPage() {
  const { state, runScreening } = useApp();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"analyzing" | "result">("analyzing");
  const [analyzeStep, setAnalyzeStep] = useState(0);

  const analyzeSteps = [
    "Membaca data profil Anda...",
    "Memeriksa kelengkapan berkas...",
    "Menganalisis relevansi skill...",
    "Menghitung skor kecocokan...",
    "Memfinalisasi hasil screening...",
  ];

  useEffect(() => {
    if (!state.selectedJob) {
      navigate("/jobs");
      return;
    }
    const interval = setInterval(() => {
      setAnalyzeStep((prev) => {
        if (prev >= analyzeSteps.length - 1) {
          clearInterval(interval);
          setTimeout(async () => {
            await runScreening();
            setPhase("result");
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const passed = state.screeningStatus === "passed";
  const job = state.selectedJob;
  const result = state.screeningResult;

  if (phase === "analyzing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-md">
          {/* AI Animation */}
          <div className="relative w-32 h-32 mx-auto mb-10">
            <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-ping"></div>
            <div className="absolute inset-4 bg-indigo-400/20 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                <Logo size="lg" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">AI Sedang Melakukan Screening</h2>
          <p className="text-white/60 text-sm mb-10">
            Sistem kami menganalisis kelengkapan berkas dan relevansi profil Anda terhadap posisi{" "}
            <strong className="text-white">{job?.title}</strong> di{" "}
            <strong className="text-white">{job?.company}</strong>
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {analyzeSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  i <= analyzeStep ? "opacity-100" : "opacity-20"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    i < analyzeStep
                      ? "bg-green-400"
                      : i === analyzeStep
                      ? "bg-white/20 border border-white/40"
                      : "bg-white/10"
                  }`}
                >
                  {i < analyzeStep ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : i === analyzeStep ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  ) : null}
                </div>
                <span className={`text-sm ${i <= analyzeStep ? "text-white" : "text-white/40"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {passed ? (
          /* PASSED */
          <div className="text-center">
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping" style={{ animationDuration: "2s" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Selamat! Anda Lolos Screening AI
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Anda Lolos Screening!
            </h1>
            <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
              Profil Anda memenuhi kualifikasi dan kelengkapan berkas untuk posisi{" "}
              <strong>{job?.title}</strong> di <strong>{job?.company}</strong>.
              Perusahaan akan segera menghubungi Anda.
            </p>

            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                Hasil Analisis AI
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Skor Kecocokan", value: `${result?.score ?? job?.match}%`, color: "text-green-600" },
                  { label: "Kelengkapan Berkas", value: `${result?.components?.profile_completeness ?? 95}%`, color: "text-green-600" },
                  { label: "Relevansi Skill", value: `${result?.components?.skill ?? 87}%`, color: "text-blue-600" },
                  { label: "Status", value: "Lolos ✓", color: "text-green-600" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Will Contact */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-left mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{job?.company}</p>
                  <p className="text-white/70 text-sm">Akan menghubungi Anda</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Tim rekrutmen <strong>{job?.company}</strong> akan menghubungi Anda dalam{" "}
                <strong>2-5 hari kerja</strong> untuk proses seleksi lebih lanjut. Pastikan nomor telepon dan email Anda aktif.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Cek telepon Anda</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Cek email Anda</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/jobs")}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Lihat Lowongan Lain
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Dashboard Saya
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* FAILED */
          <div className="text-center">
            <div className="w-28 h-28 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-14 h-14 text-orange-500" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              <XCircle className="w-4 h-4" />
              Belum Memenuhi Kualifikasi
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Belum Lolos Screening
            </h1>
            <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
              Jangan khawatir! AI kami telah mengidentifikasi skill gap yang perlu ditingkatkan. 
              Kami siap merekomendasikan pelatihan untuk membantu Anda.
            </p>

            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-orange-500" />
                Analisis Kekurangan
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Skor Kecocokan", value: `${result?.score ?? job?.match}%`, color: "text-orange-600" },
                  { label: "Kelengkapan Berkas", value: `${result?.components?.profile_completeness ?? 72}%`, color: "text-orange-600" },
                  { label: "Relevansi Skill", value: `${result?.components?.skill ?? 58}%`, color: "text-red-500" },
                  { label: "Status", value: "Belum Lolos", color: "text-red-500" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600 mb-2">Kekurangan yang terdeteksi:</p>
                {(result?.explanation?.length ? result.explanation : ["Skill Machine Learning perlu ditingkatkan", "Sertifikasi cloud belum ada", "Pengalaman relevan kurang dari yang disyaratkan"]).map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Skill Gap CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-left mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-300" />
                <p className="font-semibold">AI Merekomendasikan Pelatihan untuk Anda!</p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Kami telah mengidentifikasi <strong>4 pelatihan</strong> yang dapat menutup skill gap Anda 
                dan meningkatkan peluang lolos screening hingga <strong>3x lebih besar</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/jobs")}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Coba Lowongan Lain
              </button>
              <button
                onClick={() => navigate("/skillgap")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Lihat Analisis Skill Gap
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
