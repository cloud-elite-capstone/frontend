"use client";

import React from "react";
import Image from "next/image";
import { CartesianCartIcon, UserIcon } from "./Icons";
import { UserProfile } from "@/data/userProfile";

interface NavbarProps {
  isScrolled?: boolean;
  cartCount?: number;
  onToggleCart?: () => void;
  userProfile?: UserProfile;
}

export default function Navbar({
  isScrolled = false,
  cartCount = 0,
  onToggleCart,
  userProfile,
}: NavbarProps) {
  const displayName = userProfile?.username
    ? `@${userProfile.username}`
    : userProfile?.fullName
    ? userProfile.fullName.split(" ")[0]
    : "John";

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
        borderBottom: "1.5px solid #cbd5e1",
        transition: "box-shadow 0.25s ease",
        boxShadow: isScrolled
          ? "0 8px 20px -4px rgba(0, 0, 0, 0.06), 0 3px 8px -2px rgba(234, 76, 56, 0.06)"
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
            letterSpacing: "-0.4px",
            lineHeight: 1,
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
          }}
        >
          <span style={{ color: "#ea4c38" }}>Cart</span>
          <span style={{ color: "#2c3e50" }}>esian</span>
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
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              fontSize: "12.5px",
              fontWeight: 700,
              padding: "9px 20px",
              borderRadius: "12px",
              border: "none",
              letterSpacing: "0.2px",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d97706";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f59e0b";
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
                border: "1.5px solid #fca59b",
                backgroundColor: "#fef2f0",
                cursor: "pointer",
                position: "relative",
              }}
              title="Toggle Cart"
            >
              <CartesianCartIcon size={17} color="#ea4c38" />
              {cartCount > 0 && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: "#ea4c38",
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
              padding: "4px 10px 4px 5px",
              borderRadius: "9999px",
              backgroundColor: "#f8f9fa",
              border: "1.5px solid #cbd5e1",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: "#fef2f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
                border: userProfile?.avatarUrl ? "1px solid #fed7d2" : "none",
              }}
            >
              {userProfile?.avatarUrl ? (
                <Image
                  src={userProfile.avatarUrl}
                  alt="Profile Avatar"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <UserIcon size={14} color="#ea4c38" />
              )}
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#1e293b",
                maxWidth: "110px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              {displayName}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#e2e8f0",
        }}
      />
    </header>
  );
}
