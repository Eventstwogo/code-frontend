"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar,
  Mail,
  Phone
} from "lucide-react";

const TermsConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 shadow-md mb-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-white drop-shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/80 mb-4">
            <Badge
              variant="outline"
              className="bg-white/20 text-white border-white/20 px-3 py-1 rounded-md"
            >
              Events2Go (Australia)
            </Badge>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-white/80" />
              Effective Date: 25 August 2025
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-purple-600 font-bold">
              <FileText className="h-7 w-7 text-purple-600" />
              Terms & Conditions
            </CardTitle>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Welcome to Events2Go. By using our platform, you agree to comply with these Terms & Conditions.
            </p>
          </CardHeader>

          <CardContent className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Definitions</h2>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>Platform:</strong> The website, mobile app, and services operated by Events2Go.</li>
                <li><strong>User/Customer:</strong> Anyone using the platform to browse, book, or manage tickets.</li>
                <li><strong>Organizer:</strong> An individual or entity hosting events listed on our platform.</li>
                <li><strong>Ticket:</strong> A digital or physical proof of booking for an event.</li>
                <li><strong>Service Fees:</strong> Booking, processing, or platform usage fees charged by us.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Scope of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Events2Go is a technology platform connecting organizers and ticket buyers. We do not own, host, or manage events. The organizer is responsible for event quality, safety, and delivery. Our role is limited to providing a secure booking experience.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Ticket Bookings</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>All bookings are subject to availability and organizer confirmation.</li>
                <li>Tickets are issued digitally under “My Bookings.”</li>
                <li>You must provide accurate details when booking.</li>
                <li>You are responsible for checking event details before confirming payment.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Pricing & Payments</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Prices are set by organizers and displayed in AUD (incl. GST where applicable).</li>
                <li>We may charge booking/service fees disclosed at checkout.</li>
                <li>Payments are securely processed via PCI-DSS compliant gateways.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Refunds & Cancellations</h2>
              <p className="text-muted-foreground mb-2">Our Refund Policy complies with Australian Consumer Law (ACL):</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Event Cancelled:</strong> Full refund of ticket price (service fees may be excluded unless required by law).</li>
                <li><strong>Event Rescheduled:</strong> Ticket remains valid for new date; refund available on request within 7 days.</li>
                <li><strong>Change of Mind:</strong> No refunds unless required by law.</li>
                <li>Refunds processed within 7–14 business days to original payment method.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">6. User Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Provide accurate and complete information.</li>
                <li>Do not use the platform for fraudulent or illegal purposes.</li>
                <li>Do not disrupt platform security, systems, or data.</li>
                <li>Comply with all applicable Australian laws.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Organizer Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Provide accurate event details (time, venue, pricing, terms).</li>
                <li>Honour all valid bookings and ensure ticket authenticity.</li>
                <li>Comply with venue regulations and safety laws.</li>
                <li>Manage refunds for cancellations or major changes.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content (logos, designs, images, code, trademarks) belongs to Events2Go. You may not copy or exploit it without written consent. Event-related trademarks belong to organizers.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Privacy & Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is protected under the Privacy Act 1988 (Cth) and APPs. We collect personal data for booking and security. Full details in our Privacy Policy.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Liability Disclaimer</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>We are not liable for event cancellations or disruptions caused by organizers or external circumstances.</li>
                <li>We are not responsible for injury, loss, or damages at events.</li>
                <li>Our maximum liability is limited to the ticket price paid.</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Force Majeure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are not responsible for disruptions caused by natural disasters, government regulations, public health emergencies, or unforeseen technical issues. Refunds will follow the organizer’s policy.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Account Suspension & Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may suspend or terminate accounts if fraudulent activity is detected, if users violate laws or platform policies, or if organizers misrepresent events.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">13. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Disputes will first be addressed by our support team. If unresolved, disputes will go to Mediation under Australian law. The governing law is New South Wales, Australia.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
              <ul className="text-muted-foreground space-y-1">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@events2go.com.au</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +61430194565</li>
              </ul>
            </section>

            {/* Footer Notices */}
            {/* <section className="space-y-4 pt-6 border-t">
              <div className="rounded-md border border-blue-200 bg-blue-50 dark:bg-blue-900/10 p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-1">Agreement Notice</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  By using Events2Go, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
                </p>
              </div>
              <div className="rounded-md border border-green-200 bg-green-50 dark:bg-green-900/10 p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1">Australian Consumer Law</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Nothing in these Terms & Conditions excludes or modifies any consumer rights under Australian Consumer Law.
                </p>
              </div>
            </section> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
