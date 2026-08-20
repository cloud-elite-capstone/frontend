export interface HistoryMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
}

export interface ConversationThread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  group: "today" | "yesterday" | "previous7Days";
  productsExplored?: number;
  messages: HistoryMessage[];
}

export const initialConversations: ConversationThread[] = [
  {
    id: "convo-1",
    title: "Wireless ANC Studio Headsets",
    lastMessage: "Yes! The BGC Metro Hub currently has 4 verified units in stock.",
    timestamp: "10:46 AM",
    group: "today",
    productsExplored: 2,
    messages: [
      {
        id: "m1-1",
        sender: "user",
        text: "Looking for studio quality wireless headphones with active noise cancellation under ₱6,500.",
        timestamp: "10:43 AM",
      },
      {
        id: "m1-2",
        sender: "agent",
        text: `I have curated the top recommendations for you and loaded them into the Curated Recommendations section on the right.

Top Recommended Pick:
The Studio Monitor Headset Pro (₱6,200) is the highest-rated option (4.9★). Verified reviews consistently highlight its class-leading active noise cancellation, studio-grade neutral acoustic tuning, and 40-hour battery life. It is currently available with same-day delivery from the BGC Metro Hub.

Alternative Options to Consider:
• Cartesian Pro Wireless Buds (₱5,400): Best choice if you prefer an ultra-compact in-ear format with instant multipoint Bluetooth sync.
• Studio Monitor Standard (₱4,800): A value-focused alternative offering the same acoustic drivers with passive memory foam isolation.`,
        timestamp: "10:45 AM",
      },
      {
        id: "m1-3",
        sender: "user",
        text: "Can I get same-day delivery on the Studio Monitor Headset?",
        timestamp: "10:46 AM",
      },
      {
        id: "m1-4",
        sender: "agent",
        text: "Yes! The BGC Metro Hub currently has 4 verified units in stock. Orders placed before 4:00 PM qualify for express localized dispatch within 35–45 minutes.",
        timestamp: "10:46 AM",
      },
    ],
  },
  {
    id: "convo-2",
    title: "Ergonomic Desk & Wireless Mice",
    lastMessage: "Precision Wireless Mouse is the standout choice for long desk sessions.",
    timestamp: "8:20 AM",
    group: "today",
    productsExplored: 1,
    messages: [
      {
        id: "m2-1",
        sender: "user",
        text: "Recommend ergonomic wireless mice suitable for long coding and productivity sessions.",
        timestamp: "8:18 AM",
      },
      {
        id: "m2-2",
        sender: "agent",
        text: `I have gathered the top ergonomic peripherals and loaded them into your Curated Recommendations section.

Top Recommended Pick:
The Precision Wireless Mouse (₱1,850) is the highest-rated device for desk setups. Users praise its contoured palm support, silent tactile microswitches, and multi-device Bluetooth switching that minimizes wrist strain during 8+ hour workdays.

Alternative Options to Consider:
• Vertical Ergonomic Pro (₱2,400): Upright handshake grip engineered specifically for repetitive strain injury prevention.
• Compact Travel Optical Mouse (₱1,200): Low-profile portable mouse with magnetic dongle storage for mobile laptop work.`,
        timestamp: "8:20 AM",
      },
    ],
  },
  {
    id: "convo-3",
    title: "Fast GaN Chargers & Power Hubs",
    lastMessage: "Dual Turbo 65W GaN Hub is compatible with all USB-C laptops and devices.",
    timestamp: "Yesterday, 4:15 PM",
    group: "yesterday",
    productsExplored: 1,
    messages: [
      {
        id: "m3-1",
        sender: "user",
        text: "Need a compact multi-port GaN charger for frequent travel.",
        timestamp: "Yesterday, 4:12 PM",
      },
      {
        id: "m3-2",
        sender: "agent",
        text: `I have analyzed verified GaN power adapters and loaded them into your Curated Recommendations section.

Top Recommended Pick:
The Dual Turbo 65W GaN Hub (₱1,450) provides the best power-to-size ratio. It features dual USB-C Power Delivery 3.0 ports capable of fast-charging a laptop and smartphone simultaneously with intelligent thermal regulation.

Alternative Options to Consider:
• Ultra Power 100W Desktop Hub (₱2,800): High-wattage 4-port desktop hub for multi-device workstations.
• Pocket 30W Mini GaN (₱950): Ultra-compact single port charger built for minimalist travel pouches.`,
        timestamp: "Yesterday, 4:15 PM",
      },
    ],
  },
  {
    id: "convo-4",
    title: "Smart Wearables & Health Trackers",
    lastMessage: "Smart Watch Elite Series offers 7-day battery life and comprehensive sleep staging.",
    timestamp: "3 days ago",
    group: "previous7Days",
    productsExplored: 2,
    messages: [
      {
        id: "m4-1",
        sender: "user",
        text: "Show me smartwatches with reliable sleep tracking and heart rate monitoring under ₱5,000.",
        timestamp: "3 days ago",
      },
      {
        id: "m4-2",
        sender: "agent",
        text: `I have loaded the highest-rated health wearables into your Curated Recommendations section.

Top Recommended Pick:
The Smart Watch Elite Series (₱4,500) offers the most accurate sensor suite in this budget. It includes continuous optical PPG tracking, REM/Deep sleep staging algorithms, and an AMOLED display with a 7-day battery life.

Alternative Options to Consider:
• Cartesian Fitness Band Lite (₱2,200): Ultra-lightweight band focused purely on daily steps, workouts, and sleep recovery.
• Rugged GPS Active Watch (₱6,900): Reinforced polymer casing with standalone dual-band GPS for outdoor athletes.`,
        timestamp: "3 days ago",
      },
    ],
  },
];
