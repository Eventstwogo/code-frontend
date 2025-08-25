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
  AlertCircle
} from "lucide-react";

const PrivacyPolicyPage = () => {
  const lastUpdated = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Header */}
      {/* Hero Section */}
<div className="w-full bg-gradient-to-r from-purple-600 to-purple-600 text-white py-16 shadow-md mb-10">
  <div className="max-w-5xl mx-auto px-4 text-center">
    {/* Icon */}
    <div className="flex justify-center mb-4">
      <Shield className="h-12 w-12 text-white drop-shadow-md" />
    </div>

    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Privacy Policy
    </h1>

    {/* Meta info */}
    <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/80 mb-4">
      <Badge
        variant="outline"
        className="bg-white/20 text-white border-white/20 px-3 py-1 rounded-md"
      >
        Events 2 Go (Australia)
      </Badge>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 text-white/80" />
        Effective Date: {lastUpdated}
      </div>
    </div>

    {/* Subtext */}
    {/* <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
      Events 2 Go ("we", "us", "our") is committed to protecting your privacy as a user of our platform. 
      This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information 
      when you visit or use our platform to browse events or purchase tickets.
    </p> */}
  </div>
</div>

<div className="max-w-5xl mx-auto px-4">
  <Card className="shadow-md border border-slate-200 dark:border-slate-800">
    <CardHeader>
      <CardTitle className="text-2xl font-bold flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-600" />
        Privacy Policy
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Updated: {lastUpdated}
      </p>
    </CardHeader>

    <CardContent className="space-y-10">
      {/* Section 1 */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <Eye className="h-5 w-5 text-green-600" />
          1. What We Collect
        </h2>
        <p className="text-muted-foreground mb-4">
          We may collect the following personal data from you:
        </p>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Contact Information</h4>
              <p className="text-sm text-muted-foreground">Name, email address, and phone number.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <CreditCard className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Payment Information</h4>
              <p className="text-sm text-muted-foreground">
                Payment details (processed securely through third-party payment gateways like Stripe or PayPal).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Event Preferences</h4>
              <p className="text-sm text-muted-foreground">
                Events you view, attend, or mark as favourites.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Settings className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Device and Usage Data</h4>
              <p className="text-sm text-muted-foreground">
                IP address, device type, browser, geolocation, and interaction data (via cookies and analytics tools).
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Section 2 */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <FileText className="h-5 w-5 text-blue-600" />
          2. Why We Collect It
        </h2>
        <p className="text-muted-foreground mb-4">We use your data to:</p>
        <ul className="space-y-3">
          {[
            "Register your account and process ticket purchases.",
            "Deliver electronic tickets and event updates.",
            "Communicate with you about your purchases and events.",
            "Send optional marketing (with your consent).",
            "Improve our platform and user experience.",
            "Comply with legal obligations."
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* Section 3 */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <Users className="h-5 w-5 text-purple-600" />
          3. Sharing Your Information
        </h2>
        <p className="text-muted-foreground mb-4">We may share your data with:</p>

        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold">Event Organizers</h4>
            <p className="text-sm text-muted-foreground">Limited info (e.g. name and email) is shared so they can manage attendees.</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold">Payment Providers</h4>
            <p className="text-sm text-muted-foreground">To securely process transactions.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold">Service Providers</h4>
            <p className="text-sm text-muted-foreground">Who help us run the platform (e.g. hosting, analytics).</p>
          </div>
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold">Legal Authorities</h4>
            <p className="text-sm text-muted-foreground">If required by law or to prevent fraud or harm.</p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800 dark:text-green-400">
              We never sell your personal data.
            </span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Add Section 4, 5, 6, 7, and Footer Notice in same way... */}
    </CardContent>
  </Card>
</div>
</div>
  );
};

export default PrivacyPolicyPage;