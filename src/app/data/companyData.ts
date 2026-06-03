export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  major: string;
  experience: string;
  skills: string[];
  desiredRole: string;
  desiredSalary: string;
  aiScore: number;
  screeningScore: number;
  docScore: number;
  skillScore: number;
  appliedJob: string;
  appliedDate: string;
  status: "new" | "contacted" | "interview" | "hired" | "rejected";
  avatar: string;
  summary: string;
  portfolio: string;
  cv: string;
  lastActive: string;
}

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Andi Pratama",
    email: "andi.pratama@gmail.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta",
    education: "S1",
    major: "Teknik Informatika",
    experience: "3-5 tahun",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    desiredRole: "Software Engineer",
    desiredSalary: "Rp 15.000.000 - Rp 20.000.000",
    aiScore: 92,
    screeningScore: 95,
    docScore: 97,
    skillScore: 89,
    appliedJob: "Software Engineer",
    appliedDate: "2026-03-15",
    status: "new",
    avatar: "AP",
    summary:
      "Software Engineer berpengalaman 4 tahun di bidang pengembangan web full-stack. Terbiasa dengan metodologi Agile dan CI/CD pipeline. Memiliki rekam jejak yang kuat dalam membangun aplikasi skala besar.",
    portfolio: "https://andidev.id",
    cv: "https://drive.google.com/andi-cv.pdf",
    lastActive: "2 jam lalu",
  },
  {
    id: "c2",
    name: "Siti Rahmawati",
    email: "siti.rahma@outlook.com",
    phone: "+62 821-9876-5432",
    location: "Bandung",
    education: "S1",
    major: "Sistem Informasi",
    experience: "1-2 tahun",
    skills: ["Python", "Machine Learning", "Pandas", "TensorFlow", "SQL"],
    desiredRole: "Data Scientist",
    desiredSalary: "Rp 12.000.000 - Rp 18.000.000",
    aiScore: 88,
    screeningScore: 91,
    docScore: 88,
    skillScore: 85,
    appliedJob: "Data Scientist",
    appliedDate: "2026-03-14",
    status: "contacted",
    avatar: "SR",
    summary:
      "Data Scientist muda yang passionate dengan AI/ML. Memiliki pengalaman internship di startup teknologi dan telah menyelesaikan 3 proyek data science yang dipublikasikan di GitHub. Aktif berkontribusi di komunitas open-source.",
    portfolio: "https://github.com/sitirahma",
    cv: "https://drive.google.com/siti-cv.pdf",
    lastActive: "1 hari lalu",
  },
  {
    id: "c3",
    name: "Budi Santoso",
    email: "budi.santoso@yahoo.com",
    phone: "+62 857-1234-5678",
    location: "Jakarta",
    education: "S2",
    major: "Manajemen Teknologi",
    experience: "5-10 tahun",
    skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership", "Figma"],
    desiredRole: "Product Manager",
    desiredSalary: "Rp 20.000.000 - Rp 30.000.000",
    aiScore: 85,
    screeningScore: 87,
    docScore: 93,
    skillScore: 82,
    appliedJob: "Product Manager",
    appliedDate: "2026-03-13",
    status: "interview",
    avatar: "BS",
    summary:
      "Product Manager senior dengan 7 tahun pengalaman di industri teknologi. Berhasil meluncurkan 5 produk dengan total pengguna lebih dari 2 juta. Expert dalam product discovery, roadmap planning, dan cross-functional collaboration.",
    portfolio: "https://budisantoso.notion.site",
    cv: "https://drive.google.com/budi-cv.pdf",
    lastActive: "3 jam lalu",
  },
  {
    id: "c4",
    name: "Dewi Kartika",
    email: "dewi.kartika@gmail.com",
    phone: "+62 813-8765-4321",
    location: "Yogyakarta",
    education: "S1",
    major: "Desain Komunikasi Visual",
    experience: "1-2 tahun",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Illustration"],
    desiredRole: "UI/UX Designer",
    desiredSalary: "Rp 8.000.000 - Rp 14.000.000",
    aiScore: 82,
    screeningScore: 84,
    docScore: 90,
    skillScore: 78,
    appliedJob: "UI/UX Designer",
    appliedDate: "2026-03-12",
    status: "new",
    avatar: "DK",
    summary:
      "UI/UX Designer kreatif dengan portofolio desain yang kuat. Spesialisasi dalam desain mobile-first dan pengalaman pengguna yang intuitif. Pernah magang di 2 perusahaan startup dan mengerjakan proyek freelance untuk klien internasional.",
    portfolio: "https://dewikartika.design",
    cv: "https://drive.google.com/dewi-cv.pdf",
    lastActive: "5 jam lalu",
  },
  {
    id: "c5",
    name: "Rizky Firmansyah",
    email: "rizky.f@gmail.com",
    phone: "+62 878-5555-6666",
    location: "Surabaya",
    education: "S1",
    major: "Teknik Komputer",
    experience: "3-5 tahun",
    skills: ["Go", "Microservices", "Kubernetes", "Redis", "gRPC"],
    desiredRole: "Backend Developer",
    desiredSalary: "Rp 14.000.000 - Rp 20.000.000",
    aiScore: 90,
    screeningScore: 93,
    docScore: 85,
    skillScore: 92,
    appliedJob: "Backend Developer",
    appliedDate: "2026-03-11",
    status: "hired",
    avatar: "RF",
    summary:
      "Backend Developer spesialis Go dengan pengalaman membangun sistem microservices skala besar yang menangani jutaan request per hari. Terbiasa dengan high-availability architecture dan distributed systems.",
    portfolio: "https://github.com/rizkyfirman",
    cv: "https://drive.google.com/rizky-cv.pdf",
    lastActive: "Baru saja",
  },
  {
    id: "c6",
    name: "Maya Anggraini",
    email: "maya.anggraini@gmail.com",
    phone: "+62 856-7777-8888",
    location: "Jakarta",
    education: "S1",
    major: "Ilmu Komputer",
    experience: "< 1 tahun",
    skills: ["Python", "Java", "SQL", "Git", "Linux"],
    desiredRole: "Software Engineer",
    desiredSalary: "Rp 8.000.000 - Rp 12.000.000",
    aiScore: 79,
    screeningScore: 82,
    docScore: 78,
    skillScore: 75,
    appliedJob: "Software Engineer",
    appliedDate: "2026-03-10",
    status: "new",
    avatar: "MA",
    summary:
      "Fresh graduate Ilmu Komputer dengan IPK 3.8/4.0. Aktif mengembangkan proyek open-source dan pemenang lomba hackathon regional. Sangat antusias dalam belajar teknologi baru dan siap berkontribusi dalam tim.",
    portfolio: "https://github.com/mayaanggraini",
    cv: "https://drive.google.com/maya-cv.pdf",
    lastActive: "1 jam lalu",
  },
];

export interface CompanyJobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  candidates: number;
  newCandidates: number;
  status: "active" | "closed" | "draft";
  postedDate: string;
  deadline: string;
}

export const mockJobPostings: CompanyJobPosting[] = [
  {
    id: "j1",
    title: "Software Engineer",
    department: "Engineering",
    location: "Jakarta",
    type: "Full-time",
    salary: "Rp 12.000.000 - Rp 18.000.000",
    candidates: 24,
    newCandidates: 8,
    status: "active",
    postedDate: "2026-03-01",
    deadline: "2026-04-01",
  },
  {
    id: "j2",
    title: "Data Scientist",
    department: "Data & Analytics",
    location: "Remote",
    type: "Full-time",
    salary: "Rp 15.000.000 - Rp 22.000.000",
    candidates: 15,
    newCandidates: 3,
    status: "active",
    postedDate: "2026-03-05",
    deadline: "2026-04-05",
  },
  {
    id: "j3",
    title: "Product Manager",
    department: "Product",
    location: "Jakarta",
    type: "Full-time",
    salary: "Rp 18.000.000 - Rp 25.000.000",
    candidates: 9,
    newCandidates: 2,
    status: "active",
    postedDate: "2026-03-08",
    deadline: "2026-03-31",
  },
  {
    id: "j4",
    title: "UI/UX Designer",
    department: "Design",
    location: "Hybrid",
    type: "Full-time",
    salary: "Rp 8.000.000 - Rp 14.000.000",
    candidates: 31,
    newCandidates: 0,
    status: "closed",
    postedDate: "2026-02-10",
    deadline: "2026-03-10",
  },
];

export interface ActivityLog {
  id: string;
  type: "contact" | "interview" | "hired" | "rejected" | "new_candidate";
  candidateName: string;
  message: string;
  time: string;
}

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "a1",
    type: "new_candidate",
    candidateName: "Andi Pratama",
    message: "Kandidat baru lolos screening AI untuk posisi Software Engineer",
    time: "2 jam lalu",
  },
  {
    id: "a2",
    type: "contact",
    candidateName: "Siti Rahmawati",
    message: "Email undangan dikirimkan ke kandidat untuk diskusi awal",
    time: "1 hari lalu",
  },
  {
    id: "a3",
    type: "interview",
    candidateName: "Budi Santoso",
    message: "Jadwal wawancara dikonfirmasi untuk 20 Maret 2026 pukul 10:00",
    time: "2 hari lalu",
  },
  {
    id: "a4",
    type: "hired",
    candidateName: "Rizky Firmansyah",
    message: "Kandidat menerima tawaran kerja sebagai Backend Developer",
    time: "5 hari lalu",
  },
  {
    id: "a5",
    type: "new_candidate",
    candidateName: "Maya Anggraini",
    message: "Kandidat baru lolos screening AI untuk posisi Software Engineer",
    time: "6 hari lalu",
  },
];
