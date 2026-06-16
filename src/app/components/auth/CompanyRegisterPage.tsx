import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Building2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Globe,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Logo } from "../Logo";

const INDUSTRIES = [
  "Teknologi Informasi",
  "Keuangan & Perbankan",
  "E-Commerce",
  "Manufaktur",
  "Kesehatan",
  "Pendidikan",
  "Media & Hiburan",
  "Konsultan",
  "Logistik",
  "FMCG",
  "Lainnya",
];

const COMPANY_SIZES = [
  "1-10 karyawan",
  "11-50 karyawan",
  "51-200 karyawan",
  "201-500 karyawan",
  "501-1.000 karyawan",
  "> 1.000 karyawan",
];

export function CompanyRegisterPage() {
  const { registerCompany } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    picName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    address: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.picName || !form.email || !form.password || !form.companyName || !form.industry) {
      setError("Semua kolom wajib wajib diisi.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (form.password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (!agree) {
      setError("Anda harus menyetujui syarat & ketentuan.");
      return;
    }
    setLoading(true);
    const ok = await registerCompany(form.picName, form.email, form.password, form.companyName, form.industry, form.phone);
    if (!ok) {
      setError("Registrasi perusahaan gagal. Email mungkin sudah terdaftar.");
      setLoading(false);
      return;
    }
    navigate("/company/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-white max-w-sm">
          <div className="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 border border-white/20">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Rekrut Talenta Terbaik dengan AI</h2>
          <p className="text-white/70 leading-relaxed mb-8 text-sm">
            Bergabunglah dengan 500+ perusahaan yang telah menggunakan SkillConnect4.0 untuk menemukan kandidat terbaik secara lebih efisien.
          </p>
          <div className="space-y-4">
            {[
              { label: "Kandidat sudah diseleksi oleh AI", icon: CheckCircle },
              { label: "Akses profil & CV lengkap kandidat", icon: CheckCircle },
              { label: "Hubungi langsung via email & telepon", icon: CheckCircle },
              { label: "Kelola pipeline rekrutmen dengan mudah", icon: CheckCircle },
              { label: "Analitik rekrutmen real-time", icon: CheckCircle },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-white/80 text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { value: "500+", label: "Perusahaan Partner" },
              { value: "25.000+", label: "Penempatan Berhasil" },
              { value: "3x", label: "Lebih Cepat Rekrut" },
              { value: "95%", label: "Kepuasan Klien" },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-start justify-center px-4 py-10 bg-white overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Logo size="md" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              SkillConnect4.0
            </span>
          </Link>

          <div className="mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-3 border border-blue-100">
              <Building2 className="w-3.5 h-3.5" />
              Portal Perusahaan
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Daftarkan Perusahaan Anda</h1>
            <p className="text-gray-500 mt-1.5 text-sm">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
                Masuk di sini
              </Link>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Section: Company Info */}
            <div className="pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Informasi Perusahaan
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Perusahaan</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      placeholder="PT. Nama Perusahaan"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Industri</label>
                    <select
                      value={form.industry}
                      onChange={(e) => handleChange("industry", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Pilih industri</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ukuran Perusahaan</label>
                    <select
                      value={form.companySize}
                      onChange={(e) => handleChange("companySize", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Pilih ukuran</option>
                      {COMPANY_SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Website Perusahaan</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="https://perusahaan.com (opsional)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Section: PIC Info */}
            <div className="pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Data PIC / HR
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama PIC / HR</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.picName}
                      onChange={(e) => handleChange("picName", e.target.value)}
                      placeholder="Nama penanggung jawab"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email HR</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="hr@perusahaan.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+62 21 ..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Briefcase className="inline w-3.5 h-3.5 mr-1" />
                    Jabatan / Role
                  </label>
                  <input
                    type="text"
                    placeholder="HR Manager, Talent Acquisition, dll"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Passwords */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <p className="text-xs text-green-600">Kata sandi cocok</p>
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 accent-blue-600 mt-0.5 flex-shrink-0"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                Saya menyetujui{" "}
                <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a>{" "}
                dan{" "}
                <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>{" "}
                SkillConnect4.0 untuk Perusahaan
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 shadow-lg shadow-blue-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Daftarkan Perusahaan
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
