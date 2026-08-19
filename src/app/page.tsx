"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, ArrowRight, ShieldCheck, Zap, Bot } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full bg-[#f4f4f6] flex flex-col justify-between overflow-x-hidden bg-grain">
      {/* Dynamic Ambient Background Orbs with Sampled Light Purple and Light Orange */}
      <div 
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ca98f1]/25 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#f9b584]/25 to-transparent blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7a3e9d] flex items-center justify-center text-white shadow-md">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#7a3e9d]">
            Cartesian
          </span>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white btn-sunset-gradient transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-[#ca98f1]/30 mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#f97316]" />
          <span className="text-xs font-semibold text-[#7a3e9d]">
            Agentic AI Shopping Assistant
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
        >
          The Intelligent Coordinate for{" "}
          <span className="text-[#7a3e9d]">
            Autonomous Commerce
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Cartesian connects live shopping telemetry, autonomous multi-vendor deal routing, and continuous cart curation into one seamless interface.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white btn-sunset-gradient flex items-center justify-center gap-3 shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Bot className="w-5 h-5" />
            <span>Launch Cartesian Copilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Feature Pill Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16 text-left"
        >
          <div className="p-5 rounded-3xl glass-panel-subtle">
            <div className="w-8 h-8 rounded-xl bg-[#f5eefa] text-[#7a3e9d] flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Instant Curation</div>
            <div className="text-xs text-slate-500">Autonomous recommendation vectors customized to your exact preferences.</div>
          </div>

          <div className="p-5 rounded-3xl glass-panel-subtle">
            <div className="w-8 h-8 rounded-xl bg-[#fff7ed] text-[#f97316] flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Sunset Pricing</div>
            <div className="text-xs text-slate-500">Dynamic discount negotiation and cross-marketplace savings.</div>
          </div>

          <div className="p-5 rounded-3xl glass-panel-subtle">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Zero-Trust Security</div>
            <div className="text-xs text-slate-500">Verified seller reputations, fairtrade compliance, and encrypted sessions.</div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Cartesian Inc. Agentic AI E-Commerce.
      </footer>
    </main>
  );
}
