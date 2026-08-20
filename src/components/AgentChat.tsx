"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlusIcon,
  FilterSlidersIcon,
  ChevronDownIcon,
  SendIcon,
} from "./Icons";
import ChatPreferenceDropdown, {
  ChatSearchPreferences,
  DEFAULT_PREFERENCES,
} from "./ChatPreferenceDropdown";
import { X, MapPin, Tag, Star } from "lucide-react";

export default function AgentChat() {
  const [inputValue, setInputValue] = useState("");
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [preferences, setPreferences] = useState<ChatSearchPreferences>(DEFAULT_PREFERENCES);

  const getActiveFilterCount = () => {
    let count = 0;
    if (preferences.minPrice || preferences.maxPrice) count++;
    if (preferences.location.trim()) count++;
    if (preferences.minRating > 1.0) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  const handleRemoveBudget = () => {
    setPreferences((prev) => ({ ...prev, minPrice: "", maxPrice: "" }));
  };

  const handleRemoveLocation = () => {
    setPreferences((prev) => ({ ...prev, location: "" }));
  };

  const handleRemoveRating = () => {
    setPreferences((prev) => ({ ...prev, minRating: 1.0 }));
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "460px",
        height: "100%",
        minHeight: "480px",
        maxHeight: "100%",
        backgroundColor: "#2c3e50",
        border: "1.5px solid #1e293b",
        borderRadius: "16px",
        boxShadow: "0 8px 28px rgba(44, 62, 80, 0.18)",
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "20px 14px 12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/cartesian_symbol.png?v=2"
              alt="Cartesian AI"
              width={20}
              height={20}
              unoptimized
              style={{ objectFit: "contain" }}
            />
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.2px",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            AI Assistant
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => setInputValue("")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")}
            title="Start New Chat"
          >
            <PlusIcon size={16} color="#ffffff" />
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1.5px solid #cbd5e1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 16px 14px 16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <ChatPreferenceDropdown
          isOpen={showPreferenceModal}
          onClose={() => setShowPreferenceModal(false)}
          preferences={preferences}
          onApply={(updated) => setPreferences(updated)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Image
              src="/cartesian_symbol.png?v=2"
              alt="Cartesian"
              width={38}
              height={38}
              unoptimized
              style={{ objectFit: "contain" }}
            />
          </div>

          <h2
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#1e293b",
              lineHeight: 1.25,
              marginBottom: "4px",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            Hi, this is your Cartesian AI Agent
          </h2>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#64748b",
              paddingTop: "10px",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            What are you looking for today?
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          {activeCount > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                width: "100%",
                paddingBottom: "4px",
              }}
            >
              {(preferences.minPrice || preferences.maxPrice) && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    backgroundColor: "#fef2f0",
                    color: "#ea4c38",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1.5px solid #fca59b",
                  }}
                >
                  <Tag size={10} />
                  <span>
                    ₱{preferences.minPrice || "0"} - {preferences.maxPrice ? `₱${preferences.maxPrice}` : "Any"}
                  </span>
                  <X size={11} style={{ cursor: "pointer" }} onClick={handleRemoveBudget} />
                </span>
              )}

              {preferences.location.trim() && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    backgroundColor: "#fefce8",
                    color: "#b45309",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1.5px solid #f59e0b",
                  }}
                >
                  <MapPin size={10} />
                  <span>📍 {preferences.location}</span>
                  <X size={11} style={{ cursor: "pointer" }} onClick={handleRemoveLocation} />
                </span>
              )}

              {preferences.minRating > 1.0 && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    backgroundColor: "#fefce8",
                    color: "#b45309",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1.5px solid #f59e0b",
                  }}
                >
                  <Star size={10} color="#f59e0b" />
                  <span>★ {preferences.minRating.toFixed(1)}+</span>
                  <X size={11} style={{ cursor: "pointer" }} onClick={handleRemoveRating} />
                </span>
              )}
            </div>
          )}

          <div
            style={{
              width: "100%",
              borderRadius: "14px",
              border: "1.5px solid #cbd5e1",
              boxShadow: "0 4px 18px rgba(44, 62, 80, 0.08)",
              padding: "12px 14px 10px 14px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What are you looking for?"
              rows={2}
              style={{
                width: "100%",
                resize: "none",
                fontSize: "13px",
                color: "#1e293b",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                lineHeight: 1.4,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    color: "#94a3b8",
                    border: "none",
                    background: "none",
                  }}
                  title="Attach file / image"
                >
                  <PlusIcon size={16} color="#94a3b8" />
                </button>

                <button
                  onClick={() => setShowPreferenceModal(!showPreferenceModal)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: activeCount > 0 ? "#ea4c38" : "#fef2f0",
                    color: activeCount > 0 ? "#ffffff" : "#ea4c38",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <FilterSlidersIcon size={12} color={activeCount > 0 ? "#ffffff" : "#ea4c38"} />
                  <span>Set Preference{activeCount > 0 ? ` (${activeCount})` : ""}</span>
                  <ChevronDownIcon size={10} color={activeCount > 0 ? "#ffffff" : "#ea4c38"} />
                </button>
              </div>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  color: inputValue.trim() ? "#ea4c38" : "#fca59b",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
                title="Send Prompt"
              >
                <SendIcon size={16} color="currentColor" />
              </button>
            </div>
          </div>

          <span
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            AI can make mistakes.
          </span>
        </div>
      </div>
    </div>
  );
}
