"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BecomeSellerView from "@/components/BecomeSellerView";

// seller application page route with back navigation to home
export default function SellerPage() {
  const router = useRouter();

  return <BecomeSellerView onBack={() => router.push("/")} />;
}
