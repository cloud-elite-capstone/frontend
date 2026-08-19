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

  // Calculate number of custom active filters
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
        background:
          "radial-gradient(circle at top right, #ffb86f 0%, #d8a8f5 32%, #c28fef 65%, #c28fef 100%)",
        borderRadius: "16px",
        boxShadow: "0 8px 28px rgba(194, 143, 239, 0.25)",
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 14px 14px 14px",
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
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/cartesian_symbol.png"
              alt="Cartesian AI"
              width={20}
              height={20}
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

      {/* Main Chat Canvas Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 16px 14px 16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Preference Dropdown Popover */}
        <ChatPreferenceDropdown
          isOpen={showPreferenceModal}
          onClose={() => setShowPreferenceModal(false)}
          preferences={preferences}
          onApply={(updated) => setPreferences(updated)}
        />

        {/* Center Greeting & Assistant Presence */}
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
              src="/cartesian_symbol.png"
              alt="Cartesian"
              width={38}
              height={38}
              style={{ objectFit: "contain" }}
            />
          </div>

          <h2
            style={{
              fontSize: "19px",
              fontWeight: 700,
              color: "#1e1e1e",
              marginBottom: "4px",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            Hello John!
          </h2>

          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#4a4a4a",
              paddingTop: "10px",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            What are you looking for today?
          </p>
        </div>

        {/* Prompt Input Box & Filter Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          {/* Active Filter Chips Summary */}
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
                    backgroundColor: "#f5eefa",
                    color: "#7a3e9d",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1px solid #ca98f1",
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
                    backgroundColor: "#fff7ed",
                    color: "#f97316",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1px solid #fed7aa",
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
                    backgroundColor: "#fff7ed",
                    color: "#f97316",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <Star size={10} />
                  <span>★ {preferences.minRating.toFixed(1)}+</span>
                  <X size={11} style={{ cursor: "pointer" }} onClick={handleRemoveRating} />
                </span>
              )}
            </div>
          )}

          {/* Prompt Card */}
          <div
            style={{
              width: "100%",
              borderRadius: "14px",
              border: "none",
              boxShadow: "0 0 24px 6px rgba(194, 143, 239, 0.38)",
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
                color: "#1e1e1e",
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
                    color: "#9ca3af",
                    border: "none",
                    background: "none",
                  }}
                  title="Attach file / image"
                >
                  <PlusIcon size={16} color="#9ca3af" />
                </button>

                {/* Set Preference Action with Active Filter Counter */}
                <button
                  onClick={() => setShowPreferenceModal(!showPreferenceModal)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: activeCount > 0 ? "#7a3e9d" : "#f5ebfc",
                    color: activeCount > 0 ? "#ffffff" : "#7a3e9d",
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
                  <FilterSlidersIcon size={12} color={activeCount > 0 ? "#ffffff" : "#7a3e9d"} />
                  <span>Set Preference{activeCount > 0 ? ` (${activeCount})` : ""}</span>
                  <ChevronDownIcon size={10} color={activeCount > 0 ? "#ffffff" : "#7a3e9d"} />
                </button>
              </div>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  color: inputValue.trim() ? "#7a3e9d" : "#c28fef",
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
              color: "#9ca3af",
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
