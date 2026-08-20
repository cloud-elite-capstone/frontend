"use client";

import React, { useState } from "react";
import { 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  Tag, 
  RotateCcw, 
  Check, 
  X
} from "lucide-react";

export interface ChatSearchPreferences {
  minPrice: string;
  maxPrice: string;
  location: string;
  minRating: number;
}

export const DEFAULT_PREFERENCES: ChatSearchPreferences = {
  minPrice: "",
  maxPrice: "",
  location: "",
  minRating: 4.0,
};

interface ChatPreferenceDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: ChatSearchPreferences;
  onApply: (prefs: ChatSearchPreferences) => void;
}

export default function ChatPreferenceDropdown({
  isOpen,
  onClose,
  preferences,
  onApply,
}: ChatPreferenceDropdownProps) {
  const [draftPrefs, setDraftPrefs] = useState<ChatSearchPreferences>(preferences);

  if (!isOpen) return null;

  const handleReset = () => {
    setDraftPrefs(DEFAULT_PREFERENCES);
  };

  const handleSave = () => {
    onApply(draftPrefs);
    onClose();
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "68px",
        left: "8px",
        right: "8px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1.5px solid #cbd5e1",
        boxShadow: "0 16px 38px -6px rgba(44, 62, 80, 0.18), 0 0 0 1px rgba(44, 62, 80, 0.06)",
        padding: "16px 18px",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1.5px solid #cbd5e1", paddingBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "6px", backgroundColor: "#fef2f0", color: "#ea4c38", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SlidersHorizontal size={13} />
          </div>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", letterSpacing: "-0.2px" }}>
            Search Preferences
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: "#94a3b8",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
            title="Reset filters"
          >
            <RotateCcw size={11} />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              color: "#64748b",
              cursor: "pointer",
              border: "none",
              backgroundColor: "#f1f5f9",
            }}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      <div>
        <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
          <Tag size={12} color="#ea4c38" />
          <span>Budget / Price Range (₱)</span>
        </label>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ flex: 1 }}>
            <input
              type="number"
              placeholder="Min Price (₱)"
              value={draftPrefs.minPrice}
              onChange={(e) => setDraftPrefs({ ...draftPrefs, minPrice: e.target.value })}
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
                color: "#1e293b",
                backgroundColor: "#f8f9fa",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>—</span>
          <div style={{ flex: 1 }}>
            <input
              type="number"
              placeholder="Max Price (₱)"
              value={draftPrefs.maxPrice}
              onChange={(e) => setDraftPrefs({ ...draftPrefs, maxPrice: e.target.value })}
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
                color: "#1e293b",
                backgroundColor: "#f8f9fa",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
          <MapPin size={12} color="#f59e0b" />
          <span>Location</span>
        </label>
        <input
          type="text"
          placeholder="e.g. BGC Taguig, Cebu City, Makati, Nearby..."
          value={draftPrefs.location}
          onChange={(e) => setDraftPrefs({ ...draftPrefs, location: e.target.value })}
          style={{
            width: "100%",
            padding: "7px 10px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "12px",
            color: "#1e293b",
            backgroundColor: "#f8f9fa",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 700, color: "#334155" }}>
            <Star size={12} color="#f59e0b" />
            <span>Minimum Rating</span>
          </label>
          <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#b45309", display: "flex", alignItems: "center", gap: "2px" }}>
            ★ {draftPrefs.minRating.toFixed(1)}+
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.2"
            value={draftPrefs.minRating}
            onChange={(e) => setDraftPrefs({ ...draftPrefs, minRating: parseFloat(e.target.value) })}
            style={{
              width: "100%",
              accentColor: "#ea4c38",
              cursor: "pointer",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", color: "#94a3b8" }}>
            <span>★ 1.0</span>
            <span>★ 3.0</span>
            <span>★ 5.0</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", borderTop: "1.5px solid #cbd5e1", paddingTop: "10px" }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            fontSize: "11.5px",
            color: "#64748b",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1.5px solid #cbd5e1",
            backgroundColor: "#ffffff",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11.5px",
            fontWeight: 700,
            color: "#ffffff",
            padding: "6px 16px",
            borderRadius: "8px",
            backgroundColor: "#ea4c38",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Check size={13} />
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
}
