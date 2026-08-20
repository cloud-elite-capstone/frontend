"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, PlusIcon, MinusIcon, StarIcon } from "./Icons";
import { CheckCircle2, ShoppingBag } from "lucide-react";

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
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );

  const totalCount = items.reduce((total, i) => total + i.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckedOut(true);
    setTimeout(() => {
      setIsCheckedOut(false);
    }, 2800);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1.5px solid #cbd5e1",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
        overflow: "hidden",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          borderBottom: "1.5px solid #cbd5e1",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1e293b",
              letterSpacing: "-0.2px",
              margin: 0,
            }}
          >
            Cart
          </h2>
          <AnimatePresence mode="wait">
            <motion.span
              key={totalCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 16 }}
              style={{
                fontSize: "11px",
                fontWeight: 700,
                backgroundColor: "#fef2f0",
                color: "#ea4c38",
                padding: "2px 7px",
                borderRadius: "9999px",
                border: "1.5px solid #fca59b",
                display: "inline-block",
              }}
            >
              {totalCount}
            </motion.span>
          </AnimatePresence>
        </div>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
              color: "#94a3b8",
              transition: "background-color 0.15s ease",
            }}
            title="Close Cart"
          >
            <XIcon size={16} color="#64748b" />
          </motion.button>
        )}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#94a3b8",
                gap: "8px",
                textAlign: "center",
                padding: "32px 16px",
              }}
            >
              <ShoppingBag size={28} color="#cbd5e1" />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>
                Your cart is empty
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Add items from local merchants
              </span>
            </motion.div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: 30,
                  scale: 0.9,
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
                transition={{ type: "spring", stiffness: 360, damping: 25 }}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px 2px",
                  borderBottom: "1px solid #e2e8f0",
                  position: "relative",
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#f4f5f7",
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
                      sizes="50px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#edf0f2",
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
                      paddingRight: "18px",
                    }}
                  >
                    <h4
                      title={item.title}
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#1e293b",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        margin: 0,
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
                    <StarIcon size={10} color="#f59e0b" />
                    <span style={{ fontSize: "11px", color: "#64748b" }}>
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
                        color: "#ea4c38",
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
                        border: "1.5px solid #cbd5e1",
                        borderRadius: "6px",
                        padding: "2px 6px",
                      }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.82 }}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                          color: "#475569",
                        }}
                      >
                        <MinusIcon size={11} color="#475569" />
                      </motion.button>

                      <AnimatePresence mode="wait">
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          style={{
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: "#1e293b",
                            minWidth: "12px",
                            textAlign: "center",
                            display: "inline-block",
                          }}
                        >
                          {item.quantity}
                        </motion.span>
                      </AnimatePresence>

                      <motion.button
                        whileTap={{ scale: 0.82 }}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                          color: "#475569",
                        }}
                      >
                        <PlusIcon size={11} color="#475569" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15, color: "#ea4c38" }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "2px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                  title="Remove item"
                >
                  <XIcon size={13} color="#94a3b8" />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div
        style={{
          padding: "14px 16px",
          borderTop: "1.5px solid #cbd5e1",
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
          <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
            Subtotal
          </span>
          <motion.span
            key={subtotal}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1e293b",
            }}
          >
            ₱{subtotal.toLocaleString()}
          </motion.span>
        </div>

        {isCheckedOut ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              backgroundColor: "#ecfdf5",
              color: "#059669",
              padding: "11px 16px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            <CheckCircle2 size={16} />
            <span>Order Dispatched!</span>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: items.length > 0 ? 1.02 : 1 }}
            whileTap={{ scale: items.length > 0 ? 0.98 : 1 }}
            disabled={items.length === 0}
            onClick={handleCheckout}
            style={{
              backgroundColor: "#ea4c38",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: items.length === 0 ? "not-allowed" : "pointer",
              opacity: items.length === 0 ? 0.6 : 1,
              transition: "background-color 0.15s ease",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (items.length > 0) e.currentTarget.style.backgroundColor = "#d93b27";
            }}
            onMouseLeave={(e) => {
              if (items.length > 0) e.currentTarget.style.backgroundColor = "#ea4c38";
            }}
          >
            Checkout
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{
            background: "#ffffff",
            color: "#2c3e50",
            fontSize: "12.5px",
            fontWeight: 600,
            padding: "9px 16px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f9fa";
            e.currentTarget.style.color = "#ea4c38";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.color = "#2c3e50";
          }}
        >
          Secondary Carts
        </motion.button>
      </div>
    </div>
  );
}
