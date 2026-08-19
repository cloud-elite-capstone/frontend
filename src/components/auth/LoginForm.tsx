"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  User, 
  CheckCircle, 
  Loader2,
  MailCheck,
  X
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  
  // Themed Toast Notification State for Forgot Password
  const [showForgotToast, setShowForgotToast] = useState(false);
  // Snapshot/freeze the email when "Forgot?" was clicked so editing input doesn't mutate active toast
  const [sentEmail, setSentEmail] = useState("");

  // Email format validation (standard RFC 5322 regex check)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !password || (isSignUp && !name)) {
      return;
    }

    setIsLoading(true);
    setSubmittedMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setSubmittedMessage(
        isSignUp
          ? `Account created! Welcome, ${name.split(" ")[0] || "Explorer"}.`
          : `Signed in successfully as ${email.trim()}.`
      );
    }, 1000);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;

    // Snapshot the current valid email so modifying the input box won't change the notification
    setSentEmail(email.trim());
    setShowForgotToast(true);

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      setShowForgotToast(false);
    }, 6000);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
      {/* Themed Cartesian Toast Notification */}
      <AnimatePresence>
        {showForgotToast && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed top-6 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#7a3e9d]/25 shadow-[0_16px_36px_-8px_rgba(122,62,157,0.22)] flex items-start gap-3.5"
            role="alert"
          >
            <div className="w-9 h-9 rounded-xl bg-[#f5eefa] text-[#7a3e9d] flex items-center justify-center shrink-0 shadow-xs border border-[#ca98f1]/30">
              <MailCheck className="w-5 h-5" />
            </div>

            <div className="flex-1 pr-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-bold text-slate-900">
                  Password Recovery Sent
                </span>
                <span className="text-[9px] font-bold text-[#f97316] bg-[#fff7ed] px-1.5 py-0.5 rounded border border-[#f97316]/20">
                  Inbox
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A secure password reset link has been dispatched to{" "}
                <strong className="text-slate-900 font-semibold">{sentEmail}</strong>.
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
                <Sparkles className="w-3 h-3 text-[#7a3e9d]" />
                <span>Link expires in 15 minutes. Check spam if not received.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowForgotToast(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCard className="w-full shadow-xl p-5 sm:p-7">
        {/* Top Card Header */}
        <div className="text-center mb-4">
          <div className="inline-flex p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 mb-3">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setSubmittedMessage(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                !isSignUp
                  ? "bg-white text-[#7a3e9d] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setSubmittedMessage(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSignUp
                  ? "bg-white text-[#7a3e9d] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Create Account
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 mb-1">
            {isSignUp ? "Join Cartesian" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-500">
            {isSignUp
              ? "Initialize your personalized AI shopping companion"
              : "Sign in to access your curated deals and smart cart"}
          </p>
        </div>

        {/* Social One-Click Auth */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/90 hover:bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/90 hover:bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current text-slate-900" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.79 1.1-1.9 0.98-3-.95.04-2.1.63-2.77 1.42-.59.68-1.11 1.8-0.98 2.87 1.06.08 2.14-.52 2.77-1.29z" />
            </svg>
            Apple ID
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-3.5">
          <div className="w-full border-t border-slate-200/80"></div>
          <span className="absolute bg-white/90 px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider rounded-full">
            or with email
          </span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name input (only for Sign Up) */}
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label 
                  htmlFor="name-input"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    id="name-input"
                    type="text"
                    required={isSignUp}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7a3e9d]/30 focus:border-[#7a3e9d] transition-all duration-200"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Address */}
          <div>
            <label 
              htmlFor="email-input"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <input
                id="email-input"
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7a3e9d]/30 focus:border-[#7a3e9d] transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label 
                htmlFor="password-input"
                className="block text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  disabled={!isEmailValid}
                  onClick={handleForgotPassword}
                  title={
                    !isEmailValid
                      ? "Please enter a valid email address first"
                      : `Send password recovery link to ${email.trim()}`
                  }
                  className={`text-xs font-semibold transition-all duration-150 ${
                    isEmailValid
                      ? "text-[#7a3e9d] hover:text-[#692e8a] cursor-pointer underline-offset-2 hover:underline"
                      : "text-slate-300 cursor-not-allowed select-none no-underline"
                  }`}
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7a3e9d]/30 focus:border-[#7a3e9d] transition-all duration-200 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#7a3e9d] focus:ring-[#7a3e9d] border-slate-300 accent-[#7a3e9d] cursor-pointer"
              />
              <span className="text-xs text-slate-600">Remember this device</span>
            </label>
          </div>

          {/* Submit feedback message */}
          <AnimatePresence>
            {submittedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{submittedMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Submit CTA Button (Sunset Gradient) */}
          <motion.button
            whileHover={{ scale: 1.015, y: -1 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-6 rounded-full text-xs sm:text-sm font-bold text-white btn-sunset-gradient flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>{isSignUp ? "Create Cartesian Account" : "Sign In to Cartesian"}</span>
                <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Security / Switcher */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            {isSignUp ? "Already have an account? " : "New to Cartesian? "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setSubmittedMessage(null);
              }}
              className="font-bold text-[#7a3e9d] hover:text-[#692e8a] underline underline-offset-2 transition-colors cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Create an Account"}
            </button>
          </p>

          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <Sparkles className="w-3 h-3 text-[#f97316]" />
            <span>Protected by Cartesian Zero-Trust Commerce Agent</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
