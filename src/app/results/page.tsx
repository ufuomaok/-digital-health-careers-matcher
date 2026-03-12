"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Database,
  Users,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Activity,
  Share2,
  Check,
} from "lucide-react";
import rolesData from "../lib/roles.json";

// ── TYPES ──────────────────────────────────────────────────────

interface Role {
  id: string;
  title: string;
  pillar: string;
  level: string;
  nhsBand: string;
  salaryBand: { low: number; high: number };
  skillsRequired: string[];
  skillsDesirable: string[];
  certifications: string[];
  clinicianRequired: boolean;
  backgroundMatch: string[];
  description: string;
}

interface UserAnswers {
  background: string;
  clinicalIntent: string;
  experience: string;
  skillsInUse: string[];
  skillsStudying: string[];
  workPreferences: string[];
}

interface MatchedRole {
  role: Role;
  totalScore: number;
  skillScore: number;
  matchPercent: number;
  gapSkills: string[];
  nearSkills: string[];
}

// ── PILLAR CONFIG ──────────────────────────────────────────────

const pillarConfig: Record<
  string,
  { label: string; color: string; rgb: string; icon: React.ElementType }
> = {
  infrastructure: { label: "Infrastructure", color: "#0ea5e9", rgb: "14,165,233", icon: Activity },
  data: { label: "Data & Analytics", color: "#8b5cf6", rgb: "139,92,246", icon: Database },
  leadership: { label: "Leadership & Strategy", color: "#f59e0b", rgb: "245,158,11", icon: Users },
  clinical: { label: "Clinical Informatics", color: "#10b981", rgb: "16,185,129", icon: Stethoscope },
  education: { label: "Education & Training", color: "#f43f5e", rgb: "244,63,94", icon: GraduationCap },
};

// ── MATCHING ENGINE ────────────────────────────────────────────

function runMatchingEngine(answers: UserAnswers): MatchedRole[] {
  const allRoles: Role[] = [];
  const pillars = rolesData.pillars as Record<string, { roles: Role[] }>;
  for (const pillar of Object.values(pillars)) {
    for (const role of pillar.roles) allRoles.push(role);
  }

  const userLevel =
    answers.experience === "career-changer-exp" || answers.experience === "early-career"
      ? "entry"
      : answers.experience;

  const results: MatchedRole[] = [];

  for (const role of allRoles) {
    if (!role.backgroundMatch.includes(answers.background)) continue;
    if (answers.background === "clinician" && answers.clinicalIntent === "leave-clinical" && role.clinicianRequired) continue;
    if (role.clinicianRequired && answers.background !== "clinician") continue;

    let skillPoints = 0;
    let maxPoints = 0;

    for (const skill of role.skillsRequired) {
      maxPoints += 1.0;
      if (answers.skillsInUse.includes(skill)) skillPoints += 1.0;
      else if (answers.skillsStudying.includes(skill)) skillPoints += 0.5;
    }
    for (const skill of role.skillsDesirable) {
      maxPoints += 0.5;
      if (answers.skillsInUse.includes(skill)) skillPoints += 0.5;
      else if (answers.skillsStudying.includes(skill)) skillPoints += 0.25;
    }

    const skillScore = maxPoints > 0 ? skillPoints / maxPoints : 0;
    const pillarBoost = answers.workPreferences.includes(role.pillar) ? 1 : 0.3;
    const expFit = role.level === "mid" && userLevel === "entry" ? 0.6 : 1.0;
    const backgroundBonus = answers.background === "nhs-non-clinical" || answers.background === "clinician" ? 0.05 : 0;
    const totalScore = skillScore * 0.6 + pillarBoost * 0.25 + expFit * 0.15 + backgroundBonus;

    const gapSkills = role.skillsRequired.filter(s => !answers.skillsInUse.includes(s) && !answers.skillsStudying.includes(s));
    const nearSkills = role.skillsRequired.filter(s => answers.skillsStudying.includes(s));

    results.push({
      role, totalScore, skillScore,
      matchPercent: Math.min(Math.round(totalScore * 100), 99),
      gapSkills, nearSkills,
    });
  }

  return results.sort((a, b) => b.totalScore - a.totalScore).slice(0, 5);
}

// ── READ SESSION STORAGE ───────────────────────────────────────

function getInitialData(): { answers: UserAnswers | null; matches: MatchedRole[] } {
  if (typeof window === "undefined") return { answers: null, matches: [] };
  const raw = sessionStorage.getItem("quizAnswers");
  if (!raw) return { answers: null, matches: [] };
  const answers: UserAnswers = JSON.parse(raw);
  const matches = runMatchingEngine(answers);
  return { answers, matches };
}

// ── HELPERS ────────────────────────────────────────────────────

function formatSalary(n: number) {
  return "£" + n.toLocaleString("en-GB");
}

function getScoreColor(pct: number) {
  if (pct >= 70) return "#10b981";
  if (pct >= 45) return "#f59e0b";
  return "#0ea5e9";
}

// ── SHARED COMPONENTS ──────────────────────────────────────────

function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />
  );
}

function Navbar({ showRetake }: { showRetake: boolean }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: "1px solid #e5e7eb",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
      padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "60px",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img src="/logo.png" alt="Logo" style={{ height: 32, width: "auto" }} />
        <span style={{ fontWeight: 700, fontSize: 15, color: "#111720" }}>
          Digital Health Careers Matcher
        </span>
      </Link>
      {showRetake && (
        <Link href="/quiz" style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "transparent", color: "#6b7280",
          fontSize: 13, fontWeight: 600,
          padding: "8px 16px", borderRadius: 8,
          border: "1px solid #e5e7eb", textDecoration: "none",
        }}>
          <RotateCcw size={13} /> Retake Quiz
        </Link>
      )}
    </nav>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────

export default function ResultsPage() {
  const { answers, matches } = getInitialData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!answers || sharing) return;
    setSharing(true);
    try {
      const res = await fetch("/api/save-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, matches }),
      });
      const data = await res.json();
      if (data.id) {
        setShareId(data.id);
        const url = `${window.location.origin}/results?id=${data.id}`;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error("Share error:", err);
    }
    setSharing(false);
  };

  // ── NO ANSWERS ──
  if (!answers) {
    return (
      <div style={{ background: "#ffffff", minHeight: "100vh", color: "#111720", fontFamily: "system-ui, sans-serif" }}>
        <GridBg />
        <Navbar showRetake={false} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🤔</div>
            <h2 style={{ color: "#111720", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
              No quiz answers found
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>
              It looks like you came here directly. Please take the quiz first so we can match you to the right roles.
            </p>
            <Link href="/quiz" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#0ea5e9", color: "#ffffff",
              fontWeight: 800, fontSize: 15,
              padding: "12px 24px", borderRadius: 8, textDecoration: "none",
            }}>
              Take the Quiz <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topMatch = matches[0];

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#111720", fontFamily: "system-ui, sans-serif" }}>
      <GridBg />
      <Navbar showRetake={true} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(124,58,237,0.06))",
          border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: 16, padding: "36px 32px", marginBottom: 32,
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40, width: 200, height: 200,
            background: "radial-gradient(circle, rgba(14,165,233,0.07), transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0ea5e9", marginBottom: 12 }}>
            Your Results
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 800, color: "#111720", lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.02em" }}>
            {matches.length > 0
              ? `We found ${matches.length} roles that match your profile`
              : "No strong matches found"}
          </h1>
          {topMatch && (
            <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 480, margin: "0 auto 20px" }}>
              Your top match is{" "}
              <strong style={{ color: "#111720" }}>{topMatch.role.title}</strong>{" "}
              with a{" "}
              <strong style={{ color: "#0ea5e9" }}>{topMatch.matchPercent}% match</strong>.
              Scroll down to see all your results.
            </p>
          )}

          {/* Share button */}
          {matches.length > 0 && (
            <button
              onClick={handleShare}
              disabled={sharing}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: copied ? "#10b981" : "#f9fafb",
                color: copied ? "#ffffff" : "#111720",
                fontWeight: 700, fontSize: 14,
                padding: "10px 20px", borderRadius: 8,
                border: `1px solid ${copied ? "#10b981" : "#e5e7eb"}`,
                cursor: sharing ? "wait" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {copied ? <><Check size={15} /> Link copied!</> : sharing ? "Generating link..." : <><Share2 size={15} /> Share my results</>}
            </button>
          )}

          {shareId && (
            <div style={{
              marginTop: 12, fontSize: 12, color: "#6b7280",
              padding: "8px 14px", background: "#f9fafb",
              border: "1px solid #e5e7eb", borderRadius: 8,
            }}>
              Share link: <strong style={{ color: "#0ea5e9" }}>{window.location.origin}/results?id={shareId}</strong>
            </div>
          )}

          {matches.length === 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: "#6b7280", marginBottom: 16 }}>
                Try selecting more skills or a different background to broaden your results.
              </p>
              <Link href="/quiz" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#0ea5e9", color: "#ffffff",
                fontWeight: 800, fontSize: 14,
                padding: "10px 20px", borderRadius: 8, textDecoration: "none",
              }}>
                Retake Quiz <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Match cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {matches.map((match, index) => {
            const { role, matchPercent, gapSkills, nearSkills } = match;
            const pillar = pillarConfig[role.pillar] || pillarConfig.infrastructure;
            const PillarIcon = pillar.icon;
            const isExpanded = expandedId === role.id;
            const scoreColor = getScoreColor(matchPercent);

            return (
              <div key={role.id} style={{
                background: "#f9fafb",
                border: index === 0 ? `1px solid rgba(${pillar.rgb},0.4)` : "1px solid #e5e7eb",
                borderRadius: 14, overflow: "hidden",
              }}>
                {index === 0 && (
                  <div style={{
                    background: "linear-gradient(to right, rgba(14,165,233,0.1), rgba(124,58,237,0.06))",
                    padding: "6px 20px", fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "#0ea5e9", borderBottom: "1px solid rgba(14,165,233,0.15)",
                  }}>
                    ⭐ Top Match
                  </div>
                )}

                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 200 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: `rgba(${pillar.rgb},0.1)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: `1px solid rgba(${pillar.rgb},0.2)`,
                      }}>
                        <PillarIcon size={20} color={pillar.color} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 16, color: "#111720", marginBottom: 4, lineHeight: 1.2 }}>
                          {role.title}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100,
                            background: `rgba(${pillar.rgb},0.1)`, color: pillar.color,
                            border: `1px solid rgba(${pillar.rgb},0.2)`,
                          }}>
                            {pillar.label}
                          </span>
                          <span style={{ fontSize: 12, color: "#6b7280" }}>NHS Band {role.nhsBand}</span>
                          <span style={{ fontSize: 12, color: "#6b7280" }}>
                            {formatSalary(role.salaryBand.low)} – {formatSalary(role.salaryBand.high)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "center", flexShrink: 0 }}>
                      <div style={{ fontSize: 32, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                        {matchPercent}%
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>match</div>
                    </div>
                  </div>

                  <div style={{ height: 4, background: "#e5e7eb", borderRadius: 100, marginTop: 16, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${matchPercent}%`,
                      background: `linear-gradient(to right, ${scoreColor}, ${scoreColor}aa)`,
                      borderRadius: 100,
                    }} />
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : role.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      marginTop: 14, padding: "6px 0",
                      background: "transparent", border: "none",
                      color: "#6b7280", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {isExpanded
                      ? <><ChevronUp size={15} /> Hide details</>
                      : <><ChevronDown size={15} /> View full details, skills gap &amp; certifications</>
                    }
                  </button>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: "1px solid #e5e7eb", padding: "24px", background: "#ffffff" }}>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 24 }}>
                      {role.description}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>

                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#10b981", marginBottom: 10 }}>
                          ✅ Skills you have
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {role.skillsRequired.filter(s => answers.skillsInUse.includes(s)).map(s => (
                            <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: "rgba(16,185,129,0.08)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                              {s}
                            </span>
                          ))}
                          {role.skillsRequired.filter(s => answers.skillsInUse.includes(s)).length === 0 && (
                            <span style={{ fontSize: 13, color: "#9ca3af" }}>None matched yet</span>
                          )}
                        </div>
                      </div>

                      {nearSkills.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f59e0b", marginBottom: 10 }}>
                            📖 Currently studying
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {nearSkills.map(s => (
                              <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {gapSkills.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f43f5e", marginBottom: 10 }}>
                            🎯 Skills to develop
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {gapSkills.map(s => (
                              <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: "rgba(244,63,94,0.06)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {role.certifications.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8b5cf6", marginBottom: 10 }}>
                            🏆 Recommended certifications
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {role.certifications.map(cert => (
                              <div key={cert} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, background: "rgba(139,92,246,0.06)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.2)" }}>
                                {cert}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 12, padding: "4px 12px", borderRadius: 6, fontWeight: 600,
                          background: role.level === "entry" ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
                          color: role.level === "entry" ? "#10b981" : "#f59e0b",
                          border: `1px solid ${role.level === "entry" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
                        }}>
                          {role.level === "entry" ? "Entry level" : "Mid level"}
                        </span>
                        <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 6, background: "rgba(14,165,233,0.08)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)", fontWeight: 600 }}>
                          Band {role.nhsBand}
                        </span>
                      </div>
                      <Link
                        href={`https://www.jobs.nhs.uk/candidate/search/results?keyword=${encodeURIComponent(role.title)}`}
                        target="_blank"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#ffffff", background: "#0ea5e9", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
                      >
                        Search NHS Jobs <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Retake CTA */}
        {matches.length > 0 && (
          <div style={{ marginTop: 40, textAlign: "center", padding: "32px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12 }}>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>
              Not seeing what you expected? Try updating your skills or changing your preferences.
            </p>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#111720", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "1px solid #e5e7eb", textDecoration: "none" }}>
              <RotateCcw size={14} /> Retake the Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
