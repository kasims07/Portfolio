// ============================================================
// 📋 PORTFOLIO DATA — Single source of truth for all content
// ============================================================
// To update your portfolio, just edit this file!
// - Add a new skill? Add an object to the `skills` array.
// - New project? Add to `projects`.
// - New job? Add to `experiences`.
// No need to touch any component code.
// ============================================================

export const personalInfo = {
    firstName: "MOHMADKASAM",
    lastName: "KHIRA",
    displayName: "Mohmadkasam Khira",
    shortName: "Kasim",
    logoInitials: "MK",
    role: "Sr. Flutter Developer",
    yearsExperience: "3+",
    email: "mohmadkasamkhira@gmail.com",
    phone: "+91 6354012315",
    resumeFileName: "Mohmadkasam_Khira_Resume.pdf",
    availableForWork: true,
    heroTagline: "Available For Work ✨",
    heroSubtitle: "Sr. Flutter Developer | 3+ Years Experience",
    heroScrollText1: {
        text: "Building scalable <highlight>cross-platform</highlight> apps.",
        gradientColors: "from-blue-400 to-emerald-400",
    },
    heroScrollText2: {
        text: "Bridging Mobile Design and <highlight>Engineering.</highlight>",
        gradientColors: "from-purple-400 to-pink-400",
    },
    contactHeading: "Let's build something amazing together.",
    contactSubtext: "I'm currently open for new roles and freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
};

export const socialLinks = {
    linkedin: "https://linkedin.com", // ← Update with your real LinkedIn URL
    github: "https://github.com",     // ← Update with your real GitHub URL
};

export const navItems = [
    { label: "Experience", id: "experience", number: "01" },
    { label: "Skills", id: "skills", number: "02" },
    { label: "Projects", id: "projects", number: "03" },
    { label: "Contact", id: "contact", number: "04" },
];

// ============================================================
// 💼 EXPERIENCE — Add/remove jobs here
// ============================================================
export const experiences = [
    {
        role: "Sr Flutter Developer",
        company: "Zestbrains Pvt Ltd",
        period: "2024 - Present",
        description:
            "Developed and delivered a wide range of mobile applications across healthcare, e-commerce, social, and utility using Flutter for Android and iOS. Led app architecture design, API integration, payment gateways, and Firebase services. Mentored junior developers in clean code and best practices.",
        number: "01",
    },
    {
        role: "Flutter Developer",
        company: "KoolMind Technolab LLP",
        period: "2022 - 2024",
        description:
            "Developed 10+ production-level apps for Android and iOS using Bloc, Provider, and Riverpod. Integrated push notifications, REST APIs, and managed full app lifecycle on Play Store & App Store.",
        number: "02",
    },
    // To add a new experience, copy the object above and fill in your info:
    // {
    //     role: "Your Role",
    //     company: "Company Name",
    //     period: "20XX - 20XX",
    //     description: "What you did...",
    //     number: "03",
    // },
];

// ============================================================
// 🛠️ SKILLS — Add/remove skills here
// ============================================================
export const skills = [
    { name: "Flutter", level: 98, icon: "◆" },
    { name: "Dart", level: 95, icon: "◇" },
    { name: "Firebase", level: 90, icon: "△" },
    { name: "Bloc", level: 92, icon: "▣" },
    { name: "Provider", level: 88, icon: "○" },
    { name: "Riverpod", level: 85, icon: "◎" },
    { name: "GetX", level: 80, icon: "▲" },
    { name: "REST APIs", level: 95, icon: "⬡" },
    { name: "JavaScript", level: 82, icon: "⬢" },
    { name: "React", level: 78, icon: "◈" },
    { name: "Next.js", level: 72, icon: "⬟" },
    { name: "Figma", level: 75, icon: "□" },
    { name: "Play Store", level: 90, icon: "▶" },
    { name: "App Store", level: 88, icon: "●" },
    { name: "Push Notifs", level: 90, icon: "◉" },
    { name: "Payments", level: 85, icon: "◆" },
    // To add a new skill:
    // { name: "Skill Name", level: 80, icon: "★" },
];

// Stats shown below the skills grid
export const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Apps Delivered" },
    { value: String(skills.length), label: "Core Technologies" },
    { value: "1M+", label: "Users Served" },
];

// ============================================================
// 🚀 PROJECTS — Add/remove projects here
// ============================================================
export const projects = [
    {
        title: "HappyStories.io",
        category: "Social App",
        description:
            "A smart family album app to organize and share photos with AI-based image generation themes.",
        link: "https://play.google.com/store/apps/details?id=com.app.happyStories",
        number: "01",
        tech: ["Flutter", "Firebase", "AI/ML", "Cloud Storage"],
    },
    {
        title: "Yaadein",
        category: "Utility App",
        description:
            "Create memory videos for loved ones by collecting videos from people and managing them smoothly.",
        link: "https://play.google.com/store/apps/details?id=com.app.yaadein",
        number: "02",
        tech: ["Flutter", "Video Processing", "REST APIs"],
    },
    {
        title: "Votiamo",
        category: "Productivity",
        description:
            "An app for creating surveys and polls with end-to-end encryption and advanced filtering.",
        link: "https://play.google.com/store/apps/details?id=com.app.votiamo",
        number: "03",
        tech: ["Flutter", "Encryption", "Bloc", "Firebase"],
    },
    {
        title: "CrownHealthcareTz",
        category: "E-Commerce",
        description:
            "Mobile app for purchasing medical equipment online in Tanzania.",
        link: "https://play.google.com/store/apps/details?id=com.app.crownhealthcaretz",
        number: "04",
        tech: ["Flutter", "Payment Gateway", "REST APIs"],
    },
    {
        title: "Zolemate",
        category: "Social Media",
        description:
            "Indian social media app for creating reels, posts, and earning rewards.",
        link: "https://play.google.com/store/apps/details?id=com.zolemate_app&hl=en&gl=US",
        number: "05",
        tech: ["Flutter", "Video", "Social APIs", "GetX"],
    },
    {
        title: "Vconnect",
        category: "EdTech",
        description:
            "Chat and event management features for university students, teachers, and alumni.",
        link: "https://play.google.com/store/apps/details?id=com.vconnectapp.app",
        number: "06",
        tech: ["Flutter", "Chat SDK", "Firebase", "Provider"],
    },
    // To add a new project:
    // {
    //     title: "App Name",
    //     category: "Category",
    //     description: "What the app does...",
    //     link: "https://play.google.com/...",
    //     number: "07",
    //     tech: ["Flutter", "Firebase"],
    // },
];
