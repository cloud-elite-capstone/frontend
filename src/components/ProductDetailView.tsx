"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  ExternalLink,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Store,
  Minus,
  Plus,
} from "lucide-react";
import { ProductItem } from "./ProductCard";
import { initialProducts } from "@/data/products";

interface ProductDetailViewProps {
  product: ProductItem;
  onBack: () => void;
  onSelectProduct?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  allProducts?: ProductItem[];
}

export default function ProductDetailView({
  product,
  onBack,
  onSelectProduct,
  onAddToCart,
  allProducts = initialProducts,
}: ProductDetailViewProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const topRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuantity(1);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      let parent = containerRef.current.parentElement;
      while (parent) {
        if (parent.scrollHeight > parent.clientHeight) {
          parent.scrollTop = 0;
        }
        parent = parent.parentElement;
      }
    }
  }, [product.id]);

  const handleSelectOption = (selected: ProductItem) => {
    if (onSelectProduct) {
      onSelectProduct(selected);
    }
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      let parent = containerRef.current.parentElement;
      while (parent) {
        if (parent.scrollHeight > parent.clientHeight) {
          parent.scrollTop = 0;
        }
        parent = parent.parentElement;
      }
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const isLocal = product.vendorType === "local" || product.isNearby;
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
      }}
      className="no-scrollbar"
    >
      <div ref={topRef} style={{ width: "100%", height: 0 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "6px 0 16px 0",
          borderBottom: "1.5px solid #f1f5f9",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "15px",
            fontWeight: 700,
            color: "#475569",
            background: "none",
            border: "none",
            padding: "0",
            cursor: "pointer",
            transition: "color 0.15s ease",
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ea4c38";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#475569";
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
          <span>Back to Recommendations</span>
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "36px",
          marginBottom: "32px",
          height: "480px",
          minHeight: "480px",
          maxHeight: "480px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", minWidth: 0 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#f8fafc",
            }}
          >
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            )}

            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {isLocal ? (
                <span
                  style={{
                    backgroundColor: "rgba(255, 251, 235, 0.96)",
                    backdropFilter: "blur(8px)",
                    color: "#b45309",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #fde68a",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.08)",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  }}
                >
                  <MapPin size={14} color="#d97706" /> Nearby Cartesian Merchant
                </span>
              ) : (
                <span
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.96)",
                    backdropFilter: "blur(8px)",
                    color: "#2c3e50",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.08)",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  }}
                >
                  <ShieldCheck size={15} color="#10b981" /> Official Online Merchant
                </span>
              )}

              {product.isTopPick && (
                <span
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "5px 12px",
                    borderRadius: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    width: "fit-content",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.18), 0 1px 2px rgba(0, 0, 0, 0.10)",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  }}
                >
                  <Sparkles size={13} fill="#ffffff" /> AI Top Recommendation
                </span>
              )}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "14px",
                right: "14px",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(8px)",
                padding: "5px 11px",
                borderRadius: "8px",
                border: "1.5px solid #fde68a",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "13px",
                fontWeight: 800,
                color: "#0f172a",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating || 4.8}</span>
              <span style={{ color: "#64748b", fontWeight: 600, fontSize: "11.5px" }}>
                ({product.ratingCount || 120})
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            minWidth: 0,
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", minHeight: 0 }}>
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "0 0 2px 0",
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {product.title}
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {product.subtitle}
              </p>
            </div>

            <div
              style={{
                paddingBottom: "8px",
                borderBottom: "1.5px solid #f1f5f9",
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#ea4c38",
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                }}
              >
                {product.price}
              </span>
            </div>

            {isLocal ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0 0 8px 0",
                  borderBottom: "1.5px solid #f1f5f9",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Store size={14} color="#ea4c38" />
                  <h5
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: 0,
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    }}
                  >
                    {product.vendorName || "Cartesian BGC Tech Hub"}
                  </h5>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: "#ecfdf5",
                      color: "#047857",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginLeft: "auto",
                    }}
                  >
                    Open Now
                  </span>
                </div>

                <div style={{ fontSize: "12px", color: "#475569", display: "flex", flexDirection: "column", gap: "2px", marginTop: "1px" }}>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Location: </strong>
                    {product.vendorLocation || "Level 2, Bonifacio High Street, BGC, Taguig City"}
                  </div>
                  {product.vendorHours && (
                    <div>
                      <strong style={{ color: "#1e293b" }}>Store Hours: </strong>
                      {product.vendorHours}
                    </div>
                  )}
                  {product.vendorContact && (
                    <div>
                      <strong style={{ color: "#1e293b" }}>Contact: </strong>
                      {product.vendorContact}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "0 0 8px 0",
                  borderBottom: "1.5px solid #f1f5f9",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Store size={14} color="#2c3e50" />
                    <h5
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: "#0f172a",
                        margin: 0,
                        fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                      }}
                    >
                      {product.vendorName || "Official Brand Merchant"}
                    </h5>
                  </div>
                  <span style={{ fontSize: "11.5px", color: "#64748b", display: "block", marginTop: "1px" }}>
                    {product.vendorLocation || "Verified Online Store • Global / Regional Catalog"}
                  </span>
                </div>

                {product.externalUrl && (
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "#ea4c38",
                      backgroundColor: "#fef2f0",
                      border: "1px solid #fed7d2",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>Visit Store</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            )}

            <div
              className="no-scrollbar"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                overflowY: "auto",
                maxHeight: "155px",
                paddingRight: "2px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    backgroundColor: "#fef2f0",
                    color: "#ea4c38",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={13} />
                </div>
                <h4
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: 0,
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  }}
                >
                  Cartesian AI Review Synthesis
                </h4>
              </div>

              <p
                style={{
                  fontSize: "12.5px",
                  color: "#334155",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {product.aiSynthesis?.highlight ||
                  "Synthesized from verified buyer telemetry and regional stock availability for top performance."}
              </p>

              {product.aiSynthesis?.pros && product.aiSynthesis.pros.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "1px" }}>
                  {product.aiSynthesis.pros.map((pro, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "#1e293b",
                      }}
                    >
                      <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0 }} />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
            {isLocal && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#f8fafc",
                  border: "1.5px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "2px 4px",
                  height: "44px",
                  boxSizing: "border-box",
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "none",
                    background: "none",
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e2e8f0";
                    e.currentTarget.style.color = "#ea4c38";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#334155";
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>

                <span
                  style={{
                    minWidth: "28px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0f172a",
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    userSelect: "none",
                  }}
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "none",
                    background: "none",
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e2e8f0";
                    e.currentTarget.style.color = "#ea4c38";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#334155";
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>
            )}

            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: isAdded ? "#10b981" : "#ea4c38",
                color: "#ffffff",
                fontSize: "13.5px",
                fontWeight: 700,
                padding: "12px 20px",
                height: "44px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (!isAdded) {
                  e.currentTarget.style.backgroundColor = "#d93b27";
                }
              }}
              onMouseLeave={(e) => {
                if (!isAdded) {
                  e.currentTarget.style.backgroundColor = "#ea4c38";
                }
              }}
            >
              <ShoppingCart size={16} />
              <span>{isAdded ? "Added to Cart!" : "Add to Cart"}</span>
            </button>

            {!isLocal && product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  backgroundColor: "#2c3e50",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "12px 18px",
                  height: "44px",
                  borderRadius: "8px",
                  border: "none",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2c3e50";
                }}
              >
                <span>Visit Store Site</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1.5px solid #f1f5f9",
          paddingTop: "28px",
          marginBottom: "36px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "20px",
              backgroundColor: "#ea4c38",
              borderRadius: "2px",
            }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
              letterSpacing: "-0.2px",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            Product Description
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "880px" }}>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.75,
              color: "#334155",
              margin: 0,
            }}
          >
            {product.description ||
              `${product.title} is designed with high standards of craftsmanship and performance. Verified across multiple test vectors and localized seller inventory.`}
          </p>

          {product.features && product.features.length > 0 && (
            <div style={{ marginTop: "8px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 10px 0",
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                }}
              >
                Key Highlights:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "13.5px",
                  color: "#475569",
                  lineHeight: 1.6,
                }}
              >
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          borderTop: "1.5px solid #f1f5f9",
          paddingTop: "26px",
          paddingBottom: "36px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  backgroundColor: "#fef2f0",
                  color: "#ea4c38",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={13} />
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                  fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                }}
              >
                More Options Curated by AI
              </h3>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "3px 0 0 0",
              }}
            >
              Alternative models and complementary devices curated based on your preferences
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            width: "100%",
          }}
        >
          {relatedProducts.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 38, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 20,
                mass: 0.75,
                delay: idx * 0.07,
              }}
              onClick={() => handleSelectOption(p)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1.5px solid #cbd5e1",
                padding: "12px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ea4c38";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "130px",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  backgroundColor: "#f8fafc",
                }}
              >
                {p.imageUrl && (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
                {p.isNearby && (
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "rgba(255, 251, 235, 0.96)",
                      border: "1.5px solid #fde68a",
                      borderRadius: "6px",
                      padding: "3px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#b45309",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <MapPin size={11} color="#d97706" /> Local Hub
                  </span>
                )}
              </div>

              <div>
                <h5
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0 0 3px 0",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.title}
                </h5>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    margin: "0 0 8px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.subtitle}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                    {p.price}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ea4c38",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    View <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
