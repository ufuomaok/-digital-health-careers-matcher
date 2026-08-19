"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Database,
  Users,
  Activity,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

const pillars = [
  {
    id: "infrastructure",
    icon: Activity,
    label: "Infrastructure",
    description: "The Foundation — Connectivity, Hardware, Digital Maturity",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.06)",
    border: "rgba(14,165,233,0.2)",
    iconRgb: "14,165,233",
    roles: 20,
  },
  {
    id: "data",
    icon: Database,
    label: "Data & Analytics",
    description: "The Lifeblood — Information Flow, Standards, Governance",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.2)",
    iconRgb: "139,92,246",
    roles: 20,
  },
  {
    id: "leadership",
    icon: Users,
    label: "Leadership & Strategy",
    description: "The Compass — Direction, Governance, Transformation",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.2)",
    iconRgb: "245,158,11",
    roles: 18,
  },
  {
    id: "clinical",
    icon: Stethoscope,
    label: "Clinical Informatics",
    description: "The Bedside — Workflow, Usability, Clinical Safety",
    color: "#10b981",
    bg: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.2)",
    iconRgb: "16,185,129",
    roles: 20,
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Education & Training",
    description: "The Future — Skills, Adoption, Digital Literacy",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.06)",
    border: "rgba(244,63,94,0.2)",
    iconRgb: "244,63,94",
    roles: 18,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Tell us about your background",
    detail: "Whether you're a clinician, an IT professional, or completely new to healthcare — we tailor the results to you.",
  },
  {
    step: "02",
    title: "Select your skills",
    detail: "Pick from a structured list of 51 relevant skills. Include ones you're currently studying too.",
  },
  {
    step: "03",
    title: "Tell us what kind of work energises you",
    detail: "Technical problem-solving? Working with data? Leading teams? Your answer shapes which roles rise to the top.",
  },
  {
    step: "04",
    title: "Get your matched roles",
    detail: "We show your top 5 role matches with NHS band, salary range, skills gap and the certifications to get you there.",
  },
];

function DoodleBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.18 }}
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* ROW 1 */}

        {/* Laptop */}
        <g transform="translate(100,80) rotate(-8)">
          <rect x="-18" y="-14" width="36" height="22" rx="2"/>
          <path d="M-22,8 L22,8 L18,14 L-18,14 Z"/>
          <line x1="-8" y1="11" x2="-4" y2="11"/>
          <line x1="-1" y1="11" x2="3" y2="11"/>
          <line x1="6" y1="11" x2="10" y2="11"/>
        </g>

        {/* Code brackets */}
        <g transform="translate(340,65) rotate(5) scale(1.2)">
          <polyline points="8,-10 -5,0 8,10"/>
          <line x1="-3" y1="12" x2="3" y2="-12"/>
          <polyline points="-8,-10 5,0 -8,10"/>
        </g>

        {/* Database */}
        <g transform="translate(590,90) rotate(-3)">
          <ellipse cx="0" cy="-10" rx="14" ry="5"/>
          <line x1="-14" y1="-10" x2="-14" y2="8"/>
          <line x1="14" y1="-10" x2="14" y2="8"/>
          <path d="M-14,8 A14,5 0 0 0 14,8"/>
          <path d="M-14,-2 A14,5 0 0 0 14,-2"/>
        </g>

        {/* Stethoscope */}
        <g transform="translate(830,70) rotate(10)">
          <circle cx="0" cy="14" r="5"/>
          <path d="M-1,9 C-1,0 -15,0 -15,-10"/>
          <path d="M1,9 C1,0 15,0 15,-10"/>
          <line x1="-15" y1="-10" x2="-17" y2="-15"/>
          <line x1="15" y1="-10" x2="17" y2="-15"/>
        </g>

        {/* Graduation cap */}
        <g transform="translate(1065,85) rotate(-6)">
          <polygon points="0,-14 20,0 0,5 -20,0"/>
          <ellipse cx="0" cy="7" rx="11" ry="4"/>
          <line x1="18" y1="-2" x2="18" y2="8"/>
          <path d="M15,8 L18,12 L21,8"/>
        </g>

        {/* Bar chart */}
        <g transform="translate(1310,75) rotate(4)">
          <rect x="-16" y="-3" width="7" height="15" rx="1"/>
          <rect x="-6" y="-13" width="7" height="25" rx="1"/>
          <rect x="4" y="-7" width="7" height="19" rx="1"/>
          <line x1="-18" y1="12" x2="14" y2="12"/>
        </g>

        {/* ROW 2 */}

        {/* WiFi */}
        <g transform="translate(55,260) rotate(6)">
          <path d="M-18,3 A20,20 0 0 1 18,3"/>
          <path d="M-12,3 A13,13 0 0 1 12,3"/>
          <path d="M-6,3 A7,7 0 0 1 6,3"/>
          <circle cx="0" cy="3" r="2" fill="#0ea5e9"/>
        </g>

        {/* Briefcase */}
        <g transform="translate(295,245) rotate(-12)">
          <rect x="-15" y="-4" width="30" height="18" rx="2"/>
          <path d="M-7,-4 L-7,-9 L7,-9 L7,-4"/>
          <line x1="-15" y1="3" x2="15" y2="3"/>
        </g>

        {/* Cloud */}
        <g transform="translate(535,270) rotate(8)">
          <path d="M-18,6 C-18,-2 -11,-8 -3,-6 C-1,-13 9,-13 12,-7 C17,-9 21,-3 19,6 Z"/>
        </g>

        {/* Trending up */}
        <g transform="translate(775,250) rotate(-5)">
          <polyline points="-16,12 -6,-1 4,5 14,-11"/>
          <polyline points="10,-14 16,-10 14,-4"/>
          <line x1="-18" y1="14" x2="-18" y2="-14"/>
          <line x1="-18" y1="14" x2="16" y2="14"/>
        </g>

        {/* Magnifying glass */}
        <g transform="translate(1015,265) rotate(7)">
          <circle cx="-3" cy="-5" r="9"/>
          <line x1="4" y1="2" x2="12" y2="10"/>
        </g>

        {/* Lightbulb */}
        <g transform="translate(1255,255) rotate(-3)">
          <path d="M-8,-5 A9,9 0 0 1 8,-5 C9,3 5,8 5,12 L-5,12 C-5,8 -9,3 -8,-5"/>
          <line x1="-3" y1="12" x2="-3" y2="15"/>
          <line x1="0" y1="13" x2="0" y2="16"/>
          <line x1="3" y1="12" x2="3" y2="15"/>
          <line x1="-2" y1="15" x2="2" y2="15"/>
        </g>

        {/* ROW 3 */}

        {/* Code brackets */}
        <g transform="translate(175,440) rotate(-7) scale(1.1)">
          <polyline points="8,-10 -5,0 8,10"/>
          <line x1="-3" y1="12" x2="3" y2="-12"/>
          <polyline points="-8,-10 5,0 -8,10"/>
        </g>

        {/* Gear */}
        <g transform="translate(420,425) rotate(11)">
          <circle cx="0" cy="0" r="7"/>
          <circle cx="0" cy="0" r="3"/>
          <rect x="-3" y="-12" width="6" height="5" rx="1"/>
          <rect x="-3" y="7" width="6" height="5" rx="1"/>
          <rect x="-12" y="-3" width="5" height="6" rx="1"/>
          <rect x="7" y="-3" width="5" height="6" rx="1"/>
        </g>

        {/* Laptop small */}
        <g transform="translate(665,450) rotate(-4) scale(0.85)">
          <rect x="-18" y="-14" width="36" height="22" rx="2"/>
          <path d="M-22,8 L22,8 L18,14 L-18,14 Z"/>
          <line x1="-8" y1="11" x2="-4" y2="11"/>
          <line x1="-1" y1="11" x2="3" y2="11"/>
        </g>

        {/* Certificate */}
        <g transform="translate(910,435) rotate(8) scale(0.9)">
          <rect x="-13" y="-15" width="26" height="28" rx="2"/>
          <line x1="-7" y1="-7" x2="7" y2="-7"/>
          <line x1="-7" y1="-1" x2="7" y2="-1"/>
          <line x1="-7" y1="5" x2="3" y2="5"/>
          <path d="M-4,10 L0,7 L4,10 L4,14 L-4,14 Z" transform="scale(0.65)"/>
        </g>

        {/* Stethoscope small */}
        <g transform="translate(1160,445) rotate(-9) scale(0.9)">
          <circle cx="0" cy="14" r="5"/>
          <path d="M-1,9 C-1,0 -15,0 -15,-10"/>
          <path d="M1,9 C1,0 15,0 15,-10"/>
          <line x1="-15" y1="-10" x2="-17" y2="-15"/>
          <line x1="15" y1="-10" x2="17" y2="-15"/>
        </g>

        {/* Bar chart small */}
        <g transform="translate(1390,430) rotate(5) scale(0.8)">
          <rect x="-16" y="-3" width="7" height="15" rx="1"/>
          <rect x="-6" y="-13" width="7" height="25" rx="1"/>
          <rect x="4" y="-7" width="7" height="19" rx="1"/>
          <line x1="-18" y1="12" x2="14" y2="12"/>
        </g>

        {/* ROW 4 */}

        {/* Trending up */}
        <g transform="translate(90,610) rotate(4) scale(0.9)">
          <polyline points="-16,12 -6,-1 4,5 14,-11"/>
          <polyline points="10,-14 16,-10 14,-4"/>
          <line x1="-18" y1="14" x2="-18" y2="-14"/>
          <line x1="-18" y1="14" x2="16" y2="14"/>
        </g>

        {/* Graduation cap */}
        <g transform="translate(335,595) rotate(-6) scale(0.9)">
          <polygon points="0,-14 20,0 0,5 -20,0"/>
          <ellipse cx="0" cy="7" rx="11" ry="4"/>
          <line x1="18" y1="-2" x2="18" y2="8"/>
          <path d="M15,8 L18,12 L21,8"/>
        </g>

        {/* Briefcase */}
        <g transform="translate(580,620) rotate(10) scale(0.85)">
          <rect x="-15" y="-4" width="30" height="18" rx="2"/>
          <path d="M-7,-4 L-7,-9 L7,-9 L7,-4"/>
          <line x1="-15" y1="3" x2="15" y2="3"/>
        </g>

        {/* WiFi */}
        <g transform="translate(825,600) rotate(-8)">
          <path d="M-18,3 A20,20 0 0 1 18,3"/>
          <path d="M-12,3 A13,13 0 0 1 12,3"/>
          <path d="M-6,3 A7,7 0 0 1 6,3"/>
          <circle cx="0" cy="3" r="2" fill="#0ea5e9"/>
        </g>

        {/* Cloud */}
        <g transform="translate(1070,615) rotate(3) scale(0.9)">
          <path d="M-18,6 C-18,-2 -11,-8 -3,-6 C-1,-13 9,-13 12,-7 C17,-9 21,-3 19,6 Z"/>
        </g>

        {/* Database */}
        <g transform="translate(1320,595) rotate(-5) scale(0.9)">
          <ellipse cx="0" cy="-10" rx="14" ry="5"/>
          <line x1="-14" y1="-10" x2="-14" y2="8"/>
          <line x1="14" y1="-10" x2="14" y2="8"/>
          <path d="M-14,8 A14,5 0 0 0 14,8"/>
          <path d="M-14,-2 A14,5 0 0 0 14,-2"/>
        </g>

        {/* ROW 5 */}

        {/* Medical cross */}
        <g transform="translate(160,790) rotate(-4) scale(0.7)">
          <rect x="-5" y="-16" width="10" height="32" rx="2"/>
          <rect x="-16" y="-5" width="32" height="10" rx="2"/>
        </g>

        {/* Magnifying glass */}
        <g transform="translate(400,775) rotate(7) scale(1.1)">
          <circle cx="-3" cy="-5" r="9"/>
          <line x1="4" y1="2" x2="12" y2="10"/>
        </g>

        {/* Code brackets */}
        <g transform="translate(660,800) rotate(-11)">
          <polyline points="8,-10 -5,0 8,10"/>
          <line x1="-3" y1="12" x2="3" y2="-12"/>
          <polyline points="-8,-10 5,0 -8,10"/>
        </g>

        {/* Laptop */}
        <g transform="translate(920,785) rotate(5) scale(0.9)">
          <rect x="-18" y="-14" width="36" height="22" rx="2"/>
          <path d="M-22,8 L22,8 L18,14 L-18,14 Z"/>
          <line x1="-8" y1="11" x2="-4" y2="11"/>
          <line x1="-1" y1="11" x2="3" y2="11"/>
        </g>

        {/* Gear */}
        <g transform="translate(1175,795) rotate(-4) scale(0.9)">
          <circle cx="0" cy="0" r="7"/>
          <circle cx="0" cy="0" r="3"/>
          <rect x="-3" y="-12" width="6" height="5" rx="1"/>
          <rect x="-3" y="7" width="6" height="5" rx="1"/>
          <rect x="-12" y="-3" width="5" height="6" rx="1"/>
          <rect x="7" y="-3" width="5" height="6" rx="1"/>
        </g>

        {/* Lightbulb */}
        <g transform="translate(1390,775) rotate(8)">
          <path d="M-8,-5 A9,9 0 0 1 8,-5 C9,3 5,8 5,12 L-5,12 C-5,8 -9,3 -8,-5"/>
          <line x1="-3" y1="12" x2="-3" y2="15"/>
          <line x1="0" y1="13" x2="0" y2="16"/>
          <line x1="3" y1="12" x2="3" y2="15"/>
          <line x1="-2" y1="15" x2="2" y2="15"/>
        </g>

      </svg>
    </div>
  );
}

export default function LandingPage() {
  const [visible, setVisible] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [matchCount, setMatchCount] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/api/visit-counter")
      .then((res) => res.json())
      .then((data) => setVisitCount(data.count))
      .catch(() => setVisitCount(null));

    fetch("/api/get-counter")
      .then((res) => res.json())
      .then((data) => setMatchCount(data.count))
      .catch(() => setMatchCount(null));
  }, []);

  const stats = [
    { value: "98", label: "Digital roles mapped" },
    { value: "5", label: "Career pillars" },
    { value: "51", label: "Skills assessed" },
    { value: "1281", label: "People used this tool", note: "as at August 2026" },
  ];

  return (
    <div style={{ background: "#f8f7f4", minHeight: "100vh", color: "#111720", fontFamily: "system-ui, sans-serif" }}>

      <DoodleBackground />

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: "1px solid #e5e7eb",
        background: "rgba(248,247,244,0.95)",
        backdropFilter: "blur(12px)",
        padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "60px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/logo.png" alt="Ufuoma O. logo" width={32} height={32} />
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111720" }}>
            Digital Health Careers Matcher
          </span>
        </div>
        <Link href="/quiz" style={{
          background: "#0ea5e9", color: "#ffffff",
          fontWeight: 700, fontSize: 13,
          padding: "8px 18px", borderRadius: 8,
          textDecoration: "none",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          Find My Career <ArrowRight size={14} />
        </Link>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", zIndex: 1,
        maxWidth: 960, margin: "0 auto",
        padding: "100px 24px 80px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 800, lineHeight: 1.1,
          color: "#111720", marginBottom: 24,
          letterSpacing: "-0.02em",
        }}>
          Find your place in{" "}
          <span style={{
            background: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Digital Health
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#6b7280", lineHeight: 1.7,
          maxWidth: 560, margin: "0 auto 40px",
        }}>
          Answer 5 short questions. We match you to the digital health roles
          that fit your skills, background and ambitions — with salary bands, NHS
          grades and a clear path to get there.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/quiz" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#0ea5e9", color: "#ffffff",
            fontWeight: 800, fontSize: 16,
            padding: "16px 32px", borderRadius: 10,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(14,165,233,0.25)",
          }}>
            Find My Career Match <ArrowRight size={18} />
          </Link>
          <a href="#pillars" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.8)", color: "#111720",
            fontWeight: 600, fontSize: 15,
            padding: "16px 24px", borderRadius: 10,
            textDecoration: "none", border: "1px solid #e5e7eb",
          }}>
            Explore the 5 pillars <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(4px)",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24, textAlign: "center",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontSize: 36, fontWeight: 800, color: "#0ea5e9",
                lineHeight: 1, marginBottom: 6,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
              {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {s.label}
                {"note" in s && s.note && <em> {s.note}</em>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 PILLARS */}
      <section id="pillars" style={{
        position: "relative", zIndex: 1,
        maxWidth: 960, margin: "0 auto",
        padding: "80px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: 12 }}>
            The Framework
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#111720", letterSpacing: "-0.02em", marginBottom: 12 }}>
            5 Pillars of Digital Health
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Every digital health role sits within one of these five domains.{" "}
            <a
              href="https://youtube.com/playlist?list=PLFtvcopV2yxqS1No0gQf6Mj7VTYfdBCUo&si=6Uz4tSdrTNKfGg-6"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "#0ea5e9", textDecoration: "underline" }}
            >
              Watch a free course explaining the 5 pillars of digital health
            </a>{" "}
            — your quiz results map you to the pillar and the specific roles that suit you best.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.id} style={{
                background: "rgba(255,255,255,0.85)",
                border: `1px solid ${p.border}`,
                borderRadius: 12, padding: "24px",
                backdropFilter: "blur(4px)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `rgba(${p.iconRgb},0.1)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <Icon size={22} color={p.color} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#111720", marginBottom: 6 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 16 }}>{p.description}</div>
                <div style={{
                  display: "inline-block", fontSize: 11, fontWeight: 700,
                  padding: "3px 10px", borderRadius: 100,
                  background: `rgba(${p.iconRgb},0.08)`,
                  color: p.color, border: `1px solid ${p.border}`,
                }}>
                  {p.roles} roles mapped
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(4px)",
        padding: "80px 24px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: 12 }}>
              How It Works
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#111720", letterSpacing: "-0.02em" }}>
              Four steps to clarity
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {howItWorks.map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 48, fontWeight: 800, color: "rgba(14,165,233,0.15)", lineHeight: 1, marginBottom: 12 }}>
                  {item.step}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#111720", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        position: "relative", zIndex: 1,
        maxWidth: 960, margin: "0 auto",
        padding: "80px 24px", textAlign: "center",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: 16, padding: "60px 32px",
          position: "relative", overflow: "hidden",
          backdropFilter: "blur(4px)",
        }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle, rgba(14,165,233,0.07), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%)", pointerEvents: "none" }} />
          <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: 16 }}>
            Free · Takes 2 minutes · No sign up required
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#111720", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Ready to find your role?
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 420, margin: "0 auto 32px" }}>
            {visitCount !== null && visitCount > 0
              ? `Join ${visitCount.toLocaleString("en-GB")} people already exploring digital health careers.`
              : "Join NHS professionals finding their next step in digital health."}
          </p>
          <Link href="/quiz" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#0ea5e9", color: "#ffffff",
            fontWeight: 800, fontSize: 16,
            padding: "16px 36px", borderRadius: 10,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(14,165,233,0.25)",
          }}>
            Start the Quiz — It&apos;s Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #e5e7eb",
        padding: "24px", textAlign: "center",
        fontSize: 13, color: "#9ca3af",
        position: "relative", zIndex: 1,
      }}>
        Digital Health Career Matcher by Ufuoma O. · Built on real NHS job postings ·{" "}
        {new Date().getFullYear()}
      </footer>

    </div>
  );
}