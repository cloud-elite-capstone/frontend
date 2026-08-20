"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  PlusIcon,
  FilterSlidersIcon,
  ChevronDownIcon,
  SendIcon,
  AiAssistantIcon,
} from "./Icons";
import ChatPreferenceDropdown, {
  ChatSearchPreferences,
  DEFAULT_PREFERENCES,
} from "./ChatPreferenceDropdown";
import { X, MapPin, Tag, Star, ShoppingBag } from "lucide-react";
import { ConversationThread, HistoryMessage } from "@/data/conversations";
import { ProductItem } from "./ProductCard";

interface AgentChatProps {
  activeConversation?: ConversationThread | null;
  onSendMessage?: (text: string) => void;
  onNewChat?: () => void;
  onAddToCart?: (product: ProductItem) => void;
}

export default function AgentChat({
  activeConversation,
  onSendMessage,
  onNewChat,
  onAddToCart,
}: AgentChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [preferences, setPreferences] = useState<ChatSearchPreferences>(DEFAULT_PREFERENCES);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = activeConversation?.messages || [];
  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

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

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (onSendMessage) {
      onSendMessage(inputValue.trim());
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
          padding: "16px 14px 10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
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
              flexShrink: 0,
            }}
          >
            <AiAssistantIcon size={16} color="#ea4c38" strokeWidth={1.5} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.2px",
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {activeConversation?.title || "AI Assistant"}
              </span>
            </div>
            {activeConversation && (
              <span
                style={{
                  fontSize: "10px",
                  color: "#94a3b8",
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                }}
              >
                {activeConversation.timestamp}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <button
            onClick={() => {
              if (onNewChat) {
                onNewChat();
              }
              setInputValue("");
            }}
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
          padding: "16px 14px 12px 14px",
          overflow: "hidden",
          position: "relative",
          minHeight: 0,
        }}
      >
        <ChatPreferenceDropdown
          isOpen={showPreferenceModal}
          onClose={() => setShowPreferenceModal(false)}
          preferences={preferences}
          onApply={(updated) => setPreferences(updated)}
        />

        {hasMessages ? (
          <div
            className="no-scrollbar"
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "2px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "8px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start",
                    gap: "4px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      padding: isUser ? "8px 12px" : "10px 12px",
                      borderRadius: isUser ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                      backgroundColor: isUser ? "#2c3e50" : "#f8f9fa",
                      color: isUser ? "#ffffff" : "#1e293b",
                      border: isUser ? "none" : "1px solid #e2e8f0",
                      fontSize: "12.5px",
                      lineHeight: 1.45,
                      boxShadow: isUser
                        ? "0 2px 8px rgba(44, 62, 80, 0.12)"
                        : "0 1px 4px rgba(0, 0, 0, 0.02)",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.products && msg.products.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        width: "100%",
                        maxWidth: "92%",
                        marginTop: "2px",
                      }}
                    >
                      {msg.products.map((p) => (
                        <div
                          key={p.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: "#ffffff",
                            border: "1.5px solid #cbd5e1",
                            borderRadius: "10px",
                            padding: "6px 8px",
                            boxShadow: "0 2px 6px rgba(44, 62, 80, 0.04)",
                          }}
                        >
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              position: "relative",
                              borderRadius: "6px",
                              overflow: "hidden",
                              backgroundColor: "#f1f5f9",
                              flexShrink: 0,
                            }}
                          >
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h5
                              style={{
                                fontSize: "11.5px",
                                fontWeight: 700,
                                margin: 0,
                                color: "#1e293b",
                                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {p.title}
                            </h5>
                            <span style={{ fontSize: "12px", fontWeight: 800, color: "#1e293b" }}>
                              {p.price}
                            </span>
                          </div>
                          {onAddToCart && (
                            <button
                              onClick={() =>
                                onAddToCart({
                                  id: p.id,
                                  title: p.title,
                                  subtitle: p.subtitle,
                                  price: p.price,
                                  priceNum: p.priceNum,
                                  imageUrl: p.imageUrl,
                                  rating: p.rating,
                                })
                              }
                              style={{
                                backgroundColor: "#ea4c38",
                                color: "#ffffff",
                                fontSize: "10px",
                                fontWeight: 700,
                                padding: "4px 8px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                flexShrink: 0,
                                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                              }}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(245, 158, 11, 0.3)",
                  filter: "blur(12px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AiAssistantIcon size={34} color="#ea4c38" strokeWidth={1.5} />
              </div>
            </div>

            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#1e293b",
                lineHeight: 1.25,
                marginTop: "10px",
                marginBottom: "4px",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              }}
            >
              Hi, this is your Cartesian AI Agent
            </h2>

            <p
              style={{
                fontSize: "12.5px",
                fontWeight: 400,
                color: "#64748b",
                paddingTop: "6px",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              What are you looking for today?
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            flexShrink: 0,
          }}
        >
          {activeCount > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                width: "100%",
                paddingBottom: "2px",
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
              padding: "10px 12px 8px 12px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasMessages ? "Reply to Cartesian AI..." : "What are you looking for?"}
              rows={2}
              style={{
                width: "100%",
                resize: "none",
                fontSize: "12.5px",
                color: "#1e293b",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
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
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <FilterSlidersIcon size={11} color={activeCount > 0 ? "#ffffff" : "#ea4c38"} />
                  <span>Set Preference{activeCount > 0 ? ` (${activeCount})` : ""}</span>
                  <ChevronDownIcon size={9} color={activeCount > 0 ? "#ffffff" : "#ea4c38"} />
                </button>
              </div>

              <button
                onClick={handleSend}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  color: inputValue.trim() ? "#ea4c38" : "#fca59b",
                  border: "none",
                  background: "none",
                  cursor: inputValue.trim() ? "pointer" : "default",
                }}
                title="Send Prompt"
              >
                <SendIcon size={16} color="currentColor" />
              </button>
            </div>
          </div>

          <span
            style={{
              fontSize: "10.5px",
              color: "#94a3b8",
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            AI can make mistakes.
          </span>
        </div>
      </div>
    </div>
  );
}
