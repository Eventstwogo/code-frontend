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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            Events 2 Go (Australia)
          </Badge>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Effective Date: {lastUpdated}
          </div>
        </div>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Events 2 Go ("we", "us", "our") is committed to protecting your privacy as a user of our platform. 
          This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information 
          when you visit or use our platform to browse events or purchase tickets.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: What We Collect */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Eye className="h-6 w-6 text-green-600" />
              1. What We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
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
          </CardContent>
        </Card>

        {/* Section 2: Why We Collect It */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileText className="h-6 w-6 text-blue-600" />
              2. Why We Collect It
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">We use your data to:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Register your account and process ticket purchases.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Deliver electronic tickets and event updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Communicate with you about your purchases and events.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Send optional marketing (with your consent).</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Improve our platform and user experience.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Comply with legal obligations.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 3: Sharing Your Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-6 w-6 text-purple-600" />
              3. Sharing Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">We may share your data with:</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Event Organizers</h4>
                <p className="text-sm text-muted-foreground">
                  Limited info (e.g. name and email) is shared so they can manage attendees.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Payment Providers</h4>
                <p className="text-sm text-muted-foreground">
                  To securely process transactions.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Service Providers</h4>
                <p className="text-sm text-muted-foreground">
                  Who help us run the platform (e.g. hosting, analytics).
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold">Legal Authorities</h4>
                <p className="text-sm text-muted-foreground">
                  If required by law or to prevent fraud or harm.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800 dark:text-green-400">
                  We never sell your personal data.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Cookies and Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Settings className="h-6 w-6 text-orange-600" />
              4. Cookies and Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We use cookies and third-party tools like Google Analytics to understand how users interact with our site. 
              You can manage cookie preferences through your browser settings.
            </p>
          </CardContent>
        </Card>

        {/* Section 5: Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Shield className="h-6 w-6 text-red-600" />
              5. Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Under the Australian Privacy Act 1988 (Cth), you can:
            </p>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
                <span>Request access to your personal data.</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
                <span>Correct or delete your personal data.</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
                <span>Opt out of marketing communications.</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>File a complaint with the Office of the Australian Information Commissioner (OAIC).</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Data Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Lock className="h-6 w-6 text-green-600" />
              6. Data Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We implement industry-standard measures to protect your information from unauthorized access, misuse, or disclosure.
            </p>
          </CardContent>
        </Card>

        {/* Section 7: Contact Us */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Phone className="h-6 w-6 text-blue-600" />
              7. Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you have questions about this policy or your personal data:
            </p>
            
            <div className="bg-muted/50 p-6 rounded-lg space-y-3">
              <h4 className="font-semibold text-lg">Events 2 Go Privacy Officer</h4>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-medium">Email:</span>
                  <a 
                    href="mailto:privacy@events2go.com.au" 
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    events2go.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <span className="font-medium">Phone:</span>
                  <a 
                    href="tel:+61-1800-EVENTS" 
                    className="ml-2 text-green-600 hover:text-green-800 underline"
                  >
                    +61430194569
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Notice */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                  Important Notice
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This privacy policy is subject to change. We will notify users of any significant changes 
                  via email or through our platform. Your continued use of our services after such changes 
                  constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;