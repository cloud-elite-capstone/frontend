"use client";

import React, { useState } from "react";
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
  LogOut
} from "lucide-react";

type SettingsTab = "account" | "ai" | "notifications" | "security" | "billing";

const DEFAULT_SYSTEM_INSTRUCTIONS = 
  "Always prioritize minimalist aesthetic tech accessories, prefer sustainable organic fabrics, and warn me if an item has less than 4.8 stars or ships internationally. Keep recommendations direct, structured, and bulleted.";

export default function SettingsView() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>("account");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [fullName, setFullName] = useState("John Reniel");
  const [email, setEmail] = useState("john.reniel@example.com");
  const [phone, setPhone] = useState("+63 917 849 2011");
  const [currency, setCurrency] = useState("PHP (₱)");
  const [defaultHub, setDefaultHub] = useState("BGC Taguig Metro Hub");

  const [systemInstructions, setSystemInstructions] = useState(DEFAULT_SYSTEM_INSTRUCTIONS);
  const [ecoPriority, setEcoPriority] = useState(true);
  const [sameDayDelivery, setSameDayDelivery] = useState(true);
  const [aiMemory, setAiMemory] = useState(true);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [dealRadar, setDealRadar] = useState(true);

  const handleSave = () => {
    setSavedSuccess(true);
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
            <h2 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px" }}>
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
              }}
            >
              AI Copilot v2.4
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b" }}>
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
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#ea4c38",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(234, 76, 56, 0.25)",
                    }}
                  >
                    JR
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b" }}>{fullName}</div>
                    <div style={{ fontSize: "13px", color: "#64748b" }}>{email}</div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#10b981", backgroundColor: "#ecfdf5", padding: "2px 8px", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
                        ✓ Verified Member
                      </span>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#b45309", backgroundColor: "#fefce8", padding: "2px 8px", borderRadius: "8px", border: "1px solid #fde68a" }}>
                        ★ Pro Saver
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ea4c38",
                    backgroundColor: "#fef2f0",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "1px solid #fed7d2",
                    cursor: "pointer",
                  }}
                >
                  Change Avatar
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                    Default Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <option value="PHP (₱)">PHP (₱) - Philippine Peso</option>
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "#ffffff",
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
                      border: "1px solid #fed7d2",
                      cursor: "pointer",
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
                  border: "1.5px solid #e2e8f0",
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
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>
                        Instruction for Agent Profile Settings
                      </h3>
                      <p style={{ fontSize: "12px", color: "#64748b" }}>
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
                      color: "#94a3b8",
                      cursor: "pointer",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <RotateCcw size={12} />
                    Reset to Default
                  </button>
                </div>

                <div style={{ position: "relative" }}>
                  <textarea
                    rows={6}
                    value={systemInstructions}
                    onChange={(e) => setSystemInstructions(e.target.value)}
                    placeholder="What would you like Cartesian AI to know about you to provide better shopping recommendations and product evaluations? (e.g., Always prioritize minimalist tech accessories, prefer sustainable organic fabrics...)"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: "#1e293b",
                      backgroundColor: "#f8f9fa",
                      resize: "vertical",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c38")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                      fontSize: "11px",
                      color: "#94a3b8",
                    }}
                  >
                    <span>System directives guide all chat and recommendation reasoning</span>
                    <span style={{ fontWeight: 600 }}>{systemInstructions.length} / 2,000</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "8px" }}>
                    Quick Directive Templates:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {[
                      { label: "Minimalist Tech Focus", text: "Prioritize sleek minimalist aesthetics in gadgets." },
                      { label: "Fairtrade Only", text: "Filter only 100% fairtrade and organic items." },
                      { label: "Strict Budget Mode", text: "Highlight only items with the steepest verified discounts." },
                      { label: "Concise Bullets", text: "Format all product comparisons in short bullet points." },
                      { label: "Local Hubs Priority", text: "Always check stock in nearest regional depot first." },
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => insertQuickPrompt(chip.text)}
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "6px 12px",
                          borderRadius: "16px",
                          backgroundColor: "#fef2f0",
                          color: "#ea4c38",
                          border: "1px solid #fed7d2",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        + {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Prioritize Fairtrade & Eco</span>
                      <Leaf size={14} color="#10b981" />
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      Prioritize organic & verified sustainable items.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={ecoPriority}
                    onChange={(e) => setEcoPriority(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Nearby Depot Priority</span>
                      <Zap size={14} color="#f59e0b" />
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      Filter sellers within 5 km for same-day delivery.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={sameDayDelivery}
                    onChange={(e) => setSameDayDelivery(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>
                      Conversational Memory
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      Recall sizing and past preferences across chat.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiMemory}
                    onChange={(e) => setAiMemory(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "notifications" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Price Drop Radar Alerts</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Instant alert when items in your curated list drop by &gt; 10% in price.</div>
                </div>
                <input
                  type="checkbox"
                  checked={dealRadar}
                  onChange={(e) => setDealRadar(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer", marginTop: "2px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Order & Courier Tracking</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Push notifications when nearby dispatch couriers are en route.</div>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer", marginTop: "2px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Weekly Savings Summary</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Receive an email digest of total savings unlocked by Cartesian AI.</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#ea4c38", cursor: "pointer", marginTop: "2px" }}
                />
              </div>
            </div>
          )}

          {activeSubTab === "security" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "20px", borderRadius: "16px", backgroundColor: "#f8f9fa", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  Two-Factor Authentication (2FA)
                </div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
                  Protect your autonomous cart checkout authorizations with 2FA biometric verification.
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#10b981", backgroundColor: "#ecfdf5", padding: "4px 10px", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
                    ✓ 2FA Enabled
                  </span>
                  <button style={{ fontSize: "12px", fontWeight: 600, color: "#ea4c38", cursor: "pointer", border: "none", background: "none" }}>
                    Reconfigure
                  </button>
                </div>
              </div>

              <div style={{ padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", backgroundColor: "#f8f9fa" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  Active Devices & Sessions
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "#475569", marginTop: "12px", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Windows PC — Chrome 124</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>Current Active Session • Manila, PH</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>Active Now</span>
                </div>

                <div style={{ paddingTop: "12px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => router.push("/login")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#ef4444",
                      backgroundColor: "#fef2f2",
                      padding: "7px 14px",
                      borderRadius: "8px",
                      border: "1px solid #fecaca",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <LogOut size={13} />
                    Sign Out of Cartesian
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "billing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "20px", borderRadius: "16px", backgroundColor: "#f8f9fa", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>
                      Saved Payment Methods
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      Manage linked e-wallets and credit cards for 1-click checkout.
                    </div>
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
                      border: "1px solid #fed7d2",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={14} />
                    Add Method
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "24px", borderRadius: "6px", backgroundColor: "#007dfe", color: "#ffffff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        GCash
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>GCash Linked Wallet</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>+63 917 ••• •011 (Default)</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea4c38", backgroundColor: "#fef2f0", padding: "2px 8px", borderRadius: "6px" }}>
                      Default
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "24px", borderRadius: "6px", backgroundColor: "#1a1f71", color: "#ffffff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        VISA
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>Visa Debit Card</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>•••• 4819 • Exp 08/28</div>
                      </div>
                    </div>
                    <button style={{ fontSize: "12px", color: "#64748b", cursor: "pointer", border: "none", background: "none" }}>Edit</button>
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
