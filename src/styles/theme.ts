export const theme = {
  colors: {
    orange: {
      primary: "#ea4c38",
      hover: "#d93b27",
      dark: "#c8321e",
      light: "#fca59b",
      tint: "#fef2f0",
      softBg: "#fff1ee",
      glow: "rgba(234, 76, 56, 0.12)",
      shadow: "rgba(234, 76, 56, 0.2)",
    },
    yellow: {
      primary: "#f59e0b",
      hover: "#d97706",
      dark: "#b45309",
      light: "#fde68a",
      tint: "#fefce8",
      glow: "rgba(245, 158, 11, 0.15)",
    },
    navy: {
      primary: "#2c3e50",
      dark: "#1e293b",
      deep: "#0f172a",
      light: "#475569",
      muted: "#64748b",
      subtle: "#94a3b8",
      tint: "#edf0f2",
      cardShadow: "rgba(44, 62, 80, 0.18)",
    },
    neutral: {
      white: "#ffffff",
      canvasBg: "#f4f5f7",
      surfaceBg: "#ffffff",
      plateBg: "#edf0f2",
      bgHover: "#f8fafc",
      borderSubtle: "#e2e8f0",
      borderMedium: "#cbd5e1",
    },
  },
  fonts: {
    heading: "var(--font-josefin-sans), 'Josefin Sans', sans-serif",
    body: "var(--font-open-sans), 'Open Sans', sans-serif",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "14px",
    full: "9999px",
  },
} as const;

export default theme;
