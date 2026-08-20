export interface HistoryMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  products?: {
    id: string;
    title: string;
    price: string;
    priceNum: number;
    imageUrl: string;
    rating: number;
    subtitle: string;
    isNearby?: boolean;
    isTopPick?: boolean;
  }[];
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
    lastMessage: "I found 3 verified merchants with same-day delivery in BGC.",
    timestamp: "10:45 AM",
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
        text: "Here are the top-rated ANC headphones matching your criteria with local merchant availability:",
        timestamp: "10:45 AM",
        products: [
          {
            id: "p1",
            title: "Studio Monitor Headset Pro",
            price: "₱6,200",
            priceNum: 6200,
            imageUrl: "/test-images/image2.png",
            rating: 4.9,
            subtitle: "Hi-Res spatial acoustic, 40h battery",
            isNearby: true,
            isTopPick: true,
          },
          {
            id: "p2",
            title: "Cartesian Pro Wireless Buds",
            price: "₱5,400",
            priceNum: 5400,
            imageUrl: "/test-images/image1.jpg",
            rating: 4.8,
            subtitle: "Active noise cancelling with instant sync",
            isNearby: true,
            isTopPick: false,
          },
        ],
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
        text: "Yes! The Cartesian BGC Tech Hub has 4 units in stock. If ordered before 4:00 PM, localized dispatch guarantees delivery within 35 minutes.",
        timestamp: "10:46 AM",
      },
    ],
  },
  {
    id: "convo-2",
    title: "Ergonomic Desk & Wireless Mice",
    lastMessage: "Precision Wireless Mouse is currently 15% off.",
    timestamp: "8:20 AM",
    group: "today",
    productsExplored: 1,
    messages: [
      {
        id: "m2-1",
        sender: "user",
        text: "Recommend ergonomic wireless mice suitable for long coding sessions.",
        timestamp: "8:18 AM",
      },
      {
        id: "m2-2",
        sender: "agent",
        text: "Precision Wireless Mouse features multi-device Bluetooth pairing and silent tactile clicks with USB-C fast charge:",
        timestamp: "8:20 AM",
        products: [
          {
            id: "p3",
            title: "Precision Wireless Mouse",
            price: "₱1,850",
            priceNum: 1850,
            imageUrl: "/test-images/image3.png",
            rating: 4.7,
            subtitle: "Ergonomic multi-device sensor",
            isNearby: true,
            isTopPick: true,
          },
        ],
      },
    ],
  },
  {
    id: "convo-3",
    title: "Fast GaN Chargers & Power Hubs",
    lastMessage: "Dual Turbo 65W GaN is compatible with all USB-C laptops.",
    timestamp: "Yesterday, 4:15 PM",
    group: "yesterday",
    productsExplored: 1,
    messages: [
      {
        id: "m3-1",
        sender: "user",
        text: "Need a compact multi-port GaN charger for travel.",
        timestamp: "Yesterday, 4:12 PM",
      },
      {
        id: "m3-2",
        sender: "agent",
        text: "Here is the top-rated GaN charger with dual fast-charge ports and intelligent heat dissipation:",
        timestamp: "Yesterday, 4:15 PM",
        products: [
          {
            id: "p4",
            title: "Dual Turbo 65W GaN Charger",
            price: "₱1,250",
            priceNum: 1250,
            imageUrl: "/test-images/image4.png",
            rating: 4.8,
            subtitle: "Ultra-compact fast power block",
            isNearby: true,
            isTopPick: false,
          },
        ],
      },
    ],
  },
  {
    id: "convo-4",
    title: "Organic Fabric Casual Apparel",
    lastMessage: "Checked certified eco-friendly regional suppliers.",
    timestamp: "Yesterday, 11:30 AM",
    group: "yesterday",
    productsExplored: 0,
    messages: [
      {
        id: "m4-1",
        sender: "user",
        text: "Are there sustainable organic cotton clothes available nearby?",
        timestamp: "Yesterday, 11:28 AM",
      },
      {
        id: "m4-2",
        sender: "agent",
        text: "Found certified organic lifestyle apparel sourced from FairTrade certified mills in Ortigas.",
        timestamp: "Yesterday, 11:30 AM",
      },
    ],
  },
  {
    id: "convo-5",
    title: "Smart Watch Health Tracker Review",
    lastMessage: "Battery lasts up to 14 days on single charge.",
    timestamp: "3 days ago",
    group: "previous7Days",
    productsExplored: 1,
    messages: [
      {
        id: "m5-1",
        sender: "user",
        text: "Compare titanium smartwatch options with sleep and heart rate monitoring.",
        timestamp: "3 days ago",
      },
      {
        id: "m5-2",
        sender: "agent",
        text: "The Smart Fitness Watch Series features AMOLED always-on display, sapphire glass, and medical-grade sensors.",
        timestamp: "3 days ago",
      },
    ],
  },
  {
    id: "convo-6",
    title: "Mechanical Keyboard Keycaps",
    lastMessage: "PBT double-shot keycaps in retro palette.",
    timestamp: "5 days ago",
    group: "previous7Days",
    productsExplored: 0,
    messages: [
      {
        id: "m6-1",
        sender: "user",
        text: "Looking for sound-dampened mechanical keyboard accessories.",
        timestamp: "5 days ago",
      },
      {
        id: "m6-2",
        sender: "agent",
        text: "Found artisan keycap sets and lube stations with instant store pickup.",
        timestamp: "5 days ago",
      },
    ],
  },
];
