"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
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
import BecomeSellerView from "@/components/BecomeSellerView";
import { initialConversations, ConversationThread } from "@/data/conversations";
import { UserProfile, defaultUserProfile } from "@/data/userProfile";
import { summerOutfitCatalog, OutfitLook } from "@/data/outfits";
import FolderCatalogTabs from "@/components/FolderCatalogTabs";
import RecommendedOutfit from "@/components/RecommendedOutfit";

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

const initialConversationCarts: Record<string, CartItem[]> = {
  "convo-summer": [
    {
      id: "outfit-1-1",
      title: "Breeze Camp-Collar Linen Shirt",
      price: "₱1,850",
      priceNum: 1850,
      imageUrl: "/test-images/image1.png",
      rating: 4.9,
      quantity: 1,
      vendorType: "local",
      vendorName: "Cartesian Artisan Apparel",
      vendorLocation: "Level 1, Bonifacio High Street, BGC, Taguig",
    },
    {
      id: "outfit-1-3",
      title: "Polarized Riviera Sunglasses",
      price: "₱1,000",
      priceNum: 1000,
      imageUrl: "/test-images/image3.png",
      rating: 4.9,
      quantity: 1,
      vendorType: "external",
      vendorName: "Solara Eyewear Official",
      vendorLocation: "Shopee Mall Flagship",
      externalUrl: "https://shopee.ph/search?keyword=polarized+summer+sunglasses",
    },
  ],
  "convo-1": [
    {
      id: "p1",
      title: "Cartesian 120 Storage",
      price: "₱7,800",
      priceNum: 7800,
      imageUrl: "/test-images/image1.jpg",
      rating: 4.8,
      quantity: 1,
      vendorType: "local",
      vendorName: "Cartesian BGC Tech Hub",
      vendorLocation: "Level 2, Bonifacio High Street, BGC, Taguig City",
    },
    {
      id: "p3",
      title: "Active Pro Smartwatch",
      price: "₱3,200",
      priceNum: 3200,
      imageUrl: "/test-images/image3.png",
      rating: 4.9,
      quantity: 1,
      vendorType: "external",
      vendorName: "GearFit Official Flagship Store",
      vendorLocation: "Verified Online Store • Regional Catalog",
      externalUrl: "https://shopee.ph/gearfit-active-pro-smartwatch",
    },
  ],
  "convo-2": [
    {
      id: "p2",
      title: "Smart Watch Elite Series",
      price: "₱4,500",
      priceNum: 4500,
      imageUrl: "/test-images/image2.png",
      rating: 4.7,
      quantity: 1,
      vendorType: "local",
      vendorName: "Manila Smart Wearables Hub",
      vendorLocation: "4th Floor, SM Aura Premier, Taguig City",
    },
    {
      id: "p4",
      title: "Ultra Power Storage Hub",
      price: "₱2,100",
      priceNum: 2100,
      imageUrl: "/test-images/image4.png",
      rating: 4.6,
      quantity: 1,
      vendorType: "external",
      vendorName: "PowerLink Tech Online Store",
      vendorLocation: "Official Online Partner Store",
      externalUrl: "https://lazada.com.ph/powerlink-ultra-hub",
    },
  ],
  "convo-3": [
    {
      id: "p5",
      title: "Dual Turbo 65W GaN Hub",
      price: "₱1,450",
      priceNum: 1450,
      imageUrl: "/test-images/image1.jpg",
      rating: 4.9,
      quantity: 2,
      vendorType: "local",
      vendorName: "Cartesian BGC Tech Hub",
      vendorLocation: "Level 2, Bonifacio High Street, BGC, Taguig City",
    },
  ],
  "convo-4": [
    {
      id: "p2",
      title: "Smart Watch Elite Series",
      price: "₱4,500",
      priceNum: 4500,
      imageUrl: "/test-images/image2.png",
      rating: 4.7,
      quantity: 1,
      vendorType: "local",
      vendorName: "Manila Smart Wearables Hub",
      vendorLocation: "4th Floor, SM Aura Premier, Taguig City",
    },
  ],
};

// main dashboard combining conversational shopping, curated catalogs, multi-look outfits, and persistent carts
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [conversations, setConversations] = useState<ConversationThread[]>(initialConversations);
  const [activeConvoId, setActiveConvoId] = useState<string>("convo-summer");
  const [activeCatalogTabId, setActiveCatalogTabId] = useState<string>("look-1");
  const [cartsByConversation, setCartsByConversation] = useState<Record<string, CartItem[]>>(initialConversationCarts);
  const [showCart, setShowCart] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartesian_user_profile");
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    } catch { }
  }, []);

  const isSettings = activeTab === "settings";
  const isHistory = activeTab === "history";
  const isMap = activeTab === "map";
  const isHelp = activeTab === "help";
  const isSeller = activeTab === "seller";

  const activeConversation = conversations.find((c) => c.id === activeConvoId) || null;
  const cartItems = cartsByConversation[activeConvoId] || [];

  const activeLooks = activeConversation?.catalogLooks || (activeConvoId === "convo-summer" ? summerOutfitCatalog : []);
  const selectedLook = activeLooks.find((l) => l.id === activeCatalogTabId) || (activeLooks.length > 0 && activeCatalogTabId !== "all" ? activeLooks[0] : null);

  const handleContinueConversation = (convo: ConversationThread) => {
    setActiveConvoId(convo.id);
    if (convo.catalogLooks && convo.catalogLooks.length > 0) {
      setActiveCatalogTabId(convo.catalogLooks[0].id);
    } else {
      setActiveCatalogTabId("all");
    }
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
    setActiveCatalogTabId("all");
    setCartsByConversation((prev) => ({
      ...prev,
      [newId]: [],
    }));
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

    const isOutfitQuery = /(summer|outfit|look|wear|resort|beach|catalog|vacation|pair|style)/i.test(text);

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvoId) {
          return {
            ...c,
            lastMessage: text.trim(),
            timestamp: "Just now",
            catalogLooks: isOutfitQuery ? summerOutfitCatalog : c.catalogLooks,
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      })
    );

    if (isOutfitQuery) {
      setActiveCatalogTabId("look-1");
    }

    setTimeout(() => {
      const agentMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "agent" as const,
        text: isOutfitQuery
          ? `I've styled 2 complete summer outfit catalogs for your beach resort trip! You can explore each lookbook tab in the Curated Recommendations section on the right, or click below to view:`
          : `I have curated the top recommendations for "${text.trim()}" and loaded them into the Curated Recommendations section on the right.\n\nTop Recommended Pick:\nThe top matching product stands out with high verified ratings (4.8★+), reliable build quality, and immediate availability from local fulfillment hubs.\n\nAlternative Options to Consider:\n• Budget Alternative: A cost-efficient pick providing the essential feature set at a lower price point.\n• Premium Alternative: Offers upgraded specifications, reinforced materials, and extended durability.`,
        timestamp: "Just now",
        catalogLooks: isOutfitQuery ? summerOutfitCatalog : undefined,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvoId) {
            return {
              ...c,
              lastMessage: agentMsg.text,
              catalogLooks: isOutfitQuery ? summerOutfitCatalog : c.catalogLooks,
              messages: [...c.messages, agentMsg],
            };
          }
          return c;
        })
      );
    }, 600);
  };

  const handleAddFullOutfitToCart = (items: ProductItem[]) => {
    if (!items || items.length === 0) return;
    setCartsByConversation((prev) => {
      const currentList = prev[activeConvoId] || [];
      let updatedList = [...currentList];

      items.forEach((product) => {
        const existing = updatedList.find((item) => item.id === product.id);
        if (existing) {
          updatedList = updatedList.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedList.push({
            id: product.id,
            title: product.title,
            price: product.price,
            priceNum: product.priceNum,
            imageUrl: product.imageUrl,
            rating: product.rating,
            quantity: 1,
            vendorType: product.vendorType || "local",
            vendorName: product.vendorName,
            vendorLocation: product.vendorLocation,
            externalUrl: product.externalUrl,
          });
        }
      });

      return {
        ...prev,
        [activeConvoId]: updatedList,
      };
    });
  };

  const handleAddToCart = (product: ProductItem) => {
    if (!product) return;
    setCartsByConversation((prev) => {
      const currentList = prev[activeConvoId] || [];
      const existing = currentList.find((item) => item.id === product.id);
      let updatedList: CartItem[];

      if (existing) {
        updatedList = currentList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedList = [
          ...currentList,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            priceNum: product.priceNum,
            imageUrl: product.imageUrl,
            rating: product.rating,
            quantity: 1,
            vendorType: product.vendorType || "local",
            vendorName: product.vendorName,
            vendorLocation: product.vendorLocation,
            externalUrl: product.externalUrl,
          },
        ];
      }

      return {
        ...prev,
        [activeConvoId]: updatedList,
      };
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartsByConversation((prev) => {
      const currentList = prev[activeConvoId] || [];
      const updatedList = currentList
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return {
        ...prev,
        [activeConvoId]: updatedList,
      };
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartsByConversation((prev) => ({
      ...prev,
      [activeConvoId]: (prev[activeConvoId] || []).filter((item) => item.id !== id),
    }));
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

  if (isSeller) {
    return <BecomeSellerView onBack={() => setActiveTab("chat")} />;
  }

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
          onBecomeSeller={() => {
            setActiveTab("seller");
            setSelectedProduct(null);
          }}
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
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ flex: 1, height: "100%", overflowY: "auto", padding: "14px 0" }}
            >
              <SettingsView
                userProfile={userProfile}
                onUpdateProfile={setUserProfile}
              />
            </motion.div>
          ) : isHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ flex: 1, height: "100%", overflow: "hidden" }}
            >
              <HistoryView
                conversations={conversations}
                onUpdateConversations={setConversations}
                onContinueConversation={handleContinueConversation}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ) : isMap ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ flex: 1, height: "100%", overflow: "hidden", padding: "14px 0" }}
            >
              <NearbyMap />
            </motion.div>
          ) : isHelp ? (
            <motion.div
              key="help"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ flex: 1, height: "100%", overflowY: "auto", padding: "14px 0" }}
            >
              <HelpView />
            </motion.div>
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
                  onSelectLookTab={(lookId) => setActiveCatalogTabId(lookId)}
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
                        marginBottom: activeLooks.length > 0 ? "16px" : "28px",
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

                    {activeLooks.length > 0 && (
                      <div style={{ marginBottom: "14px" }}>
                        <FolderCatalogTabs
                          looks={activeLooks}
                          activeTabId={activeCatalogTabId}
                          onSelectTab={(tabId) => setActiveCatalogTabId(tabId)}
                        />
                      </div>
                    )}

                    {activeLooks.length > 0 && activeCatalogTabId !== "all" && selectedLook && (
                      <RecommendedOutfit
                        look={selectedLook}
                        onSelectProduct={handleSelectProduct}
                        onAddToCart={handleAddToCart}
                        onAddFullOutfitToCart={handleAddFullOutfitToCart}
                      />
                    )}

                    {activeLooks.length > 0 && activeCatalogTabId !== "all" && selectedLook && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "24px",
                          marginBottom: "20px",
                          paddingTop: "12px",
                          paddingBottom: "8px",
                          borderBottom: "1.5px solid #e2e8f0",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#1e293b",
                            margin: 0,
                            letterSpacing: "-0.2px",
                          }}
                        >
                          Other Recommendations
                        </h3>
                        <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
                          {filteredProducts.length} items available
                        </span>
                      </div>
                    )}

                    <ProductGrid
                      products={filteredProducts}
                      onAddToCart={handleAddToCart}
                      onSelectProduct={handleSelectProduct}
                    />
                  </>
                )}
              </section>

              <AnimatePresence>
                {showCart && (
                  <motion.aside
                    initial={{ width: 0, opacity: 0, x: 20 }}
                    animate={{ width: "310px", opacity: 1, x: 0 }}
                    exit={{ width: 0, opacity: 0, x: 20 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    style={{
                      minWidth: "280px",
                      maxWidth: "340px",
                      flexShrink: 0,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      padding: "14px 0 14px 0",
                      overflow: "hidden",
                    }}
                  >
                    <CartSidebar
                      items={cartItems}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      onClose={() => setShowCart(false)}
                      conversations={conversations}
                      activeConvoId={activeConvoId}
                      onSelectConversation={(convoId) => {
                        setActiveConvoId(convoId);
                        setActiveTab("chat");
                      }}
                      cartsByConversation={cartsByConversation}
                    />
                  </motion.aside>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
