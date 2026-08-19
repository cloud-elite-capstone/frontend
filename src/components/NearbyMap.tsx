"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, Star, Clock, ShoppingCart, Sparkles, CheckCircle2 } from "lucide-react";

interface MerchantStore {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  distance: string;
  eta: string;
  rating: number;
  isTopPick: boolean;
  featuredProduct: {
    name: string;
    price: string;
    description: string;
  };
}

const MERCHANTS: MerchantStore[] = [
  {
    id: "1",
    name: "Cartesian BGC Tech Hub",
    category: "Audio & Wearables",
    lat: 14.5547,
    lng: 121.0509,
    distance: "1.2 km",
    eta: "20-30 mins",
    rating: 4.9,
    isTopPick: true,
    featuredProduct: {
      name: "Wireless Earbuds, IPX8",
      price: "₱1,000",
      description: "Organic Cotton, fairtrade certified"
    }
  },
  {
    id: "2",
    name: "Makati Sound & Studio Depot",
    category: "Pro Audio Gear",
    lat: 14.5586,
    lng: 121.0244,
    distance: "2.4 km",
    eta: "35 mins",
    rating: 4.8,
    isTopPick: true,
    featuredProduct: {
      name: "Studio ANC Headphones",
      price: "₱2,450",
      description: "Lossless Audio, 40h Battery"
    }
  },
  {
    id: "3",
    name: "Ortigas Sustainable Living",
    category: "Eco Lifestyle",
    lat: 14.5869,
    lng: 121.0614,
    distance: "3.8 km",
    eta: "45 mins",
    rating: 4.9,
    isTopPick: false,
    featuredProduct: {
      name: "Fairtrade Linen Travel Case",
      price: "₱650",
      description: "Handcrafted natural fiber"
    }
  },
  {
    id: "4",
    name: "Greenhills Digital Gallery",
    category: "Smart Accessories",
    lat: 14.6019,
    lng: 121.0536,
    distance: "4.5 km",
    eta: "50 mins",
    rating: 4.7,
    isTopPick: false,
    featuredProduct: {
      name: "Titanium Smart Watch",
      price: "₱1,890",
      description: "AMOLED Display, IP68"
    }
  }
];

export default function NearbyMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantStore>(MERCHANTS[0]);
  const [filterRadius, setFilterRadius] = useState<string>("all");

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;
      
      const L = (await import("leaflet")).default;

      if (!isMounted) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize Leaflet Map
      const map = L.map(mapContainerRef.current, {
        center: [14.568, 121.042],
        zoom: 13,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom control at bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Add Clean CartoDB Voyager / OpenStreetMap tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 19,
      }).addTo(map);

      // Create Custom SVG Markers for Cartesian Merchants
      MERCHANTS.forEach((merchant) => {
        const isSelected = selectedMerchant.id === merchant.id;
        const color = merchant.isTopPick ? "#7a3e9d" : "#f97316";

        const customIcon = L.divIcon({
          className: "cartesian-custom-pin",
          html: `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 38px;
              height: 38px;
              border-radius: 50%;
              background: #ffffff;
              border: 2.5px solid ${color};
              box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 4px ${color}20;
              cursor: pointer;
              transform: translate(-50%, -50%);
              transition: transform 0.2s ease;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });

        const marker = L.marker([merchant.lat, merchant.lng], { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          setSelectedMerchant(merchant);
          map.panTo([merchant.lat, merchant.lng], { animate: true, duration: 0.6 });
        });
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Filter merchants based on radius
  const filteredMerchants = MERCHANTS.filter((m) => {
    if (filterRadius === "2km") return parseFloat(m.distance) <= 2.0;
    if (filterRadius === "4km") return parseFloat(m.distance) <= 4.0;
    return true;
  });

  const panToStore = (merchant: MerchantStore) => {
    setSelectedMerchant(merchant);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo([merchant.lat, merchant.lng], { animate: true, duration: 0.6 });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "relative",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Top Filter Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid #f0f0f2",
          backgroundColor: "#ffffff",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              backgroundColor: "#f5eefa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7a3e9d",
            }}
          >
            <MapPin size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e1e1e", lineHeight: 1.1 }}>
              Nearby Cartesian Merchants
            </h3>
            <p style={{ fontSize: "11px", color: "#6b7280" }}>
              Live OpenStreetMap inventory routing
            </p>
          </div>
        </div>

        {/* Radius Filter Chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {[
            { id: "all", label: "All Hubs" },
            { id: "2km", label: "< 2 km" },
            { id: "4km", label: "< 4 km" },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilterRadius(chip.id)}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "20px",
                border: filterRadius === chip.id ? "1.5px solid #7a3e9d" : "1px solid #e5e7eb",
                backgroundColor: filterRadius === chip.id ? "#f5eefa" : "#ffffff",
                color: filterRadius === chip.id ? "#7a3e9d" : "#6b7280",
                transition: "all 0.15s ease",
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%", zIndex: 1 }} />

        {/* Selected Store Floating AI Card (Bottom Overlay) */}
        {selectedMerchant && (
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              maxWidth: "460px",
              zIndex: 20,
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(122, 62, 157, 0.08)",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1e1e1e",
                    }}
                  >
                    {selectedMerchant.name}
                  </span>
                  {selectedMerchant.isTopPick && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        backgroundColor: "#fff7ed",
                        color: "#f97316",
                        padding: "1px 6px",
                        borderRadius: "10px",
                        border: "1px solid rgba(249, 115, 22, 0.3)",
                      }}
                    >
                      ★ Top Pick
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "#6b7280" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <Navigation size={10} color="#7a3e9d" />
                    {selectedMerchant.distance}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={10} color="#f97316" />
                    ETA {selectedMerchant.eta}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <Star size={10} color="#f59e0b" fill="#f59e0b" />
                    {selectedMerchant.rating}
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#f97316",
                  fontFamily: "monospace",
                }}
              >
                {selectedMerchant.featuredProduct.price}
              </span>
            </div>

            {/* In-Stock Item Preview */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                borderRadius: "10px",
                backgroundColor: "#f8f8fa",
                border: "1px solid #f0f0f2",
              }}
            >
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#1e1e1e" }}>
                  {selectedMerchant.featuredProduct.name}
                </div>
                <div style={{ fontSize: "10px", color: "#6b7280" }}>
                  {selectedMerchant.featuredProduct.description}
                </div>
              </div>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#ffffff",
                  background: "linear-gradient(90deg, #ff8a00 0%, #ff756d 100%)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  boxShadow: "0 3px 8px rgba(255, 122, 0, 0.3)",
                }}
              >
                <ShoppingCart size={11} />
                Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Horizontal Store Selector Rail */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px 14px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #f0f0f2",
          overflowX: "auto",
          flexShrink: 0,
        }}
      >
        {filteredMerchants.map((merchant) => {
          const isSelected = selectedMerchant.id === merchant.id;
          return (
            <button
              key={merchant.id}
              onClick={() => panToStore(merchant)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "6px 12px",
                borderRadius: "10px",
                border: isSelected ? "1.5px solid #7a3e9d" : "1px solid #e5e7eb",
                backgroundColor: isSelected ? "#f5eefa" : "#ffffff",
                minWidth: "160px",
                flexShrink: 0,
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: isSelected ? "#7a3e9d" : "#1e1e1e",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                {merchant.name}
              </div>
              <div style={{ fontSize: "10px", color: "#6b7280" }}>
                {merchant.distance} • {merchant.featuredProduct.price}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
