"use client";

import React, { useState } from "react";
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
  Plus
} from "lucide-react";

type SettingsTab = "account" | "ai" | "notifications" | "security" | "billing";

const DEFAULT_SYSTEM_INSTRUCTIONS = 
  "Always prioritize minimalist aesthetic tech accessories, prefer sustainable organic fabrics, and warn me if an item has less than 4.8 stars or ships internationally. Keep recommendations direct, structured, and bulleted.";

export default function SettingsView() {
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>("account");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("John Reniel");
  const [email, setEmail] = useState("john.reniel@example.com");
  const [phone, setPhone] = useState("+63 917 849 2011");
  const [currency, setCurrency] = useState("PHP (₱)");
  const [defaultHub, setDefaultHub] = useState("BGC Taguig Metro Hub");

  // AI Copilot & System Instructions
  const [systemInstructions, setSystemInstructions] = useState(DEFAULT_SYSTEM_INSTRUCTIONS);
  const [ecoPriority, setEcoPriority] = useState(true);
  const [sameDayDelivery, setSameDayDelivery] = useState(true);
  const [aiMemory, setAiMemory] = useState(true);

  // Notifications
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
      {/* Settings Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 28px",
          borderBottom: "1px solid #f0f0f2",
          backgroundColor: "#ffffff",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e1e1e", letterSpacing: "-0.3px" }}>
              Cartesian Settings
            </h2>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                backgroundColor: "#f5eefa",
                color: "#7a3e9d",
                padding: "2px 8px",
                borderRadius: "12px",
                border: "1px solid rgba(122, 62, 157, 0.2)",
              }}
            >
              AI Copilot v2.4
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>
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
            background: savedSuccess ? "#10b981" : "#7a3e9d",
            boxShadow: savedSuccess
              ? "0 4px 12px rgba(16, 185, 129, 0.3)"
              : "0 4px 12px rgba(122, 62, 157, 0.25)",
            transition: "all 0.2s ease",
            cursor: "pointer",
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

      {/* Main Settings Body with Left Sub-Navigation & Full-Width Content Pane */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left Sub-Tab Rail */}
        <aside
          style={{
            width: "230px",
            minWidth: "230px",
            borderRight: "1px solid #f0f0f2",
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            backgroundColor: "#fafafc",
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
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  color: isActive ? "#7a3e9d" : "#4b5563",
                  boxShadow: isActive ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "none",
                  border: isActive ? "1px solid #eaeaea" : "1px solid transparent",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={16} color={isActive ? "#7a3e9d" : "#6b7280"} />
                  <span>{tab.label}</span>
                </div>
                {isActive && <ChevronRight size={13} color="#7a3e9d" />}
              </button>
            );
          })}
        </aside>

        {/* Right Full-Width Scrollable Content Pane */}
        <div style={{ flex: 1, padding: "24px 36px", overflowY: "auto", width: "100%" }}>
          {/* TAB 1: ACCOUNT & PROFILE */}
          {activeSubTab === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", width: "100%", maxWidth: "1000px" }}>
              {/* Profile Avatar & Header Card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderRadius: "16px",
                  backgroundColor: "#fbfbfc",
                  border: "1px solid #f0f0f2",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#7a3e9d",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(122, 62, 157, 0.3)",
                    }}
                  >
                    JR
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#1e1e1e" }}>{fullName}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>{email}</div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#10b981", backgroundColor: "#ecfdf5", padding: "2px 8px", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
                        ✓ Verified Member
                      </span>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#f97316", backgroundColor: "#fff7ed", padding: "2px 8px", borderRadius: "8px", border: "1px solid #fed7aa" }}>
                        ★ Pro Saver
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#7a3e9d",
                    backgroundColor: "#f5eefa",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "1px solid rgba(122, 62, 157, 0.2)",
                    cursor: "pointer",
                  }}
                >
                  Change Avatar
                </button>
              </div>

              {/* Account Inputs Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e5e7eb",
                      fontSize: "13px",
                      color: "#1e1e1e",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e5e7eb",
                      fontSize: "13px",
                      color: "#1e1e1e",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e5e7eb",
                      fontSize: "13px",
                      color: "#1e1e1e",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                    Default Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "1.5px solid #e5e7eb",
                      fontSize: "13px",
                      color: "#1e1e1e",
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

              {/* Delivery Hub Localization */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
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
                      border: "1.5px solid #e5e7eb",
                      fontSize: "13px",
                      color: "#1e1e1e",
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
                      backgroundColor: "#f5eefa",
                      color: "#7a3e9d",
                      fontSize: "12px",
                      fontWeight: 600,
                      border: "1px solid rgba(122, 62, 157, 0.2)",
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

          {/* TAB 2: AGENT PROFILE & SYSTEM INSTRUCTIONS */}
          {activeSubTab === "ai" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", width: "100%", maxWidth: "1000px" }}>
              {/* Instruction for Agent Profile Settings (Gemini / System Instruction Style) */}
              <div
                style={{
                  padding: "22px 26px",
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #eaeaea",
                  boxShadow: "0 4px 18px rgba(122, 62, 157, 0.04)",
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
                        backgroundColor: "#f5eefa",
                        color: "#7a3e9d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Terminal size={17} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e1e1e", lineHeight: 1.2 }}>
                        Instruction for Agent Profile Settings
                      </h3>
                      <p style={{ fontSize: "12px", color: "#6b7280" }}>
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
                      color: "#9ca3af",
                      cursor: "pointer",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#fafafc",
                    }}
                  >
                    <RotateCcw size={12} />
                    Reset to Default
                  </button>
                </div>

                {/* Textarea for System Instructions */}
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
                      border: "1.5px solid #e5e7eb",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: "#1e1e1e",
                      backgroundColor: "#fafafc",
                      resize: "vertical",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7a3e9d")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    <span>System directives guide all chat and recommendation reasoning</span>
                    <span style={{ fontWeight: 600 }}>{systemInstructions.length} / 2,000</span>
                  </div>
                </div>

                {/* Quick Directive Chips */}
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#4b5563", marginBottom: "8px" }}>
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
                          backgroundColor: "#f5eefa",
                          color: "#7a3e9d",
                          border: "1px solid rgba(122, 62, 157, 0.2)",
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

              {/* Behavior Rule Toggles (Responsive Grid) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
                {/* Toggle 1: Eco & Fairtrade */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "14px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e1e1e", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Prioritize Fairtrade & Eco</span>
                      <Leaf size={14} color="#10b981" />
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                      Prioritize organic & verified sustainable items.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={ecoPriority}
                    onChange={(e) => setEcoPriority(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#7a3e9d", cursor: "pointer" }}
                  />
                </div>

                {/* Toggle 2: Same-Day Delivery Hub Routing */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "14px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e1e1e", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Nearby Depot Priority</span>
                      <Zap size={14} color="#f97316" />
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                      Filter sellers within 5 km for same-day delivery.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={sameDayDelivery}
                    onChange={(e) => setSameDayDelivery(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#7a3e9d", cursor: "pointer" }}
                  />
                </div>

                {/* Toggle 3: AI Context Memory */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "14px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e1e1e" }}>
                      Conversational Memory
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                      Recall sizing and past preferences across chat.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiMemory}
                    onChange={(e) => setAiMemory(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#7a3e9d", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeSubTab === "notifications" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px", borderRadius: "14px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e1e1e" }}>Price Drop Radar Alerts</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Instant alert when items in your curated list drop by &gt; 10% in price.</div>
                </div>
                <input
                  type="checkbox"
                  checked={dealRadar}
                  onChange={(e) => setDealRadar(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#7a3e9d", cursor: "pointer", marginTop: "2px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px", borderRadius: "14px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e1e1e" }}>Order & Courier Tracking</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Push notifications when nearby dispatch couriers are en route.</div>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#7a3e9d", cursor: "pointer", marginTop: "2px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px", borderRadius: "14px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e1e1e" }}>Weekly Savings Summary</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Receive an email digest of total savings unlocked by Cartesian AI.</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#7a3e9d", cursor: "pointer", marginTop: "2px" }}
                />
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & PRIVACY */}
          {activeSubTab === "security" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "20px", borderRadius: "16px", backgroundColor: "#fbfbfc", border: "1px solid #f0f0f2" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e1e1e", marginBottom: "6px" }}>
                  Two-Factor Authentication (2FA)
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "16px" }}>
                  Protect your autonomous cart checkout authorizations with 2FA biometric verification.
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#10b981", backgroundColor: "#ecfdf5", padding: "4px 10px", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
                    ✓ 2FA Enabled
                  </span>
                  <button style={{ fontSize: "12px", fontWeight: 600, color: "#7a3e9d", cursor: "pointer" }}>
                    Reconfigure
                  </button>
                </div>
              </div>

              <div style={{ padding: "20px", borderRadius: "16px", border: "1px solid #f0f0f2", backgroundColor: "#fbfbfc" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e1e1e", marginBottom: "6px" }}>
                  Active Devices & Sessions
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "#4b5563", marginTop: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Windows PC — Chrome 124</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>Current Active Session • Manila, PH</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>Active Now</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BILLING & PAYMENT */}
          {activeSubTab === "billing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "1000px" }}>
              <div style={{ padding: "20px", borderRadius: "16px", backgroundColor: "#fbfbfc", border: "1px solid #f0f0f2" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e1e1e" }}>
                      Saved Payment Methods
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
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
                      color: "#7a3e9d",
                      backgroundColor: "#f5eefa",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(122, 62, 157, 0.2)",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={14} />
                    Add Method
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                  {/* Card 1: GCash */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "24px", borderRadius: "6px", backgroundColor: "#007dfe", color: "#ffffff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        GCash
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e1e1e" }}>GCash Linked Wallet</div>
                        <div style={{ fontSize: "11px", color: "#6b7280" }}>+63 917 ••• •011 (Default)</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#7a3e9d", backgroundColor: "#f5eefa", padding: "2px 8px", borderRadius: "6px" }}>
                      Default
                    </span>
                  </div>

                  {/* Card 2: Visa */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "24px", borderRadius: "6px", backgroundColor: "#1a1f71", color: "#ffffff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        VISA
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e1e1e" }}>Visa Debit Card</div>
                        <div style={{ fontSize: "11px", color: "#6b7280" }}>•••• 4819 • Exp 08/28</div>
                      </div>
                    </div>
                    <button style={{ fontSize: "12px", color: "#6b7280", cursor: "pointer" }}>Edit</button>
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
