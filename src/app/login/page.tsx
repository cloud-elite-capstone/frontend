"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AgentShowcase } from "@/components/auth/AgentShowcase";
import { LoginForm } from "@/components/auth/LoginForm";

// login page rendering the animated ambient backdrop, agent showcase, and sign-in card
export default function LoginPage() {
  return (
    <main className="relative h-screen max-h-screen w-full bg-[#f4f5f7] flex flex-col justify-between overflow-hidden bg-grain select-none">
      <div 
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#2c3e50]/8 via-[#2c3e50]/4 to-transparent blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-[#ea4c38]/12 via-[#ea4c38]/6 to-transparent blur-3xl"
        />
      </div>

      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1 flex items-center justify-between">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-slate-700 hover:text-[#ea4c38] transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>
      </header>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 my-auto flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <AgentShowcase />
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </section>

      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/40">
        <div>
          © 2026 Cartesian Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <a href="#privacy" className="hover:text-[#ea4c38] transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" className="hover:text-[#ea4c38] transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#ai-ethics" className="hover:text-[#ea4c38] transition-colors">Responsible AI</a>
        </div>
      </footer>
    </main>
  );
}
