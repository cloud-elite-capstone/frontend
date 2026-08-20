"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  subtle?: boolean;
}

export function GlassCard({
  children,
  className = "",
  subtle = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-3xl ${
        subtle ? "glass-panel-subtle" : "glass-panel"
      } p-6 sm:p-8 md:p-10 transition-shadow duration-300 ${className}`}
      {...props}
    >
      <div 
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" 
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
