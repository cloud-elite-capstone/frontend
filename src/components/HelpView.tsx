"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Bot,
  Truck,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  LifeBuoy,
  FileQuestion,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "agent" | "shipping" | "billing" | "security";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "f1",
    category: "agent",
    question: "How does the Cartesian AI Copilot discover the best deals?",
    answer:
      "Cartesian AI continuously indexes verified regional merchant inventories, price histories, and promotional stacks. It calculates price arbitrage and automatically applies store coupons and bundle incentives to guarantee optimal logic-driven pricing.",
  },
  {
    id: "f2",
    category: "agent",
    question: "How do I customize the AI's shopping directives and preferences?",
    answer:
      "You can configure custom system instructions under Settings → Agent Profile & Instructions. Here, you can guide the assistant's persona, establish strict budget constraints, toggle fairtrade filters, or demand concise bullet comparisons.",
  },
  {
    id: "f3",
    category: "shipping",
    question: "What is the Nearby Hub delivery radius and same-day delivery?",
    answer:
      "When viewing items with the 'Nearby' badge or using the Map & Nearby view, Cartesian filters local fulfillment depots located within a 5 km radius. Orders placed before 4:00 PM are dispatched via localized dispatch couriers for same-day delivery.",
  },
  {
    id: "f4",
    category: "shipping",
    question: "How can I track my courier in real-time?",
    answer:
      "Once an order is confirmed, open the Map & Nearby tab or check your Notifications tray. You will receive live GPS telemetry updates as the courier leaves the regional depot.",
  },
  {
    id: "f5",
    category: "billing",
    question: "What payment methods are supported on Cartesian?",
    answer:
      "Cartesian supports direct 1-click GCash wallet linkage, Visa/Mastercard debit and credit cards, and cash on local hub pickup. All transactions are encrypted with zero-trust checkout authorization.",
  },
  {
    id: "f6",
    category: "security",
    question: "How does Two-Factor Authentication (2FA) protect autonomous carts?",
    answer:
      "When 2FA is activated in Settings → Security & Privacy, high-value autonomous cart checkouts require biometric authorization or a one-time passcode before payment execution.",
  },
];

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("f1");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleToggleFaq = (id: string) => {
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubject("");
      setTicketMessage("");
      setTicketSubmitted(false);
    }, 4000);
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

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
              <span style={{ color: "#ea4c38" }}>Cart</span><span style={{ color: "#2c3e50" }}>esian</span> Help & Support
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
              24/7 AI Desk
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b" }}>
            Find answers, learn how to configure your AI copilot, or submit an expedited support request.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#f8f9fa",
            border: "1.5px solid #cbd5e1",
            borderRadius: "12px",
            padding: "8px 14px",
            width: "300px",
          }}
        >
          <Search size={14} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search guides & answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "12.5px",
              color: "#1e293b",
              width: "100%",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
          
          <div
            style={{
              backgroundColor: "#fef2f0",
              borderRadius: "16px",
              padding: "22px 26px",
              border: "1.5px solid #fed7d2",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 16px rgba(234, 76, 56, 0.04)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Sparkles size={16} color="#ea4c38" />
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>
                  Need fast shopping advice or order assistance?
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", maxWidth: "600px", lineHeight: "1.5" }}>
                The Cartesian AI Copilot can answer questions about order statuses, store warranty policies, and recommend items tailored to your custom system instructions.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="#submit-ticket"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "9px 18px",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  color: "#ea4c38",
                  border: "1px solid #fed7d2",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                }}
              >
                <Mail size={14} />
                <span>Contact Desk</span>
              </a>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
              Browse Support Topics
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "14px" }}>
              {[
                {
                  cat: "agent",
                  title: "AI Agent & Copilot",
                  desc: "Learn about system instructions, deal arbitrations, and product memory.",
                  icon: Bot,
                  color: "#ea4c38",
                  bg: "#fef2f0",
                },
                {
                  cat: "shipping",
                  title: "Hubs & Delivery",
                  desc: "Nearby depot routing, same-day delivery radius, and courier tracking.",
                  icon: Truck,
                  color: "#f59e0b",
                  bg: "#fefce8",
                },
                {
                  cat: "billing",
                  title: "Payments & Wallets",
                  desc: "GCash 1-click linkages, card management, and coupon stacking rules.",
                  icon: CreditCard,
                  color: "#2c3e50",
                  bg: "#edf0f2",
                },
                {
                  cat: "security",
                  title: "Security & Privacy",
                  desc: "2FA biometric checkout authorizations and privacy protocols.",
                  icon: ShieldCheck,
                  color: "#10b981",
                  bg: "#ecfdf5",
                },
              ].map((card) => {
                const Icon = card.icon;
                const isSelected = selectedCategory === card.cat;
                return (
                  <div
                    key={card.cat}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === card.cat ? "all" : card.cat)
                    }
                    style={{
                      padding: "16px 18px",
                      borderRadius: "14px",
                      border: isSelected ? `1.5px solid ${card.color}` : "1.5px solid #cbd5e1",
                      backgroundColor: isSelected ? card.bg : "#f8f9fa",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        backgroundColor: card.bg,
                        color: card.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                      {card.title}
                    </div>
                    <p style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.4" }}>
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
                Frequently Asked Questions
              </h3>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                {filteredFaqs.length} article{filteredFaqs.length !== 1 ? "s" : ""} found
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {filteredFaqs.length === 0 ? (
                <div
                  style={{
                    padding: "24px",
                    textAlign: "center",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "14px",
                    border: "1.5px solid #cbd5e1",
                    color: "#94a3b8",
                    fontSize: "13px",
                  }}
                >
                  No matching help articles found for "{searchQuery}".
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      style={{
                        borderRadius: "12px",
                        border: isExpanded ? "1.5px solid #fca59b" : "1.5px solid #cbd5e1",
                        backgroundColor: isExpanded ? "#ffffff" : "#f8f9fa",
                        boxShadow: isExpanded ? "0 4px 14px rgba(234, 76, 56, 0.05)" : "none",
                        transition: "all 0.18s ease",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => handleToggleFaq(faq.id)}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          textAlign: "left",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={16} color="#ea4c38" />
                        ) : (
                          <ChevronDown size={16} color="#94a3b8" />
                        )}
                      </button>

                      {isExpanded && (
                        <div
                          style={{
                            padding: "0 18px 14px 18px",
                            fontSize: "12px",
                            color: "#475569",
                            lineHeight: "1.6",
                            borderTop: "1px solid #cbd5e1",
                            paddingTop: "10px",
                          }}
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div
            id="submit-ticket"
            style={{
              padding: "22px 26px",
              borderRadius: "16px",
              backgroundColor: "#f8f9fa",
              border: "1.5px solid #cbd5e1",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
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
                <LifeBuoy size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                  Submit an Expedited Support Ticket
                </h3>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                  Our specialized commerce team responds in under 2 hours.
                </p>
              </div>
            </div>

            {ticketSubmitted ? (
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  color: "#065f46",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={18} color="#10b981" />
                <span>Your support ticket has been logged! Ticket #CR-94821 dispatched to support@cartesian.shop.</span>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Subject or Inquiry Category
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question regarding same-day courier dispatch in BGC Taguig"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      color: "#1e293b",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you're experiencing or ask any question about your cart, delivery, or account..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #e2e8f0",
                      fontSize: "13px",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                      color: "#1e293b",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                  <button
                    type="submit"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "9px 22px",
                      borderRadius: "20px",
                      backgroundColor: "#ea4c38",
                      color: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d93b27")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ea4c38")}
                  >
                    <span>Submit Ticket</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
