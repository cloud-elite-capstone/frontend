"use client";

import React from "react";
import ProductCard, { ProductItem } from "./ProductCard";

const placeholderProducts: ProductItem[] = [
  {
    id: "p1",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: true,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p2",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: false,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p3",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: false,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p4",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: false,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p5",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: false,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p6",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: false,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p7",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: true,
    isNearby: true,
    isTopPick: true,
  },
  {
    id: "p8",
    title: "Product Name",
    subtitle: "Description",
    price: "₱0",
    initialFavorited: false,
    isNearby: true,
    isTopPick: true,
  },
];

export default function ProductGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "36px 16px",
        width: "100%",
        overflow: "visible",
      }}
    >
      {placeholderProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
