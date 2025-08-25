// faq.constants.ts

// 1) Categories (stable keys, not free text)
export const FAQ_CATEGORIES = {
  GENERAL: "General",
  BOOKING: "Booking",
  PAYMENTS: "Payments",
  EVENTS: "Events",
  TECH: " Tech",
  SUPPORT: "Support",
} as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[keyof typeof FAQ_CATEGORIES];

// 2) FAQ item type
export type FaqItem = {
  id: string; // stable, URL-safe
  category: FaqCategory;
  question: string;
  answer: string;
  keywords?: string[];
};

// 3) FAQ items
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-app",
    category: FAQ_CATEGORIES.GENERAL,
    question: "What is Events2go?",
    answer:
      " Events2go is an events booking platform to discover, book, and manage tickets for concerts, conferences, workshops, and more.",
    keywords: ["about", "overview", "how it works"],
  },
  {
    id: "need-account",
    category: FAQ_CATEGORIES.GENERAL,
    question: "Do I need an account to book an event?",
    answer:
      "Yes. Creating a free account lets you securely manage bookings, payments, and tickets.",
    keywords: ["signup", "login", "account"],
  },
  {
    id: "how-to-book",
    category: FAQ_CATEGORIES.BOOKING,
    question: "How do I book an event?",
    answer:
      "Browse events, select your ticket type/quantity, and checkout. Your e-tickets are issued instantly after payment.",
    keywords: ["buy", "checkout", "steps"],
  },
  {
    id: "where-are-tickets",
    category: FAQ_CATEGORIES.BOOKING,
    question: "Where can I find my tickets after booking?",
    answer:
      "Find them in “My Bookings” and in your confirmation email. You can also download them for offline access.",
    keywords: ["my bookings", "email", "e-ticket"],
  },
  {
    id: "book-for-others",
    category: FAQ_CATEGORIES.BOOKING,
    question: "Can I book tickets for someone else?",
    answer:
      "Yes. Add guest details at checkout or transfer tickets after purchase (if the organizer allows transfers).",
    keywords: ["transfer", "guest", "gift"],
  },
  {
    id: "payment-methods",
    category: FAQ_CATEGORIES.PAYMENTS,
    question: "What payment methods are supported?",
    answer:
      "We support major credit/debit cards and mobile wallets. Available methods vary by region.",
    keywords: ["cards", "wallets", "upi", "stripe"],
  },
  {
    id: "refund-policy",
    category: FAQ_CATEGORIES.PAYMENTS,
    question: "Will I get a refund if I cancel my booking?",
    answer:
      "Refunds follow the event’s cancellation policy. Check the event details page for specific terms before booking.",
    keywords: ["cancellation", "policy", "terms"],
  },
  {
    id: "refund-time",
    category: FAQ_CATEGORIES.PAYMENTS,
    question: "How long do refunds take?",
    answer:
      "Once approved, refunds typically appear in 5–10 business days, depending on your bank or wallet provider.",
    keywords: ["timeline", "processing"],
  },
  {
    id: "list-event",
    category: FAQ_CATEGORIES.EVENTS,
    question: "Can I list my event on Events2go?",
    answer:
      "Yes. Create an organizer account to publish events, set ticket types, and track sales in real time.",
    keywords: ["organizer", "create event", "sell tickets"],
  },
  {
    id: "organizer-fees",
    category: FAQ_CATEGORIES.EVENTS,
    question: "Does Events2go charge organizers a fee?",
    answer:
      "We charge a small service fee per ticket sold. See pricing in your organizer dashboard.",
    keywords: ["pricing", "commission", "fees"],
  },
  {
    id: "no-confirmation-email",
    category: FAQ_CATEGORIES.TECH,
    question: "I didn’t receive my confirmation email. What should I do?",
    answer:
      "Check spam/junk. If it’s not there, open “My Bookings” to view tickets or contact support.",
    keywords: ["email", "missing", "receipt"],
  },
  {
    id: "offline-tickets",
    category: FAQ_CATEGORIES.TECH,
    question: "Can I access my tickets without the internet?",
    answer:
      "Yes. Download your tickets; they’ll be available offline in the app.",
    keywords: ["offline", "download", "qr"],
  },
  {
    id: "app-not-working",
    category: FAQ_CATEGORIES.TECH,
    question: "What should I do if the app isn’t working properly?",
    answer:
      "Restart the app and ensure you’re on the latest version. If issues persist, contact support.",
    keywords: ["bug", "crash", "update"],
  },
  {
    id: "contact-support",
    category: FAQ_CATEGORIES.SUPPORT,
    question: "How can I contact support?",
    answer:
      "Use in-app chat, email us at support@events2go.com, or visit the Help Center.",
    keywords: ["help", "chat", "email"],
  },
  {
    id: "support-hours",
    category: FAQ_CATEGORIES.SUPPORT,
    question: "Is customer support available 24/7?",
    answer:
      "Yes. Our team is available around the clock for urgent booking or ticket issues.",
    keywords: ["availability", "hours"],
  },
];

// 4) ID → item map (O(1) lookups)
export const FAQ_BY_ID: Record<string, FaqItem> = FAQ_ITEMS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, FaqItem>
);

// 5) Category → array of item IDs
export const FAQ_IDS_BY_CATEGORY: Record<FaqCategory, string[]> = FAQ_ITEMS.reduce(
  (acc, item) => {
    (acc[item.category] ??= []).push(item.id);
    return acc;
  },
  {} as Record<FaqCategory, string[]>
);

// 6) Helpers
export const FAQ_ROUTE = "/help/faqs";

export const faqAnchor = (id: string) => `#${id}`;
export const faqHref = (id: string) => `${FAQ_ROUTE}${faqAnchor(id)}`;

// 7) Selectors
export const getFaqById = (id: string) => FAQ_BY_ID[id];

export const getFaqsByCategory = (category: FaqCategory): FaqItem[] =>
  (FAQ_IDS_BY_CATEGORY[category] ?? []).map((id) => FAQ_BY_ID[id]);

export const searchFaqs = (q: string): FaqItem[] => {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return FAQ_ITEMS.filter((it) =>
    [
      it.question.toLowerCase(),
      it.answer.toLowerCase(),
      ...(it.keywords ?? []).map((k) => k.toLowerCase()),
    ].some((s) => s.includes(needle))
  );
};
