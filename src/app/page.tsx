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
  CheckCircle,
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

const stats = [
  { value: "98", label: "Digital roles mapped" },
  { value: "5", label: "Career pillars" },
  { value: "51", label: "Skills assessed" },
  { value: "2 min", label: "To get matched" },
];

const howItWorks = [
  {
    step: "01",
    title: "Tell us about your background",
    detail:
      "Whether you're a clinician, an IT professional, or completely new to healthcare — we tailor the results to you.",
  },
  {
    step: "02",
    title: "Select your skills",
    detail:
      "Pick from a structured list of 51 relevant skills. Include ones you're currently studying too.",
  },
  {
    step: "03",
    title: "Tell us what kind of work energises you",
    detail:
      "Technical problem-solving? Working with data? Leading teams? Your answer shapes which roles rise to the top.",
  },
  {
    step: "04",
    title: "Get your matched roles",
    detail:
      "We show your top 5 role matches with NHS band, salary range, skills gap and the certifications to get you there.",
  },
];

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#111720", fontFamily: "system-ui, sans-serif" }}>

      {/* GRID BACKGROUND */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo.png"
            alt="Ufuoma O. logo"
            width={32}
            height={32}
          />
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111720" }}>
            Digital Health Careers Matcher
          </span>
        </div>
        <Link
          href="/quiz"
          style={{
            background: "#0ea5e9",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 13,
            padding: "8px 18px",
            borderRadius: 8,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Find My Career <ArrowRight size={14} />
        </Link>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 960,
          margin: "0 auto",
          padding: "100px 24px 80px",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 300,
            background: "radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(14,165,233,0.06)",
            border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 12,
            color: "#0ea5e9",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <CheckCircle size={12} />
          Built on real job postings
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#111720",
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Find your place in{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digital Health
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#6b7280",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Answer 5 short questions. We match you to the digital health roles
          that fit your skills, background and ambitions — with salary bands, NHS
          grades and a clear path to get there.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/quiz"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#0ea5e9",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 16,
              padding: "16px 32px",
              borderRadius: 10,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(14,165,233,0.25)",
            }}
          >
            Find My Career Match <ArrowRight size={18} />
          </Link>
          <a
            href="#pillars"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#111720",
              fontWeight: 600,
              fontSize: 15,
              padding: "16px 24px",
              borderRadius: 10,
              textDecoration: "none",
              border: "1px solid #e5e7eb",
            }}
          >
            Explore the 5 pillars <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "32px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 24,
            textAlign: "center",
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#0ea5e9",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 PILLARS */}
      <section
        id="pillars"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 960,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0ea5e9",
              marginBottom: 12,
            }}
          >
            The Framework
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              color: "#111720",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            5 Pillars of Digital Health
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#6b7280",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every digital health role sits within one of these five domains.{" "}
            <a
              href="https://youtube.com/playlist?list=PLFtvcopV2yxqS1No0gQf6Mj7VTYfdBCUo&si=6Uz4tSdrTNKfGg-6"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0ea5e9", textDecoration: "underline" }}
            >
              Watch a free course explaining the 5 pillars of digital health
            </a>{" "}
            — your quiz results map you to the pillar and the specific roles
            that suit you best.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                style={{
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  borderRadius: 12,
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `rgba(${p.iconRgb},0.1)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} color={p.color} />
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#111720",
                    marginBottom: 6,
                  }}
                >
                  {p.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {p.description}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: `rgba(${p.iconRgb},0.08)`,
                    color: p.color,
                    border: `1px solid ${p.border}`,
                  }}
                >
                  {p.roles} roles mapped
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #e5e7eb",
          background: "#f9fafb",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#0ea5e9",
                marginBottom: 12,
              }}
            >
              How It Works
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: 800,
                color: "#111720",
                letterSpacing: "-0.02em",
              }}
            >
              Four steps to clarity
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
            }}
          >
            {howItWorks.map((item, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "rgba(14,165,233,0.15)",
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#111720",
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 960,
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(124,58,237,0.06))",
            border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: 16,
            padding: "60px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              background: "radial-gradient(circle, rgba(14,165,233,0.07), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 240,
              height: 240,
              background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0ea5e9",
              marginBottom: 16,
            }}
          >
            Free · Takes 2 minutes · No sign up required
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 42px)",
              fontWeight: 800,
              color: "#111720",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Ready to find your role?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#6b7280",
              maxWidth: 420,
              margin: "0 auto 32px",
            }}
          >
            Join thousands of NHS professionals who have used this tool to find
            their next step in digital health.
          </p>
          <Link
            href="/quiz"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#0ea5e9",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 16,
              padding: "16px 36px",
              borderRadius: 10,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(14,165,233,0.25)",
            }}
          >
            Start the Quiz — It&apos;s Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "24px",
          textAlign: "center",
          fontSize: 13,
          color: "#9ca3af",
          position: "relative",
          zIndex: 1,
        }}
      >
        Digital Health Career Matcher by Ufuoma O. · Built on real job postings ·{" "}
        {new Date().getFullYear()}
      </footer>

    </div>
  );
}
