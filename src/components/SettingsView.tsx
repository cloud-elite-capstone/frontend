"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  User, 
  Bot, 
  Bell, 
  Shield, 
  CreditCard, 
  Check, 
  Save, 
  MapPin, 
  Leaf, 
  Zap, 
  ChevronRight, 
  Terminal, 
  RotateCcw, 
  Plus, 
  LogOut,
  Camera
} from "lucide-react";
import { UserProfile, defaultUserProfile } from "@/data/userProfile";

type SettingsTab = "account" | "ai" | "notifications" | "security" | "billing";

const DEFAULT_SYSTEM_INSTRUCTIONS = 
  "Always prioritize minimalist aesthetic tech accessories, prefer sustainable organic fabrics, and warn me if an item has less than 4.8 stars or ships internationally. Keep recommendations direct, structured, and bulleted.";

interface SettingsViewProps {
  userProfile?: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export default function SettingsView({
  userProfile = defaultUserProfile,
  onUpdateProfile,
}: SettingsViewProps) {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>("account");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState(userProfile.fullName);
  const [username, setUsername] = useState(userProfile.username);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile.avatarUrl);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [currency, setCurrency] = useState(userProfile.currency);
  const [defaultHub, setDefaultHub] = useState(userProfile.defaultHub);

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName);
      setUsername(userProfile.username);
      setAvatarUrl(userProfile.avatarUrl);
      setEmail(userProfile.email);
      setPhone(userProfile.phone);
      setCurrency(userProfile.currency);
      setDefaultHub(userProfile.defaultHub);
    }
  }, [userProfile]);

  const [systemInstructions, setSystemInstructions] = useState(DEFAULT_SYSTEM_INSTRUCTIONS);
  const [ecoPriority, setEcoPriority] = useState(true);
  const [sameDayDelivery, setSameDayDelivery] = useState(true);
  const [aiMemory, setAiMemory] = useState(true);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [dealRadar, setDealRadar] = useState(true);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSave = () => {
    setSavedSuccess(true);

    const cleanUsername = username.trim().toLowerCase().replace(/^@+/, "");
    const updated: UserProfile = {
      fullName: fullName.trim() || "John Reniel",
      username: cleanUsername || "johnreniel",
      email: email.trim(),
      phone: phone.trim(),
      currency,
      defaultHub: defaultHub.trim(),
      avatarUrl,
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cartesian_user_profile", JSON.stringify(updated));
      } catch {}
    }

    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }

    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const insertQuickPrompt = (snippet: string) => {
    if (systemInstructions.includes(snippet)) return;
    setSystemInstructions((prev) => 
      prev.trim() ? `${prev.trim()} ${snippet}` : snippet
    );
  };

  const navTabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: "account", label: "Profile & Account", icon: User },
    { id: "ai", label: "Agent Profile & Instructions", icon: Bot },
    { id: "notifications", label: "Notifications & Radar", icon: Bell },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "billing", label: "Payment & Wallets", icon: CreditCard },
  ];

  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JR";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 28px",
          borderBottom: "1.5px solid #cbd5e1",
          backgroundColor: "#ffffff",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>
              <span style={{ color: "#ea4c38" }}>Cart</span><span style={{ color: "#2c3e50" }}>esian</span> Settings
            </h2>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                backgroundColor: "#fef2f0",
                color: "#ea4c38",
                padding: "2px 8px",
                borderRadius: "12px",
                border: "1.5px solid #fca59b",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              AI Copilot v2.4
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif", margin: 0 }}>
            Manage profile preferences, custom agent system instructions, and regional delivery routing.
          </p>
        </div>

        <button
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 600,
            padding: "8px 20px",
            borderRadius: "20px",
            color: "#ffffff",
            backgroundColor: savedSuccess ? "#10b981" : "#ea4c38",
            transition: "all 0.2s ease",
            cursor: "pointer",
            border: "none",
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            boxShadow: savedSuccess ? "0 2px 8px rgba(16, 185, 129, 0.25)" : "0 2px 8px rgba(234, 76, 56, 0.25)",
          }}
          onMouseEnter={(e) => {
            if (!savedSuccess) e.currentTarget.style.backgroundColor = "#d93b27";
          }}
          onMouseLeave={(e) => {
            if (!savedSuccess) e.currentTarget.style.backgroundColor = "#ea4c38";
          }}
        >
          {savedSuccess ? (
            <>
              <Check size={14} />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        <aside
          style={{
            width: "230px",
            minWidth: "230px",
            borderRight: "1.5px solid #cbd5e1",
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            backgroundColor: "#f8f9fa",
            overflowY: "auto",
          }}
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? "#fef2f0" : "transparent",
                  color: isActive ? "#ea4c38" : "#475569",
                  boxShadow: isActive ? "0 2px 8px rgba(234, 76, 56, 0.08)" : "none",
                  border: isActive ? "1px solid #fed7d2" : "1px solid transparent",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={16} color={isActive ? "#ea4c38" : "#64748b"} />
                  <span>{tab.label}</span>
                </div>
                {isActive && <ChevronRight size={13} color="#ea4c38" />}
              </button>
            );
          })}
        </aside>

        <div style={{ flex: 1, padding: "24px 36px", overflowY: "auto", width: "100%" }}>
          {activeSubTab === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", width: "100%", maxWidth: "1000px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderRadius: "16px",
                  backgroundColor: "#f8f9fa",
                  border: "1.5px solid #cbd5e1",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "#ea4c38",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(234, 76, 56, 0.25)",
                      overflow: "hidden",
                      position: "relative",
                      border: "2px solid #ffffff",
                      flexShrink: 0,
                    }}
                  >
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={fullName}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: "16.5px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>
                      {fullName}
                    </div>
                    <div style={{ fontSize: "12.5px", color: "#ea4c38", fontWeight: 600, marginTop: "1px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                      @{username}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                      {email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ea4c38",
                    backgroundColor: "#fef2f0",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #fed7d2",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fef2f0")}
                >
                  <Camera size={14} />
                  <span>Change Avatar</span>
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                    Username
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ffffff",
                      border: "1.5px solid #cbd5e1",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: "13px", marginRight: "4px" }}>
                      @
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        fontSize: "13px",
                        color: "#1e293b",
                        backgroundColor: "transparent",
                        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                    Default Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="PHP (₱)">PHP (₱) - Philippine Peso</option>
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                  Primary Delivery Hub & Region
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    value={defaultHub}
                    onChange={(e) => setDefaultHub(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  />
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 18px",
                      borderRadius: "12px",
                      backgroundColor: "#fef2f0",
                      color: "#ea4c38",
                      fontSize: "12px",
                      fontWeight: 600,
                      border: "1.5px solid #fed7d2",
                      cursor: "pointer",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  >
                    <MapPin size={14} />
                    Auto-Detect Hub
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "ai" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", width: "100%", maxWidth: "1000px" }}>
              <div
                style={{
                  padding: "22px 26px",
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #cbd5e1",
                  boxShadow: "0 4px 18px rgba(44, 62, 80, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        backgroundColor: "#fef2f0",
                        color: "#ea4c38",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Terminal size={17} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", lineHeight: 1.2, fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif", margin: 0 }}>
                        Instruction for Agent Profile Settings
                      </h3>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "3px 0 0 0", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                        System instructions and behavior directives given to the Cartesian AI Copilot.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSystemInstructions(DEFAULT_SYSTEM_INSTRUCTIONS)}
                    title="Reset to default instructions"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11px",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      backgroundColor: "#f8f9fa",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  >
                    <RotateCcw size={12} />
                    Reset to Default
                  </button>
                </div>

                <textarea
                  value={systemInstructions}
                  onChange={(e) => setSystemInstructions(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#1e293b",
                    backgroundColor: "#f8f9fa",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    resize: "vertical",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                    Quick Directive Presets
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {[
                      "Prioritize BGC Metro Hub stock with same-day dropoff.",
                      "Favor carbon-neutral certified vendors and eco packaging.",
                      "Always compare at least 3 alternatives before finalizing picks.",
                    ].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => insertQuickPrompt(preset)}
                        style={{
                          fontSize: "11.5px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          backgroundColor: "#f8f9fa",
                          border: "1.5px solid #cbd5e1",
                          color: "#334155",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#fef2f0";
                          e.currentTarget.style.borderColor = "#fca59b";
                          e.currentTarget.style.color = "#ea4c38";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f8f9fa";
                          e.currentTarget.style.borderColor = "#cbd5e1";
                          e.currentTarget.style.color = "#334155";
                        }}
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: "#ecfdf5", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Leaf size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Eco-First Routing</div>
                      <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Prioritize sustainable merchants</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={ecoPriority}
                    onChange={(e) => setEcoPriority(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                  />
                </div>

                <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: "#fef2f0", color: "#ea4c38", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Fast-Track Hub Delivery</div>
                      <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Auto-filter items with &lt;2h dispatch</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={sameDayDelivery}
                    onChange={(e) => setSameDayDelivery(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "18px 22px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Deal Radar Push Notifications</div>
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Get notified when wishlist items drop by more than 15%</div>
                </div>
                <input
                  type="checkbox"
                  checked={dealRadar}
                  onChange={(e) => setDealRadar(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                />
              </div>

              <div style={{ padding: "18px 22px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Order & Delivery Dispatch Updates</div>
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Real-time GPS status when rider leaves regional hub</div>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                />
              </div>

              <div style={{ padding: "18px 22px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Weekly AI Intelligence Digest</div>
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Summary of price trends and smart inventory matches</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                />
              </div>
            </div>
          )}

          {activeSubTab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "20px 24px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Two-Factor Authentication (2FA)</h4>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 14px 0", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Secure your Cartesian account with biometric passkeys or authenticator app.</p>
                <button
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ffffff",
                    backgroundColor: "#1e293b",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  Enable Authenticator 2FA
                </button>
              </div>

              <div style={{ padding: "20px 24px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Active Sessions</h4>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 14px 0", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Signed in from Manila, Philippines (Chrome on Windows) • Active Now</p>
                <button
                  onClick={() => router.push("/login")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ea4c38",
                    backgroundColor: "#fef2f0",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #fed7d2",
                    cursor: "pointer",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  <LogOut size={13} />
                  Sign Out from this Device
                </button>
              </div>
            </div>
          )}

          {activeSubTab === "billing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "20px 24px", borderRadius: "14px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", margin: 0, fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Saved Payment Methods</h4>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>1-Click checkout wallets and verified credit/debit cards</p>
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#ea4c38",
                      backgroundColor: "#fef2f0",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #fed7d2",
                      cursor: "pointer",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  >
                    <Plus size={14} />
                    Add Method
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "24px", borderRadius: "6px", backgroundColor: "#007dfe", color: "#ffffff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        GCash
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>GCash Linked Wallet</div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>+63 917 ••• •011 (Default)</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea4c38", backgroundColor: "#fef2f0", padding: "2px 8px", borderRadius: "6px", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                      Default
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1.5px solid #cbd5e1" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "24px", borderRadius: "6px", backgroundColor: "#1a1f71", color: "#ffffff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        VISA
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif" }}>Visa Debit Card</div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>•••• 4819 • Exp 08/28</div>
                      </div>
                    </div>
                    <button style={{ fontSize: "12px", color: "#64748b", cursor: "pointer", border: "none", background: "none", fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
