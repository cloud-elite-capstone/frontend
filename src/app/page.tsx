"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AgentChat from "@/components/AgentChat";
import ProductGrid from "@/components/ProductGrid";
import { initialProducts } from "@/data/products";
import CartSidebar, { CartItem } from "@/components/CartSidebar";
import { ProductItem } from "@/components/ProductCard";
import { SearchIcon, XIcon } from "@/components/Icons";
import SettingsView from "@/components/SettingsView";
import HelpView from "@/components/HelpView";
import HistoryView from "@/components/HistoryView";
import ProductDetailView from "@/components/ProductDetailView";
import { initialConversations, ConversationThread } from "@/data/conversations";
import { UserProfile, defaultUserProfile } from "@/data/userProfile";

const NearbyMap = dynamic(() => import("@/components/NearbyMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "#ea4c38",
        fontSize: "13px",
        fontWeight: 600,
        backgroundColor: "#ffffff",
        borderRadius: "14px",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "2.5px solid #fed7d2",
          borderTopColor: "#ea4c38",
          animation: "spin 0.8s linear infinite",
          marginBottom: "8px",
        }}
      />
      Loading OpenStreetMap Hubs...
    </div>
  ),
});

const initialCartItems: CartItem[] = [
  {
    id: "p1",
    title: "Cartesian 120 Storage",
    price: "₱7,800",
    priceNum: 7800,
    imageUrl: "/test-images/image1.jpg",
    rating: 4.8,
    quantity: 1,
  },
  {
    id: "p2",
    title: "Smart Watch Elite Series",
    price: "₱4,500",
    priceNum: 4500,
    imageUrl: "/test-images/image2.png",
    rating: 4.7,
    quantity: 1,
  },
  {
    id: "p4",
    title: "Ultra Power Storage Hub",
    price: "₱2,100",
    priceNum: 2100,
    imageUrl: "/test-images/image4.png",
    rating: 4.6,
    quantity: 1,
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [showCart, setShowCart] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [conversations, setConversations] = useState<ConversationThread[]>(initialConversations);
  const [activeConvoId, setActiveConvoId] = useState<string>("convo-1");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartesian_user_profile");
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const isSettings = activeTab === "settings";
  const isHistory = activeTab === "history";
  const isMap = activeTab === "map";
  const isHelp = activeTab === "help";

  const activeConversation = conversations.find((c) => c.id === activeConvoId) || null;

  const handleContinueConversation = (convo: ConversationThread) => {
    setActiveConvoId(convo.id);
    setActiveTab("chat");
  };

  const mainSectionRef = useRef<HTMLElement>(null);

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setShowCart(false);
    if (mainSectionRef.current) {
      mainSectionRef.current.scrollTop = 0;
    }
  };

  const handleNewChat = () => {
    const newId = `convo-${Date.now()}`;
    const newThread: ConversationThread = {
      id: newId,
      title: "New Shopping Session",
      lastMessage: "Hi, this is your Cartesian AI Agent. What are you looking for today?",
      timestamp: "Just now",
      group: "today",
      productsExplored: 0,
      messages: [],
    };
    setConversations((prev) => [newThread, ...prev]);
    setActiveConvoId(newId);
    setActiveTab("chat");
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user" as const,
      text: text.trim(),
      timestamp: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvoId) {
          return {
            ...c,
            lastMessage: text.trim(),
            timestamp: "Just now",
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      })
    );

    setTimeout(() => {
      const agentMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "agent" as const,
        text: `I have curated the top recommendations for "${text.trim()}" and loaded them into the Curated Recommendations section on the right.\n\nTop Recommended Pick:\nThe top matching product stands out with high verified ratings (4.8★+), reliable build quality, and immediate availability from local fulfillment hubs.\n\nAlternative Options to Consider:\n• Budget Alternative: A cost-efficient pick providing the essential feature set at a lower price point.\n• Premium Alternative: Offers upgraded specifications, reinforced materials, and extended durability.`,
        timestamp: "Just now",
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvoId) {
            return {
              ...c,
              lastMessage: agentMsg.text,
              messages: [...c.messages, agentMsg],
            };
          }
          return c;
        })
      );
    }, 600);
  };

  const handleAddToCart = (product: ProductItem) => {
    if (!product) return;
    setCartItems((prev = []) => {
      const currentList = prev || [];
      const existing = currentList.find((item) => item.id === product.id);
      if (existing) {
        return currentList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...currentList,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          priceNum: product.priceNum,
          imageUrl: product.imageUrl,
          rating: product.rating,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev = []) =>
      (prev || [])
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev = []) => (prev || []).filter((item) => item.id !== id));
  };

  const allProducts = initialProducts || [];
  const query = (searchQuery || "").toLowerCase().trim();

  const filteredProducts = allProducts.filter((p) => {
    if (!p) return false;
    const titleMatch = (p.title || "").toLowerCase().includes(query);
    const subtitleMatch = (p.subtitle || "").toLowerCase().includes(query);
    return titleMatch || subtitleMatch;
  });

  const totalCartCount = (cartItems || []).reduce(
    (sum, item) => sum + (item?.quantity || 0),
    0
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#f4f5f7",
        padding: "14px 16px 14px 8px",
        gap: "10px",
        fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
      }}
    >
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }}
      />

      <main
        style={{
          flex: 1,
          height: "calc(100vh - 28px)",
          maxHeight: "calc(100vh - 28px)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1.5px solid #cbd5e1",
          boxShadow: "0 4px 20px rgba(44, 62, 80, 0.04)",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Navbar
          isScrolled={isScrolled}
          cartCount={totalCartCount}
          onToggleCart={() => setShowCart(!showCart)}
          userProfile={userProfile}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
            minHeight: 0,
            overflow: "hidden",
            padding: "0 18px 0 18px",
          }}
        >
          {isSettings ? (
            <div style={{ flex: 1, height: "100%", overflowY: "auto", padding: "14px 0" }}>
              <SettingsView
                userProfile={userProfile}
                onUpdateProfile={setUserProfile}
              />
            </div>
          ) : isHistory ? (
            <div style={{ flex: 1, height: "100%", overflow: "hidden" }}>
              <HistoryView
                conversations={conversations}
                onUpdateConversations={setConversations}
                onContinueConversation={handleContinueConversation}
                onAddToCart={handleAddToCart}
              />
            </div>
          ) : isMap ? (
            <div style={{ flex: 1, height: "100%", overflow: "hidden", padding: "14px 0" }}>
              <NearbyMap />
            </div>
          ) : isHelp ? (
            <div style={{ flex: 1, height: "100%", overflowY: "auto", padding: "14px 0" }}>
              <HelpView />
            </div>
          ) : (
            <>
              <aside
                style={{
                  width: "350px",
                  minWidth: "320px",
                  maxWidth: "380px",
                  flexShrink: 0,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 0 14px 0",
                }}
              >
                <AgentChat
                  activeConversation={activeConversation}
                  onSendMessage={handleSendMessage}
                  onNewChat={handleNewChat}
                  onAddToCart={handleAddToCart}
                />
              </aside>

              <section
                ref={mainSectionRef}
                className={selectedProduct ? "no-scrollbar" : "curated-scrollbar"}
                onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 4)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                  height: "100%",
                  overflowY: "auto",
                  scrollbarWidth: selectedProduct ? "none" : undefined,
                  msOverflowStyle: selectedProduct ? "none" : undefined,
                  padding: selectedProduct ? "14px 10px 40px 4px" : "14px 10px 80px 4px",
                  boxSizing: "border-box",
                }}
              >
                {selectedProduct ? (
                  <ProductDetailView
                    product={selectedProduct}
                    onBack={() => setSelectedProduct(null)}
                    onSelectProduct={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                    allProducts={initialProducts}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "28px",
                        marginTop: "12px",
                        paddingTop: 0,
                        flexShrink: 0,
                        gap: "16px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "#1e293b",
                          letterSpacing: "-0.3px",
                          whiteSpace: "nowrap",
                          margin: 0,
                        }}
                      >
                        Curated Recommendations
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: "#ffffff",
                          border: isSearchFocused
                            ? "1.5px solid #ea4c38"
                            : "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          padding: "7px 12px",
                          width: isSearchFocused ? "320px" : "210px",
                          maxWidth: "100%",
                          boxShadow: isSearchFocused
                            ? "0 4px 14px rgba(234, 76, 56, 0.12), 0 0 0 2px rgba(234, 76, 56, 0.1)"
                            : "0 1px 3px rgba(0, 0, 0, 0.04)",
                          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <SearchIcon
                          size={15}
                          color={isSearchFocused ? "#ea4c38" : "#94a3b8"}
                        />
                        <input
                          type="text"
                          placeholder={isSearchFocused ? "Search products..." : "Search products..."}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                          style={{
                            background: "none",
                            border: "none",
                            outline: "none",
                            fontSize: "12.5px",
                            color: "#1e293b",
                            width: "100%",
                            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                          }}
                        />
                        {searchQuery && (
                          <button
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSearchQuery("");
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                              color: "#94a3b8",
                              borderRadius: "50%",
                            }}
                            title="Clear search"
                          >
                            <XIcon size={13} color="#94a3b8" />
                          </button>
                        )}
                      </div>
                    </div>

                    <ProductGrid
                      products={filteredProducts}
                      onAddToCart={handleAddToCart}
                      onSelectProduct={handleSelectProduct}
                    />
                  </>
                )}
              </section>

              {showCart && (
                <aside
                  style={{
                    width: "310px",
                    minWidth: "280px",
                    maxWidth: "340px",
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px 0 14px 0",
                  }}
                >
                  <CartSidebar
                    items={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onClose={() => setShowCart(false)}
                  />
                </aside>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
