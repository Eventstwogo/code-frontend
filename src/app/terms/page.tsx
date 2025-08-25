"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  User, 
  ShoppingCart, 
  CreditCard, 
  XCircle,
  AlertTriangle,
  Copyright,
  Shield,
  RefreshCw,
  Scale,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Users
} from "lucide-react";

const TermsConditionsPage = () => {
  const lastUpdated = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Header */}
    {/* Hero Section */}
{/* Hero Section */}
<div className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 shadow-md mb-10">
  <div className="max-w-5xl mx-auto px-4 text-center">
    {/* Icon */}
    <div className="flex justify-center mb-4">
      <FileText className="h-12 w-12 text-white drop-shadow-md" />
    </div>

    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Terms & Conditions
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
      By using <span className="font-semibold">Events 2 Go</span>, you agree to these Terms & Conditions. 
      Please read them carefully before using the platform to browse events or purchase tickets.
    </p> */}
  </div>
</div>


<div className="max-w-4xl mx-auto px-6 py-10">
  <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
    {/* Header */}
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-3xl text-purple-600 font-bold">
        <FileText className="h-7 w-7 text-purple-600" />
        Terms & Conditions
      </CardTitle>
      <p className="text-muted-foreground mt-3 text-base leading-relaxed">
        By using <span className="font-semibold">Events 2 Go</span>, you agree to these Terms & Conditions. 
        Please read them carefully before browsing events or purchasing tickets.
      </p>
    </CardHeader>

    <CardContent className="space-y-10">
  {/* Section 1 */}
  <section>
    <h2 className="text-xl font-semibold mb-3 ">
      1. Use of the Platform
    </h2>
    <p className="text-muted-foreground leading-relaxed">
      You may use Events 2 Go to browse events, purchase tickets, and manage your bookings. 
      You must be at least 18 years old or have parental/guardian consent to use the platform.
    </p>
  </section>

  {/* Section 2 */}
  <section>
    <h2 className="text-xl font-semibold mb-3 ">
      2. Account Creation
    </h2>
    <p className="text-muted-foreground leading-relaxed">
      You can purchase tickets as a guest or by creating an account. If you create an account, 
      you agree to provide accurate and current information and to keep your login credentials secure.
    </p>
  </section>

  {/* Section 3 */}
  <section>
    <h2 className="text-xl font-semibold mb-3 ">
      3. Ticket Purchases
    </h2>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Ticket Sales</h4>
        <p className="text-sm text-muted-foreground">
          Tickets are sold by event organizers, not Events 2 Go.
        </p>
      </div>
      <div>
        <h4 className="font-semibold">Purchase Contract</h4>
        <p className="text-sm text-muted-foreground">
          Your purchase is a contract between you and the organizer.
        </p>
      </div>
      <div>
        <h4 className="font-semibold">Platform Role</h4>
        <p className="text-sm text-muted-foreground">
          Events 2 Go facilitates payment and ticket delivery but is not responsible for the event itself.
        </p>
      </div>
    </div>
  </section>

  {/* ... Repeat same pattern for Sections 4–10 ... */}

  {/* Footer Notices */}
  <section className="space-y-4 pt-6 border-t">
    <div className="rounded-md border border-blue-200 bg-blue-50 dark:bg-blue-900/10 p-4">
      <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-1">
        Agreement Notice
      </h4>
      <p className="text-sm text-blue-700 dark:text-blue-300">
        By using Events 2 Go, you acknowledge that you have read, understood, 
        and agree to be bound by these Terms & Conditions.
      </p>
    </div>

    <div className="rounded-md border border-green-200 bg-green-50 dark:bg-green-900/10 p-4">
      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1">
        Australian Consumer Law
      </h4>
      <p className="text-sm text-green-700 dark:text-green-300">
        Nothing in these Terms & Conditions excludes or modifies any consumer rights 
        under Australian Consumer Law.
      </p>
    </div>
  </section>
</CardContent>

  </Card>
</div>

</div>
  );
};

export default TermsConditionsPage;