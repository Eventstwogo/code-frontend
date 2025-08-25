"use client";

import React, { useState } from "react";
import { FAQ_IDS_BY_CATEGORY, getFaqById } from "./faq.constants";

export default function FAQs() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="bg-purple-700 text-white py-16 shadow-md mb-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/90">
            Find quick answers about booking, payments, event management, and more.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {Object.entries(FAQ_IDS_BY_CATEGORY).map(([category, ids]) => (
          <section key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-700 capitalize">
              {category}
            </h2>
            <ul className="space-y-3">
              {ids.map((id) => {
                const faq = getFaqById(id);
                if (!faq) return null;
                const isOpen = activeId === id;

                return (
                  <li
                    key={id}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <button
                      onClick={() => setActiveId(isOpen ? null : id)}
                      className="flex justify-between w-full text-left font-medium text-gray-900"
                    >
                      {faq.question}
                      <span className="text-purple-600 font-bold">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-gray-600">{faq.answer}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
