"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle2, ArrowRight, Mail } from "lucide-react";

interface BecomeSellerViewProps {
  onBack?: () => void;
}

// local vendor onboarding landing page
export default function BecomeSellerView({ onBack }: BecomeSellerViewProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        color: "#0f172a",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "28px 48px",
          width: "100%",
          maxWidth: "1350px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {onBack && (
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              fontWeight: 700,
              color: "#1e293b",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ea4c38";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1e293b";
            }}
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Back</span>
          </button>
        )}
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 48px 60px 48px",
          maxWidth: "1350px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "56px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ width: "fit-content", marginBottom: "4px" }}>
              <Image
                src="/cartesian_logo.png"
                alt="Cartesian Logo"
                width={340}
                height={75}
                priority
                unoptimized
                style={{
                  objectFit: "contain",
                  display: "block",
                  maxHeight: "75px",
                  maxWidth: "340px",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>

            <h1
              style={{
                fontSize: "48px",
                lineHeight: 1.12,
                fontWeight: 800,
                color: "#ea4c38",
                margin: 0,
                letterSpacing: "-1px",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              }}
            >
              Join a Higher Plane of Commerce.
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.55,
                fontWeight: 700,
                color: "#2c3e50",
                margin: 0,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              <span style={{ color: "#f59e0b" }}>Calling all local vendors:</span> We are currently preparing our exclusive merchant dashboard. Be the first to know when we open our doors to local partners.
            </p>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "#475569",
                margin: 0,
              }}
            >
              Stop competing with a million search results. Cartesian is an AI-driven personal concierge that connects your local, physical inventory directly to buyers in your area who are actively looking for your exact products. We are fine-tuning the merchant experience and will be launching our seller program soon.
            </p>

            <div style={{ marginTop: "8px" }}>
              {isSubmitted ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#047857",
                    fontSize: "14.5px",
                    fontWeight: 700,
                    padding: "12px 0",
                  }}
                >
                  <CheckCircle2 size={20} color="#10b981" />
                  <span>You are on our priority vendor whitelist. We will notify you the moment registration opens.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    maxWidth: "520px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#f8fafc",
                      border: "1.5px solid #cbd5e1",
                      borderRadius: "10px",
                      padding: "0 14px",
                      height: "48px",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease",
                    }}
                  >
                    <Mail size={16} color="#94a3b8" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your store or merchant email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        color: "#0f172a",
                        backgroundColor: "transparent",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 700,
                      height: "48px",
                      padding: "0 22px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.15s ease",
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) e.currentTarget.style.backgroundColor = "#d97706";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) e.currentTarget.style.backgroundColor = "#f59e0b";
                    }}
                  >
                    <span>{isSubmitting ? "Submitting..." : "Notify Me"}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "440px",
                height: "440px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(254, 243, 199, 0.8) 0%, rgba(254, 215, 209, 0.35) 55%, transparent 75%)",
                filter: "blur(20px)",
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "480px",
                height: "460px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/ecommerce campaign-cuate.png"
                alt="Ecommerce Campaign Illustration"
                fill
                priority
                unoptimized
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
