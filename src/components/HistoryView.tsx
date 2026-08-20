"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Clock,
  MoreVertical,
  MessageSquare,
  ShoppingBag,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AiAssistantIcon } from "./Icons";
import { ProductItem } from "./ProductCard";
import { ConversationThread, initialConversations } from "@/data/conversations";

interface HistoryViewProps {
  conversations?: ConversationThread[];
  onUpdateConversations?: (updated: ConversationThread[]) => void;
  onContinueConversation?: (convo: ConversationThread) => void;
  onAddToCart?: (product: ProductItem) => void;
}

export default function HistoryView({
  conversations = initialConversations,
  onUpdateConversations,
  onContinueConversation,
  onAddToCart,
}: HistoryViewProps) {
  const [localList, setLocalList] = useState<ConversationThread[]>(conversations);
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>(
    localList.length > 0 ? localList[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const updateList = (newList: ConversationThread[]) => {
    setLocalList(newList);
    if (onUpdateConversations) {
      onUpdateConversations(newList);
    }
  };

  const activeConvo = localList.find((c) => c.id === selectedConvoId) || null;

  const filteredConversations = localList.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  });

  const groupToday = filteredConversations.filter((c) => c.group === "today");
  const groupYesterday = filteredConversations.filter((c) => c.group === "yesterday");
  const groupPrev7 = filteredConversations.filter((c) => c.group === "previous7Days");

  const handleStartRename = (convo: ConversationThread, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(convo.id);
    setEditTitle(convo.title);
    setActiveMenuId(null);
  };

  const handleSaveRename = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editTitle.trim()) {
      const updated = localList.map((c) =>
        c.id === id ? { ...c, title: editTitle.trim() } : c
      );
      updateList(updated);
    }
    setEditingId(null);
  };

  const handleCancelRename = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(null);
  };

  const handleDeleteConvo = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = localList.filter((c) => c.id !== id);
    updateList(updated);
    if (selectedConvoId === id) {
      setSelectedConvoId(updated.length > 0 ? updated[0].id : null);
    }
    setActiveMenuId(null);
  };

  const handleNewChat = () => {
    const newId = `convo-${Date.now()}`;
    const newThread: ConversationThread = {
      id: newId,
      title: "New Shopping Session",
      lastMessage: "Hi, this is your Cartesian AI Agent. What are you looking for today?",
      timestamp: "Just now",
      group: "today",
      productsExplored: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "agent",
          text: "Hi, this is your Cartesian AI Agent. What are you looking for today?",
          timestamp: "Just now",
        },
      ],
    };

    const updated = [newThread, ...localList];
    updateList(updated);
    setSelectedConvoId(newId);

    if (onContinueConversation) {
      onContinueConversation(newThread);
    }
  };

  const renderConvoCard = (convo: ConversationThread) => {
    const isSelected = selectedConvoId === convo.id;
    const isEditing = editingId === convo.id;

    return (
      <div
        key={convo.id}
        onClick={() => {
          if (!isEditing) {
            setSelectedConvoId(convo.id);
          }
        }}
        style={{
          padding: "12px 14px",
          borderRadius: "12px",
          backgroundColor: isSelected ? "#ffffff" : "#f8fafc",
          border: isSelected ? "1.5px solid #ea4c38" : "1.5px solid #e2e8f0",
          boxShadow: isSelected
            ? "0 4px 16px rgba(234, 76, 56, 0.10), 0 1px 3px rgba(0, 0, 0, 0.04)"
            : "0 1px 3px rgba(0, 0, 0, 0.02)",
          cursor: "pointer",
          transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.borderColor = "#cbd5e1";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "#f8fafc";
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.02)";
          }
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {isEditing ? (
            <div
              style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveRename(convo.id);
                  if (e.key === "Escape") handleCancelRename();
                }}
                autoFocus
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0f172a",
                  border: "2px solid #ea4c38",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                }}
              />
              <button
                onClick={(e) => handleSaveRename(convo.id, e)}
                style={{
                  background: "#10b981",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  padding: "5px 7px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Save title"
              >
                <Check size={13} />
              </button>
              <button
                onClick={handleCancelRename}
                style={{
                  background: "#64748b",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  padding: "5px 7px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Cancel"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: "13.5px",
                    fontWeight: isSelected ? 700 : 600,
                    color: isSelected ? "#ea4c38" : "#0f172a",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  }}
                  title={convo.title}
                >
                  {convo.title}
                </h4>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: isSelected ? "#ea4c38" : "#64748b",
                    backgroundColor: isSelected ? "#fef2f0" : "#f1f5f9",
                    padding: "2px 6px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  {convo.timestamp}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === convo.id ? null : convo.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "4px",
                    cursor: "pointer",
                    color: "#64748b",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                  title="Options"
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <p
            style={{
              fontSize: "12px",
              color: isSelected ? "#334155" : "#64748b",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              lineHeight: 1.4,
            }}
          >
            {convo.lastMessage}
          </p>
        )}

        {activeMenuId === convo.id && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "36px",
              right: "10px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #cbd5e1",
              borderRadius: "10px",
              boxShadow: "0 10px 28px rgba(15, 23, 42, 0.14)",
              padding: "5px",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              minWidth: "130px",
            }}
          >
            <button
              onClick={(e) => handleStartRename(convo, e)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 10px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#1e293b",
                border: "none",
                background: "none",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Edit2 size={13} color="#475569" />
              <span>Rename</span>
            </button>

            <button
              onClick={(e) => handleDeleteConvo(convo.id, e)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 10px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#ea4c38",
                border: "none",
                background: "none",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef2f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Trash2 size={13} color="#ea4c38" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        gap: "18px",
        padding: "16px 0",
      }}
      onClick={() => setActiveMenuId(null)}
    >
      <div
        style={{
          width: "350px",
          minWidth: "320px",
          maxWidth: "380px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8fafc",
          borderRadius: "16px",
          border: "1.5px solid #cbd5e1",
          padding: "16px 14px",
          boxSizing: "border-box",
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                backgroundColor: "#fef2f0",
                border: "1px solid #fecaca",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ea4c38",
                flexShrink: 0,
              }}
            >
              <Clock size={16} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                Conversation & Shopping History
              </h3>
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: 500,
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                }}
              >
                {localList.length} saved sessions
              </span>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "#ea4c38",
              color: "#ffffff",
              fontSize: "11.5px",
              fontWeight: 700,
              padding: "6px 11px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(234, 76, 56, 0.28)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d93b27";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ea4c38";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Plus size={13} />
            <span>New Chat</span>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#ffffff",
            border: "1.5px solid #cbd5e1",
            borderRadius: "10px",
            padding: "8px 12px",
            marginBottom: "14px",
            width: "100%",
            boxSizing: "border-box",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.02)",
            transition: "border-color 0.15s ease",
          }}
        >
          <Search size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search past conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "12.5px",
              color: "#0f172a",
              width: "100%",
              backgroundColor: "transparent",
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div
          className="curated-scrollbar"
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            paddingRight: "4px",
          }}
        >
          {groupToday.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ paddingLeft: "4px", paddingTop: "2px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ea4c38",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  Today
                </span>
              </div>
              {groupToday.map(renderConvoCard)}
            </div>
          )}

          {groupYesterday.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ paddingLeft: "4px", paddingTop: "2px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#64748b",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  Yesterday
                </span>
              </div>
              {groupYesterday.map(renderConvoCard)}
            </div>
          )}

          {groupPrev7.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ paddingLeft: "4px", paddingTop: "2px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#64748b",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  }}
                >
                  Previous 7 Days
                </span>
              </div>
              {groupPrev7.map(renderConvoCard)}
            </div>
          )}

          {filteredConversations.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 10px",
                color: "#64748b",
                textAlign: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                <MessageSquare size={20} />
              </div>
              <p style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: "#334155" }}>
                No matching conversations
              </p>
              <p style={{ fontSize: "11.5px", margin: 0, color: "#64748b" }}>
                Try searching for different product keywords
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1.5px solid #cbd5e1",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
        }}
      >
        <AnimatePresence mode="wait">
          {activeConvo ? (
            <motion.div
              key={activeConvo.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1.5px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                flexShrink: 0,
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: "1.5px solid #fecaca",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(234, 76, 56, 0.15)",
                    flexShrink: 0,
                  }}
                >
                  <AiAssistantIcon size={20} color="#ea4c38" strokeWidth={1.5} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: 0,
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {activeConvo.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "11.5px",
                      color: "#475569",
                      margin: "2px 0 0 0",
                      fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Last active: {activeConvo.timestamp} • {activeConvo.messages.length} messages
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => handleStartRename(activeConvo)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "8px 13px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#334155",
                    cursor: "pointer",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                    e.currentTarget.style.borderColor = "#94a3b8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                >
                  <Edit2 size={13} />
                  <span>Rename</span>
                </button>

                <button
                  onClick={() => handleDeleteConvo(activeConvo.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "8px 13px",
                    borderRadius: "8px",
                    border: "1.5px solid #fecaca",
                    backgroundColor: "#fef2f0",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ea4c38",
                    cursor: "pointer",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fef2f0")}
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div
              className="curated-scrollbar"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                backgroundColor: "#ffffff",
              }}
            >
              {activeConvo.messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isUser ? "flex-end" : "flex-start",
                      gap: "6px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: isUser ? "#475569" : "#ea4c38",
                        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                        padding: "0 4px",
                      }}
                    >
                      {!isUser && <Sparkles size={13} />}
                      <span>{isUser ? "You" : "Cartesian AI"}</span>
                      <span style={{ color: "#94a3b8" }}>•</span>
                      <span style={{ color: "#64748b", fontWeight: 400 }}>{msg.timestamp}</span>
                    </div>

                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "14px 18px",
                        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        backgroundColor: isUser ? "#2c3e50" : "#f8fafc",
                        color: isUser ? "#ffffff" : "#0f172a",
                        border: isUser ? "none" : "1.5px solid #e2e8f0",
                        fontSize: "13.5px",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                        boxShadow: isUser
                          ? "0 4px 14px rgba(44, 62, 80, 0.18)"
                          : "0 2px 8px rgba(0, 0, 0, 0.03)",
                        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {onContinueConversation && (
              <div
                style={{
                  padding: "14px 24px",
                  borderTop: "1.5px solid #cbd5e1",
                  backgroundColor: "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      backgroundColor: "#ffedd5",
                      border: "1px solid #fed7aa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ea4c38",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "12.5px",
                        color: "#9a3412",
                        fontWeight: 700,
                        display: "block",
                        fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                      }}
                    >
                      Ready to resume this session?
                    </span>
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#c2410c",
                        fontWeight: 500,
                        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                      }}
                    >
                      Load this exact conversation into the Cartesian AI Agent and continue shopping.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onContinueConversation(activeConvo)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    backgroundColor: "#2c3e50",
                    color: "#ffffff",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    padding: "9px 18px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(44, 62, 80, 0.20)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ea4c38";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2c3e50";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>Continue in Home</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty-history"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              color: "#64748b",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#f8fafc",
                border: "2px solid #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
              }}
            >
              <MessageSquare size={28} />
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              }}
            >
              No conversation selected
            </h3>
            <p
              style={{
                fontSize: "13px",
                maxWidth: "360px",
                margin: 0,
                color: "#475569",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                lineHeight: 1.5,
              }}
            >
              Choose a past conversation from the left history sidebar to preview its dialogue and continue shopping.
            </p>
            <button
              onClick={handleNewChat}
              style={{
                backgroundColor: "#ea4c38",
                color: "#ffffff",
                fontSize: "12.5px",
                fontWeight: 700,
                padding: "9px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                marginTop: "6px",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                boxShadow: "0 3px 10px rgba(234, 76, 56, 0.28)",
              }}
            >
              Start New Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
