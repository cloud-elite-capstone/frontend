"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

type GenderOption = "Female" | "Male" | "Non-binary" | "Prefer not to say";

const PRESET_AVATARS = [
  { id: "av1", bg: "#fef2f0", emoji: "⚡" },
  { id: "av2", bg: "#eff6ff", emoji: "🎧" },
  { id: "av3", bg: "#fefce8", emoji: "🌿" },
  { id: "av4", bg: "#f3e8ff", emoji: "✨" },
  { id: "av5", bg: "#ecfdf5", emoji: "🚀" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<GenderOption | "">("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [usernameError, setUsernameError] = useState<string>("");

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = username.trim().toLowerCase().replace(/^@+/, "");
    if (!clean) {
      setUsernameError("Please enter a username to continue.");
      return;
    }
    if (clean.length < 3) {
      setUsernameError("Username must be at least 3 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(clean)) {
      setUsernameError("Username can only contain letters, numbers, and underscores.");
      return;
    }
    setUsernameError("");
    setUsername(clean);
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    if (!gender) return;
    setCurrentStep(3);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setSelectedPreset(null);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_AVATARS[0]) => {
    setSelectedPreset(preset.id);
    setPhotoUrl(null);
  };

  const handleFinishOnboarding = () => {
    router.push("/");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        boxSizing: "border-box",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <Image
            src="/cartesian_logo.png"
            alt="Cartesian Logo"
            width={170}
            height={50}
            style={{ objectFit: "contain", height: "auto" }}
            priority
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "260px",
            marginBottom: "32px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "16px",
              right: "16px",
              height: "2px",
              backgroundColor: "#e2e8f0",
              zIndex: 0,
              transform: "translateY(-50%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "16px",
              height: "2px",
              backgroundColor: "#ea4c38",
              zIndex: 1,
              transform: "translateY(-50%)",
              transition: "width 0.3s ease",
              width:
                currentStep === 1
                  ? "0%"
                  : currentStep === 2
                  ? "33%"
                  : currentStep === 3
                  ? "66%"
                  : "100%",
            }}
          />

          {[1, 2, 3, 4].map((step) => {
            const isCompleted = currentStep > step;
            const isActive = currentStep === step;

            return (
              <div
                key={step}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: isActive
                      ? "#ea4c38"
                      : isCompleted
                      ? "#2c3e50"
                      : "#ffffff",
                    border: isActive
                      ? "2px solid #ea4c38"
                      : isCompleted
                      ? "2px solid #2c3e50"
                      : "2px solid #e2e8f0",
                    color: isActive || isCompleted ? "#ffffff" : "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    transition: "all 0.2s ease",
                    boxShadow: isActive
                      ? "0 3px 10px rgba(234, 76, 56, 0.3)"
                      : "none",
                  }}
                >
                  {isCompleted ? <Check size={14} strokeWidth={2.5} /> : step}
                </div>
              </div>
            );
          })}
        </div>

        <h1
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 6px 0",
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            lineHeight: 1.2,
          }}
        >
          Let&apos;s set up your profile!
        </h1>
        <p
          style={{
            fontSize: "13.5px",
            color: "#64748b",
            margin: "0 0 32px 0",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
          }}
        >
          You can always change them later.
        </p>

        <div style={{ width: "100%" }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleNextStep1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "#334155",
                      marginBottom: "6px",
                    }}
                  >
                    Choose your username
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f8fafc",
                      border: usernameError ? "1.5px solid #ef4444" : "1.5px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        color: "#94a3b8",
                        fontWeight: 600,
                        fontSize: "14px",
                        marginRight: "4px",
                      }}
                    >
                      @
                    </span>
                    <input
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (usernameError) setUsernameError("");
                      }}
                      autoFocus
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "14px",
                        color: "#0f172a",
                        fontWeight: 600,
                        width: "100%",
                        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      }}
                    />
                  </div>
                  {usernameError ? (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#ef4444",
                        marginTop: "5px",
                        display: "block",
                      }}
                    >
                      {usernameError}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#94a3b8",
                        marginTop: "5px",
                        display: "block",
                      }}
                    >
                      Your unique handle on Cartesian.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ea4c38",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "13px 20px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: "0 4px 14px rgba(234, 76, 56, 0.28)",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    marginTop: "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d93b27";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ea4c38";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Next
                </button>
              </motion.form>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <label
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#334155",
                    marginBottom: "2px",
                  }}
                >
                  Select your sex / gender
                </label>

                {(["Female", "Male", "Non-binary", "Prefer not to say"] as GenderOption[]).map(
                  (option) => {
                    const isSelected = gender === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setGender(option)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: isSelected ? "2px solid #ea4c38" : "1.5px solid #e2e8f0",
                          backgroundColor: isSelected ? "#fef2f0" : "#f8fafc",
                          color: isSelected ? "#ea4c38" : "#1e293b",
                          fontSize: "13.5px",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          textAlign: "left",
                          fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                        }}
                      >
                        <span>{option}</span>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            border: isSelected ? "5px solid #ea4c38" : "1.5px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                            boxSizing: "border-box",
                            transition: "all 0.15s ease",
                          }}
                        />
                      </button>
                    );
                  }
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "12px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "13px 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      backgroundColor: "#ffffff",
                      color: "#475569",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep2}
                    disabled={!gender}
                    style={{
                      flex: 1,
                      backgroundColor: gender ? "#ea4c38" : "#cbd5e1",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 700,
                      padding: "13px 20px",
                      borderRadius: "12px",
                      border: "none",
                      cursor: gender ? "pointer" : "not-allowed",
                      transition: "all 0.15s ease",
                      boxShadow: gender ? "0 4px 14px rgba(234, 76, 56, 0.28)" : "none",
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    }}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#f8fafc",
                    border: "2px dashed #cbd5e1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ea4c38")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
                >
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt="Uploaded Avatar"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : selectedPreset ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor:
                          PRESET_AVATARS.find((p) => p.id === selectedPreset)?.bg || "#fef2f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                      }}
                    >
                      {PRESET_AVATARS.find((p) => p.id === selectedPreset)?.emoji}
                    </div>
                  ) : (
                    <>
                      <Camera size={26} color="#64748b" />
                      <span
                        style={{
                          fontSize: "10.5px",
                          color: "#64748b",
                          fontWeight: 600,
                          marginTop: "4px",
                        }}
                      >
                        Upload photo
                      </span>
                    </>
                  )}
                </div>

                <div style={{ width: "100%" }}>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: "#64748b",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    Or choose an avatar
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {PRESET_AVATARS.map((preset) => {
                      const isSelected = selectedPreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor: preset.bg,
                            border: isSelected ? "2px solid #ea4c38" : "1.5px solid #e2e8f0",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            transform: isSelected ? "scale(1.1)" : "scale(1)",
                          }}
                        >
                          {preset.emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    marginTop: "6px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "13px 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      backgroundColor: "#ffffff",
                      color: "#475569",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    style={{
                      flex: 1,
                      backgroundColor: "#ea4c38",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 700,
                      padding: "13px 20px",
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(234, 76, 56, 0.28)",
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    }}
                  >
                    {photoUrl || selectedPreset ? "Next" : "Continue without photo"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  Skip for now
                </button>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "#fef2f0",
                    border: "2px solid #fed7d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ea4c38",
                    boxShadow: "0 6px 20px rgba(234, 76, 56, 0.18)",
                  }}
                >
                  <Sparkles size={36} />
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: "0 0 6px 0",
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    }}
                  >
                    You&apos;re all set!
                  </h2>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      margin: 0,
                      lineHeight: 1.5,
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  >
                    Welcome to Cartesian, <strong style={{ color: "#0f172a" }}>@{username || "explorer"}</strong>. Your personal shopping copilot is ready to assist you.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  style={{
                    width: "100%",
                    backgroundColor: "#ea4c38",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "14px 20px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: "0 4px 16px rgba(234, 76, 56, 0.32)",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d93b27";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ea4c38";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>Start Browsing</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
