"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProductDetailView from "@/components/ProductDetailView";
import { initialProducts } from "@/data/products";
import { UserProfile, defaultUserProfile } from "@/data/userProfile";
import CartSidebar, { CartItem } from "@/components/CartSidebar";
import { ProductItem } from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// dynamic product detail route loading product metadata and cart state by id parameter
export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [activeTab, setActiveTab] = useState<string>("chat");
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartesian_user_profile");
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const product = initialProducts.find((p) => p.id === productId) || initialProducts[0];

  const handleAddToCart = (item: ProductItem) => {
    setCartItems((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          priceNum: item.priceNum,
          imageUrl: item.imageUrl || "/test-images/image1.jpg",
          rating: item.rating || 4.8,
          quantity: 1,
          vendorType: item.vendorType || "local",
          vendorName: item.vendorName,
          vendorLocation: item.vendorLocation,
          externalUrl: item.externalUrl,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
          router.push(`/?tab=${tab}`);
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
          cartCount={totalCartCount}
          onToggleCart={() => setShowCart(!showCart)}
          onBecomeSeller={() => router.push("/seller")}
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
            padding: "14px 18px",
          }}
        >
          <div
            className="no-scrollbar"
            style={{
              flex: 1,
              height: "100%",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <ProductDetailView
              product={product}
              onBack={() => router.push("/")}
              onSelectProduct={(p) => router.push(`/product/${p.id}`)}
              onAddToCart={handleAddToCart}
              allProducts={initialProducts}
            />
          </div>

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
                  overflow: "hidden",
                }}
              >
                <CartSidebar
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClose={() => setShowCart(false)}
                />
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
