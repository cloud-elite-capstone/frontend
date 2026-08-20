"use client";

import React, { useState } from "react";
import {
  Search,
  Bot,
  Truck,
  CreditCard,
  ShieldCheck,
  Mail,
  ChevronDown,
  ChevronUp,
  Sparkles,
  LifeBuoy,
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
    question: "How does the Cartesian AI discover and curate products?",
    answer:
      "Cartesian indexes products from both local partner merchants and major external online retailers. The AI concierge matches items to your specific preferences, compares alternatives, and provides synthesized review telemetry so you always find the best product for your needs.",
  },
  {
    id: "f2",
    category: "shipping",
    question: "Does Cartesian handle shipping and delivery for all products?",
    answer:
      "Cartesian directly coordinates local delivery and dispatch exclusively for verified local partner merchants within your area. For external online stores (such as Shopee, Lazada, or official brand websites), Cartesian provides the curated recommendation and direct link—you will complete your checkout and delivery arrangements on the external merchant's platform.",
  },
  {
    id: "f3",
    category: "shipping",
    question: "How do I purchase products from external online merchants?",
    answer:
      "When viewing an item from an external merchant, simply click 'Visit Store Site' or 'Visit Store'. You will be redirected to the official external storefront where you can finalize your purchase, apply store-specific vouchers, and set your delivery address.",
  },
  {
    id: "f4",
    category: "shipping",
    question: "What is the Nearby Hub delivery radius for local merchants?",
    answer:
      "Items with the 'Nearby Cartesian Merchant' badge are stocked locally at partner storefronts and fulfillment hubs. When ordered through Cartesian, local orders are dispatched directly to your address for same-day delivery.",
  },
  {
    id: "f5",
    category: "billing",
    question: "What payment methods are supported for local orders on Cartesian?",
    answer:
      "For items purchased directly through Cartesian from local merchants, we support GCash, major credit/debit cards (Visa/Mastercard), and cash on local hub pickup with secure end-to-end encryption.",
  },
  {
    id: "f6",
    category: "agent",
    question: "How do I customize the AI's shopping directives and preferences?",
    answer:
      "You can configure custom shopping directives under Settings → Preferences & Instructions to fine-tune the AI's recommendations, price sensitivities, and response detail.",
  },
  {
    id: "f7",
    category: "security",
    question: "How does Cartesian protect your account and transaction data?",
    answer:
      "Cartesian uses industry-standard encryption for all localized checkout operations and user account settings. We never store or share your payment credentials with external websites.",
  },
];

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("f2");
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
            <h2 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px", margin: 0 }}>
              <span style={{ color: "#ea4c38" }}>Cart</span><span style={{ color: "#2c3e50" }}>esian</span> Help & Support
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
            Find answers, learn how Cartesian works with local and external merchants, or submit a support inquiry.
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
              <p style={{ fontSize: "12px", color: "#64748b", maxWidth: "600px", lineHeight: "1.5", margin: 0 }}>
                The Cartesian AI answers questions about product comparisons, warranty coverage, and helps you differentiate between local hub dispatch and external store links.
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
                  textDecoration: "none",
                }}
              >
                <Mail size={14} />
                <span>Contact Support</span>
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
                  cat: "shipping",
                  title: "Local Hubs & External Sites",
                  desc: "Understand local fulfillment vs external online merchant redirects.",
                  icon: Truck,
                  color: "#f59e0b",
                  bg: "#fefce8",
                },
                {
                  cat: "agent",
                  title: "AI Agent",
                  desc: "Learn about AI recommendations, review synthesis, and product memory.",
                  icon: Bot,
                  color: "#ea4c38",
                  bg: "#fef2f0",
                },
                {
                  cat: "billing",
                  title: "Payments & Cart",
                  desc: "Local merchant checkout methods, GCash, cards, and hub pickups.",
                  icon: CreditCard,
                  color: "#2c3e50",
                  bg: "#edf0f2",
                },
                {
                  cat: "security",
                  title: "Security & Privacy",
                  desc: "Encrypted data handling, secure account settings, and privacy protocols.",
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
                    <p style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.4", margin: 0 }}>
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
                            fontSize: "12.5px",
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
                  Submit a Support Inquiry
                </h3>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                  Our specialized commerce team will assist you with any local order or merchant questions.
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
                <span>Your inquiry has been submitted! Our support team will respond to your email.</span>
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
                    placeholder="e.g. Question regarding local merchant delivery or external vendor links"
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
                      boxSizing: "border-box",
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
                    placeholder="Describe what you're experiencing or ask any question about local delivery, external merchant redirects, or your account..."
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
                      boxSizing: "border-box",
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
                    <span>Submit Inquiry</span>
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
