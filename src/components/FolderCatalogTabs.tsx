"use client";

import React from "react";
import { OutfitLook } from "@/data/outfits";
import { theme } from "@/styles/theme";

interface FolderCatalogTabsProps {
  looks: OutfitLook[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
}

// category tab bar that lets shoppers switch between 'all picks' and specific looks
export default function FolderCatalogTabs({
  looks,
  activeTabId,
  onSelectTab,
}: FolderCatalogTabsProps) {
  const tabs = [
    { id: "all", name: "All Curated Picks" },
    ...looks.map((l) => ({
      id: l.id,
      name: l.shortName,
    })),
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "4px",
        overflowX: "auto",
        borderBottom: `1.5px solid ${theme.colors.neutral.borderSubtle}`,
        marginBottom: "18px",
        position: "relative",
        scrollbarWidth: "none",
        width: "100%",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              position: "relative",
              border: "none",
              background: isActive ? theme.colors.orange.softBg : "transparent",
              borderRadius: "8px 8px 0 0",
              padding: "9px 16px 11px 16px",
              cursor: "pointer",
              outline: "none",
              display: "inline-flex",
              alignItems: "center",
              fontSize: "13px",
              fontWeight: isActive ? 700 : 600,
              color: isActive ? theme.colors.orange.primary : theme.colors.navy.muted,
              transition: "background-color 0.15s ease, color 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = theme.colors.navy.dark;
                e.currentTarget.style.backgroundColor = theme.colors.neutral.bgHover;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = theme.colors.navy.muted;
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>{tab.name}</span>

            {isActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5px",
                  left: 0,
                  right: 0,
                  height: "3px",
                  backgroundColor: theme.colors.orange.primary,
                  borderRadius: "2px 2px 0 0",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
