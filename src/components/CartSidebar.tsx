"use client";

import React from "react";
import Image from "next/image";
import { XIcon, PlusIcon, MinusIcon, StarIcon } from "./Icons";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  imageUrl?: string;
  rating?: number;
  quantity: number;
}

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClose?: () => void;
}

export default function CartSidebar({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
}: CartSidebarProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #f0f0f2",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
        overflow: "hidden",
        fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          borderBottom: "1px solid #f0f0f2",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1e1e1e",
              letterSpacing: "-0.2px",
            }}
          >
            Cart
          </h2>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              backgroundColor: "#f5ebfc",
              color: "#7a3e9d",
              padding: "2px 7px",
              borderRadius: "9999px",
            }}
          >
            {items.reduce((total, i) => total + i.quantity, 0)}
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "26px",
              height: "26px",
              borderRadius: "6px",
              color: "#9ca3af",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f4f4f6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            title="Close Cart"
          >
            <XIcon size={16} color="#6b7280" />
          </button>
        )}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#9ca3af",
              gap: "8px",
              textAlign: "center",
              padding: "32px 16px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Your cart is empty</span>
            <span style={{ fontSize: "12px", color: "#a1a1aa" }}>
              Add items from recommendations
            </span>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "12px",
                padding: "10px",
                borderRadius: "12px",
                backgroundColor: "#fafafb",
                border: "1px solid #f0f0f4",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "10px",
                  backgroundColor: "#f0f0f2",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="56px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingRight: "16px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1e1e1e",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "2px",
                  }}
                >
                  <StarIcon size={10} color="#ffb86f" />
                  <span style={{ fontSize: "11px", color: "#71717a" }}>
                    {item.rating ?? 4.6}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "#f97316",
                    }}
                  >
                    ₱{item.priceNum.toLocaleString()}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      padding: "2px 6px",
                    }}
                  >
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        color: "#4b5563",
                      }}
                    >
                      <MinusIcon size={11} color="#4b5563" />
                    </button>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "#1f2937",
                        minWidth: "12px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        color: "#4b5563",
                      }}
                    >
                      <PlusIcon size={11} color="#4b5563" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                title="Remove item"
              >
                <XIcon size={13} color="#9ca3af" />
              </button>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid #f0f0f2",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#71717a", fontWeight: 500 }}>
            Subtotal
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1e1e1e",
            }}
          >
            ₱{subtotal.toLocaleString()}
          </span>
        </div>

        <button
          disabled={items.length === 0}
          style={{
            background: "linear-gradient(135deg, #ffb86f 0%, #c28fef 100%)",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            padding: "11px 16px",
            borderRadius: "10px",
            border: "none",
            cursor: items.length === 0 ? "not-allowed" : "pointer",
            opacity: items.length === 0 ? 0.6 : 1,
            boxShadow:
              items.length > 0 ? "0 4px 14px rgba(194, 143, 239, 0.4)" : "none",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            if (items.length > 0) e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            if (items.length > 0) e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Checkout
        </button>

        <button
          style={{
            background: "#ffffff",
            color: "#7a3e9d",
            fontSize: "12.5px",
            fontWeight: 600,
            padding: "9px 16px",
            borderRadius: "10px",
            border: "1px solid #e9d5ff",
            cursor: "pointer",
            transition: "background-color 0.15s ease",
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#faf5ff")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
        >
          Secondary Carts
        </button>
      </div>
    </div>
  );
}
