import React from "react";

export default function AddToCartButton({ count = 2 }: { count?: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.15s ease",
      }}
      title="Add to Cart"
    >
      <svg
        width="168"
        height="38"
        viewBox="0 0 168 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="12"
          y="25"
          fill="#111827"
          fontSize="18"
          fontWeight="700"
          fontFamily="var(--font-josefin-sans), 'Josefin Sans', sans-serif"
          textAnchor="middle"
        >
          {count}
        </text>

        <path
          d="M 24 0 C 37 10, 37 28, 24 38 L 149 38 C 159.5 38, 168 29.5, 168 19 C 168 8.5, 159.5 0, 149 0 Z"
          fill="#ffb86f"
        />

        <text
          x="94"
          y="24"
          fill="#ffffff"
          fontSize="14"
          fontWeight="600"
          fontFamily="var(--font-josefin-sans), 'Josefin Sans', sans-serif"
          textAnchor="middle"
          letterSpacing="0.2px"
        >
          Add to Cart
        </text>
      </svg>
    </div>
  );
}
