import { Link } from "react-router";
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Briefcase,
  Award,
  ChevronRight,
  Sparkles,
  Shield,
  BarChart3,
} from "lucide-react";
import { Logo } from "../Logo";

const heroImage = "https://images.unsplash.com/photo-1762330471769-47ffee22607f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXJlZXIlMjBqb2IlMjBzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzY3MzcxM3ww&ixlib=rb-4.1.0&q=80&w=1080";
const aiImage = "https://images.unsplash.com/photo-1770170389700-eb0f9b910ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBkYXRhJTIwYW5hbHl0aWNzJTIwbW9kZXJufGVufDF8fHx8MTc3MzY3MzcxN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const teamImage = "https://images.unsplash.com/photo-1737573296361-75315239293a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZSUyMHdvcmtzcGFjZSUyMHByb2Zlc3Npb25hbHN8ZW58MXx8fHwxNzczNjczNzE4fDA&ixlib=rb-4.1.0&q=80&w=1080";

const features = [
  {
    icon: Brain,
    title: "AI Job Matching",
    desc: "Algoritma AI/ML kami mencocokkan profil Anda dengan ribuan lowongan kerja secara real-time untuk menemukan peluang terbaik.",
    color: "from-indigo-500 to-purple-600",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: Target,
    title: "Analisis Skill Gap",
    desc: "Deteksi otomatis kesenjangan kemampuan Anda dengan kebutuhan pekerjaan impian, lengkap dengan roadmap pengembangan.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Rekomendasi Pelatihan",
    desc: "Dapatkan rekomendasi kursus dan sertifikasi yang dipersonalisasi khusus untuk menutup skill gap Anda.",
    color: "from-green-500 to-teal-500",
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Shield,
    title: "AI Screening Otomatis",
    desc: "Sistem AI kami memvalidasi kelengkapan berkas dan relevansi Anda secara otomatis sebelum melamar pekerjaan.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Proses Cepat & Mudah",
    desc: "Dari pengisian profil hingga mendapat rekomendasi kerja hanya dalam hitungan menit. Tidak perlu proses yang panjang.",
    color: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analitik",
    desc: "Pantau perkembangan lamaran, status screening, dan progres pelatihan Anda dalam satu dashboard yang komprehensif.",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
];

const steps = [
  {
    num: "01",
    title: "Daftar & Isi Profil",
    desc: "Buat akun dan lengkapi profil Anda dengan informasi pendidikan, pengalaman kerja, dan keahlian yang dimiliki.",
    icon: Users,
  },
  {
    num: "02",
    title: "AI Proses Pencocokan",
    desc: "Sistem AI/ML kami menganalisis profil Anda dan mencocokkannya dengan database ribuan lowongan pekerjaan terkini.",
    icon: Brain,
  },
  {
    num: "03",
    title: "Pilih Rekomendasi Kerja",
    desc: "Lihat daftar pekerjaan yang paling sesuai dengan profil Anda, dilengkapi persentase kecocokan dari AI.",
    icon: Briefcase,
  },
  {
    num: "04",
    title: "Screening & Notifikasi",
    desc: "AI mendeteksi kelengkapan berkas dan relevansi Anda. Jika lolos, perusahaan akan menghubungi untuk tahap selanjutnya.",
    icon: Award,
  },
];

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Software Engineer di TechCorp",
    text: "SkillConnect4.0 membantu saya menemukan pekerjaan impian dalam 2 minggu! AI-nya sangat akurat dalam mencocokkan skill saya.",
    rating: 5,
    avatar: "AP",
  },
  {
    name: "Siti Rahma",
    role: "Data Scientist di AI Solutions",
    text: "Fitur skill gap-nya luar biasa! Saya tahu persis apa yang harus dipelajari untuk naik ke level berikutnya.",
    rating: 5,
    avatar: "SR",
  },
  {
    name: "Budi Santoso",
    role: "Product Manager di StartupHub",
    text: "Proses lamarnya sangat mudah. AI screening otomatis menghemat waktu saya dan langsung dapat wawancara.",
    rating: 5,
    avatar: "BS",
  },
];

const stats = [
  { value: "50.000+", label: "Pengguna Aktif" },
  { value: "10.000+", label: "Lowongan Tersedia" },
  { value: "95%", label: "Tingkat Kepuasan" },
  { value: "3x", label: "Lebih Cepat Dapat Kerja" },
];

export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/90">Platform Karir Berbasis AI #1 di Indonesia</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Temukan Karir
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                  Impian Anda
                </span>
                dengan AI
              </h1>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                SkillConnect4.0 menggunakan kecerdasan buatan untuk mencocokkan profil Anda dengan pekerjaan terbaik, 
                menganalisis skill gap, dan merekomendasikan pelatihan yang tepat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-orange-500/25"
                >
                  Mulai Gratis Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
                >
                  Sudah Punya Akun?
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((l, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-indigo-900 flex items-center justify-center text-sm font-semibold text-white"
                      style={{
                        background: `hsl(${220 + i * 30}, 70%, 55%)`,
                      }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/70">50.000+ pengguna puas</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                <img
                  src={heroImage}
                  alt="Career Platform"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
              </div>
              {/* Floating cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status Screening</p>
                  <p className="text-sm font-semibold text-green-600">Lolos Screening!</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">AI Match Score</p>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-indigo-600">92%</span>
                  <span className="text-sm text-gray-400 mb-1">kecocokan</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Semua yang Anda Butuhkan untuk Karir Terbaik
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Platform kami mengintegrasikan teknologi AI terdepan untuk memberikan pengalaman pencarian kerja yang personal dan efektif.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
              >
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Cara Kerja
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4 Langkah Mudah Menuju Karir Impian
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Proses kami sederhana namun powerful. Dari daftar hingga dapat panggilan wawancara, semuanya terbantu oleh AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 z-0 -translate-x-4">
                    <ChevronRight className="absolute right-0 -top-2.5 text-indigo-300 w-5 h-5" />
                  </div>
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm font-bold text-indigo-600 mb-2">{step.num}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-950 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-6 border border-white/20">
                Teknologi AI Terdepan
              </span>
              <h2 className="text-3xl font-bold mb-6">
                AI yang Memahami Karir Anda
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Sistem Machine Learning kami dilatih dengan data jutaan profil karir dan lowongan pekerjaan di Indonesia. 
                Hasilnya? Pencocokan pekerjaan yang lebih akurat dan rekomendasi yang benar-benar relevan.
              </p>
              <ul className="space-y-4">
                {[
                  "Analisis profil mendalam menggunakan NLP",
                  "Pencocokan semantik skill dengan kebutuhan perusahaan",
                  "Prediksi tingkat kecocokan dengan akurasi tinggi",
                  "Rekomendasi adaptif berdasarkan feedback pengguna",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src={aiImage}
                alt="AI Technology"
                className="rounded-2xl shadow-2xl w-full object-cover h-72 lg:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Testimoni
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Dipercaya Ribuan Profesional Indonesia
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Company Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={teamImage}
                alt="Our Team"
                className="rounded-2xl shadow-lg w-full object-cover h-72"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Misi Kami: Demokratisasi Akses Karir Terbaik
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                SkillConnect4.0 didirikan dengan keyakinan bahwa setiap orang berhak mendapatkan pekerjaan yang sesuai dengan 
                potensi mereka. Dengan teknologi AI, kami menghapus hambatan dalam pencarian kerja.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Perusahaan Partner", value: "500+" },
                  { label: "Kota di Indonesia", value: "34" },
                  { label: "Penempatan Berhasil", value: "25.000+" },
                  { label: "Penghargaan", value: "12" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-indigo-600">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Karir Terbaik Anda?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan 50.000+ profesional yang telah mempercayakan karir mereka kepada SkillConnect4.0. 
            Gratis, cepat, dan didukung AI terdepan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Daftar Gratis Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-400/30">
                Untuk Perusahaan & HR
              </span>
              <h2 className="text-3xl font-bold mb-6">
                Rekrut Talenta Terbaik Lebih Efisien dengan AI
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                SkillConnect4.0 membantu perusahaan Anda mendapatkan kandidat berkualitas yang sudah melalui AI screening otomatis. 
                Hemat waktu, biaya, dan energi tim HR Anda.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Kandidat sudah diseleksi otomatis oleh AI — tidak perlu sortir manual",
                  "Akses profil, CV, portfolio, dan skill lengkap setiap kandidat",
                  "Hubungi kandidat langsung via email, telepon, atau undangan wawancara",
                  "Kelola pipeline rekrutmen dengan dashboard analitik real-time",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/company/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors shadow-lg shadow-blue-900/50"
                >
                  Daftarkan Perusahaan
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  Masuk sebagai Perusahaan
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Kandidat Lolos Screening", value: "24.000+", icon: "🎯", desc: "Tersedia untuk direkrut" },
                { label: "Waktu Rekrut Lebih Cepat", value: "3x", icon: "⚡", desc: "Dibanding cara konvensional" },
                { label: "Akurasi AI Screening", value: "97%", icon: "🤖", desc: "Tingkat akurasi seleksi" },
                { label: "Perusahaan Puas", value: "500+", icon: "🏢", desc: "Partner aktif kami" },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-sm font-medium text-white/80 mt-0.5">{item.label}</p>
                  <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size="sm" />
                <span className="text-white font-bold">SkillConnect4.0</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platform karir berbasis AI untuk profesional Indonesia.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["Beranda", "Fitur", "Cara Kerja", "Harga"],
              },
              {
                title: "Untuk Pelamar",
                links: ["Cari Kerja", "Skill Gap", "Pelatihan", "Dashboard"],
              },
              {
                title: "Perusahaan",
                links: ["Posting Lowongan", "Talent Search", "Tentang Kami", "Kontak"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 SkillConnect4.0. Hak cipta dilindungi.</p>
            <div className="flex gap-6">
              {["Kebijakan Privasi", "Syarat & Ketentuan", "Bantuan"].map((item, i) => (
                <a key={i} href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}