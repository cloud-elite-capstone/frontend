"use client";

import React from "react";
import ProductCard, { ProductItem } from "./ProductCard";
import { initialProducts } from "@/data/products";

interface ProductGridProps {
  products?: ProductItem[];
  onAddToCart?: (product: ProductItem) => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export default function ProductGrid({
  products = initialProducts,
  onAddToCart,
  onSelectProduct,
}: ProductGridProps) {
  const list = products || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "26px 14px",
        width: "100%",
        overflow: "visible",
        paddingBottom: "40px",
      }}
    >
      {list.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          index={idx}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}
export { initialProducts };
