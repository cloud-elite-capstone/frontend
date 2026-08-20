"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MessageSquareIcon,
  MapIcon,
  HistoryClockIcon,
  SettingsIcon,
  HelpIcon,
  LogOutIcon,
} from "./Icons";

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function Sidebar({
  activeTab: externalTab,
  onSelectTab,
}: SidebarProps) {
  const router = useRouter();
  const [internalTab, setInternalTab] = useState<string>("chat");
  const currentTab = externalTab !== undefined ? externalTab : internalTab;

  const handleTabClick = (id: string) => {
    if (id === "logout") {
      router.push("/login");
      return;
    }
    if (onSelectTab) {
      onSelectTab(id);
    } else {
      setInternalTab(id);
    }
  };

  const topNav = [
    { id: "chat", label: "Chat & Shop", icon: MessageSquareIcon },
    { id: "history", label: "History", icon: HistoryClockIcon },
    { id: "map", label: "Map & Nearby", icon: MapIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const bottomNav = [
    { id: "help", label: "Help", icon: HelpIcon },
    { id: "logout", label: "Log out", icon: LogOutIcon },
  ];

  return (
    <aside
      style={{
        width: "52px",
        minWidth: "52px",
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
          paddingTop: "14px",
        }}
      >
        <div
          style={{
            height: "44px",
            width: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onClick={() => handleTabClick("chat")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Cartesian"
        >
          <Image
            src="/cartesian_symbol.png?v=2"
            alt="Cartesian Logo"
            width={34}
            height={34}
            priority
            unoptimized
            style={{ objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(234, 76, 56, 0.25))" }}
          />
        </div>

        <div
          style={{
            width: "24px",
            height: "1.5px",
            backgroundColor: "#cbd5e1",
            borderRadius: "1px",
            marginTop: "12px",
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
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  backgroundColor: isActive ? "#2c3e50" : "transparent",
                  color: isActive ? "#ffffff" : "#64748b",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                }}
                title={item.label}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon
                  size={19}
                  color={isActive ? "#ffffff" : "#64748b"}
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
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              style={{
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                backgroundColor: isActive ? "#2c3e50" : "transparent",
                color: item.id === "logout" ? "#ea4c38" : isActive ? "#ffffff" : "#64748b",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
              title={item.label}
              onMouseEnter={(e) => {
                if (item.id === "logout") {
                  e.currentTarget.style.backgroundColor = "#fef2f0";
                } else if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Icon
                size={19}
                color={item.id === "logout" ? "#ea4c38" : isActive ? "#ffffff" : "#64748b"}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
