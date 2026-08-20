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
        minWidth: 0,
        cursor: "pointer",
        position: "relative",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "185px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#f4f5f7",
            borderRadius: "14px",
            overflow: "hidden",
            border: "none",
          }}
        >
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
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
              top: "8px",
              right: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "5px",
              zIndex: 10,
            }}
          >
            {product.isNearby !== false && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3px",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #fca59b",
                  borderRadius: "9999px",
                  padding: "2px 7px 2px 5px",
                }}
              >
                <MapPinIcon size={10} color="#ea4c38" />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#ea4c38",
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
                  gap: "3px",
                  backgroundColor: "#fefce8",
                  border: "1.5px solid #f59e0b",
                  borderRadius: "9999px",
                  padding: "2px 7px 2px 5px",
                }}
              >
                <StarIcon size={10} color="#f59e0b" />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#b45309",
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
          gap: "2px",
          padding: "0 2px",
          userSelect: "text",
          width: "100%",
          minWidth: 0,
        }}
      >
        <h3
          title={product.title}
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#1e293b",
            letterSpacing: "-0.2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.3,
            width: "100%",
            minWidth: 0,
            display: "block",
          }}
        >
          {product.title}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4px",
            marginBottom: "3px",
            width: "100%",
            minWidth: 0,
          }}
        >
          <p
            title={product.subtitle}
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#64748b",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.25,
              flex: 1,
              minWidth: 0,
            }}
          >
            {product.subtitle}
          </p>

          {product.rating && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#b45309",
                flexShrink: 0,
                backgroundColor: "#fefce8",
                padding: "1.5px 6px",
                borderRadius: "6px",
                border: "1px solid #fde68a",
              }}
            >
              <StarIcon size={10} color="#f59e0b" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
            paddingTop: "2px",
            gap: "4px",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1e293b",
              letterSpacing: "-0.3px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {product.price}
          </span>

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: isAdded ? "#10b981" : "#ea4c38",
              color: "#ffffff",
              fontSize: "11.5px",
              fontWeight: 700,
              padding: "6.5px 12px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              if (!isAdded) e.currentTarget.style.backgroundColor = "#d93b27";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              if (!isAdded) e.currentTarget.style.backgroundColor = "#ea4c38";
            }}
          >
            {isAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
