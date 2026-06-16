import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  FileText,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  X,
  Upload,
  Award,
  AlertCircle,
} from "lucide-react";
import { useApp, UserProfile, Education, Experience, Training } from "../../context/AppContext";

const STEPS = [
  { label: "Informasi Pribadi", icon: User },
  { label: "Pendidikan & Pengalaman", icon: GraduationCap },
  { label: "Keahlian & Preferensi", icon: Code },
  { label: "Dokumen Pendukung", icon: FileText },
];

const SKILL_SUGGESTIONS = [
  "JavaScript", "TypeScript", "React", "Vue.js", "Angular",
  "Node.js", "Python", "Java", "Go", "PHP",
  "SQL", "MongoDB", "PostgreSQL", "MySQL",
  "AWS", "Docker", "Kubernetes", "Git",
  "Machine Learning", "Data Analysis", "TensorFlow",
  "Figma", "Adobe XD", "Photoshop",
  "Project Management", "Scrum", "Agile",
  "Excel", "Power BI", "Tableau",
];

export function ProfilePage() {
  const { state, saveProfile } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRequiredMessage = (location.state as { profileRequiredMessage?: string } | null)?.profileRequiredMessage;
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<UserProfile>(() => state.profile || {
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: "",
    location: "",
    educations: [],
    experiences: [],
    trainings: [],
    skills: [],
    desiredRole: "",
    desiredSalary: "",
    cv: "",
    cvFileName: "",
    portfolio: "",
  });
  const [currentEducation, setCurrentEducation] = useState<Education>({ level: "", major: "", school: "", year: "" });
  const [currentExperience, setCurrentExperience] = useState<Experience>({ title: "", company: "", duration: "", description: "" });
  const [currentTraining, setCurrentTraining] = useState<Training>({ name: "", provider: "", year: "" });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error untuk field ini saat user mulai mengetik
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 0) {
      // Validasi Informasi Pribadi
      if (!form.name.trim()) newErrors.name = "Nama lengkap harus diisi";
      if (!form.email.trim()) newErrors.email = "Email harus diisi";
      if (!form.phone.trim()) newErrors.phone = "No. Telepon harus diisi";
      if (!form.location) newErrors.location = "Lokasi harus dipilih";
    } else if (currentStep === 1) {
      // Validasi Pendidikan & Pengalaman
      if (form.educations.length === 0) newErrors.educations = "Minimal harus ada satu riwayat pendidikan";
      if (form.experiences.length === 0) newErrors.experiences = "Minimal harus ada satu riwayat pengalaman";
    } else if (currentStep === 2) {
      // Validasi Keahlian & Preferensi
      if (form.skills.length === 0) newErrors.skills = "Minimal tambahkan satu skill";
      if (!form.desiredRole.trim()) newErrors.desiredRole = "Posisi yang diinginkan harus diisi";
      if (!form.desiredSalary) newErrors.desiredSalary = "Ekspektasi gaji harus dipilih";
    } else if (currentStep === 3) {
      // Validasi Dokumen
      if (!form.cv && !form.cvFileName) newErrors.cv = "CV harus diupload";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addEducation = () => {
    if (currentEducation.level && currentEducation.major && currentEducation.school) {
      setForm((prev) => ({ ...prev, educations: [...prev.educations, currentEducation] }));
      setCurrentEducation({ level: "", major: "", school: "", year: "" });
    }
  };

  const removeEducation = (index: number) => {
    setForm((prev) => ({ ...prev, educations: prev.educations.filter((_, i) => i !== index) }));
  };

  const addExperience = () => {
    if (currentExperience.title && currentExperience.company) {
      setForm((prev) => ({ ...prev, experiences: [...prev.experiences, currentExperience] }));
      setCurrentExperience({ title: "", company: "", duration: "", description: "" });
    }
  };

  const removeExperience = (index: number) => {
    setForm((prev) => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== index) }));
  };

  const addTraining = () => {
    if (currentTraining.name && currentTraining.provider) {
      setForm((prev) => ({ ...prev, trainings: [...prev.trainings, currentTraining] }));
      setCurrentTraining({ name: "", provider: "", year: "" });
    }
  };

  const removeTraining = (index: number) => {
    setForm((prev) => ({ ...prev, trainings: prev.trainings.filter((_, i) => i !== index) }));
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setForm((prev) => ({ ...prev, cv: base64String, cvFileName: file.name }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Harap pilih file PDF");
    }
  };

  const removeCVFile = () => {
    setForm((prev) => ({ ...prev, cv: "", cvFileName: "" }));
  };

  const addSkill = (skill: string) => {
    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < STEPS.length - 1) setStep(step + 1);
      else handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const ok = await saveProfile(form);
    setSubmitting(false);
    if (!ok) {
      setErrors({ submit: "Gagal menyimpan profil ke backend. Pastikan backend aktif dan Anda sudah login." });
      return;
    }
    navigate("/jobs");
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Lengkapi Profil Anda</h1>
          <p className="text-gray-500 mt-2 text-sm">
            AI kami membutuhkan informasi ini untuk mencarikan pekerjaan terbaik untuk Anda
          </p>
        </div>

        {profileRequiredMessage && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Profil belum lengkap</p>
              <p className="text-sm text-amber-700 mt-0.5">{profileRequiredMessage}</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    i < step
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : i === step
                      ? "bg-white border-indigo-600 text-indigo-600"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? "text-indigo-600 font-medium" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">Langkah {step + 1} dari {STEPS.length}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Informasi Pribadi
              </h2>
              {Object.keys(errors).length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">
                    {Object.values(errors).map((err, i) => (
                      <p key={i}>{err}</p>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.name ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="Nama lengkap Anda"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.phone ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="+62 812 ..."
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <MapPin className="inline w-3.5 h-3.5 mr-1" />
                    Lokasi / Kota <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${
                      errors.location ? "border-red-300" : "border-gray-200"
                    }`}
                  >
                    <option value="">Pilih kota</option>
                    {["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Semarang", "Makassar", "Bali"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Education & Experience */}
          {step === 1 && (
            <div className="space-y-8">
              {Object.keys(errors).length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">
                    {Object.values(errors).map((err, i) => (
                      <p key={i}>{err}</p>
                    ))}
                  </div>
                </div>
              )}
              {/* PENDIDIKAN */}
              <div className="border-b pb-8">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  Pendidikan <span className="text-red-500">*</span>
                </h2>
                <div className="bg-gray-50 p-4 rounded-xl mb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Jenjang</label>
                      <select
                        value={currentEducation.level}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, level: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      >
                        <option value="">Pilih jenjang</option>
                        {["SMA/SMK", "D3", "S1", "S2", "S3"].map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tahun Lulus</label>
                      <input
                        type="text"
                        value={currentEducation.year}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, year: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="2020"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Jurusan / Program Studi</label>
                    <input
                      type="text"
                      value={currentEducation.major}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, major: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Contoh: Teknik Informatika"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Institusi / Sekolah</label>
                    <input
                      type="text"
                      value={currentEducation.school}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, school: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Nama universitas/sekolah"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Pendidikan
                  </button>
                </div>
                {/* Daftar Pendidikan */}
                {form.educations.length > 0 && (
                  <div className="space-y-2">
                    {form.educations.map((edu, idx) => (
                      <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg flex justify-between items-start">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{edu.level} - {edu.major}</p>
                          <p className="text-gray-500 text-xs">{edu.school} ({edu.year})</p>
                        </div>
                        <button
                          onClick={() => removeEducation(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PENGALAMAN KERJA */}
              <div className="border-b pb-8">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Pengalaman Kerja <span className="text-red-500">*</span>
                </h2>
                <div className="bg-gray-50 p-4 rounded-xl mb-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Posisi / Jabatan</label>
                    <input
                      type="text"
                      value={currentExperience.title}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Contoh: Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Perusahaan</label>
                    <input
                      type="text"
                      value={currentExperience.company}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Nama perusahaan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Durasi</label>
                    <input
                      type="text"
                      value={currentExperience.duration}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Contoh: 2 tahun atau 2020-2022"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi (Opsional)</label>
                    <textarea
                      value={currentExperience.description}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows={2}
                      placeholder="Deskripsi singkat tugas dan tanggung jawab"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Pengalaman
                  </button>
                </div>
                {/* Daftar Pengalaman */}
                {form.experiences.length > 0 && (
                  <div className="space-y-2">
                    {form.experiences.map((exp, idx) => (
                      <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg flex justify-between items-start">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{exp.title}</p>
                          <p className="text-gray-500 text-xs">{exp.company} • {exp.duration}</p>
                          {exp.description && <p className="text-gray-600 text-xs mt-1">{exp.description}</p>}
                        </div>
                        <button
                          onClick={() => removeExperience(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PELATIHAN */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-indigo-600" />
                  Pelatihan / Sertifikasi (Opsional)
                </h2>
                <div className="bg-gray-50 p-4 rounded-xl mb-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nama Pelatihan</label>
                    <input
                      type="text"
                      value={currentTraining.name}
                      onChange={(e) => setCurrentTraining({ ...currentTraining, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Contoh: AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Penyelenggara</label>
                      <input
                        type="text"
                        value={currentTraining.provider}
                        onChange={(e) => setCurrentTraining({ ...currentTraining, provider: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contoh: AWS, Udemy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
                      <input
                        type="text"
                        value={currentTraining.year}
                        onChange={(e) => setCurrentTraining({ ...currentTraining, year: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="2023"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addTraining}
                    className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Pelatihan
                  </button>
                </div>
                {/* Daftar Pelatihan */}
                {form.trainings.length > 0 && (
                  <div className="space-y-2">
                    {form.trainings.map((train, idx) => (
                      <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg flex justify-between items-start">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{train.name}</p>
                          <p className="text-gray-500 text-xs">{train.provider} ({train.year})</p>
                        </div>
                        <button
                          onClick={() => removeTraining(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Skills & Preferences */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                Keahlian & Preferensi Kerja
              </h2>
              {Object.keys(errors).length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">
                    {Object.values(errors).map((err, i) => (
                      <p key={i}>{err}</p>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Keahlian / Skills <span className="text-red-500">*</span></label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                    className={`flex-1 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.skills ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="Ketik skill lalu tekan Enter..."
                  />
                  <button
                    type="button"
                    onClick={() => addSkill(skillInput)}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {/* Added skills */}
                {form.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {/* Suggestions */}
                <p className="text-xs text-gray-400 mb-2">Saran skill:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_SUGGESTIONS.filter((s) => !form.skills.includes(s)).slice(0, 12).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Posisi yang Diinginkan <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.desiredRole}
                  onChange={(e) => handleChange("desiredRole", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.desiredRole ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Contoh: Software Engineer, Data Scientist"
                />
                {errors.desiredRole && <p className="text-xs text-red-600 mt-1">{errors.desiredRole}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ekspektasi Gaji <span className="text-red-500">*</span></label>
                <select
                  value={form.desiredSalary}
                  onChange={(e) => handleChange("desiredSalary", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${
                    errors.desiredSalary ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  <option value="">Pilih range gaji</option>
                  {[
                    "< Rp 5.000.000",
                    "Rp 5.000.000 - Rp 10.000.000",
                    "Rp 10.000.000 - Rp 15.000.000",
                    "Rp 15.000.000 - Rp 20.000.000",
                    "Rp 20.000.000 - Rp 30.000.000",
                    "> Rp 30.000.000",
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Dokumen Pendukung
              </h2>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-sm text-indigo-800">
                  Dokumen yang lengkap meningkatkan peluang Anda lolos AI screening hingga 3x lebih besar.
                </p>
              </div>
              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">CV / Resume (PDF)</label>
                {!form.cv ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Pilih file PDF atau drag & drop di sini</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleCVUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                      Pilih File
                    </label>
                    <p className="text-xs text-gray-400 mt-3">File maksimal 10MB, format PDF</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* File Info */}
                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{form.cvFileName}</p>
                          <p className="text-xs text-gray-500">File berhasil diupload</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCVFile}
                        type="button"
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* PDF Preview */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <div className="p-2">
                        <embed
                          src={form.cv}
                          type="application/pdf"
                          className="w-full"
                          style={{ height: "400px" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Portfolio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Portfolio / Website (Opsional)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={form.portfolio}
                    onChange={(e) => handleChange("portfolio", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://portfolio-anda.com"
                  />
                </div>
              </div>
              {/* Profile Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Ringkasan Profil Anda</h3>
                <div className="space-y-2">
                  {[
                    { label: "Nama", value: form.name },
                    { label: "Lokasi", value: form.location },
                    { label: "Pendidikan", value: form.educations.length > 0 ? `${form.educations.length} data` : "-" },
                    { label: "Pengalaman", value: form.experiences.length > 0 ? `${form.experiences.length} data` : "-" },
                    { label: "Pelatihan", value: form.trainings.length > 0 ? `${form.trainings.length} data` : "-" },
                    { label: "Skill", value: form.skills.slice(0, 3).join(", ") + (form.skills.length > 3 ? "..." : "") || "-" },
                    { label: "Posisi Target", value: form.desiredRole },
                    { label: "CV", value: form.cvFileName ? "✓ Diupload" : "Belum upload" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className={`font-medium ${item.value === "✓ Diupload" ? "text-green-600" : "text-gray-800"}`}>{item.value || "-"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => step > 0 ? setStep(step - 1) : navigate("/dashboard")}
              className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {step === 0 ? "Kembali" : "Sebelumnya"}
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              {step === STEPS.length - 1 ? (
                <>
                  {submitting ? "Menyimpan..." : "Simpan & Proses AI"}
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Selanjutnya
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
