"use client";

import React, { useState } from "react";
import { HeartIcon, MapPinIcon, StarIcon } from "./Icons";

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  isNearby?: boolean;
  isTopPick?: boolean;
  initialFavorited?: boolean;
}

export default function ProductCard({
  product,
}: {
  product: ProductItem;
}) {
  const [isFavorited, setIsFavorited] = useState(product.initialFavorited || false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        cursor: "pointer",
        position: "relative",
        fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "230px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-8px",
            zIndex: 0,
            opacity: isHovered ? 1 : 0,
            transition:
              "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered ? "scale(1.04)" : "scale(0.96)",
            filter: "blur(22px)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              left: "8px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#ffb4ef",
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "2px",
              left: "40%",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#e87661",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "6px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#ffd7ad",
              opacity: 0.9,
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundColor: "#f4f4f6",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "filter 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: isHovered ? "drop-shadow(0 10px 24px rgba(194, 143, 239, 0.45))" : "none",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
            title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <HeartIcon size={20} isFilled={isFavorited} color="#e87661" />
          </button>

          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
              zIndex: 10,
            }}
          >
            {product.isNearby !== false && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "#ffffff",
                  border: "1.2px solid #fed7aa",
                  borderRadius: "9999px",
                  padding: "3.5px 9px 3.5px 7px",
                  boxShadow: "0 2px 6px rgba(234, 88, 12, 0.08)",
                }}
              >
                <MapPinIcon size={12} color="#ea580c" />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ea580c",
                    lineHeight: 1,
                  }}
                >
                  Nearby
                </span>
              </div>
            )}

            {product.isTopPick !== false && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "#ffffff",
                  border: "1.2px solid #fed7aa",
                  borderRadius: "9999px",
                  padding: "3.5px 9px 3.5px 7px",
                  boxShadow: "0 2px 6px rgba(234, 88, 12, 0.08)",
                }}
              >
                <StarIcon size={12} color="#ea580c" />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ea580c",
                    lineHeight: 1,
                  }}
                >
                  Top Picks
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              padding: "24px 16px 14px 16px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "14px",
                backgroundColor: "rgba(225, 225, 230, 0.5)",
                border: "1.5px dashed #dcdce0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease",
                transform: isHovered ? "scale(1.04)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: "11px", color: "#a1a1aa", fontWeight: 500 }}>
                Image
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          padding: "0 2px",
          position: "relative",
          zIndex: 10,
          userSelect: "text",
        }}
      >
        <h3
          style={{
            fontSize: "14.5px",
            fontWeight: 700,
            color: "#18181b",
            letterSpacing: "-0.2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.3,
            userSelect: "text",
          }}
        >
          {product.title}
        </h3>

        <p
          style={{
            fontSize: "11.5px",
            fontWeight: 400,
            color: "#71717a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
            userSelect: "text",
          }}
        >
          {product.subtitle}
        </p>

        <span
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#f97316",
            marginTop: "3px",
            userSelect: "text",
          }}
        >
          {product.price}
        </span>
      </div>
    </div>
  );
}
