"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 shadow-md mb-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex justify-center mb-4">
            <RotateCcw className="h-12 w-12 text-white drop-shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-lg text-white/90">
            Effective Date: <span className="font-semibold">25/08/2025</span> | Last Updated: <span className="font-semibold">25/08/2025</span>
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="container mx-auto px-4 max-w-4xl pb-8">
        <Card className="shadow-md border border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-700">
              Refund & Cancellation Policy Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              At <strong>Events2Go</strong>, we aim to provide a seamless and enjoyable ticketing experience. However, we understand that plans may change. This Refund & Cancellation Policy outlines your rights and obligations in line with Australian Consumer Law (ACL).
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.1. General Policy</h2>
              <p>
                All ticket purchases made through Events2Go are non-refundable, except as required under Australian Consumer Law or where explicitly stated.
              </p>
              <p>In certain cases, refunds or credits may be issued only if:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>The event is cancelled.</li>
                <li>The event is rescheduled, and the new date does not suit you.</li>
                <li>The event is significantly changed (e.g., major performer cancellation).</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.2. Event Cancellations</h2>
              <p>
                If an event is cancelled, you will be entitled to a full refund of the ticket price (excluding booking and service fees, unless required by law).
              </p>
              <p>
                Refunds will be processed automatically to the original payment method within <strong>7–14 business days</strong>.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.3. Event Rescheduling</h2>
              <p>
                If the event is rescheduled, your ticket will remain valid for the new date.
              </p>
              <p>
                If you cannot attend the rescheduled date, you may request a refund within <strong>7 days</strong> of being notified.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.4. Change of Mind</h2>
              <p>
                Refunds are not provided for change-of-mind purchases or personal circumstances.
              </p>
              <p>
                However, we may offer ticket resale options via the app, where you can list your ticket for others to purchase.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.5. Force Majeure</h2>
              <p>
                We are not responsible for cancellations or disruptions caused by circumstances beyond our control, including:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Natural disasters</li>
                <li>Government restrictions</li>
                <li>Public health emergencies</li>
              </ul>
              <p>
                In such cases, refunds will follow the organizer’s policies, but we will assist you where possible.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.6. How to Request a Refund</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>Log in to your Events2Go account.</li>
                <li>Go to <strong>“My Bookings” → “Request Refund”</strong>.</li>
                <li>Provide event details and reason.</li>
              </ol>
              <p>
                Refund status will be updated within <strong>3–5 business days</strong>.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">1.7. Contact Us</h2>
              <p>
                For refund-related queries, contact us at:
              </p>
              <ul className="list-none space-y-1">
                <li>📧 <a href="mailto:support@events2go.com.au" className="text-purple-600 font-medium hover:underline">support@events2go.com.au</a></li>
                <li>📞 +61430194565</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
