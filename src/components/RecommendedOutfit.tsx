"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { OutfitLook } from "@/data/outfits";
import { ProductItem } from "./ProductCard";
import { theme } from "@/styles/theme";
import { bubbleUpCard, buttonInteractions } from "@/styles/animations";

interface RecommendedOutfitProps {
  look: OutfitLook;
  onSelectProduct?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onAddFullOutfitToCart?: (items: ProductItem[]) => void;
}

// renders an ai-generated outfit look with styling insights and compact item cards
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
              color: theme.colors.orange.primary,
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {look.emoji} {look.title}
          </h3>

          <p
            style={{
              fontSize: "12.5px",
              color: theme.colors.navy.muted,
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
            <span style={{ fontSize: "11px", color: theme.colors.navy.muted, fontWeight: 600, display: "block" }}>
              Total Outfit ({look.items.length} Items)
            </span>
            <span style={{ fontSize: "18px", fontWeight: 800, color: theme.colors.orange.primary, lineHeight: 1.1 }}>
              ₱{look.totalPrice.toLocaleString()}
            </span>
          </div>

          {/* adds every piece in this look into the cart in one go */}
          {onAddFullOutfitToCart && (
            <motion.button
              whileHover={buttonInteractions.whileHover}
              whileTap={buttonInteractions.whileTap}
              onClick={() => onAddFullOutfitToCart(look.items)}
              style={{
                backgroundColor: theme.colors.orange.primary,
                color: theme.colors.neutral.white,
                border: "none",
                borderRadius: theme.radius.md,
                padding: "8px 14px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: `0 2px 8px ${theme.colors.orange.shadow}`,
                fontFamily: theme.fonts.heading,
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.orange.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.orange.primary;
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
          backgroundColor: theme.colors.neutral.bgHover,
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.neutral.borderSubtle}`,
          fontSize: "12px",
          color: theme.colors.navy.dark,
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
            initial={bubbleUpCard.initial}
            animate={bubbleUpCard.animate}
            whileHover={bubbleUpCard.whileHover}
            whileTap={bubbleUpCard.whileTap}
            transition={bubbleUpCard.transition(idx)}
            onClick={() => onSelectProduct && onSelectProduct(product)}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.colors.neutral.surfaceBg,
              borderRadius: theme.radius.lg,
              border: `1.5px solid ${theme.colors.neutral.borderMedium}`,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
              padding: "10px",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.colors.orange.primary;
              e.currentTarget.style.boxShadow = `0 8px 20px ${theme.colors.orange.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.colors.neutral.borderMedium;
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.03)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "120px",
                borderRadius: theme.radius.md,
                backgroundColor: theme.colors.neutral.canvasBg,
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
                <div style={{ width: "100%", height: "100%", backgroundColor: theme.colors.neutral.borderSubtle }} />
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
              <h4
                title={product.title}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: theme.colors.navy.deep,
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
                  color: theme.colors.navy.muted,
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
                <span style={{ fontSize: "15px", fontWeight: 800, color: theme.colors.navy.deep }}>
                  ₱{product.priceNum.toLocaleString()}
                </span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    color: theme.colors.orange.primary,
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
