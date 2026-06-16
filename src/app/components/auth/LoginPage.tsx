import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  User,
  Building2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Logo } from "../Logo";

type LoginMode = "jobseeker" | "company";

export function LoginPage() {
  const { login, loginAsCompany } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const authRequiredMessage = (location.state as { authRequiredMessage?: string } | null)?.authRequiredMessage;
  const [mode, setMode] = useState<LoginMode>("jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    setLoading(true);
    const ok = mode === "company"
      ? await loginAsCompany(email, password)
      : await login(email, password);
    if (!ok) {
      setError("Login gagal. Pastikan akun sudah terdaftar dan kata sandi benar.");
      setLoading(false);
      return;
    }
    if (mode === "company") {
      navigate("/company/dashboard");
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const isCompany = mode === "company";

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className={`hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden transition-all duration-500 ${
          isCompany
            ? "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900"
            : "bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900"
        }`}
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center text-white max-w-md">
          <div
            className={`w-20 h-20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 ${
              isCompany ? "bg-blue-500/20" : "bg-white/10"
            }`}
          >
            {isCompany ? (
              <Building2 className="w-10 h-10 text-white" />
            ) : (
              <Logo size="lg" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {isCompany ? "Portal Rekrutmen Perusahaan" : "Selamat Datang Kembali!"}
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            {isCompany
              ? "Kelola rekrutmen lebih efisien. Lihat kandidat terbaik yang telah lolos AI screening dan hubungi mereka langsung."
              : "Masuk ke akun Anda dan lanjutkan perjalanan karir bersama AI yang siap membantu Anda."}
          </p>
          <div className="space-y-4">
            {isCompany
              ? [
                  "Lihat daftar kandidat lolos screening",
                  "Hubungi kandidat secara langsung",
                  "Kelola lowongan & pipeline rekrutmen",
                  "Pantau status setiap kandidat",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <div className="w-6 h-6 bg-blue-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))
              : [
                  "Lihat rekomendasi pekerjaan terbaru",
                  "Pantau status lamaran Anda",
                  "Akses rekomendasi pelatihan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 lg:justify-start">
            <Logo size="md" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              SkillConnect4.0
            </span>
          </Link>

          {/* Mode Toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8">
            <button
              onClick={() => { setMode("jobseeker"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "jobseeker"
                  ? "bg-white shadow text-indigo-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <User className="w-4 h-4" />
              Pencari Kerja
            </button>
            <button
              onClick={() => { setMode("company"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "company"
                  ? "bg-white shadow text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Perusahaan
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {isCompany ? "Masuk sebagai Perusahaan" : "Masuk ke Akun"}
            </h1>
            <p className="text-gray-500 mt-1.5 text-sm">
              Belum punya akun?{" "}
              <Link
                to={isCompany ? "/company/register" : "/register"}
                className={`font-medium hover:underline ${isCompany ? "text-blue-600" : "text-indigo-600"}`}
              >
                {isCompany ? "Daftarkan perusahaan" : "Daftar gratis"}
              </Link>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {authRequiredMessage && !error && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700">{authRequiredMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isCompany ? "hr@perusahaan.com" : "contoh@email.com"}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-transparent transition-all ${
                    isCompany ? "focus:ring-2 focus:ring-blue-500" : "focus:ring-2 focus:ring-indigo-500"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                <a href="#" className={`text-xs font-medium ${isCompany ? "text-blue-600" : "text-indigo-600"}`}>
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata sandi Anda"
                  className={`w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-transparent transition-all ${
                    isCompany ? "focus:ring-2 focus:ring-blue-500" : "focus:ring-2 focus:ring-indigo-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-indigo-600" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Ingat saya selama 30 hari
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 text-white rounded-xl font-semibold transition-opacity disabled:opacity-70 shadow-lg ${
                isCompany
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 shadow-blue-200 hover:opacity-90"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-200 hover:opacity-90"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isCompany ? "Masuk ke Portal Perusahaan" : "Masuk"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              <span className="font-medium">Demo:</span>{" "}
              {isCompany
                ? "Gunakan akun perusahaan yang sudah terdaftar. Seed demo: hr@techcorp.id / password123"
                : "Daftar akun terlebih dahulu, lalu login untuk memakai backend SkillConnect"}
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Dengan masuk, Anda menyetujui{" "}
            <a href="#" className="text-indigo-600 hover:underline">Syarat & Ketentuan</a>{" "}
            dan{" "}
            <a href="#" className="text-indigo-600 hover:underline">Kebijakan Privasi</a> kami.
          </p>
        </div>
      </div>
    </div>
  );
}
