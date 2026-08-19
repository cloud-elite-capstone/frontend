"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HistoryClockIcon,
  PlusIcon,
  FilterSlidersIcon,
  ChevronDownIcon,
  SendIcon,
} from "./Icons";

interface ConversationHistory {
  id: string;
  title: string;
  time: string;
}

const mockHistory: ConversationHistory[] = [
  { id: "1", title: "Wireless Earbuds with ANC under ₱2,000", time: "10m ago" },
  { id: "2", title: "Casual linen shirts for outdoor wedding", time: "2h ago" },
  { id: "3", title: "Bose vs Sony over-ear headphones", time: "Yesterday" },
  { id: "4", title: "Mechanical keyboards with brown switches", time: "Aug 16" },
  { id: "5", title: "Ergonomic desk accessories bundle", time: "Aug 12" },
];

export default function AgentChat() {
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);

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
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: showHistory ? "rgba(255, 255, 255, 0.25)" : "transparent",
                transition: "background-color 0.15s ease",
              }}
              title="See Conversation History"
            >
              <HistoryClockIcon size={16} color="#ffffff" />
            </button>

            {showHistory && (
              <div
                style={{
                  position: "absolute",
                  top: "34px",
                  right: "-10px",
                  width: "270px",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 28px rgba(122, 62, 157, 0.25), 0 2px 6px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #f0e4fc",
                  padding: "10px 6px",
                  zIndex: 100,
                }}
              >
                <div
                  style={{
                    padding: "4px 8px 6px 8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    color: "#7a3e9d",
                    borderBottom: "1px solid #f4ebfc",
                    marginBottom: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Chat History</span>
                  <span style={{ fontSize: "10px", fontWeight: 500, color: "#9ca3af" }}>
                    {mockHistory.length} saved
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {mockHistory.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedHistory(item.title);
                        setShowHistory(false);
                      }}
                      style={{
                        padding: "7px 8px",
                        borderRadius: "8px",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        backgroundColor: selectedHistory === item.title ? "#f4ebfc" : "transparent",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedHistory !== item.title) {
                          e.currentTarget.style.backgroundColor = "#faf5ff";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedHistory !== item.title) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#2d2d2d",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </span>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>{item.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setInputValue("");
              setSelectedHistory(null);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
            }}
            title="Start New Chat"
          >
            <PlusIcon size={18} color="#ffffff" />
          </button>
        </div>
      </div>

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
        }}
      >
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
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

                <button
                  onClick={() => setShowPreferenceModal(!showPreferenceModal)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "#f5ebfc",
                    color: "#7a3e9d",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FilterSlidersIcon size={12} color="#7a3e9d" />
                  <span>Set Preference</span>
                  <ChevronDownIcon size={10} color="#7a3e9d" />
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
