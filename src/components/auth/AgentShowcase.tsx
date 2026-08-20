"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  MapPin,
  Star,
  Check,
  Headphones,
  Speaker,
  Watch
} from "lucide-react";

interface ShowcaseProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  savings: string;
  icon: typeof Headphones;
  aiHighlights: {
    title: string;
    detail: string;
  }[];
}

const PRODUCTS: ShowcaseProduct[] = [
  {
    id: "1",
    name: "Wireless Earbuds, IPX8",
    description: "Organic Cotton, fairtrade certified",
    price: "₱1,000",
    originalPrice: "₱1,680",
    savings: "₱680 saved",
    icon: Headphones,
    aiHighlights: [
      { title: "Price Arbitrage", detail: "Best rate discovered across 8 verified merchants" },
      { title: "Nearby Hub", detail: "In stock at local depot for same-day delivery" },
      { title: "Ethical Match", detail: "Verified eco-friendly & fairtrade supply chain" }
    ]
  },
  {
    id: "2",
    name: "Studio ANC Headphones",
    description: "Lossless Audio, 40h Battery",
    price: "₱2,450",
    originalPrice: "₱3,700",
    savings: "₱1,250 saved",
    icon: Speaker,
    aiHighlights: [
      { title: "Auto Coupon", detail: "Applied instant merchant seasonal discount" },
      { title: "Top Rated", detail: "4.9★ rating with 1,200+ verified customer reviews" },
      { title: "Warranty Secured", detail: "Includes 2-year official manufacturer warranty" }
    ]
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "AMOLED Display, Titanium Case",
    price: "₱1,890",
    originalPrice: "₱2,310",
    savings: "₱420 saved",
    icon: Watch,
    aiHighlights: [
      { title: "Bundle Discount", detail: "Curated package with free spare woven strap" },
      { title: "Nearby Seller", detail: "Dispatched from neighborhood partner store" },
      { title: "Fast Checkout", detail: "1-click pre-authorized autonomous reservation" }
    ]
  }
];

export function AgentShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
      setIsFavorited(false);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const product = PRODUCTS[currentIndex];
  const IconComponent = product.icon;

  return (
    <div className="flex flex-col justify-center h-full max-w-xl text-slate-800">
      <div className="mb-4">
        <img
          src="/cartesian_logo.png?v=2"
          alt="Cartesian Logo"
          className="h-14 sm:h-16 w-auto object-contain mb-3"
        />

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.12] text-slate-900 mb-2">
          Shop on a Higher Plane, {" "}
          <span className="text-[#ea4c38]">
            with the Only Logical Cart.
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
          Meet your autonomous shopping AI assistant. Discover curated recommendations, optimal pricing, and instant seller routing.
        </p>
      </div>

      <div className="relative rounded-2xl bg-white/90 border border-slate-200/80 p-4 shadow-[0_12px_30px_-10px_rgba(44,62,80,0.06)] backdrop-blur-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
          >
            <div className="sm:col-span-5 flex flex-col">
              <div className="relative rounded-2xl bg-[#ebebee] p-3 aspect-square flex flex-col justify-between overflow-hidden border border-slate-200/60 shadow-xs">
                <div className="flex items-start justify-between z-10">
                  <button
                    type="button"
                    onClick={() => setIsFavorited(!isFavorited)}
                    aria-label="Favorite product"
                    className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer hover:bg-white"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${isFavorited ? "fill-[#ea4c38] text-[#ea4c38]" : "text-[#ea4c38]"
                        }`}
                    />
                  </button>

                  <div className="flex flex-col gap-1 items-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fef2f0] text-[10px] font-bold text-[#ea4c38] shadow-xs border border-[#fed7d2]">
                      <MapPin className="w-2.5 h-2.5" />
                      Nearby
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fefce8] text-[10px] font-bold text-[#b45309] shadow-xs border border-[#fde68a]">
                      <Star className="w-2.5 h-2.5 fill-[#f59e0b] text-[#f59e0b]" />
                      Top Picks
                    </span>
                  </div>
                </div>

                <div className="my-auto flex flex-col items-center justify-center text-slate-400">
                  <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shadow-xs mb-1">
                    <IconComponent className="w-6 h-6 text-slate-500" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">Image</span>
                </div>
              </div>

              <div className="mt-2.5">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-[11px] text-slate-500 truncate">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs sm:text-sm font-extrabold text-[#ea4c38] font-mono">
                    {product.price}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through font-mono">
                    {product.originalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-7 flex flex-col justify-between sm:pl-2 sm:border-l sm:border-slate-100 h-full">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#fef2f0] text-[#ea4c38] flex items-center justify-center border border-[#fed7d2]">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      AI Curated Analysis
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-mono">
                    {product.savings}
                  </span>
                </div>

                <div className="space-y-2">
                  {product.aiHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-left"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                        <Check className="w-3 h-3 text-[#ea4c38] shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 pl-4.5 mt-0.5 leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-2.5 text-[10px] text-slate-400">
                <span>Recommendations 1 of {PRODUCTS.length}</span>
                <div className="flex items-center gap-1">
                  {PRODUCTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`View product ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? "w-5 bg-[#ea4c38]" : "w-1.5 bg-slate-200"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
