"use client";

import React from "react";
import { SunIcon, MoonIcon } from "./Icons";

export default function Navbar({ isScrolled = false }: { isScrolled?: boolean }) {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        userSelect: "none",
        position: "relative",
        zIndex: 30,
        backgroundColor: "#ffffff",
        transition: "box-shadow 0.25s ease",
        boxShadow: isScrolled
          ? "0 8px 20px -4px rgba(0, 0, 0, 0.06), 0 3px 8px -2px rgba(122, 62, 157, 0.06)"
          : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "38px",
          paddingBottom: "14px",
          boxSizing: "content-box",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#7a3e9d",
            letterSpacing: "-0.4px",
            lineHeight: 1,
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
          }}
        >
          Cartesian
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #ffb86f 0%, #c28fef 100%)",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 600,
              padding: "15px 28px",
              borderRadius: "14px",
              boxShadow: "0 6px 18px rgba(194, 143, 239, 0.45)",
              border: "none",
              letterSpacing: "0.2px",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(194, 143, 239, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(194, 143, 239, 0.45)";
            }}
          >
            Become a Seller
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 6px",
              borderRadius: "12px",
              border: "1.5px solid #eaeaea",
              backgroundColor: "#ffffff",
              cursor: "default",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.02)",
            }}
            title="Theme Toggle"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "22px",
                height: "22px",
                borderRadius: "8px",
                backgroundColor: "#fff6eb",
              }}
            >
              <SunIcon size={13} color="#ffb86f" />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "18px",
                height: "18px",
              }}
            >
              <MoonIcon size={13} color="#9ca3af" />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#e5e7eb",
        }}
      />
    </header>
  );
}
