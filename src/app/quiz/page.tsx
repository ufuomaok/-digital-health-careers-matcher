"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Activity, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ── QUESTION DATA ──────────────────────────────────────────────

const backgroundOptions = [
  {
    id: "clinician",
    label: "I'm a practising clinician",
    detail: "Nurse, doctor, AHP, pharmacist, etc.",
    emoji: "🩺",
  },
  {
    id: "nhs-non-clinical",
    label: "I work in NHS / healthcare",
    detail: "But not in a clinical role",
    emoji: "🏥",
  },
  {
    id: "it-outside-healthcare",
    label: "I work in tech / IT",
    detail: "Outside of healthcare",
    emoji: "💻",
  },
  {
    id: "student-graduate",
    label: "Student or recent graduate",
    detail: "Looking to start my career",
    emoji: "🎓",
  },
  {
    id: "career-changer",
    label: "Career changer",
    detail: "From a non-tech, non-clinical background",
    emoji: "🔄",
  },
];

const clinicalIntentOptions = [
  {
    id: "stay-clinical",
    label: "Stay close to clinical work",
    detail: "Add a digital dimension but keep patient contact",
    emoji: "🩺",
  },
  {
    id: "leave-clinical",
    label: "Move fully into digital",
    detail: "Leave clinical practice behind",
    emoji: "💡",
  },
  {
    id: "unsure",
    label: "Not sure yet",
    detail: "Show me both options",
    emoji: "🤔",
  },
];

const experienceOptions = [
  {
    id: "entry",
    label: "Less than 2 years",
    detail: "Entry level",
    emoji: "🌱",
  },
  {
    id: "early-career",
    label: "2–5 years",
    detail: "Early career",
    emoji: "📈",
  },
  {
    id: "career-changer-exp",
    label: "5+ years in a non-digital role",
    detail: "Career changer — treat as entry for digital",
    emoji: "🔄",
  },
];

const skillGroups = [
  {
    label: "Systems & Tools",
    skills: [
      "EPR systems",
      "EMIS",
      "SystmOne",
      "Microsoft 365",
      "Power BI",
      "Excel (advanced)",
      "Azure",
      "AWS",
    ],
  },
  {
    label: "Technical",
    skills: [
      "SQL",
      "Python",
      "FHIR/HL7",
      "Active Directory",
      "Networking",
      "Cyber Essentials",
      "APIs",
      "Data warehouse",
    ],
  },
  {
    label: "Methodologies",
    skills: [
      "Agile/Scrum",
      "PRINCE2",
      "Change management",
      "Business analysis",
      "ITIL",
      "Benefits realisation",
      "Process mapping",
      "Risk management",
    ],
  },
  {
    label: "Clinical",
    skills: [
      "ICD-10/OPCS-4",
      "SNOMED CT",
      "Clinical coding",
      "Medication management",
      "DCB0129",
      "Clinical workflow",
      "Medical terminology",
      "Pharmacy systems",
    ],
  },
  {
    label: "Soft Skills & Education",
    skills: [
      "Training & facilitation",
      "Stakeholder management",
      "Project coordination",
      "Report writing",
      "LMS administration",
      "eLearning authoring tools",
      "Instructional design",
      "Digital literacy",
    ],
  },
];

const workPreferenceOptions = [
  {
    id: "infrastructure",
    label: "Solving technical problems",
    detail: "Systems, infrastructure, code",
    emoji: "⚙️",
    color: "#0ea5e9",
    rgb: "14,165,233",
  },
  {
    id: "data",
    label: "Working with data",
    detail: "Turning numbers into insights",
    emoji: "📊",
    color: "#8b5cf6",
    rgb: "139,92,246",
  },
  {
    id: "leadership",
    label: "Leading projects",
    detail: "Working with people and driving change",
    emoji: "🎯",
    color: "#f59e0b",
    rgb: "245,158,11",
  },
  {
    id: "clinical",
    label: "Close to patient care",
    detail: "Clinical workflows and informatics",
    emoji: "🩺",
    color: "#10b981",
    rgb: "16,185,129",
  },
  {
    id: "education",
    label: "Teaching and training",
    detail: "Building people's digital capability",
    emoji: "📚",
    color: "#f43f5e",
    rgb: "244,63,94",
  },
];

// ── TYPES ──────────────────────────────────────────────────────

interface UserAnswers {
  background: string;
  clinicalIntent: string;
  experience: string;
  skillsInUse: string[];
  skillsStudying: string[];
  workPreferences: string[];
}

// ── MAIN COMPONENT ─────────────────────────────────────────────

export default function QuizPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState<UserAnswers>({
    background: "",
    clinicalIntent: "",
    experience: "",
    skillsInUse: [],
    skillsStudying: [],
    workPreferences: [],
  });

  const [step, setStep] = useState(1);
  const [activeSkillTab, setActiveSkillTab] = useState<"inUse" | "studying">("inUse");

  const isClinician = answers.background === "clinician";
  const totalSteps = isClinician ? 5 : 4;

  const getQuestionForStep = (s: number) => {
    if (isClinician) return s;
    if (s === 1) return 1;
    if (s === 2) return 3;
    if (s === 3) return 4;
    if (s === 4) return 5;
    return s;
  };

  const questionNum = getQuestionForStep(step);
  const progress = Math.round((step / totalSteps) * 100);

  const canProceed = () => {
    if (questionNum === 1) return answers.background !== "";
    if (questionNum === 2) return answers.clinicalIntent !== "";
    if (questionNum === 3) return answers.experience !== "";
    if (questionNum === 4) return answers.skillsInUse.length > 0 || answers.skillsStudying.length > 0;
    if (questionNum === 5) return answers.workPreferences.length >= 1;
    return false;
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleSkill = (skill: string, list: "skillsInUse" | "skillsStudying") => {
    const current = answers[list];
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    setAnswers({ ...answers, [list]: updated });
  };

  const toggleWorkPref = (id: string) => {
    const current = answers.workPreferences;
    if (current.includes(id)) {
      setAnswers({ ...answers, workPreferences: current.filter((p) => p !== id) });
    } else if (current.length < 2) {
      setAnswers({ ...answers, workPreferences: [...current, id] });
    }
  };

  return (
    <div
      style={{
        background: "#0a0e14",
        minHeight: "100vh",
        color: "#e2eaf4",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid #1e2d3f",
          background: "rgba(10,14,20,0.9)",
          backdropFilter: "blur(12px)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Activity size={16} color="#0a0e14" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>
            Digital Health Careers Matcher
          </span>
        </Link>

        <div style={{ fontSize: 13, color: "#6b8097" }}>
          Step{" "}
          <span style={{ color: "#00e5ff", fontWeight: 700 }}>{step}</span>
          {" "}of{" "}
          {totalSteps}
        </div>
      </nav>

      {/* Progress bar */}
      <div style={{ height: 3, background: "#1e2d3f", position: "relative", zIndex: 40 }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, #00e5ff, #7c3aed)",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 680,
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >

        {/* Q1: BACKGROUND */}
        {questionNum === 1 && (
          <div>
            <QuestionHeader
              tag="Question 1 of 5"
              title="What best describes your current background?"
              subtitle="This helps us tailor which roles we show you."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {backgroundOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  selected={answers.background === opt.id}
                  onClick={() =>
                    setAnswers({ ...answers, background: opt.id, clinicalIntent: "" })
                  }
                  emoji={opt.emoji}
                  label={opt.label}
                  detail={opt.detail}
                />
              ))}
            </div>
          </div>
        )}

        {/* Q2: CLINICAL INTENT */}
        {questionNum === 2 && (
          <div>
            <QuestionHeader
              tag="Question 2 of 5"
              title="You're currently in a clinical role — what's your digital ambition?"
              subtitle="This shapes whether we show you roles that keep patient contact or move you fully into digital."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {clinicalIntentOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  selected={answers.clinicalIntent === opt.id}
                  onClick={() => setAnswers({ ...answers, clinicalIntent: opt.id })}
                  emoji={opt.emoji}
                  label={opt.label}
                  detail={opt.detail}
                />
              ))}
            </div>
          </div>
        )}

        {/* Q3: EXPERIENCE */}
        {questionNum === 3 && (
          <div>
            <QuestionHeader
              tag={`Question ${isClinician ? "3" : "2"} of 5`}
              title="How long have you been working professionally?"
              subtitle="If you've had a long career outside of digital, don't worry — we account for that."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {experienceOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  selected={answers.experience === opt.id}
                  onClick={() => setAnswers({ ...answers, experience: opt.id })}
                  emoji={opt.emoji}
                  label={opt.label}
                  detail={opt.detail}
                />
              ))}
            </div>
          </div>
        )}

        {/* Q4: SKILLS */}
        {questionNum === 4 && (
          <div>
            <QuestionHeader
              tag={`Question ${isClinician ? "4" : "3"} of 5`}
              title="Which skills do you have?"
              subtitle="Select everything that applies — skills you use day-to-day score higher than ones you're studying."
            />

            {/* Tab switcher */}
            <div
              style={{
                display: "flex",
                marginBottom: 24,
                border: "1px solid #1e2d3f",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {(["inUse", "studying"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 13,
                    transition: "all 0.2s",
                    background:
                      activeSkillTab === tab
                        ? tab === "inUse"
                          ? "rgba(0,229,255,0.12)"
                          : "rgba(139,92,246,0.12)"
                        : "#111720",
                    color:
                      activeSkillTab === tab
                        ? tab === "inUse"
                          ? "#00e5ff"
                          : "#8b5cf6"
                        : "#6b8097",
                    borderBottom:
                      activeSkillTab === tab
                        ? `2px solid ${tab === "inUse" ? "#00e5ff" : "#8b5cf6"}`
                        : "2px solid transparent",
                  }}
                >
                  {tab === "inUse"
                    ? `✅ I use these (${answers.skillsInUse.length} selected)`
                    : `📖 Currently studying (${answers.skillsStudying.length} selected)`}
                </button>
              ))}
            </div>

            {/* Skill groups */}
            {skillGroups.map((group) => (
              <div key={group.label} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#6b8097",
                    marginBottom: 10,
                  }}
                >
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.skills.map((skill) => {
                    const inUse = answers.skillsInUse.includes(skill);
                    const studying = answers.skillsStudying.includes(skill);
                    const isSelected = activeSkillTab === "inUse" ? inUse : studying;

                    return (
                      <button
                        key={skill}
                        onClick={() =>
                          toggleSkill(
                            skill,
                            activeSkillTab === "inUse" ? "skillsInUse" : "skillsStudying"
                          )
                        }
                        style={{
                          padding: "7px 14px",
                          borderRadius: 100,
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          border: isSelected
                            ? activeSkillTab === "inUse"
                              ? "1px solid #00e5ff"
                              : "1px solid #8b5cf6"
                            : inUse
                            ? "1px solid rgba(0,229,255,0.3)"
                            : studying
                            ? "1px solid rgba(139,92,246,0.3)"
                            : "1px solid #1e2d3f",
                          background: isSelected
                            ? activeSkillTab === "inUse"
                              ? "rgba(0,229,255,0.12)"
                              : "rgba(139,92,246,0.12)"
                            : inUse
                            ? "rgba(0,229,255,0.05)"
                            : studying
                            ? "rgba(139,92,246,0.05)"
                            : "#111720",
                          color: isSelected
                            ? activeSkillTab === "inUse"
                              ? "#00e5ff"
                              : "#8b5cf6"
                            : inUse
                            ? "rgba(0,229,255,0.6)"
                            : studying
                            ? "rgba(139,92,246,0.6)"
                            : "#6b8097",
                          transition: "all 0.15s",
                        }}
                      >
                        {isSelected && (
                          <Check size={11} style={{ marginRight: 5, display: "inline" }} />
                        )}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div
              style={{
                fontSize: 12,
                color: "#3a5068",
                marginTop: 8,
                padding: "10px 14px",
                border: "1px solid #1e2d3f",
                borderRadius: 8,
              }}
            >
              💡 Switch between the tabs to mark skills you use day-to-day vs ones you are currently studying or working towards.
            </div>
          </div>
        )}

        {/* Q5: WORK PREFERENCE */}
        {questionNum === 5 && (
          <div>
            <QuestionHeader
              tag={`Question ${isClinician ? "5" : "4"} of 5`}
              title="What kind of work energises you most?"
              subtitle="Pick up to 2. This boosts roles in the areas that genuinely interest you."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {workPreferenceOptions.map((opt) => {
                const selected = answers.workPreferences.includes(opt.id);
                const maxReached = answers.workPreferences.length >= 2 && !selected;
                return (
                  <button
                    key={opt.id}
                    onClick={() => !maxReached && toggleWorkPref(opt.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 20px",
                      borderRadius: 12,
                      border: selected ? `1px solid ${opt.color}` : "1px solid #1e2d3f",
                      background: selected ? `rgba(${opt.rgb},0.08)` : "#111720",
                      cursor: maxReached ? "not-allowed" : "pointer",
                      opacity: maxReached ? 0.4 : 1,
                      textAlign: "left",
                      width: "100%",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: selected ? opt.color : "#fff",
                          marginBottom: 2,
                        }}
                      >
                        {opt.label}
                      </div>
                      <div style={{ fontSize: 13, color: "#6b8097" }}>{opt.detail}</div>
                    </div>
                    {selected && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: opt.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={13} color="#0a0e14" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {answers.workPreferences.length === 2 && (
              <div
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "#f59e0b",
                  padding: "8px 14px",
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 8,
                }}
              >
                ✓ You&apos;ve selected 2 — click one to deselect if you want to change
              </div>
            )}
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid #1e2d3f",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 8,
              border: "1px solid #1e2d3f",
              background: "transparent",
              color: step === 1 ? "#3a5068" : "#e2eaf4",
              fontSize: 14,
              fontWeight: 600,
              cursor: step === 1 ? "not-allowed" : "pointer",
              opacity: step === 1 ? 0.4 : 1,
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 8,
              border: "none",
              background: canProceed()
                ? "linear-gradient(135deg, #00e5ff, #0ea5e9)"
                : "#1e2d3f",
              color: canProceed() ? "#0a0e14" : "#3a5068",
              fontSize: 15,
              fontWeight: 800,
              cursor: canProceed() ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: canProceed() ? "0 0 20px rgba(0,229,255,0.2)" : "none",
            }}
          >
            {step === totalSteps ? "See My Results" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

// ── REUSABLE SUB-COMPONENTS ────────────────────────────────────

function QuestionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#00e5ff",
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.2)",
          padding: "4px 12px",
          borderRadius: 100,
          marginBottom: 16,
        }}
      >
        {tag}
      </div>
      <h1
        style={{
          fontSize: "clamp(22px, 4vw, 32px)",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.2,
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 15, color: "#6b8097", lineHeight: 1.6 }}>
        {subtitle}
      </p>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  emoji,
  label,
  detail,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  detail: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        borderRadius: 12,
        border: selected ? "1px solid #00e5ff" : "1px solid #1e2d3f",
        background: selected ? "rgba(0,229,255,0.07)" : "#111720",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.2s",
      }}
    >
      <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: selected ? "#00e5ff" : "#fff",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 13, color: "#6b8097" }}>{detail}</div>
      </div>
      {selected && (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#00e5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check size={13} color="#0a0e14" />
        </div>
      )}
    </button>
  );
}
