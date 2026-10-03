import { siteConfig } from "../config/site";

export const projects = [
  {
    id: "zenscore",
    title: "ZenScore AI",
    featured: true,
    categories: ["AI", "Full-Stack", "EdTech"],
    tagline: "AI-powered academic & career intelligence ecosystem for engineering students.",
    description:
      "A comprehensive student intelligence ecosystem designed to help engineering students predict exam performance, master computer science roadmaps with personalized AI tutoring, build ATS-optimized resumes, and land verified college placements.",
    features: [
      "Predictive CGPA & Academic Analytics with internal marks tracking",
      "AI Tutor & Concept Coach for interactive 1-on-1 concept breakdowns",
      "ATS Resume Checker with instant placement readiness indexing",
      "Branch-specific skill roadmaps & curated masterclass curricula",
      "Verified job and internship drive notifications & match scores",
      "Focus sessions & productivity task ecosystem tailored for students",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Firebase", "OpenAI / LLM"],
    github: siteConfig.projects.zenscore.github,
    live: siteConfig.projects.zenscore.live,
    logo: "/logos/zenscore.svg",
    color: "#06b6d4",
    accentColor: "#0891b2",
    architecture: [
      { label: "Frontend", value: "React + Vite SPA" },
      { label: "API Layer", value: "Node.js + Express REST API" },
      { label: "Database", value: "MongoDB Document Store" },
      { label: "Auth & Security", value: "Firebase Authentication" },
      { label: "AI Engine", value: "OpenAI GPT-4o Integration" },
      { label: "Deployment", value: "Vercel Edge Network" },
    ],
    problem:
      "Engineering students juggle semester academics, coding prep, and placements across dozens of fragmented websites with zero centralized visibility into their actual placement readiness.",
    solution:
      "A unified, AI-driven command center that turns scattered academic metrics into clear performance predictions, actionable study roadmaps, and interview-ready resumes.",
    challenges: [
      "Designing multi-source data aggregation without degrading dashboard render speeds",
      "Structuring prompt flows for the AI tutor to give pedagogy-first answers rather than generic summaries",
      "Building a mobile-optimized responsive layout for students on smartphones",
    ],
    learned: [
      "Architecting scalable full-stack web applications with React, Express & MongoDB",
      "LLM orchestration, prompt engineering & token optimization strategies",
      "Implementing production Firebase authentication and session management",
    ],
  },
  {
    id: "projvanta",
    title: "ProjVanta",
    featured: false,
    categories: ["Mentorship", "Full-Stack", "EdTech"],
    tagline: "From rough syllabus prompt to working, documented, viva-ready B.Tech software project.",
    description:
      "An end-to-end academic software engineering and project mentorship platform for Indian B.Tech engineering students (CSE, IT, AI & ML). Projvanta empowers students to turn classroom ideas and syllabus requirements into working codebases, college-format IEEE project reports, review PPT presentations, and viva defense guides.",
    features: [
      "Production-ready working codebases across AI/ML, Full-Stack Web & Blockchain",
      "University-format IEEE project documentation, architecture diagrams & UML specs",
      "Rigorous viva preparation question banks & concept defense master notes",
      "College review-ready presentation PPT decks customized per team",
      "1-click live cloud deployment support (Vercel, Render) with working examiner URLs",
      "Curated engineering project catalog with difficulty tags & syllabus alignment",
    ],
    tech: ["React", "Framer Motion", "Tailwind CSS", "Radix UI", "Vercel Edge"],
    github: siteConfig.projects.projvanta.github,
    live: siteConfig.projects.projvanta.live,
    logo: "/logos/projvanta.svg",
    color: "#8b5cf6",
    accentColor: "#7c3aed",
    architecture: [
      { label: "Frontend", value: "React + Vite + Modern JavaScript" },
      { label: "UI Primitives", value: "Radix UI Accessible Components" },
      { label: "Styling", value: "Tailwind CSS Design System" },
      { label: "Micro-Interactions", value: "Framer Motion Animations" },
      { label: "Hosting", value: "Vercel Edge Infrastructure" },
    ],
    problem:
      "B.Tech engineering students frequently face rejection from college review panels due to broken code, unformatted reports, and lack of viva preparation for examiner questioning.",
    solution:
      "An all-in-one mentorship platform that delivers clean working software, IEEE-compliant reports, presentation decks, and viva defense coaching — turning submission anxiety into high grades.",
    challenges: [
      "Standardizing flexible documentation templates across different university guidelines",
      "Building a dynamic project catalog with multi-domain filtering (AI, Web, IoT, Security)",
      "Optimizing rich animation performance with zero layout shift on mobile devices",
    ],
    learned: [
      "Accessible component composition using Radix UI and Tailwind CSS",
      "High-performance stateful animation workflows with Framer Motion",
      "Real-world empathy for student developer challenges in academic project lifecycles",
    ],
  },
  {
    id: "blockchain",
    title: "Decentralized Cloud Storage",
    featured: false,
    categories: ["Blockchain", "Cloud", "Cryptography"],
    tagline: "Blockchain-driven decentralized storage with client-side AES-256 and IPFS.",
    description:
      "A published academic research project demonstrating a secure, decentralized alternative to centralized cloud storage. The system enforces client-side AES-256 encryption, fragments and stores file blocks on the IPFS distributed network, and records cryptographic hashes on a blockchain ledger for tamper-evident data integrity.",
    features: [
      "Zero-knowledge AES-256 client-side encryption before files leave the device",
      "Content-addressed distributed block storage powered by IPFS network",
      "Blockchain-based cryptographic hash ledger for immutable integrity audits",
      "Decentralized peer-to-peer architecture eliminating single points of failure",
      "Decryption pipeline with verified proof-of-authenticity upon retrieval",
    ],
    tech: ["Django", "Web3.py", "Blockchain", "IPFS", "AES-256", "Python"],
    github: siteConfig.projects.blockchain.github,
    live: siteConfig.projects.blockchain.live,
    logo: "/logos/blockchain.svg",
    color: "#10b981",
    accentColor: "#059669",
    isResearch: true,
    workflow: [
      "File Upload",
      "AES-256 Encryption",
      "Block Chunking",
      "IPFS Distribution",
      "Hash Generation",
      "Blockchain Ledger",
      "Integrity Verification",
      "Secure Retrieval",
    ],
    architecture: [
      { label: "Client Application", value: "Python Web / Django Interface" },
      { label: "Encryption Engine", value: "PyCryptodome AES-256 CBC" },
      { label: "Distributed Storage", value: "IPFS Daemon / Content Nodes" },
      { label: "Verification Layer", value: "Ethereum / Web3.py Smart Contracts" },
      { label: "Backend Service", value: "Django REST Framework" },
    ],
    problem:
      "Centralized cloud storage providers (AWS S3, Google Drive) represent single points of compromise, control data access, and expose sensitive user files to unauthorized tampering and outages.",
    solution:
      "A decentralized architecture coupling AES-256 encryption with IPFS distributed storage and blockchain immutable proof-of-storage — ensuring data remains private, persistent, and mathematically verifiable.",
    challenges: [
      "Integrating asynchronous IPFS daemon nodes with synchronous Django request pipelines",
      "Handling large file chunking and block reconstruction without exhausting server memory",
      "Writing and executing smart contracts for gas-efficient integrity hash storage",
    ],
    learned: [
      "Deep cryptographic principles of symmetric AES encryption and key derivation",
      "Distributed content-addressed networking with IPFS and Web3.py",
      "Academic paper methodology, peer review rigor, and publication with IJARSCT",
    ],
    publication: {
      title: "A Novel Blockchain-Driven Approach for Decentralized Cloud Storage",
      journal: "IJARSCT (International Journal of Advanced Research in Science, Communication and Technology)",
      paperId: "IJARSCT-2026-25880",
    },
  },
];
