"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  FileWarning,
  AlertTriangle,
  Lock,
  EyeOff,
  Database,
  Mail,
  Phone,
  Calendar,
  Server,
  CheckCircle,
  UserCheck,
} from "lucide-react";

const SecurityPolicyPage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-purple-600 text-white py-16 shadow-md mb-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-white drop-shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Security & Data Breach Policy
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/80 mb-4">
            <Badge
              variant="outline"
              className="bg-white/20 text-white border-white/20 px-3 py-1 rounded-md"
            >
              Events 2 Go (Australia)
            </Badge>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-white/80" />
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-purple-600 font-bold">
              <Shield className="h-7 w-7 text-purple-600" />
              Data Breach & Security Policy
            </CardTitle>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              At <span className="font-semibold">Events2Go</span>, we are committed to protecting the
              personal information of our users, organizers, and partners in compliance with the
              <span className="font-semibold"> Privacy Act 1988 </span> and the
              <span className="font-semibold"> Notifiable Data Breaches (NDB) Scheme</span>.
            </p>
          </CardHeader>

          <CardContent className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Purpose of this Policy</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>How we prevent, detect, and respond to data breaches.</li>
                <li>Our obligations under the NDB Scheme.</li>
                <li>How we will notify affected individuals and regulatory authorities.</li>
                <li>The security measures we implement to protect your personal information.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Scope</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>All users, event organizers, and third-party partners.</li>
                <li>All data collected, processed, or stored through Events2Go.</li>
                <li>All systems, databases, servers, and APIs associated with the platform.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">3. What Constitutes a Data Breach</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Loss of personal information (e.g., misplaced storage devices, accidental deletions).</li>
                <li>Unauthorized access (e.g., hacking, credential theft).</li>
                <li>Unauthorized disclosure (e.g., accidental email leaks).</li>
                <li>Modification or corruption that compromises data integrity.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Our Security Measures</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Encryption of sensitive data in transit (SSL/TLS) and at rest.</li>
                <li>PCI-DSS-compliant payment processing.</li>
                <li>Multi-factor authentication (MFA) for admin and organizer accounts.</li>
                <li>Regular penetration testing and vulnerability scans.</li>
                <li>Strict access control policies.</li>
                <li>24/7 monitoring for suspicious activity.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Incident Detection & Reporting</h2>
              <p className="text-muted-foreground mb-2">
                We monitor breaches using real-time intrusion detection, firewall monitoring, and anomaly detection.
                If a breach is suspected, our Security Response Team documents:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Date and time of detection</li>
                <li>Type of data affected</li>
                <li>Number of users impacted</li>
                <li>Root cause of the incident</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Obligations Under the NDB Scheme</h2>
              <p className="text-muted-foreground mb-2">
                We will notify affected individuals and the OAIC if a breach is likely to result in serious harm.
              </p>
              <h4 className="font-semibold">Who We Notify:</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>
                  <span className="font-semibold">Affected Users:</span> contacted via email, SMS, or in-app notification with breach details.
                </li>
                <li>
                  <span className="font-semibold">Regulators (OAIC):</span> notified with an official report within 30 days.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data Breach Response Plan</h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>
                  <span className="font-semibold">Containment:</span> Isolate affected systems, revoke access, block malicious IPs.
                </li>
                <li>
                  <span className="font-semibold">Assessment:</span> Determine affected data and users, evaluate reporting obligations.
                </li>
                <li>
                  <span className="font-semibold">Notification:</span> Inform users within 72 hours and notify OAIC if required.
                </li>
                <li>
                  <span className="font-semibold">Prevention & Recovery:</span> Patch vulnerabilities, enhance security, conduct forensic analysis.
                </li>
              </ol>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">8. User Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Use strong, unique passwords.</li>
                <li>Enable two-factor authentication.</li>
                <li>Never share login credentials.</li>
                <li>Report suspicious activity to support@events2go.com.au.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Third-Party Vendor Compliance</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Vendors must comply with APPs.</li>
                <li>Maintain ISO 27001 or SOC 2 certifications.</li>
                <li>Sign Data Protection Agreements (DPAs).</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
              <p className="text-muted-foreground">
                📧 security@events2go.com.au <br /> 📞 +61430194565 <br /> 🌐
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 font-medium"
                >
                  https://www.oaic.gov.au
                </a>
              </p>
            </section>

            {/* Footer Notice */}
            <section className="space-y-4 pt-6 border-t">
              <div className="rounded-md border border-green-200 bg-green-50 dark:bg-green-900/10 p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1">
                  Compliance Notice
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  This Security Policy complies with the Privacy Act 1988 (Cth) and the Notifiable Data Breaches (NDB) Scheme.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPolicyPage;