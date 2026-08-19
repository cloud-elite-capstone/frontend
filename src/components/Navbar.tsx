"use client";

import React from "react";
import { CartesianCartIcon, UserIcon } from "./Icons";

interface NavbarProps {
  isScrolled?: boolean;
  cartCount?: number;
  onToggleCart?: () => void;
}

export default function Navbar({
  isScrolled = false,
  cartCount = 0,
  onToggleCart,
}: NavbarProps) {
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
          padding: "16px 24px 14px 24px",
          boxSizing: "content-box",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
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
            gap: "12px",
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #ffb86f 0%, #c28fef 100%)",
              color: "#ffffff",
              fontSize: "12.5px",
              fontWeight: 600,
              padding: "9px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(194, 143, 239, 0.35)",
              border: "none",
              letterSpacing: "0.2px",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(194, 143, 239, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(194, 143, 239, 0.35)";
            }}
          >
            Become a Seller
          </button>

          {onToggleCart && (
            <button
              onClick={onToggleCart}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "10px",
                border: "1px solid #f0e4fc",
                backgroundColor: "#faf5ff",
                cursor: "pointer",
                position: "relative",
              }}
              title="Toggle Cart"
            >
              <CartesianCartIcon size={17} color="#7a3e9d" />
              {cartCount > 0 && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: "#7a3e9d",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    padding: "1px 6px",
                    lineHeight: 1.2,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "4px 10px 4px 6px",
              borderRadius: "9999px",
              backgroundColor: "#f8f8fa",
              border: "1px solid #eaeaea",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#f5ebfc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserIcon size={14} color="#7a3e9d" />
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#1e1e1e",
              }}
            >
              John
            </span>
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
