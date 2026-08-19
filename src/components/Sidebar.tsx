"use client";

import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  MapIcon,
  UserIcon,
  AgentSparkleIcon,
  SettingsIcon,
  HelpIcon,
} from "./Icons";

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function Sidebar({ activeTab: externalTab, onSelectTab }: SidebarProps) {
  const [internalTab, setInternalTab] = useState<string>("home");
  const currentTab = externalTab !== undefined ? externalTab : internalTab;

  const handleTabClick = (id: string) => {
    if (onSelectTab) {
      onSelectTab(id);
    } else {
      setInternalTab(id);
    }
  };

  const primaryNav = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "shop", label: "Shop", icon: ShoppingBagIcon },
    { id: "map", label: "Map & Nearby", icon: MapIcon },
    { id: "agent", label: "AI Agent", icon: AgentSparkleIcon },
  ];

  const secondaryNav = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
    { id: "help", label: "Help", icon: HelpIcon },
  ];

  return (
    <aside
      style={{
        width: "50px",
        minWidth: "50px",
        height: "calc(100vh - 28px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 0 16px 0",
        backgroundColor: "transparent",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.18s ease",
          }}
          onClick={() => handleTabClick("home")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Cartesian"
        >
          <img 
            src="/cartesian_symbol.png" 
            alt="Cartesian Logo" 
            style={{ width: "30px", height: "30px", objectFit: "contain" }} 
          />
        </div>

        <div
          style={{
            width: "24px",
            height: "1.5px",
            backgroundColor: "#d1d5db",
            borderRadius: "1px",
            marginTop: "12px",
            marginBottom: "16px",
          }}
        />

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#f4ebfc" : "transparent",
                  color: isActive ? "#7a3e9d" : "#555555",
                  transition: "all 0.15s ease",
                }}
                title={item.label}
              >
                <Icon size={18} color={isActive ? "#7a3e9d" : "#555555"} />
              </button>
            );
          })}
        </nav>

        <div
          style={{
            width: "24px",
            height: "1.5px",
            backgroundColor: "#d1d5db",
            borderRadius: "1px",
            margin: "14px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#f4ebfc" : "transparent",
                  color: isActive ? "#7a3e9d" : "#555555",
                  transition: "all 0.15s ease",
                }}
                title={item.label}
              >
                <Icon size={18} color={isActive ? "#7a3e9d" : "#555555"} />
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          width: "26px",
          height: "26px",
          borderRadius: "6px",
          backgroundColor: "#c28fef",
          boxShadow: "0 2px 8px rgba(194, 143, 239, 0.4)",
          cursor: "pointer",
        }}
        title="Active Session"
      />
    </aside>
  );
}
