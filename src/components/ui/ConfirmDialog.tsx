"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onCancel}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.45)",
              backdropFilter: "blur(6px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.05)",
              padding: "24px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              zIndex: 1,
            }}
          >
            <button
              onClick={onCancel}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0f172a";
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: variant === "danger" ? "#fff1ee" : "#fefce8",
                  border: variant === "danger" ? "1.5px solid #fecaca" : "1.5px solid #fef08a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: variant === "danger" ? "#ea4c38" : "#d97706",
                  flexShrink: 0,
                  boxShadow: variant === "danger"
                    ? "0 4px 12px rgba(234, 76, 56, 0.12)"
                    : "0 4px 12px rgba(217, 119, 6, 0.12)",
                }}
              >
                {variant === "danger" ? <Trash2 size={20} /> : <AlertTriangle size={20} />}
              </div>

              <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
                <h3
                  style={{
                    fontSize: "16.5px",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: 0,
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    margin: "6px 0 0 0",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                paddingTop: "6px",
              }}
            >
              <button
                onClick={onCancel}
                style={{
                  padding: "9px 16px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  cursor: "pointer",
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                  e.currentTarget.style.borderColor = "#94a3b8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
              >
                {cancelLabel}
              </button>

              <button
                onClick={onConfirm}
                style={{
                  padding: "9px 18px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: variant === "danger" ? "#ea4c38" : "#d97706",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#ffffff",
                  cursor: "pointer",
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  boxShadow: variant === "danger"
                    ? "0 4px 14px rgba(234, 76, 56, 0.28)"
                    : "0 4px 14px rgba(217, 119, 6, 0.28)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = variant === "danger" ? "#d93b27" : "#b45309";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = variant === "danger" ? "#ea4c38" : "#d97706";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
