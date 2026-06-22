export const personalInfo = {
  name: 'Wahyu',
  fullName: 'Wahyu — Full-Stack Developer',
  tagline: 'Full-Stack Web & Mobile Developer',
  subTagline:
    'Mahasiswa Teknik Informatika Tingkat Akhir · Web Developer Intern · IT Support Intern',
  description:
    'Saya membangun sistem digital dari nol — mulai dari arsitektur backend yang kokoh hingga antarmuka pengguna yang intuitif. Fokus saya adalah menciptakan solusi teknologi yang skalabel, efisien, dan memberikan dampak nyata bagi pengguna.',
  university: 'Institut Teknologi Adhi Tama Surabaya (ITATS)',
  major: 'Teknik Informatika',
  email: 'wahyurizam20@gmail.com',
  formspreeId: 'mojzkpak',
  github: 'https://github.com/Akbarrizam',
  linkedin: 'https://linkedin.com/in/wahyu',
  cvUrl: '/CV',
};

// ============================================================
// SKILL LEVELS (0–100)
// ============================================================
export const skillCategories = [
  {
    category: 'Frontend',
    icon: '⬡',
    color: '#38BDF8',
    skills: [
      { name: 'React JS', level: 85 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML5 / CSS3', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    category: 'Backend & Mobile',
    icon: '◈',
    color: '#818CF8',
    skills: [
      { name: 'Laravel / PHP', level: 82 },
      { name: 'Flutter', level: 75 },
      { name: 'REST API', level: 80 },
      { name: 'Node.js', level: 60 },
    ],
  },
  {
    category: 'Database & Tools',
    icon: '◎',
    color: '#A78BFA',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'Figma', level: 72 },
      { name: 'Postman', level: 78 },
    ],
  },
];

// Keep old format for About tech cards
export const techStack = [
  {
    category: 'Frontend',
    categoryEn: 'Frontend',
    icon: '⬡',
    skills: ['React JS', 'TypeScript', 'HTML5 / CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Mobile',
    categoryEn: 'Backend & Mobile',
    icon: '◈',
    skills: ['Laravel', 'Flutter', 'PHP', 'REST API'],
  },
  {
    category: 'Database & Tools',
    categoryEn: 'Database & Tools',
    icon: '◎',
    skills: ['MySQL', 'Git / GitHub', 'Postman', 'Figma'],
  },
  {
    category: 'Organisasi & Komunitas',
    categoryEn: 'Organization & Community',
    icon: '◇',
    skills: ['Google Developer Group on Campus', 'Kepemimpinan Teknis', 'Kolaborasi Tim', 'Mentoring'],
    skillsEn: ['Google Developer Group on Campus', 'Technical Leadership', 'Team Collaboration', 'Mentoring'],
  },
];

// ============================================================
// PROJECTS (with screenshot & github link)
// ============================================================
export const projects = [
  {
    id: 1,
    title: 'FinTrack PWA',
    subtitle: 'Aplikasi Manajemen Keuangan Progressive Web App',
    subtitleEn: 'Progressive Web App Finance Management Application',
    description:
      'Platform manajemen keuangan berbasis PWA yang memungkinkan pengguna melacak pengeluaran, pendapatan, dan laporan keuangan secara real-time. Didesain dengan pendekatan offline-first untuk performa optimal di berbagai kondisi jaringan.',
    descriptionEn:
      'PWA-based finance management platform that allows users to track expenses, income, and financial reports in real-time. Designed with an offline-first approach for optimal performance across various network conditions.',
    badges: ['HTML5', 'CSS3', 'JavaScript', 'PWA'],
    highlights: ['Offline-first architecture', 'Real-time sync', 'Responsive UI'],
    highlightsEn: ['Offline-first architecture', 'Real-time sync', 'Responsive UI'],
    color: 'from-sky-500/20 to-blue-600/10',
    accentColor: '#38BDF8',
    screenshot: '/fintrack.png',
    githubUrl: 'https://github.com/Akbarrizam/DompetkuApp',
    demoUrl: 'https://akbarrizam.github.io/DompetkuApp/',
    docUrl: '#',
  },
  {
    id: 2,
    title: 'RS Budi Asih Trenggalek',
    subtitle: 'Website Profil & Pelayanan Kesehatan Terpercaya',
    subtitleEn: 'Official Profile & Trusted Healthcare Services Website',
    description:
      'Website profil resmi Rumah Sakit Budi Asih Trenggalek yang menyajikan informasi fasilitas medis, dokter spesialis, jadwal poli, dan layanan kesehatan 24 jam untuk memudahkan akses informasi bagi masyarakat.',
    descriptionEn:
      'Official profile website of Budi Asih Trenggalek Hospital presenting information on medical facilities, specialist doctors, clinic schedules, and 24-hour healthcare services to facilitate information access for the community.',
    badges: ['React', 'Tailwind CSS', 'Vite', 'PWA'],
    highlights: ['UGD 24 Jam', 'Poli Spesialis', 'Fasilitas Modern'],
    highlightsEn: ['24h Emergency', 'Specialist Clinics', 'Modern Facilities'],
    color: 'from-teal-500/20 to-cyan-600/10',
    accentColor: '#14B8A6',
    screenshot: '/rsba.webp',
    githubUrl: 'https://github.com/Akbarrizam/WebsitePortofolioRSBA',
    demoUrl: 'https://website-portofolio-rsba.vercel.app/',
    docUrl: '#',
  },
];

// ============================================================
// EXPERIENCE
// ============================================================
export const experiences = [
  {
    id: 1,
    role: 'Web & Mobile Developer',
    roleEn: 'Web & Mobile Developer',
    company: 'Project / Freelance',
    companyEn: 'Project / Freelance',
    period: '2023 — Sekarang',
    periodEn: '2023 — Present',
    type: 'Development',
    points: [
      'Mengembangkan aplikasi web dan mobile end-to-end menggunakan React JS, Laravel, dan Flutter.',
      'Merancang skema database yang efisien dan mengimplementasikan REST API yang terstruktur.',
      'Menerapkan standar clean code, version control (Git), dan prinsip UI/UX modern.',
    ],
    pointsEn: [
      'Developing end-to-end web and mobile applications using React JS, Laravel, and Flutter.',
      'Designing efficient database schemas and implementing structured REST APIs.',
      'Applying clean code standards, version control (Git), and modern UI/UX principles.',
    ],
  },
  {
    id: 2,
    role: 'IT Support Intern',
    roleEn: 'IT Support Intern',
    company: 'Perusahaan / Institusi',
    companyEn: 'Company / Institution',
    period: '2023',
    periodEn: '2023',
    type: 'Operations',
    points: [
      'Bertanggung jawab atas pemeliharaan infrastruktur IT operasional perusahaan.',
      'Menangani troubleshooting hardware/software dengan waktu respons cepat untuk meminimalkan downtime.',
      'Mendokumentasikan prosedur teknis dan mendukung transisi sistem bagi pengguna non-teknis.',
    ],
    pointsEn: [
      'Responsible for company operational IT infrastructure maintenance.',
      'Handling hardware/software troubleshooting with fast response times to minimize downtime.',
      'Documenting technical procedures and supporting system transitions for non-technical users.',
    ],
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonials = [
  {
    id: 1,
    name: 'Dr. Budi Santoso, S.Kom., M.T.',
    role: 'Dosen Pembimbing',
    roleEn: 'Academic Supervisor',
    company: 'ITATS — Teknik Informatika',
    avatar: 'BS',
    avatarColor: '#38BDF8',
    text: 'Wahyu menunjukkan dedikasi dan kemampuan teknis yang luar biasa dalam pengerjaan proyek tugas akhirnya. Penguasaannya terhadap teknologi web modern dan kemampuan problem-solving-nya sangat menonjol di antara mahasiswa seangkatannya.',
    textEn: 'Wahyu demonstrated exceptional dedication and technical skills in his final project. His mastery of modern web technologies and problem-solving ability truly stood out among his peers.',
  },
  {
    id: 2,
    name: 'Rian Putra',
    role: 'Tech Lead',
    roleEn: 'Tech Lead',
    company: 'Startup — Surabaya',
    avatar: 'RP',
    avatarColor: '#818CF8',
    text: 'Wahyu adalah developer yang sangat solid. Kode yang ia tulis bersih, terstruktur, dan selalu disertai dokumentasi yang baik. Ia mampu bekerja secara mandiri maupun dalam tim, dan selalu deliver tepat waktu bahkan dalam situasi deadline yang ketat.',
    textEn: "Wahyu is a very solid developer. The code he writes is clean, structured, and always well-documented. He can work independently or in a team, and always delivers on time even under tight deadlines.",
  },
  {
    id: 3,
    name: 'Sari Dewi',
    role: 'Pemilik UMKM',
    roleEn: 'Small Business Owner',
    company: 'Klien Freelance',
    companyEn: 'Freelance Client',
    avatar: 'SD',
    avatarColor: '#34D399',
    text: 'Aplikasi kasir yang Wahyu bangunkan untuk toko saya benar-benar mengubah cara saya mengelola bisnis. Tampilannya mudah digunakan, dan setiap kali ada pertanyaan, ia selalu responsif dan sabar menjelaskan. Sangat profesional!',
    textEn: 'The cashier app Wahyu built for my store truly changed how I manage my business. The interface is easy to use, and whenever I had questions, he was always responsive and patient. Very professional!',
  },
];

export const certificates = [
  {
    id: 1,
    title: 'Google Student Ambassador',
    titleEn: 'Google Student Ambassador',
    subtitle: 'Google Student Ambassador Program',
    subtitleEn: 'Google Student Ambassador Program',
    issuer: 'Google',
    year: '2025',
    color: '#4285F4',
    verifyUrl: '#',
    badge: 'Ambassador',
    certFile: '/certificates/GSA_2025.jpg',
  },
  {
    id: 2,
    title: 'Intro to Software Engineering',
    titleEn: 'Intro to Software Engineering',
    subtitle: 'Coding Camp',
    subtitleEn: 'Coding Camp',
    issuer: 'RevoU',
    year: '2025',
    color: '#F5C800',
    verifyUrl: '#',
    badge: 'Software Engineering',
    certFile: '/certificates/RevoU.jpg',
  },
  {
    id: 3,
    title: 'Memulai Pemrograman Dengan Javascript',
    titleEn: 'Getting Started with Javascript Programming',
    subtitle: 'Bootcamp',
    subtitleEn: 'Bootcamp',
    issuer: 'Dicoding',
    year: '2025',
    color: '#2D3E52',
    verifyUrl: '#',
    badge: 'Javascript',
    certFile: '/certificates/Javascript.jpg',
  },
  {
    id: 4,
    title: 'Memulai Pemrograman Dengan Java',
    titleEn: 'Getting Started with Java Programming',
    subtitle: 'Bootcamp',
    subtitleEn: 'Bootcamp',
    issuer: 'Dicoding',
    year: '2025',
    color: '#2D3E52',
    verifyUrl: '#',
    badge: 'Java',
    certFile: '/certificates/Java.jpg',
  },
  {
    id: 5,
    title: 'Dasar Cloud dan Gen AI di AWS',
    titleEn: 'Cloud and Gen AI Basics on AWS',
    subtitle: 'Bootcamp',
    subtitleEn: 'Bootcamp',
    issuer: 'Dicoding x AWS',
    year: '2025',
    color: '#FF9900',
    verifyUrl: '#',
    badge: 'Cloud & Gen AI',
    certFile: '/certificates/AWS.jpg',
  },
  // Tambahkan sertifikat lain di sini
];



// ============================================================
// BLOG ARTICLES
// ============================================================
export const blogPosts = [
  {
    id: 1,
    slug: 'membangun-pwa-react',
    titleId: 'Membangun Progressive Web App dengan React & Service Worker',
    titleEn: 'Building a Progressive Web App with React & Service Worker',
    excerptId:
      'PWA memungkinkan aplikasi web berjalan layaknya aplikasi native. Dalam artikel ini saya membahas cara implementasi Service Worker, offline caching, dan Web App Manifest di atas React.',
    excerptEn:
      'PWAs allow web apps to run like native applications. In this article I discuss how to implement Service Workers, offline caching, and Web App Manifest on top of React.',
    contentId: [
      'Progressive Web App (PWA) adalah teknologi yang memungkinkan aplikasi web memberikan pengalaman yang kaya seperti aplikasi mobile native. Dengan menggunakan service worker, PWA dapat memuat konten secara offline, mengirimkan push notification, dan diinstal langsung di beranda perangkat pengguna tanpa melalui toko aplikasi.',
      'Dalam panduan ini, kita akan fokus pada implementasi Service Worker di atas aplikasi React. Service worker bertindak sebagai proxy jaringan antara aplikasi Anda dan internet. Ini memungkinkan kita untuk mendeteksi kapan perangkat kehilangan koneksi dan mengembalikan aset yang disimpan dalam cache lokal (caching offline).',
      'Langkah pertama adalah membuat file `service-worker.js` dan mendaftarkannya saat aplikasi React dimulai. Di sini, kita akan mendengarkan event `install`, `activate`, dan `fetch` untuk mengatur cache strategis (seperti cache-first atau network-first).',
      'Dengan menerapkan PWA, performa load time aplikasi Anda akan meningkat secara signifikan secara global, sekaligus memberikan fungsionalitas offline yang membuat pengguna tetap dapat berinteraksi dengan aplikasi meskipun jaringan buruk.'
    ],
    contentEn: [
      'Progressive Web Apps (PWAs) are technologies that allow web applications to deliver rich experiences similar to native mobile apps. Using service workers, PWAs can load content offline, send push notifications, and be installed directly on a user\'s home screen without going through an app store.',
      'In this guide, we will focus on implementing Service Workers on top of a React application. A service worker acts as a network proxy between your application and the internet. This allows us to detect when the device loses connection and return assets stored in the local cache (offline caching).',
      'The first step is creating a `service-worker.js` file and registering it when the React application starts. Here, we will listen to `install`, `activate`, and `fetch` events to manage cache strategies (such as cache-first or network-first).',
      'By implementing a PWA, your application\'s load time will improve significantly worldwide, while providing offline functionality that keeps users engaged even under poor network conditions.'
    ],
    category: 'React / PWA',
    categoryColor: '#38BDF8',
    readMin: 8,
    date: '2024-05-15',
    tags: ['React', 'PWA', 'Service Worker', 'Offline'],
    icon: '⚡',
  },
  {
    id: 2,
    slug: 'knn-klasifikasi-buah',
    titleId: 'Klasifikasi Gambar Buah dengan KNN & Analisis Warna HSV',
    titleEn: 'Fruit Image Classification with KNN & HSV Color Analysis',
    excerptId:
      'Bagaimana K-Nearest Neighbor dikombinasikan dengan ruang warna HSV untuk mendeteksi kematangan buah secara akurat? Artikel ini menjelaskan pipeline dari preprocessing gambar hingga deployment Flask API.',
    excerptEn:
      'How does K-Nearest Neighbor combined with HSV color space detect fruit ripeness accurately? This article explains the pipeline from image preprocessing to Flask API deployment.',
    contentId: [
      'Computer vision telah merevolusi cara mesin memahami dan berinteraksi dengan dunia fisik. Salah satu kasus penggunaan yang menarik adalah otomatisasi sortasi buah berdasarkan tingkat kematangannya. Pada artikel ini, kita akan membedah bagaimana algoritma K-Nearest Neighbor (KNN) berkolaborasi dengan analisis ruang warna HSV untuk mendeteksi tingkat kematangan buah secara akurat.',
      'Secara tradisional, gambar disimpan dalam ruang warna RGB. Namun, RGB sangat sensitif terhadap perubahan intensitas pencahayaan. Untuk analisis citra berbasis warna yang andal, kita mengonversi gambar ke ruang warna HSV (Hue, Saturation, Value). Hue mewakili warna murni, Saturation mewakili kemurnian warna, dan Value mewakili tingkat kecerahan.',
      'Setelah melakukan konversi HSV, kita mengekstrak fitur rata-rata warna dari buah. Fitur-fitur ini kemudian digunakan sebagai input untuk model KNN. KNN akan menghitung jarak Euclidean terdekat ke data training yang sudah diberi label (misalnya: Mentah, Setengah Matang, Matang).',
      'Untuk melakukan klasifikasi real-time, kita membungkus pipeline preprocessing OpenCV dan model inferensi KNN ke dalam sebuah Flask API sederhana. Ini memungkinkan aplikasi frontend (web atau mobile) untuk mengirimkan foto buah dan menerima klasifikasi kematangan secara instan.'
    ],
    contentEn: [
      'Computer vision has revolutionized how machines understand and interact with the physical world. One interesting use case is automating fruit sorting based on ripeness. In this article, we will dissect how the K-Nearest Neighbor (KNN) algorithm collaborates with HSV color space analysis to detect fruit ripeness accurately.',
      'Traditionally, images are stored in the RGB color space. However, RGB is highly sensitive to changes in lighting intensity. For reliable color-based image analysis, we convert images to the HSV (Hue, Saturation, Value) color space. Hue represents the pure color, Saturation represents color purity, and Value represents brightness.',
      'After performing the HSV conversion, we extract the average color features of the fruit. These features are then used as inputs for the KNN model. KNN calculates the closest Euclidean distance to labeled training data (e.g., Raw, Half-Ripe, Ripe).',
      'To perform real-time classification, we wrap the OpenCV preprocessing pipeline and the KNN inference model into a simple Flask API. This allows frontend applications (web or mobile) to upload a fruit photo and receive instant ripeness classification.'
    ],
    category: 'Machine Learning',
    categoryColor: '#34D399',
    readMin: 12,
    date: '2024-03-22',
    tags: ['Python', 'KNN', 'OpenCV', 'Flask'],
    icon: '🔬',
  },
  {
    id: 3,
    slug: 'clean-code-laravel',
    titleId: 'Panduan Clean Code & Repository Pattern di Laravel',
    titleEn: 'Clean Code & Repository Pattern Guide in Laravel',
    excerptId:
      'Menulis kode Laravel yang mudah dipelihara menggunakan Repository Pattern, Service Layer, dan prinsip SOLID. Disertai contoh kode nyata dari proyek yang saya kerjakan.',
    excerptEn:
      'Writing maintainable Laravel code using Repository Pattern, Service Layer, and SOLID principles. Includes real code examples from projects I have worked on.',
    contentId: [
      'Menulis kode yang berjalan dengan baik adalah langkah pertama, tetapi menulis kode yang mudah dipelihara dan dipahami adalah tanda seorang insinyur perangkat lunak profesional. Di ekosistem Laravel, menggabungkan Clean Code dengan Repository Pattern dan Service Layer adalah salah satu cara terbaik untuk mencapai tujuan ini.',
      'Repository Pattern bertindak sebagai abstraksi antara pengontrol (controller) Anda dan database (Eloquent ORM). Ini memisahkan logika query database dari logika bisnis utama, membuat pengujian unit (unit testing) jauh lebih mudah karena Anda dapat melakukan mock pada repository.',
      'Di sisi lain, Service Layer menampung logika bisnis kompleks Anda. Controller seharusnya hanya bertanggung jawab untuk menerima input, memanggil service yang sesuai, dan mengembalikan respon. Menghindari controller yang gemuk (fat controllers) adalah prinsip inti dari kode yang bersih.',
      'Dengan mengikuti pendekatan ini, Anda mematuhi prinsip SOLID, khususnya Single Responsibility Principle. Kode Anda menjadi modular, lebih mudah diuji, dan sangat dapat diperluas saat aplikasi tumbuh membesar.'
    ],
    contentEn: [
      'Writing code that works is the first step, but writing code that is easy to maintain and understand is the hallmark of a professional software engineer. In the Laravel ecosystem, combining Clean Code with the Repository Pattern and Service Layer is one of the best ways to achieve this.',
      'The Repository Pattern acts as an abstraction between your controllers and the database (Eloquent ORM). It decouples database query logic from the core business logic, making unit testing much easier since you can mock the repository.',
      'On the other hand, the Service Layer houses your complex business logic. Controllers should only be responsible for receiving input, calling the appropriate service, and returning responses. Avoiding fat controllers is a core tenant of clean coding.',
      'By following this approach, you adhere to SOLID principles, specifically the Single Responsibility Principle. Your code becomes modular, easier to test, and highly extensible as the application grows.'
    ],
    category: 'Laravel / Backend',
    categoryColor: '#F59E0B',
    readMin: 10,
    date: '2024-01-10',
    tags: ['Laravel', 'PHP', 'Clean Code', 'SOLID'],
    icon: '📐',
  },
];
