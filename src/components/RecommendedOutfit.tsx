"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { OutfitLook } from "@/data/outfits";
import { ProductItem } from "./ProductCard";

interface RecommendedOutfitProps {
  look: OutfitLook;
  onSelectProduct?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onAddFullOutfitToCart?: (items: ProductItem[]) => void;
}

export default function RecommendedOutfit({
  look,
  onSelectProduct,
  onAddToCart,
  onAddFullOutfitToCart,
}: RecommendedOutfitProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        paddingBottom: "24px",
        marginBottom: "8px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "260px" }}>
          <h3
            style={{
              fontSize: "19px",
              fontWeight: 800,
              color: "#ea4c38",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {look.emoji} {look.title}
          </h3>

          <p
            style={{
              fontSize: "12.5px",
              color: "#64748b",
              margin: "4px 0 0 0",
              lineHeight: 1.45,
            }}
          >
            {look.tagline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block" }}>
              Total Outfit ({look.items.length} Items)
            </span>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#ea4c38", lineHeight: 1.1 }}>
              ₱{look.totalPrice.toLocaleString()}
            </span>
          </div>

          {onAddFullOutfitToCart && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddFullOutfitToCart(look.items)}
              style={{
                backgroundColor: "#ea4c38",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(234, 76, 56, 0.2)",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d93b27";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ea4c38";
              }}
            >
              <ShoppingCart size={14} />
              <span>Add Entire Outfit to Cart</span>
            </motion.button>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "8px 12px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "12px",
          color: "#334155",
          lineHeight: 1.45,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "13px" }}>💡</span>
        <span>
          <strong>AI Styling Insight:</strong> {look.stylingTip}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 220px))",
          gap: "14px",
          width: "100%",
        }}
      >
        {look.items.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.32,
              ease: "easeInOut",
              delay: idx * 0.05,
            }}
            onClick={() => onSelectProduct && onSelectProduct(product)}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1.5px solid #cbd5e1",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
              padding: "10px",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ea4c38";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(234, 76, 56, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.03)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "120px",
                borderRadius: "8px",
                backgroundColor: "#f4f5f7",
                position: "relative",
                overflow: "hidden",
                marginBottom: "8px",
              }}
            >
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0" }} />
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
              <h4
                title={product.title}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 2px 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.3,
                }}
              >
                {product.title}
              </h4>

              <p
                title={product.subtitle}
                style={{
                  fontSize: "11.5px",
                  color: "#64748b",
                  margin: "0 0 8px 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.3,
                }}
              >
                {product.subtitle || (product.vendorType === "external" ? "Online Store" : "Local Merchant")}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "auto",
                  paddingTop: "2px",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>
                  ₱{product.priceNum.toLocaleString()}
                </span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    color: "#ea4c38",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  <span>View</span>
                  <ChevronRight size={13} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
