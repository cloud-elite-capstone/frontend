"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, PlusIcon, MinusIcon, StarIcon } from "./Icons";
import {
  CheckCircle2,
  ShoppingBag,
  Building2,
  Globe,
  ExternalLink,
  CreditCard,
  Sparkles,
  ChevronDown,
  Clock,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Truck,
  ArrowRight,
  Check,
  Lock,
} from "lucide-react";
import { ConversationThread } from "@/data/conversations";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  imageUrl?: string;
  rating?: number;
  quantity: number;
  vendorType?: "local" | "external";
  vendorName?: string;
  vendorLocation?: string;
  externalUrl?: string;
}

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClose?: () => void;
  conversations?: ConversationThread[];
  activeConvoId?: string;
  onSelectConversation?: (convoId: string) => void;
  cartsByConversation?: Record<string, CartItem[]>;
}

// slide-out shopping cart sidebar handling multi-merchant checkouts, per-convo carts, and instant payment flows
export default function CartSidebar({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  conversations = [],
  activeConvoId,
  onSelectConversation,
  cartsByConversation = {},
}: CartSidebarProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(() => {
    return items.length > 0 ? items[0].id : null;
  });
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"gcash" | "card" | "cod">("gcash");
  const [onlineRedirectNotice, setOnlineRedirectNotice] = useState<string | null>(null);

  const activeConvo = conversations.find((c) => c.id === activeConvoId);
  const activeConvoTitle = activeConvo ? activeConvo.title : "Active Shopping Thread";

  const formatConvoDate = (convo?: ConversationThread | null) => {
    if (!convo) return "Aug 21, 2026";
    if (convo.group === "today") return "Today, Aug 21";
    if (convo.group === "yesterday") return "Yesterday, Aug 20";
    if (convo.group === "previous7Days") return "Aug 18, 2026";
    return "Aug 21, 2026";
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );
  const totalCount = items.reduce((total, i) => total + i.quantity, 0);

  const selectedItem = items.find((item) => item.id === selectedItemId) || null;

  const handleSelectItem = (id: string) => {
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  const handleCheckoutClick = () => {
    if (!selectedItem) return;

    if (selectedItem.vendorType === "external") {
      const targetUrl =
        selectedItem.externalUrl ||
        `https://shopee.ph/search?keyword=${encodeURIComponent(selectedItem.title)}`;

      setOnlineRedirectNotice(`Opening ${selectedItem.vendorName || "Online Merchant Store"}...`);
      setTimeout(() => {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
        setOnlineRedirectNotice(null);
      }, 700);
    } else {
      setIsPaymentModalOpen(true);
      setPaymentSuccess(false);
    }
  };

  const handleConfirmLocalPayment = () => {
    setIsPaymentProcessing(true);
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setIsPaymentModalOpen(false);
        setPaymentSuccess(false);
        if (selectedItem) {
          onRemoveItem(selectedItem.id);
          setSelectedItemId(null);
        }
      }, 2000);
    }, 1200);
  };

  const getConvoCartInfo = (convoId: string) => {
    const list = cartsByConversation[convoId] || [];
    const count = list.reduce((acc, i) => acc + i.quantity, 0);
    const sum = list.reduce((acc, i) => acc + i.priceNum * i.quantity, 0);
    return { count, sum };
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
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderBottom: "1.5px solid #e2e8f0",
          backgroundColor: "#ffffff",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              backgroundColor: "#fef2f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ea4c38",
            }}
          >
            <ShoppingBag size={16} />
          </div>
          <div>
            <h2
              style={{
                fontSize: "15.5px",
                fontWeight: 700,
                color: "#1e293b",
                letterSpacing: "-0.2px",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Current Cart
            </h2>
          </div>

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

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9" }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                color: "#64748b",
                transition: "all 0.15s ease",
              }}
              title="Close Cart"
            >
              <XIcon size={16} color="#64748b" />
            </motion.button>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "14px 14px 12px 14px",
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setIsHistoryDropdownOpen((prev) => !prev)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "13px 14px",
            minHeight: "62px",
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.15s ease",
            boxShadow: isHistoryDropdownOpen
              ? "0 0 0 2px rgba(234, 76, 56, 0.15)"
              : "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                backgroundColor: "#fff1ee",
                color: "#ea4c38",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={15} />
            </div>
            <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center", paddingTop: "2px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", lineHeight: "1.5" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "#ea4c38", letterSpacing: "0.5px", display: "inline-block" }}>
                  AI Chats
                </span>
                <span style={{ fontSize: "10px", color: "#cbd5e1" }}>•</span>
                <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600, display: "inline-block" }}>
                  {formatConvoDate(activeConvo)}
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#1e293b",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: "1.4",
                }}
              >
                {activeConvoTitle}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isHistoryDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.18 }}
            style={{ color: "#64748b", flexShrink: 0, marginLeft: "6px" }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isHistoryDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: "100%",
                left: "14px",
                right: "14px",
                zIndex: 40,
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1.5px solid #cbd5e1",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                padding: "10px",
                marginTop: "6px",
                maxHeight: "230px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "8px 10px 8px 10px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  lineHeight: "1.5",
                }}
              >
                <span>Switch Cart History</span>
                <span style={{ fontSize: "10.5px", color: "#94a3b8" }}>
                  {conversations.length} sessions
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px" }}>
                {conversations.map((convo) => {
                  const isActive = convo.id === activeConvoId;
                  const { count, sum } = getConvoCartInfo(convo.id);

                  return (
                    <motion.button
                      key={convo.id}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        if (onSelectConversation) {
                          onSelectConversation(convo.id);
                        }
                        setIsHistoryDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        border: "none",
                        background: isActive ? "#fef2f0" : "transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "background 0.12s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "6px",
                            backgroundColor: isActive ? "#ea4c38" : "#f1f5f9",
                            color: isActive ? "#ffffff" : "#64748b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            flexShrink: 0,
                          }}
                        >
                          <MessageSquare size={12} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: isActive ? 700 : 600,
                              color: isActive ? "#ea4c38" : "#1e293b",
                              margin: 0,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {convo.title}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                            <span style={{ fontSize: "10.5px", color: "#64748b" }}>
                              {count} {count === 1 ? "item" : "items"}
                            </span>
                            {count > 0 && (
                              <>
                                <span style={{ fontSize: "9px", color: "#cbd5e1" }}>•</span>
                                <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a" }}>
                                  ₱{sum.toLocaleString()}
                                </span>
                              </>
                            )}
                            <span style={{ fontSize: "9px", color: "#cbd5e1" }}>•</span>
                            <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                              {formatConvoDate(convo)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isActive && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            backgroundColor: "#ea4c38",
                            color: "#ffffff",
                            padding: "2px 6px",
                            borderRadius: "9999px",
                            flexShrink: 0,
                            marginLeft: "6px",
                          }}
                        >
                          Active
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {onlineRedirectNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: "8px 12px",
              backgroundColor: "#fef9c3",
              color: "#854d0e",
              fontSize: "11.5px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              borderBottom: "1px solid #fde047",
            }}
          >
            <ExternalLink size={13} />
            <span>{onlineRedirectNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
                padding: "36px 16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                  marginBottom: "4px",
                }}
              >
                <ShoppingBag size={24} />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#334155" }}>
                This cart is empty
              </span>
              <span style={{ fontSize: "12px", color: "#64748b", maxWidth: "220px", lineHeight: 1.4 }}>
                Ask the AI agent in this conversation to find and add local or online merchant products.
              </span>
            </motion.div>
          ) : (
            items.map((item) => {
              const isSelected = selectedItemId === item.id;
              const isLocal = item.vendorType !== "external";
              const storeName = item.vendorName || (isLocal ? "Cartesian Verified Hub" : "Online Marketplace");

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: 20,
                    scale: 0.9,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                  transition={{ type: "spring", stiffness: 360, damping: 25 }}
                  onClick={() => handleSelectItem(item.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "11px 12px",
                    borderRadius: "12px",
                    border: isSelected ? "1.5px solid #ea4c38" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#fff9f8" : "#ffffff",
                    boxShadow: isSelected
                      ? "0 4px 12px rgba(234, 76, 56, 0.08)"
                      : "0 1px 3px rgba(0, 0, 0, 0.02)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "6px",
                      paddingBottom: "6px",
                      borderBottom: "1px dashed #e2e8f0",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3.5px",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: isLocal ? "#ecfdf5" : "#fef9c3",
                          color: isLocal ? "#15803d" : "#854d0e",
                          border: isLocal ? "1px solid #86efac" : "1px solid #fde047",
                          flexShrink: 0,
                        }}
                      >
                        {isLocal ? <Building2 size={10} /> : <Globe size={10} />}
                        {isLocal ? "Local Merchant" : "Online Store"}
                      </span>

                      <span
                        title={storeName}
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "#334155",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {storeName}
                      </span>
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectItem(item.id);
                      }}
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        border: isSelected ? "2px solid #ea4c38" : "1.5px solid #cbd5e1",
                        backgroundColor: isSelected ? "#ea4c38" : "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        transition: "all 0.15s ease",
                        flexShrink: 0,
                      }}
                      title={isSelected ? "Selected for checkout" : "Select this product to checkout"}
                    >
                      {isSelected && <Check size={11} strokeWidth={3.5} />}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        backgroundColor: "#f8fafc",
                        position: "relative",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "1px solid #f1f5f9",
                      }}
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="48px"
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
                        minWidth: 0,
                      }}
                    >
                      <h4
                        title={item.title}
                        style={{
                          fontSize: "12.5px",
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

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "#ea4c38",
                          }}
                        >
                          ₱{item.priceNum.toLocaleString()}
                        </span>

                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #cbd5e1",
                            borderRadius: "6px",
                            padding: "2px 5px",
                          }}
                        >
                          <motion.button
                            whileTap={{ scale: 0.82 }}
                            onClick={() => {
                              if (item.quantity <= 1) {
                                setItemToDelete(item);
                              } else {
                                onUpdateQuantity(item.id, -1);
                              }
                            }}
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
                            title="Decrease quantity"
                          >
                            <MinusIcon size={10} color="#475569" />
                          </motion.button>

                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#1e293b",
                              minWidth: "12px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </span>

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
                            title="Increase quantity"
                          >
                            <PlusIcon size={10} color="#475569" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.15, color: "#ef4444" }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDelete(item);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                      title="Remove from current cart"
                    >
                      <XIcon size={12} color="#94a3b8" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <div
        style={{
          padding: "14px 16px",
          borderTop: "1.5px solid #e2e8f0",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>
              {selectedItem ? "Selected Item Total" : "Subtotal"}
            </span>
            {selectedItem && (
              <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#334155" }}>
                {selectedItem.title.slice(0, 22)}... (x{selectedItem.quantity})
              </p>
            )}
          </div>
          <motion.span
            key={selectedItem ? selectedItem.priceNum * selectedItem.quantity : subtotal}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1e293b",
            }}
          >
            ₱
            {(selectedItem
              ? selectedItem.priceNum * selectedItem.quantity
              : subtotal
            ).toLocaleString()}
          </motion.span>
        </div>

        {selectedItem ? (
          selectedItem.vendorType === "external" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckoutClick}
              style={{
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                padding: "11px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.15s ease",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.1)",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d97706";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f59e0b";
              }}
            >
              <Globe size={15} color="#ffffff" />
              <span>Checkout on {selectedItem.vendorName ? selectedItem.vendorName.slice(0, 16) : "Online Store"}</span>
              <ExternalLink size={14} color="#ffffff" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckoutClick}
              style={{
                backgroundColor: "#ea4c38",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                padding: "11px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.15s ease",
                boxShadow: "0 4px 12px rgba(234, 76, 56, 0.1)",
                fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d93b27";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ea4c38";
              }}
            >
              <CreditCard size={15} />
              <span>Proceed to Local Checkout</span>
              <ArrowRight size={14} />
            </motion.button>
          )
        ) : (
          <button
            disabled
            style={{
              backgroundColor: "#f1f5f9",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: 700,
              padding: "11px 16px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              cursor: "not-allowed",
              textAlign: "center",
              fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
            }}
          >
            Select 1 Item to Checkout
          </button>
        )}

        {selectedItem && (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              {selectedItem.vendorType === "external"
                ? "Redirects to external partner web store."
                : "⚡ Direct fulfillment from verified local hub."}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isPaymentModalOpen && selectedItem && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(4px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={() => {
              if (!isPaymentProcessing) setIsPaymentModalOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1.5px solid #cbd5e1",
                boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              {paymentSuccess ? (
                <div
                  style={{
                    padding: "40px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "12px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "#ecfdf5",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                    Order & Payment Confirmed!
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748b", maxWidth: "320px", lineHeight: 1.4, margin: 0 }}>
                    Your order for <strong>{selectedItem.title}</strong> has been routed to{" "}
                    <strong>{selectedItem.vendorName || "Cartesian Local Hub"}</strong> for express dispatch.
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#f8fafc",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#ea4c38",
                      marginTop: "8px",
                    }}
                  >
                    <Truck size={14} />
                    <span>Estimated Arrival: 35–45 Mins</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1.5px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: "#ecfdf5",
                          color: "#059669",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Building2 size={16} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                          Local Merchant Checkout
                        </h3>
                        <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                          {selectedItem.vendorName || "Cartesian Verified Hub"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                      }}
                    >
                      <XIcon size={16} color="#94a3b8" />
                    </button>
                  </div>

                  <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 12px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "6px",
                          position: "relative",
                          overflow: "hidden",
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          flexShrink: 0,
                        }}
                      >
                        {selectedItem.imageUrl && (
                          <Image
                            src={selectedItem.imageUrl}
                            alt={selectedItem.title}
                            fill
                            sizes="44px"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {selectedItem.title}
                        </p>
                        <p style={{ fontSize: "11.5px", color: "#64748b", margin: "2px 0 0 0" }}>
                          Qty: {selectedItem.quantity} × ₱{selectedItem.priceNum.toLocaleString()}
                        </p>
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#ea4c38" }}>
                        ₱{(selectedItem.priceNum * selectedItem.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <MapPin size={15} color="#ea4c38" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
                          Fulfillment Hub & Address
                        </span>
                        <p style={{ fontSize: "11.5px", color: "#64748b", margin: "1px 0 0 0" }}>
                          {selectedItem.vendorLocation || "Bonifacio High Street, BGC Hub • 35-min Dispatch"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", display: "block", marginBottom: "8px" }}>
                        Select Payment Method:
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                        {[
                          { id: "gcash" as const, name: "GCash", subtitle: "E-Wallet" },
                          { id: "card" as const, name: "Card / Maya", subtitle: "Visa/MC" },
                          { id: "cod" as const, name: "COD", subtitle: "Cash on Delivery" },
                        ].map((method) => {
                          const isPicked = selectedPaymentMethod === method.id;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setSelectedPaymentMethod(method.id)}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "10px 6px",
                                borderRadius: "8px",
                                border: isPicked ? "1.5px solid #ea4c38" : "1px solid #cbd5e1",
                                backgroundColor: isPicked ? "#fff5f4" : "#ffffff",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <span style={{ fontSize: "12px", fontWeight: 700, color: isPicked ? "#ea4c38" : "#1e293b" }}>
                                {method.name}
                              </span>
                              <span style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                                {method.subtitle}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                        <span>Item Subtotal</span>
                        <span>₱{(selectedItem.priceNum * selectedItem.quantity).toLocaleString()}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#059669" }}>
                        <span>Local Express Delivery</span>
                        <span>FREE</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 800,
                          color: "#1e293b",
                          paddingTop: "6px",
                          marginTop: "2px",
                          borderTop: "1px solid #e2e8f0",
                          fontSize: "13.5px",
                        }}
                      >
                        <span>Total Due</span>
                        <span style={{ color: "#ea4c38" }}>
                          ₱{(selectedItem.priceNum * selectedItem.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px 20px",
                      borderTop: "1.5px solid #e2e8f0",
                      backgroundColor: "#fafafa",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      disabled={isPaymentProcessing}
                      style={{
                        padding: "9px 16px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        backgroundColor: "#ffffff",
                        color: "#475569",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isPaymentProcessing}
                      onClick={handleConfirmLocalPayment}
                      style={{
                        padding: "9px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#ea4c38",
                        color: "#ffffff",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: isPaymentProcessing ? "wait" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(234, 76, 56, 0.25)",
                      }}
                    >
                      {isPaymentProcessing ? (
                        <>
                          <div
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              border: "2px solid #ffffff",
                              borderTopColor: "transparent",
                              animation: "spin 0.8s linear infinite",
                            }}
                          />
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={13} />
                          <span>Pay ₱{(selectedItem.priceNum * selectedItem.quantity).toLocaleString()}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!itemToDelete}
        title="Remove from Cart?"
        description={
          itemToDelete
            ? `Are you sure you want to remove "${itemToDelete.title}" from your current cart?`
            : ""
        }
        confirmLabel="Remove"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => {
          if (itemToDelete) {
            onRemoveItem(itemToDelete.id);
            if (selectedItemId === itemToDelete.id) {
              setSelectedItemId(null);
            }
            setItemToDelete(null);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
