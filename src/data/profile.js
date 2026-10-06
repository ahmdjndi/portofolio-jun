/* ============================================================
   SATU-SATUNYA FILE UNTUK MENGUBAH KONTEN PORTFOLIO
   Ganti semua nilai di bawah ini sesuai datamu.
   ============================================================ */

export const profile = {
  name: 'Ahmad Junaidi',
  initials: 'AJ',
  role: 'IT Edu Student',
  // Kalimat pembuka besar di hero (baris kedua diketik sendiri)
  heroLead: 'Tangible Words',
  heroLines: [
    'Build The Future',
    'Make It Work',
    'Night Owls Code',
  ],
  headline:
    'Dimulai dari rasa penasaran, berkembang menjadi passion. Aku membangun pengalaman digital yang tidak hanya terlihat bagus, tapi juga terasa bermakna bagi penggunanya.',
  // Teks yang diketik bergantian di hero
  roles: [
    'Junior Developer',
    'Tech Enthusiast',
    'UI Engineer',
    'Problem Solver',
  ],
  tagline:
    'Membangun antarmuka digital yang tenang, cepat, dan terasa hidup — satu piksel demi satu bintang.',
  location: 'Indonesia · Remote Friendly',
  email: 'ahmadjunaidi@example.com',
  // Letakkan file fotomu di folder /public lalu isi: '/profile.jpg'
  photo: '/Foto%20Saya.png',
  availability: 'Terbuka untuk magang & kolaborasi',
}

/* Widget "Daily Rotation" di hero */
export const dailyRotation = {
  label: 'Curated playlist',
  title: 'Daily Rotation',
  current: 'Sesi Potret',
  artist: 'Ari Lesmana',
  url: 'https://open.spotify.com/',
  tracks: [
    { name: 'Sesi Potret', artist: 'Ari Lesmana', audio: '/Ari%20Lesmana%20-%20Sesi%20Potret.mp3', cover: '/Sesi%20Potret.jpg' },
    { name: 'Perfect', artist: 'Ed Sheeran', audio: '/Ed%20Sheeran%20-%20Perfect.mp3', cover: '/Perfect.jpg' },
    { name: 'Serana', artist: 'For Revenge', audio: '/For%20Revenge%20-%20Serana.mp3', cover: '/Serana.jpg' },
    { name: 'Jangan Paksa Rindu', artist: 'Ifan Seventeen', audio: '/Ifan%20Seventeen%20-%20Jangan%20Paksa%20Rindu.mp3', cover: '/Jangan%20Paksa%20Rindu.jpg' },
    { name: 'kota ini tak sama tanpamu', artist: 'Nadhif Basalamah', audio: '/Nadhif%20Basalamah%20-%20kota%20ini%20tak%20sama%20tanpamu.mp3', cover: '/kota%20ini%20tak%20sama%20tanpamu.jpg' },
  ],
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

export const socials = [
  { name: 'GitHub', url: 'https://github.com', handle: '@ahmadjunaidi' },
  { name: 'LinkedIn', url: 'https://linkedin.com', handle: '/in/ahmadjunaidi' },
  { name: 'Instagram', url: 'https://instagram.com', handle: '@ahmadjunaidi' },
  {
    name: 'Email',
    url: 'mailto:ahmadjunaidi@example.com',
    handle: 'ahmadjunaidi@example.com',
  },
]

export const stats = [
  { label: 'Projects', value: 24, suffix: '+' },
  { label: 'Certificates', value: 12, suffix: '' },
  { label: 'Commits', value: 1480, suffix: '+' },
  { label: 'Pengalaman', value: 4, suffix: ' Thn' },
]

export const about = {
  paragraphs: [
    'Halo! Saya anak teknologi yang jatuh cinta sama kode, antarmuka, dan semua hal yang berputar di orbit. Mulai dari yang paling sederhana — satu halaman web statis — lalu naik perlahan sampai ke sistem yang lebih serius.',
    'Saya percaya kode yang baik itu yang mudah dibaca, terukur, dan tetap nyaman dibaca orang lain enam bulan kemudian. Kalau butuh satu hari hanya untuk debugging, lebih baik saya tulis ulang lima menitnya.',
    'Di luar layar, saya suka melirik langit malam, reinstall Linux, dan ngoprek perangkat kecil yang sebenarnya tidak ada yang butuh.',
  ],
  education: [
  {
    year: '2012 — 2018',
    title: 'MI Darul Ulum Ranupakis',
    org: 'Mengikuti Kelas Tahfid',
    logo: '/Logo-mi.png',
    detail: '...',
  },
  {
    year: '2018 — 2021',
    title: 'Mts Darul Ulum Ranupakis',
    org: 'Al-Banjari Tingkat Nasional',
    logo: '/Logo-mi.png',
    detail: '...',
  },
  {
    year: '2021 — 2024',
    title: 'SMK Negeri Klakah',
    org: 'Multimedia',
    logo: '/Logo-smk.png',
    detail: '...',
  },
  {
    year: '2024 — 2027',
    title: 'Politeknik Negeri Malang',
    org: 'Teknologi Informasi',
    logo: '/Logo-polinema.png',
    detail: '...',
  },
],
  experience: [
  {
    period: '2025 — 2026',
    org: 'Google Developer Groups (GDGs) on Campus Brawijaya University',
    role: 'Member',
    logo: '/logos/gdgoc.png',
  },
  {
    period: '2025 — 2026',
    org: 'Raion Internship',
    role: 'UI/UX Designer',
    logo: '/logos/raion.png',
  },
  {
    period: '2025 — 2026',
    org: 'Google Developer Groups (GDGs) on Campus Brawijaya University',
    role: 'Member',
    logo: '/logos/gdgoc.png',
  },
  {
    period: '2025 — 2026',
    org: 'Raion Internship',
    role: 'UI/UX Designer',
    logo: '/logos/raion.png',
  },
],
}

export const projects = [
  {
    title: 'Nebula Dashboard',
    category: 'Web App',
    year: '2025',
    description:
      'Dashboard analitik realtime dengan visualisasi data, dark mode, dan dukungan offline.',
    tags: ['React', 'Tailwind', 'Chart.js'],
    color: '#2c67ed',
  },
  {
    title: 'Orbit E-Commerce',
    category: 'Fullstack',
    year: '2024',
    description:
      'Toko online sederhana dengan keranjang belanja, pembayaran, dan admin panel.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    color: '#5b8cff',
  },
  {
    title: 'Starfield Shader',
    category: 'Creative Coding',
    year: '2024',
    description:
      'Eksperimen WebGL starfield dengan parallax dan reaksi mouse yang halus.',
    tags: ['Three.js', 'GLSL'],
    color: '#1b47ad',
  },
  {
    title: 'Comet Notes',
    category: 'Productivity',
    year: '2023',
    description:
      'Aplikasi catatan markdown dengan pencarian instan dan sinkronisasi lintas perangkat.',
    tags: ['React', 'Vite', 'LocalDB'],
    color: '#5b8cff',
  },
  {
    title: 'Meteor API',
    category: 'Backend',
    year: '2023',
    description:
      'REST API untuk service berita dengan rate limiting, token auth, dan dokumentasi otomatis.',
    tags: ['Express', 'JWT', 'Redis'],
    color: '#2c67ed',
  },
  {
    title: 'Lunar Portfolio v2',
    category: 'Website',
    year: '2025',
    description:
      'Portfolio bertema luar angkasa dengan animasi dan performa ringan — sebenarnya file ini.',
    tags: ['Vite', 'Framer Motion', 'Tailwind'],
    color: '#1b47ad',
  },
]

export const certificates = [
  {
    id: "cert-01",
    image: "/Certificate 1.jpg",
  },
  {
    id: "cert-02",
    title: "Sertifikat Kompetensi",
    issuer: "Institut Teknologi",
    year: "2026",
    image: "/Certificate 2.jpg",
  },
  {
    id: "cert-03",
    title: "Sertifikat Kompetensi Kelulusan",
    issuer: "Dicoding Indonesia",
    year: "2026",
    image: "/Certificate 3.jpg",
  },
  {
    id: "cert-04",
    title: "Sertifikat Kompetensi",
    issuer: "Dicoding Indonesia",
    year: "2026",
    image: "/Certificate 4.jpg",
  },
  {
    id: "cert-05",
    title: "Sertifikat Kompetensi",
    issuer: "Dicoding Indonesia",
    year: "2026",
    image: "/Certificate 5.jpg",
  },
  {
    id: "cert-06",
    title: "Sertifikat Kompetensi",
    issuer: "Dicoding Indonesia",
    year: "2026",
    image: "/Certificate 6.jpg",
  },
];

export const techStack = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/ffffff' },
  { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
  { name: 'GSAP', icon: 'https://cdn.simpleicons.org/greensock/88CE02' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'Git & GitHub', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
]
