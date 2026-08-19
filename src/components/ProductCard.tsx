"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPinIcon, StarIcon } from "./Icons";

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNum: number;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  isNearby?: boolean;
  isTopPick?: boolean;
}

interface ProductCardProps {
  product: ProductItem;
  onAddToCart?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 900);
  };

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
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#f4f4f6",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #f0f0f4",
          }}
        >
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: "cover",
                transition: "transform 0.35s ease",
                transform: isHovered ? "scale(1.04)" : "scale(1)",
              }}
            />
          )}

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
                  gap: "4px",
                  backgroundColor: "#ffffff",
                  border: "1.2px solid #fed7aa",
                  borderRadius: "9999px",
                  padding: "3px 8px 3px 6px",
                  boxShadow: "0 2px 6px rgba(234, 88, 12, 0.08)",
                }}
              >
                <MapPinIcon size={11} color="#ea580c" />
                <span
                  style={{
                    fontSize: "10.5px",
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
                  gap: "4px",
                  backgroundColor: "#ffffff",
                  border: "1.2px solid #fed7aa",
                  borderRadius: "9999px",
                  padding: "3px 8px 3px 6px",
                  boxShadow: "0 2px 6px rgba(234, 88, 12, 0.08)",
                }}
              >
                <StarIcon size={11} color="#ea580c" />
                <span
                  style={{
                    fontSize: "10.5px",
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
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          padding: "0 2px",
          userSelect: "text",
        }}
      >
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#1e1e1e",
            letterSpacing: "-0.2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}
        >
          {product.title}
        </h3>

        <p
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.25,
            marginBottom: "4px",
          }}
        >
          {product.subtitle}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
            paddingTop: "2px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#1e1e1e",
              letterSpacing: "-0.3px",
            }}
          >
            {product.price}
          </span>

          <button
            onClick={handleAddToCart}
            style={{
              background: isAdded
                ? "#10b981"
                : "linear-gradient(135deg, #ffb86f 0%, #c28fef 100%)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
              padding: "7px 16px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(194, 143, 239, 0.35)",
              transition: "transform 0.15s ease, background 0.2s ease, box-shadow 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
