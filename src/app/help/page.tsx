"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import HelpView from "@/components/HelpView";

export default function StandaloneHelpPage() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
      }}
    >
      <Sidebar activeTab="help" />

      <main
        style={{
          flex: 1,
          height: "calc(100vh - 28px)",
          maxHeight: "calc(100vh - 28px)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #f0f0f2",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Navbar isScrolled={isScrolled} cartCount={0} />

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
            minHeight: 0,
            overflow: "hidden",
            padding: "14px 18px 16px 18px",
          }}
        >
          <div style={{ flex: 1, height: "100%", overflowY: "auto" }}>
            <HelpView />
          </div>
        </div>
      </main>
    </div>
  );
}
