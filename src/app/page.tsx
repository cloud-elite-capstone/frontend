"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AgentChat from "@/components/AgentChat";
import ProductGrid from "@/components/ProductGrid";
import { initialProducts } from "@/data/products";
import CartSidebar, { CartItem } from "@/components/CartSidebar";
import { ProductItem } from "@/components/ProductCard";
import { SearchIcon } from "@/components/Icons";

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
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [showCart, setShowCart] = useState(true);

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
        backgroundColor: "#f5f5f7",
        padding: "14px 16px 14px 8px",
        gap: "10px",
        fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          height: "calc(100vh - 28px)",
          maxHeight: "calc(100vh - 28px)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #f0f0f2",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
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
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
            minHeight: 0,
            overflow: "hidden",
            padding: "14px 18px 16px 18px",
          }}
        >
          <aside
            style={{
              width: "350px",
              minWidth: "320px",
              maxWidth: "380px",
              flexShrink: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AgentChat />
          </aside>

          <section
            onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 4)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              height: "100%",
              overflowY: "auto",
              paddingRight: "8px",
              paddingBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
                paddingTop: "6px",
                flexShrink: 0,
                gap: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1e1e1e",
                  letterSpacing: "-0.3px",
                  whiteSpace: "nowrap",
                }}
              >
                Shop Collaborative
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#f8f8fa",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "7px 14px",
                  width: "100%",
                  maxWidth: "240px",
                }}
              >
                <SearchIcon size={15} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "12.5px",
                    color: "#1e1e1e",
                    width: "100%",
                    fontFamily: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
                  }}
                />
              </div>
            </div>

            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
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
        </div>
      </main>
    </div>
  );
}
