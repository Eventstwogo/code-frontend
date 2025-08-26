"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Eye,
  Users,
  CreditCard,
  Settings,
  Mail,
  Phone,
  Calendar,
  Lock,
  FileText,
  AlertCircle,
  Globe
} from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-purple-600 text-white py-16 shadow-md mb-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-white drop-shadow-md" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/80 mb-4">
            <Badge
              variant="outline"
              className="bg-white/20 text-white border-white/20 px-3 py-1 rounded-md"
            >
              Events2Go (Australia)
            </Badge>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-white/80" />
              Effective Date: 25/08/2025 | Last Updated: 25/08/2025
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <Card className="shadow-md border border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" /> Privacy Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Effective Date: 25/08/2025 | Last Updated: 25/08/2025
            </p>
          </CardHeader>

          <CardContent className="space-y-10">
            <p>
              At <strong>Events2Go</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy complies with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>

            {/* Section 2.1 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Eye className="h-5 w-5 text-green-600" /> 2.1. Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Personal Information:</strong> Name, email, phone number, date of birth.</li>
                <li><strong>Payment Information:</strong> Credit/debit card details (securely processed via third-party payment gateways).</li>
                <li><strong>Event Preferences:</strong> Interests, saved events, ticket bookings.</li>
                <li><strong>Device & Usage Data:</strong> IP address, browser type, app interactions, and cookies.</li>
              </ul>
            </section>

            <Separator />

            {/* Section 2.2 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <FileText className="h-5 w-5 text-blue-600" /> 2.2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Process ticket bookings and payments.</li>
                <li>Send booking confirmations and updates.</li>
                <li>Improve app performance and personalize recommendations.</li>
                <li>Notify you about upcoming events, promotions, and discounts (if opted in).</li>
                <li>Detect and prevent fraud or unauthorized access.</li>
              </ul>
            </section>

            <Separator />

            {/* Section 2.3 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Users className="h-5 w-5 text-purple-600" /> 2.3. Sharing Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Event Organizers:</strong> to validate ticket purchases.</li>
                <li><strong>Payment Gateways:</strong> to securely process transactions.</li>
                <li><strong>Third-Party Service Providers:</strong> analytics, email notifications, and customer support.</li>
                <li><strong>Law Enforcement:</strong> if required by law.</li>
              </ul>
              {/* <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-400">
                    We do not sell your data.
                  </span>
                </div>
              </div> */}
            </section>

            <Separator />

            {/* Section 2.4 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Lock className="h-5 w-5 text-red-600" /> 2.4. Data Security
              </h2>
              <p className="text-muted-foreground">
                We use industry-standard encryption (SSL/TLS) and secure data storage to protect your information. However, no system is 100% secure, so we encourage you to use strong passwords and avoid sharing account details.
              </p>
            </section>

            <Separator />

            {/* Section 2.5 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <AlertCircle className="h-5 w-5 text-yellow-600" /> 2.5. Your Rights Under Australian Law
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Request access to your personal information.</li>
                <li>Correct or update your details.</li>
                <li>Opt out of marketing communications.</li>
                <li>Request deletion of your account and associated data.</li>
              </ul>
            </section>

            <Separator />

            {/* Section 2.6 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Settings className="h-5 w-5 text-orange-600" /> 2.6. Cookies & Tracking
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Improve user experience.</li>
                <li>Analyze app traffic.</li>
                <li>Personalize event recommendations.</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                You can disable cookies via your browser, but certain features may not work.
              </p>
            </section>

            <Separator />

            {/* Section 2.7 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Globe className="h-5 w-5 text-indigo-600" /> 2.7. International Data Transfers
              </h2>
              <p className="text-muted-foreground">
                As we may use global cloud providers, your data may be stored outside Australia. We ensure strict compliance with Australian privacy standards.
              </p>
            </section>

            <Separator />

            {/* Section 2.8 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <FileText className="h-5 w-5 text-blue-600" /> 2.8. Updates to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy occasionally. Significant changes will be communicated via email or app notifications.
              </p>
            </section>

            <Separator />

            {/* Section 2.9 */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Phone className="h-5 w-5 text-purple-600" /> 2.9. Contact Us
              </h2>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li>📧 <a href="mailto:privacy@events2go.com.au" className="text-purple-600 hover:underline">privacy@events2go.com.au</a></li>
                <li>📞 +61430194565</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
