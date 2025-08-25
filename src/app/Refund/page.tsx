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
            Refund Policy
          </h1>
          <p className="text-lg text-white/90">
            Please review our refund terms before booking an event with{" "}
            <span className="font-semibold">Events 2 Go</span>.
          </p>
        </div>
      </div>

      {/* Single Card for Policy */}
      <div className="container mx-auto px-4 max-w-4xl pb-8">
        <Card className="shadow-md border border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-700">
              Refund Policy Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">
                1. General Refund Policy
              </h2>
              <p>
                Refunds are subject to the cancellation policy of each event
                organizer. Before booking, please check the event’s details page
                for specific terms. <strong>Events 2 Go</strong> acts as a
                ticketing platform and does not guarantee refunds unless
                explicitly stated by the organizer.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">
                2. Eligibility for Refunds
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Refunds may be available if the event is canceled by the
                  organizer.
                </li>
                <li>
                  If you cancel your booking, eligibility depends on the
                  organizer’s cancellation policy.
                </li>
                <li>Service and processing fees may be non-refundable.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">
                3. Refund Process
              </h2>
              <p>
                Approved refunds are typically processed within{" "}
                <strong>5–10 business days</strong>, depending on your payment
                method and financial institution. Refunds will be credited to
                the original payment method used.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">
                4. Non-Refundable Cases
              </h2>
              <p>
                No refunds will be issued in cases of{" "}
                <strong>no-shows</strong>, late arrivals, or if the event takes
                place as scheduled.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">
                5. Contact Us
              </h2>
              <p>
                For refund inquiries, please contact our support team via{" "}
                <a
                  href="mailto:support@events2go.com"
                  className="text-purple-600 font-medium hover:underline"
                >
                  support@events2go.com
                </a>{" "}
                or use the in-app chat.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
