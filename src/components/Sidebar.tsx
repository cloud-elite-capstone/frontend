"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChatBubbleIcon,
  HistoryClockIcon,
  SettingsIcon,
  HelpIcon,
  LogOutIcon,
} from "./Icons";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("chat");

  const topNav = [
    { id: "chat", label: "Chat", icon: ChatBubbleIcon },
    { id: "history", label: "History", icon: HistoryClockIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const bottomNav = [
    { id: "help", label: "Help", icon: HelpIcon },
    { id: "logout", label: "Log out", icon: LogOutIcon },
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
          <Image
            src="/cartesian_symbol.png"
            alt="Cartesian Logo"
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
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
            gap: "14px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {topNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  backgroundColor: isActive ? "#e5e7eb" : "transparent",
                  color: isActive ? "#1e1e1e" : "#6b7280",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                }}
                title={item.label}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon
                  size={19}
                  color={isActive ? "#1e1e1e" : "#6b7280"}
                />
              </button>
            );
          })}
        </nav>
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          alignItems: "center",
          width: "100%",
        }}
      >
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                backgroundColor: isActive ? "#e5e7eb" : "transparent",
                color: isActive ? "#1e1e1e" : "#6b7280",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
              title={item.label}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Icon
                size={19}
                color={isActive ? "#1e1e1e" : "#6b7280"}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
