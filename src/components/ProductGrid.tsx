"use client";

import React from "react";
import ProductCard, { ProductItem } from "./ProductCard";
import { initialProducts } from "@/data/products";

interface ProductGridProps {
  products?: ProductItem[];
  onAddToCart?: (product: ProductItem) => void;
}

export default function ProductGrid({
  products = initialProducts,
  onAddToCart,
}: ProductGridProps) {
  const list = products || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "22px 14px",
        width: "100%",
        overflow: "visible",
      }}
    >
      {list.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
export { initialProducts };
