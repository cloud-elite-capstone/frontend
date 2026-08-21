"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SettingsView from "@/components/SettingsView";
import { UserProfile, defaultUserProfile } from "@/data/userProfile";

// standalone account and assistant settings route with localStorage state persistence
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("settings");
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartesian_user_profile");
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    } catch {}
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#f5f5f7",
        padding: "14px 16px 14px 8px",
        gap: "10px",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
      }}
    >
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      <main
        style={{
          flex: 1,
          height: "calc(100vh - 28px)",
          maxHeight: "calc(100vh - 28px)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1.5px solid #cbd5e1",
          boxShadow: "0 4px 20px rgba(44, 62, 80, 0.04)",
          padding: "18px 24px 20px 24px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Navbar userProfile={userProfile} />

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "24px",
            alignItems: "stretch",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <section
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              height: "100%",
              overflowY: "hidden",
              paddingTop: "14px",
              paddingRight: "0px",
              paddingBottom: "0px",
            }}
          >
            <SettingsView
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
