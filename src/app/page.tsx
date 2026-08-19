"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AgentChat from "@/components/AgentChat";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
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
      <Sidebar />

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
          padding: "18px 24px 20px 24px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Navbar isScrolled={isScrolled} />

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
            onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 4)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              height: "100%",
              overflowY: "auto",
              paddingTop: "40px",
              paddingRight: "6px",
              paddingBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "30px",
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "#1e1e1e",
                  letterSpacing: "-0.2px",
                }}
              >
                Curated Recommendations
              </h2>

              <AddToCartButton count={2} />
            </div>

            <ProductGrid />
          </section>

          <aside
            style={{
              width: "420px",
              minWidth: "340px",
              maxWidth: "460px",
              flexShrink: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <AgentChat />
          </aside>
        </div>
      </main>
    </div>
  );
}
