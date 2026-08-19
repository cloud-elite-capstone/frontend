"use client";

import React, { useState } from "react";
import {
  CartesianCartIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  AgentSparkleIcon,
  SettingsIcon,
  HelpIcon,
} from "./Icons";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const primaryNav = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "shop", label: "Shop", icon: ShoppingBagIcon },
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
          paddingTop: "18px",
        }}
      >
        <div
          style={{
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.15s ease",
          }}
          title="Cartesian"
        >
          <CartesianCartIcon size={22} color="#7a3e9d" />
        </div>

        <div
          style={{
            width: "24px",
            height: "1.5px",
            backgroundColor: "#d1d5db",
            borderRadius: "1px",
            marginTop: "14px",
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
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
