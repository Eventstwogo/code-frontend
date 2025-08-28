"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Hash,
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Ticket,
  RefreshCw,
  Eye,
  Download,
  X,
  CreditCard,
  User,
  QrCode,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { useProfileStore } from "@/lib/ZustanStore/usermanagement";
import { useBookingStore } from "@/lib/ZustanStore/bookingStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import useStore from "@/lib/Zustand";
import QRCodeDisplay from "@/components/QRCodeDisplay";


export default function BookingsPage() {
  const complexColorRegex =
    /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\)/g;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { checkAuth, userId, isAuthenticated } = useStore();
  const router = useRouter();
  const { profile, fetchProfile } = useProfileStore();
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    fetchBookings,
    fetchBookingDetails,
  } = useBookingStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (authChecked && !isAuthenticated && !userId) {
      console.log("🚫 Not authenticated, redirecting to login");
      router.push("/login");
      return;
    }
  }, [authChecked, isAuthenticated, userId, router]);

  useEffect(() => {
    if (profile?.user_id) {
      fetchBookings(profile.user_id);
    }
  }, [profile?.user_id, fetchBookings]);

  const handleRefresh = () => {
    if (profile?.user_id) {
      fetchBookings(profile.user_id);
      toast.success("Bookings refreshed!");
    }
  };

  const handleViewBooking = async (orderId: string) => {
    try {
      const booking = await fetchBookingDetails(orderId);
      setSelectedBooking(booking);
      setModalOpen(true);
      toast.success(`Booking details for ${booking?.event.title} loaded!`);
      console.log("Booking details:", booking);
    } catch (err) {
      toast.error("Failed to fetch booking details");
    }
  };

  const convertOklchToRgb = (html: string): string => {
    return html.replace(complexColorRegex, (match) => {
      try {
        // Extract L, C, H values from oklch(L C H) or oklch(L C H / A)
        const values = match.match(/oklch\(\s*([^)]+)\s*\)/);
        if (!values || !values[1]) return "rgb(100, 100, 100)";

        const parts = values[1].split(/[\/\s]+/);
        const L = parseFloat(parts[0]) * 100; // Convert to 0-100 range
        const C = parseFloat(parts[1]) * 100; // Convert to 0-100 range
        const H = parseFloat(parts[2]); // Hue in degrees

        // Simple OKLCH to RGB conversion approximation
        // This is a simplified conversion for common values
        const commonConversions: { [key: string]: string } = {
          // Pure colors
          "oklch(1 0 0)": "rgb(255, 255, 255)", // White
          "oklch(0 0 0)": "rgb(0, 0, 0)", // Black

          // Gray scale
          "oklch(0.1 0 0)": "rgb(26, 26, 26)",
          "oklch(0.2 0 0)": "rgb(51, 51, 51)",
          "oklch(0.3 0 0)": "rgb(77, 77, 77)",
          "oklch(0.4 0 0)": "rgb(102, 102, 102)",
          "oklch(0.5 0 0)": "rgb(128, 128, 128)",
          "oklch(0.6 0 0)": "rgb(153, 153, 153)",
          "oklch(0.7 0 0)": "rgb(179, 179, 179)",
          "oklch(0.8 0 0)": "rgb(204, 204, 204)",
          "oklch(0.9 0 0)": "rgb(230, 230, 230)",

          // Common brand colors approximations
          "oklch(0.278 0.029 256.848)": "rgb(59, 64, 75)",
          "oklch(0.631 0.066 256.848)": "rgb(139, 153, 177)",
          "oklch(0.859 0.023 256.848)": "rgb(212, 218, 227)",
          "oklch(0.967 0.007 256.848)": "rgb(245, 246, 248)",
          "oklch(0.986 0.003 256.848)": "rgb(250, 251, 252)",

          // Gold colors
          "oklch(0.659 0.216 29.233)": "rgb(218, 165, 32)",
          "oklch(0.804 0.171 83.096)": "rgb(255, 215, 0)",

          // Purple colors
          "oklch(0.647 0.248 258.338)": "rgb(99, 102, 241)",
          "oklch(0.569 0.193 259.944)": "rgb(139, 92, 246)",

          // Blue colors
          "oklch(0.573 0.214 220.38)": "rgb(59, 130, 246)",
          "oklch(0.627 0.204 231.321)": "rgb(96, 165, 250)",

          // Green colors
          "oklch(0.750 0.197 164.25)": "rgb(34, 197, 94)",
          "oklch(0.696 0.143 142.495)": "rgb(74, 222, 128)",

          // Red colors
          "oklch(0.627 0.257 29.234)": "rgb(239, 68, 68)",
          "oklch(0.686 0.205 40.853)": "rgb(248, 113, 113)",
        };

        // Check for exact matches first
        const normalized = match.toLowerCase().replace(/\s+/g, " ").trim();
        for (const [oklch, rgb] of Object.entries(commonConversions)) {
          if (normalized === oklch.toLowerCase()) {
            return rgb;
          }
        }

        // Fallback conversion based on L value for grayscale
        if (C < 0.05) {
          // Very low chroma = grayscale
          const gray = Math.round((L * 255) / 100);
          return `rgb(${gray}, ${gray}, ${gray})`;
        }

        // Basic hue-based conversion for colored values
        let r, g, b;
        if (H >= 0 && H < 60) {
          // Red-Yellow
          r = Math.round(((L + C * 0.5) * 255) / 100);
          g = Math.round(((L + C * 0.3) * 255) / 100);
          b = Math.round(((L - C * 0.2) * 255) / 100);
        } else if (H >= 60 && H < 120) {
          // Yellow-Green
          r = Math.round(((L + C * 0.3) * 255) / 100);
          g = Math.round(((L + C * 0.5) * 255) / 100);
          b = Math.round(((L - C * 0.2) * 255) / 100);
        } else if (H >= 120 && H < 180) {
          // Green-Cyan
          r = Math.round(((L - C * 0.2) * 255) / 100);
          g = Math.round(((L + C * 0.5) * 255) / 100);
          b = Math.round(((L + C * 0.3) * 255) / 100);
        } else if (H >= 180 && H < 240) {
          // Cyan-Blue
          r = Math.round(((L - C * 0.2) * 255) / 100);
          g = Math.round(((L + C * 0.3) * 255) / 100);
          b = Math.round(((L + C * 0.5) * 255) / 100);
        } else if (H >= 240 && H < 300) {
          // Blue-Magenta
          r = Math.round(((L + C * 0.3) * 255) / 100);
          g = Math.round(((L - C * 0.2) * 255) / 100);
          b = Math.round(((L + C * 0.5) * 255) / 100);
        } else {
          // Magenta-Red
          r = Math.round(((L + C * 0.5) * 255) / 100);
          g = Math.round(((L - C * 0.2) * 255) / 100);
          b = Math.round(((L + C * 0.3) * 255) / 100);
        }

        // Clamp values to 0-255 range
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        return `rgb(${r}, ${g}, ${b})`;
      } catch (error) {
        console.warn("Failed to parse OKLCH color:", match);
        return "rgb(128, 128, 128)"; // Fallback gray
      }
    });
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleDownloadTicket = async (booking: any) => {
    if (!booking) return;

    try {
      toast.info("Generating your ticket PDF(s)...");

      const available_templates_names = [
        "Diamond",
        "Gold",
        "Platinum",
        "Silver",
        "Standard",
        "VIP",
        "VVIP",
      ];
      console.log("Available templates:", available_templates_names);

      if (booking.seat_categories.length === 1) {
        // Single category
        const category = booking.seat_categories[0];
        const categoryName = category.label.toLowerCase();

        // Find a matching template name ignoring case
        let matchedTemplate =
          available_templates_names.find(
            (name) => name.toLowerCase() === categoryName
          ) || "Standard";
        console.log("Using template:", matchedTemplate);

        let templateUrl = `/templates/${matchedTemplate}.html`;
        let response = await fetch(templateUrl);

        // Fallback to Standard.html if template not found
        if (!response.ok) {
          console.warn(
            `Template "${matchedTemplate}" not found. Using Standard.html`
          );
          response = await fetch(`/templates/Standard.html`);
          matchedTemplate = "Standard";
        }

        let ticketHTML = await response.text();

        // Generate QR code URL consistent with QRCodeDisplay
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
          `https://www.events2go.com.au/confirmation?orderId=${booking.order_id}`
        )}&format=png&ecc=M&margin=1`;

        const seatCategorySummary = `${category.label} (x${
          category.num_seats
        }): ${formatAUD(category.price_per_seat * category.num_seats)}`;

        // Replace placeholders
        ticketHTML = ticketHTML
          .replace(/\${bookingId}/g, booking.order_id || "Booking ID")
          .replace(/\${eventTitle}/g, booking.event.title || "Event Title")
          .replace(
            /\${businessLogo}/g,
            booking.event.business_logo || "/images/placeholder.svg"
          )
          .replace(
            /\${eventImage}/g,
            booking.event.card_image || "/images/event-placeholder.png"
          )
          .replace(
            /\${selectedDate}/g,
            formatDate(booking.event.event_date) || "TBD"
          )
          .replace(/\${startTime}/g, booking.event.event_time || "TBD")
          .replace(/\${categoryName}/g, category.label || "General")
          .replace(/\${seatCategories}/g, seatCategorySummary || "General")
          .replace(/\${numberOfTickets}/g, category.num_seats.toString() || "1")
          .replace(/\${eventAddress}/g, booking.event.address || "Venue TBD")
          .replace(/\${qrCodeUrl}/g, qrCodeUrl || "/images/qr-placeholder.png")
          .replace(
            /\${custom_category_name}/g,
            (matchedTemplate === "Standard"
              ? category.label
              : matchedTemplate
            ).toUpperCase()
          );

        // Convert OKLCH colors to RGB
        ticketHTML = convertOklchToRgb(ticketHTML);

        try {
          await generatePDFWithHtml2Canvas(ticketHTML, category.label);
        } catch (html2canvasError) {
          console.warn(
            "html2canvas failed, trying fallback method:",
            html2canvasError
          );
          await generatePDFWithFallback(ticketHTML);
        }
      } else {
        // Multiple categories
        for (const category of booking.seat_categories) {
          const categoryName = category.label.toLowerCase();

          // Find a matching template name ignoring case
          let matchedTemplate =
            available_templates_names.find(
              (name) => name.toLowerCase() === categoryName
            ) || "Standard";
          console.log("Using template:", matchedTemplate);

          let templateUrl = `/templates/${matchedTemplate}.html`;
          let response = await fetch(templateUrl);

          // Fallback to Standard.html if template not found
          if (!response.ok) {
            console.warn(
              `Template "${matchedTemplate}" not found. Using Standard.html`
            );
            response = await fetch(`/templates/Standard.html`);
            matchedTemplate = "Standard";
          }

          let ticketHTML = await response.text();

          // Generate QR code URL consistent with QRCodeDisplay
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
            `https://www.events2go.com.au/confirmation?orderId=${booking.order_id}&category=${category.label}`
          )}&format=png&ecc=M&margin=1`;

          const seatCategorySummary = `${category.label} (x${
            category.num_seats
          }): ${formatAUD(category.price_per_seat * category.num_seats)}`;

          // Replace placeholders
          ticketHTML = ticketHTML
            .replace(/\${bookingId}/g, booking.order_id || "Booking ID")
            .replace(/\${eventTitle}/g, booking.event.title || "Event Title")
            .replace(
              /\${businessLogo}/g,
              booking.event.business_logo || "/images/placeholder.svg"
            )
            .replace(
              /\${eventImage}/g,
              booking.event.card_image || "/images/event-placeholder.png"
            )
            .replace(
              /\${selectedDate}/g,
              formatDate(booking.event.event_date) || "TBD"
            )
            .replace(/\${startTime}/g, booking.event.event_time || "TBD")
            .replace(/\${categoryName}/g, category.label || "General")
            .replace(/\${seatCategories}/g, seatCategorySummary || "General")
            .replace(
              /\${numberOfTickets}/g,
              category.num_seats.toString() || "1"
            )
            .replace(/\${eventAddress}/g, booking.event.address || "Venue TBD")
            .replace(
              /\${qrCodeUrl}/g,
              qrCodeUrl || "/images/qr-placeholder.png"
            )
            .replace(
              /\${custom_category_name}/g,
              (matchedTemplate === "Standard"
                ? category.label
                : matchedTemplate
              ).toUpperCase()
            );

          // Convert OKLCH colors to RGB
          ticketHTML = convertOklchToRgb(ticketHTML);

          try {
            await generatePDFWithHtml2Canvas(ticketHTML, category.label);
          } catch (html2canvasError) {
            console.warn(
              `html2canvas failed for ${category.label}, trying fallback:`,
              html2canvasError
            );
            await generatePDFWithFallback(ticketHTML);
          }
        }
      }

      toast.success("Ticket(s) downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF ticket(s):", error);
      toast.error("Failed to download ticket(s). Please try again.");
    }
  };

  // const handleDownloadTicket = async (booking: any) => {
  //   if (!booking) return;

  //   try {
  //     toast.info("Generating your ticket PDF(s)...");

  //     const available_templates_names = [
  //       "Diamond",
  //       "Gold",
  //       "Platinum",
  //       "Silver",
  //       "Standard",
  //       "VIP",
  //       "VVIP",
  //     ];
  //     console.log("Available templates:", available_templates_names);

  //     if (booking.seat_categories.length === 1) {
  //       // Single category: use original logic with updated template selection
  //       const category = booking.seat_categories[0];
  //       const categoryName = category.label.toLowerCase();

  //       // Find a matching template name ignoring case
  //       let matchedTemplate = available_templates_names.find(
  //         (name) => name.toLowerCase() === categoryName
  //       );

  //       console.log("Matched template:", matchedTemplate);

  //       // If no match is found, use "Standard" as default
  //       if (!matchedTemplate) {
  //         matchedTemplate = "Standard";
  //       }
  //       console.log("Using template:", matchedTemplate);

  //       let templateUrl = `/templates/${matchedTemplate}.html`;

  //       // Fetch the HTML template
  //       let response = await fetch(templateUrl);

  //       // If the template is not found, use the default Standard.html
  //       if (!response.ok) {
  //         console.warn(
  //           `Template "${matchedTemplate}" not found. Using Standard.html`
  //         );
  //         response = await fetch(`/templates/Standard.html`);
  //         matchedTemplate = "Standard"; // Update matchedTemplate for category name replacement
  //       }

  //       let ticketHTML = await response.text();

  //       // Generate QR code URL
  //       const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
  //         JSON.stringify({
  //           orderId: booking.order_id,
  //           eventDate: booking.event.event_date,
  //           eventTime: booking.event.event_time,
  //         })
  //       )}&format=png&ecc=M&margin=1`;

  //       const seatCategorySummary = `${category.label} (x${
  //         category.num_seats
  //       }): ${formatAUD(category.price_per_seat * category.num_seats)}`;

  //       // Replace placeholders dynamically with safe fallbacks
  //       ticketHTML = ticketHTML
  //         .replace(/\${bookingId}/g, booking.order_id || "Booking ID")
  //         .replace(/\${eventTitle}/g, booking.event.title || "Event Title")
  //         .replace(
  //           /\${businessLogo}/g,
  //           booking.event.business_logo || "/images/placeholder.svg"
  //         )
  //         .replace(
  //           /\${eventImage}/g,
  //           booking.event.card_image || "/images/event-placeholder.png"
  //         )
  //         .replace(
  //           /\${selectedDate}/g,
  //           formatDate(booking.event.event_date) || "TBD"
  //         )
  //         .replace(/\${startTime}/g, booking.event.event_time || "TBD")
  //         .replace(/\${categoryName}/g, category.label || "General")
  //         .replace(/\${seatCategories}/g, seatCategorySummary || "General")
  //         .replace(/\${numberOfTickets}/g, category.num_seats.toString() || "1")
  //         .replace(/\${eventAddress}/g, booking.event.address || "Venue TBD")
  //         .replace(/\${qrCodeUrl}/g, qrCodeUrl || "/images/qr-placeholder.png")
  //         .replace(
  //           /\${custom_category_name}/g,
  //           (matchedTemplate === "Standard"
  //             ? category.label
  //             : matchedTemplate
  //           ).toUpperCase()
  //         );

  //       // Convert OKLCH colors to RGB
  //       ticketHTML = convertOklchToRgb(ticketHTML);

  //       try {
  //         await generatePDFWithHtml2Canvas(ticketHTML, category.label);
  //       } catch (html2canvasError) {
  //         console.warn(
  //           "html2canvas failed, trying fallback method:",
  //           html2canvasError
  //         );
  //         await generatePDFWithFallback(ticketHTML);
  //       }
  //     } else {
  //       // Multiple categories: generate a PDF for each category
  //       for (const category of booking.seat_categories) {
  //         const categoryName = category.label.toLowerCase();

  //         // Find a matching template name ignoring case
  //         let matchedTemplate = available_templates_names.find(
  //           (name) => name.toLowerCase() === categoryName
  //         );

  //         console.log("Matched template:", matchedTemplate);

  //         // If no match is found, use "Standard" as default
  //         if (!matchedTemplate) {
  //           matchedTemplate = "Standard";
  //         }
  //         console.log("Using template:", matchedTemplate);

  //         let templateUrl = `/templates/${matchedTemplate}.html`;

  //         // Fetch the HTML template
  //         let response = await fetch(templateUrl);

  //         // If the template is not found, use the default Standard.html
  //         if (!response.ok) {
  //           console.warn(
  //             `Template "${matchedTemplate}" not found. Using Standard.html`
  //           );
  //           response = await fetch(`/templates/Standard.html`);
  //           matchedTemplate = "Standard"; // Update matchedTemplate for category name replacement
  //         }

  //         let ticketHTML = await response.text();

  //         // Generate QR code URL
  //         const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
  //           JSON.stringify({
  //             orderId: booking.order_id,
  //             eventDate: booking.event.event_date,
  //             eventTime: booking.event.event_time,
  //             category: category.label,
  //           })
  //         )}&format=png&ecc=M&margin=1`;

  //         const seatCategorySummary = `${category.label} (x${
  //           category.num_seats
  //         }): ${formatAUD(category.price_per_seat * category.num_seats)}`;

  //         // Replace placeholders dynamically with safe fallbacks
  //         ticketHTML = ticketHTML
  //           .replace(/\${bookingId}/g, booking.order_id || "Booking ID")
  //           .replace(/\${eventTitle}/g, booking.event.title || "Event Title")
  //           .replace(
  //             /\${businessLogo}/g,
  //             booking.event.business_logo || "/images/placeholder.svg"
  //           )
  //           .replace(
  //             /\${eventImage}/g,
  //             booking.event.card_image || "/images/event-placeholder.png"
  //           )
  //           .replace(
  //             /\${selectedDate}/g,
  //             formatDate(booking.event.event_date) || "TBD"
  //           )
  //           .replace(/\${startTime}/g, booking.event.event_time || "TBD")
  //           .replace(/\${categoryName}/g, category.label || "General")
  //           .replace(/\${seatCategories}/g, seatCategorySummary || "General")
  //           .replace(
  //             /\${numberOfTickets}/g,
  //             category.num_seats.toString() || "1"
  //           )
  //           .replace(/\${eventAddress}/g, booking.event.address || "Venue TBD")
  //           .replace(
  //             /\${qrCodeUrl}/g,
  //             qrCodeUrl || "/images/qr-placeholder.png"
  //           )
  //           .replace(
  //             /\${custom_category_name}/g,
  //             (matchedTemplate === "Standard"
  //               ? category.label
  //               : matchedTemplate
  //             ).toUpperCase()
  //           );

  //         // Convert OKLCH colors to RGB
  //         ticketHTML = convertOklchToRgb(ticketHTML);

  //         try {
  //           await generatePDFWithHtml2Canvas(ticketHTML, category.label);
  //         } catch (html2canvasError) {
  //           console.warn(
  //             `html2canvas failed for ${category.label}, trying fallback:`,
  //             html2canvasError
  //           );
  //           await generatePDFWithFallback(ticketHTML);
  //         }
  //       }
  //     }

  //     toast.success("Ticket(s) downloaded successfully!");
  //   } catch (error) {
  //     console.error("Error generating PDF ticket(s):", error);
  //     toast.error("Failed to download ticket(s). Please try again.");
  //   }
  // };

  const generatePDFWithHtml2Canvas = async (
    ticketHTML: string,
    categoryLabel: string
  ) => {
    const tempContainer = document.createElement("div");
    tempContainer.id = `temp-ticket-container-${
      bookingDetails?.bookingId || "unknown"
    }`;
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-10000px";
    tempContainer.style.top = "-10000px";
    tempContainer.style.width = "794px";
    tempContainer.style.height = "auto";
    tempContainer.style.zIndex = "-1000";
    tempContainer.style.visibility = "hidden";
    tempContainer.style.pointerEvents = "none";
    tempContainer.style.isolation = "isolate";
    tempContainer.style.contain = "strict";

    tempContainer.innerHTML = `<div class="ticket-wrapper" style="width: 794px; min-height: 1123px; background: white; padding: 0; margin: 0; font-weight: normal;">${ticketHTML}</div>`;

    // Use Shadow DOM for isolation
    const shadowHost = document.createElement("div");
    const shadowRoot = shadowHost.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(tempContainer);
    document.body.appendChild(shadowHost);

    const waitForImages = async (container: HTMLElement) => {
      const images = container.querySelectorAll("img");
      const imagePromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            resolve(true);
          } else {
            img.onload = () => resolve(true);
            img.onerror = () => {
              console.warn("Image failed to load:", img.src);
              resolve(true);
            };
          }
        });
      });
      await Promise.all(imagePromises);
    };

    await waitForImages(tempContainer);

    const html2canvas = (await import("html2canvas")).default;
    const targetElement =
      (tempContainer.querySelector(".ticket-wrapper") as HTMLElement) ||
      tempContainer;

    const canvas = await html2canvas(targetElement, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      logging: false,
      foreignObjectRendering: false,
      onclone: (clonedDoc, element) => {
        try {
          const ticketWrapper = clonedDoc.querySelector(".ticket-wrapper");
          if (ticketWrapper) {
            const allElements = ticketWrapper.querySelectorAll("*");
            allElements.forEach((el: any) => {
              try {
                if (el.style) {
                  const style = el.style;
                  if (style.color && style.color.includes("oklch")) {
                    style.color = convertOklchToRgb(style.color);
                  }
                  if (
                    style.backgroundColor &&
                    style.backgroundColor.includes("oklch")
                  ) {
                    style.backgroundColor = convertOklchToRgb(
                      style.backgroundColor
                    );
                  }
                  if (
                    style.borderColor &&
                    style.borderColor.includes("oklch")
                  ) {
                    style.borderColor = convertOklchToRgb(style.borderColor);
                  }
                  // Prevent bold styles
                  if (style.fontWeight === "bold" || style.fontWeight > 400) {
                    style.fontWeight = "normal";
                  }
                }
              } catch (styleError) {
                console.warn("Error fixing styles on element:", styleError);
              }
            });
          }
        } catch (cloneError) {
          console.warn("Error in onclone callback:", cloneError);
        }
      },
    });

    try {
      if (shadowHost && shadowHost.parentNode) {
        document.body.removeChild(shadowHost);
      }
    } catch (cleanupError) {
      console.warn("Error cleaning up shadow host:", cleanupError);
      shadowHost.remove();
    }

    const jsPDF = (await import("jspdf")).jsPDF;
    const pdf = new jsPDF("portrait", "mm", "a4");

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    const fileName = `Events2Go_Ticket_${categoryLabel}_${bookingDetails?.bookingId}.pdf`;
    pdf.save(fileName);
  };

  

  const generatePDFWithFallback = async (ticketHTML: string) => {
    // Fallback method: Create a new window and use browser's print functionality
    const printWindow = window.open("", "_blank", "width=794,height=1123");
    if (!printWindow) {
      throw new Error(
        "Could not open print window. Please check popup blockers."
      );
    }

    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Event Ticket</title>
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            width: 270mm;
            height: 297mm;
            font-family: Arial, sans-serif;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${ticketHTML}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 1000);
            }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(fullHTML);
    printWindow.document.close();
  };

  const formatAUD = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredBookings =
    bookings?.bookings?.filter((booking) => {
      const matchesSearch =
        booking.event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.order_id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        booking.booking_status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/Profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Profile
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  My Bookings
                </h1>
                <p className="text-slate-600 mt-1">
                  {bookings?.pagination?.total_count || 0}{" "}
                  {bookings?.pagination?.total_count === 1
                    ? "booking"
                    : "bookings"}{" "}
                  found
                </p>
              </div>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={bookingsLoading}
              className="flex items-center gap-2 bg-white hover:bg-slate-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${bookingsLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8 shadow-sm border-slate-200/60 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by event name or order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-slate-200">
                  <Filter className="w-4 h-4 mr-2 text-slate-500" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {bookingsLoading ? (
          <Card className="shadow-sm border-slate-200/60 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-16">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-slate-600 font-medium">
                  Loading your bookings...
                </p>
              </div>
            </CardContent>
          </Card>
        ) : bookingsError ? (
          <Card className="shadow-sm border-red-200/60 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-red-500">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-red-700">
                  Error Loading Bookings
                </h3>
                <p className="text-red-600 text-sm max-w-md mx-auto">
                  {bookingsError}
                </p>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card
                key={booking.order_id}
                className="shadow-sm border-slate-200/60 bg-white/90 backdrop-blur-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-300"
              >
                <CardContent className="px-4 py-0">
                  {/* Flex wrapper: stack on mobile, row on md+ */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Event Image */}
                    <div className="relative w-full sm:w-64 md:w-72 lg:w-48 aspect-[4/3] flex-shrink-0">
                      <Image
                        src={booking.event.card_image || "/placeholder.svg"}
                        alt={booking.event.title}
                        fill
                        className="object-cover md:rounded-l-lg rounded-t-lg md:rounded-tr-none"
                      />
                      <div className="absolute top-1 right-1">
                        <Badge
                          className={`${getStatusColor(
                            booking.booking_status
                          )} border font-medium text-xs px-1.5 py-0.5`}
                        >
                          {booking.booking_status.charAt(0).toUpperCase() +
                            booking.booking_status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <Link href={`/event/${booking.event.slug}`}>
                            <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">
                              {booking.event.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <Building2 className="w-3 h-3" />
                            <span>{booking.event.organizer_name}</span>
                          </div>
                        </div>
                        <div className="text-right pl-4">
                          <div className="text-lg font-bold text-blue-600">
                            {formatAUD(booking.total_amount)}
                          </div>
                          <div className="text-xs text-slate-500">
                            {booking.seat_categories.reduce(
                              (sum, seat) => sum + seat.num_seats,
                              0
                            )}{" "}
                            tickets
                          </div>
                        </div>
                      </div>

                      {/* Two Column Layout */}
                      <div className="flex flex-col sm:flex-row flex-1 gap-6">
                        {/* Left Column */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center">
                              <Calendar className="w-3 h-3 text-blue-600" />
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">
                                {new Date(
                                  booking.event.event_date
                                ).toLocaleDateString("en-AU", {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-5 h-5 bg-green-50 rounded flex items-center justify-center">
                              <Clock className="w-3 h-3 text-green-600" />
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">
                                {booking.event.event_time}
                              </span>
                              <span className="text-slate-500 ml-1">
                                • {booking.event.event_duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-slate-700">
                            <div className="w-5 h-5 bg-purple-50 rounded flex items-center justify-center mt-0.5">
                              <MapPin className="w-3 h-3 text-purple-600" />
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">
                                {booking.event.address}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-5 h-5 bg-orange-50 rounded flex items-center justify-center">
                              <Hash className="w-3 h-3 text-orange-600" />
                            </div>
                            <div className="text-sm">
                              <span className="font-mono text-xs bg-slate-50 px-2 py-1 rounded">
                                {booking.order_id.slice(-8).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          {booking.payment_reference && (
                            <div className="flex items-center gap-2 text-slate-700">
                              <div className="w-5 h-5 bg-emerald-50 rounded flex items-center justify-center">
                                <CreditCard className="w-3 h-3 text-emerald-600" />
                              </div>
                              <div className="text-sm">
                                <span className="font-mono text-xs bg-slate-50 px-2 py-1 rounded">
                                  {booking.payment_reference}
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {booking.seat_categories
                              .slice(0, 2)
                              .map((seat, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-slate-50 border-slate-200 text-slate-700 px-2 py-0.5 text-xs"
                                >
                                  <span className="font-medium">
                                    {seat.label}
                                  </span>
                                  <span className="mx-1">×</span>
                                  <span>{seat.num_seats}</span>
                                </Badge>
                              ))}
                            {booking.seat_categories.length > 2 && (
                              <Badge
                                variant="outline"
                                className="bg-slate-50 border-slate-200 text-slate-700 px-2 py-0.5 text-xs"
                              >
                                +{booking.seat_categories.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-3 mt-2 border-t border-slate-100">
                        <Button
                          onClick={() => handleViewBooking(booking.order_id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-white hover:bg-slate-50 border-slate-200 text-xs px-3 py-1.5"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </Button>
                        {booking.booking_status.toLowerCase() ===
                          "approved" && (
                          <Button
                            onClick={() => handleDownloadTicket(booking)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-white hover:bg-slate-50 border-slate-200 text-xs px-3 py-1.5"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-sm border-slate-200/60 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-16">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                  <Ticket className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {searchQuery || statusFilter !== "all"
                      ? "No matching bookings"
                      : "No bookings yet"}
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria to find what you're looking for."
                      : "When you book events, they'll appear here. Start exploring events to make your first booking!"}
                  </p>
                </div>
                {(searchQuery || statusFilter !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                    variant="outline"
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Modal with QR Code */}
        {modalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                <button
                  onClick={() => setModalOpen(false)}
                  className="
                    absolute 
                    top-2 right-2 sm:top-4 sm:right-4 
                    flex items-center justify-center
                    w-8 h-8 sm:w-10 sm:h-10
                    text-slate-500 hover:text-slate-700 
                    bg-white rounded-full 
                    shadow-sm hover:shadow-md 
                    transition-all
                  "
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pr-0 sm:pr-16">
                  <Image
                    src={selectedBooking.event.card_image || "/placeholder.svg"}
                    alt={selectedBooking.event.title}
                    width={140}
                    height={100}
                    className="rounded-lg object-cover shadow-sm w-full sm:w-[140px] h-auto"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                      {selectedBooking.event.title}
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600 font-medium text-sm sm:text-base">
                        {selectedBooking.event.organizer_name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        className={`${getStatusColor(
                          selectedBooking.booking_status
                        )} font-medium px-2 py-0.5 text-xs sm:text-sm`}
                      >
                        {selectedBooking.booking_status}
                      </Badge>
                      <Badge
                        className={`${getPaymentStatusColor(
                          selectedBooking.payment_status
                        )} font-medium px-2 py-0.5 text-xs sm:text-sm`}
                      >
                        Payment: {selectedBooking.payment_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Left Section - Event & Booking Details */}
                  <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    {/* Event Information */}
                    <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Event Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-slate-500">
                              Date
                            </label>
                            <p className="text-slate-900 font-medium text-sm sm:text-base">
                              {formatDate(selectedBooking.event.event_date)}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-slate-500">
                              Time
                            </label>
                            <p className="text-slate-900 font-medium text-sm sm:text-base">
                              {selectedBooking.event.event_time}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-slate-500">
                              Duration
                            </label>
                            <p className="text-slate-900 font-medium text-sm sm:text-base">
                              {selectedBooking.event.event_duration}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-slate-500">
                              Venue
                            </label>
                            <p className="text-slate-900 font-medium text-sm sm:text-base">
                              {selectedBooking.event.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-blue-600" />
                        Booking Summary
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                          <span className="text-xs sm:text-sm font-medium text-slate-500">
                            Order ID
                          </span>
                          <span className="font-mono text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 rounded border">
                            {selectedBooking.order_id}
                          </span>
                        </div>
                        {selectedBooking.payment_reference && (
                          <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                            <span className="text-xs sm:text-sm font-medium text-slate-500">
                              Payment Reference
                            </span>
                            <span className="font-mono text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 rounded border">
                              {selectedBooking.payment_reference}
                            </span>
                          </div>
                        )}

                        {/* Ticket Categories */}
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-slate-500">
                            Tickets
                          </label>
                          {selectedBooking.seat_categories.map(
                            (seat: any, index: number) => (
                              <div
                                key={index}
                                className="flex justify-between items-center bg-white p-2 sm:p-3 rounded-lg"
                              >
                                <div>
                                  <span className="font-medium text-sm sm:text-base text-slate-900">
                                    {seat.label}
                                  </span>
                                  <span className="text-xs sm:text-sm text-slate-500 ml-2">
                                    × {seat.num_seats}
                                  </span>
                                </div>
                                <span className="font-bold text-blue-600 text-sm sm:text-base">
                                  {formatAUD(
                                    seat.price_per_seat * seat.num_seats
                                  )}
                                </span>
                              </div>
                            )
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t-2 border-blue-300">
                          <span className="text-base sm:text-lg font-bold text-slate-900">
                            Total Amount
                          </span>
                          <span className="text-lg sm:text-2xl font-bold text-blue-600">
                            {formatAUD(selectedBooking.total_amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - QR Code */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 text-center sticky top-6">
                      
                      {selectedBooking.booking_status.toLowerCase() ===
                        "approved" && (
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center justify-center gap-2">
                          <QrCode className="w-5 h-5 text-blue-600" />
                          Digital Ticket
                        </h3>
                      )}

                      <div className="mb-4">
                        <QRCodeDisplay
                          value={`https://www.events2go.com.au/confirmation?orderId=${selectedBooking.order_id}`}
                        />
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-slate-500 mb-1">Total Tickets</p>
                          <p className="font-bold text-lg sm:text-xl text-blue-600">
                            {selectedBooking.seat_categories.reduce(
                              (sum: number, seat: any) => sum + seat.num_seats,
                              0
                            )}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-slate-500 mb-1">Booking Status</p>
                          <Badge
                            className={`${getStatusColor(
                              selectedBooking.booking_status
                            )} font-medium text-xs sm:text-sm`}
                          >
                            {selectedBooking.booking_status}
                          </Badge>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-slate-500 mb-1">Payment Status</p>
                          <Badge
                            className={`${getPaymentStatusColor(
                              selectedBooking.payment_status
                            )} font-medium text-xs sm:text-sm`}
                          >
                            {selectedBooking.payment_status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                        Present this QR code at the venue entrance for quick
                        verification and seamless entry.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                  {selectedBooking.booking_status.toLowerCase() ===
                    "approved" && (
                    <Button
                      onClick={() => handleDownloadTicket(selectedBooking)}
                      variant="outline"
                      className="flex items-center gap-2 border-slate-200 hover:bg-slate-50 text-sm sm:text-base"
                    >
                      <Download className="w-4 h-4" />
                      Download Ticket PDF
                      {selectedBooking.seat_categories.length > 1 ? "s" : ""}
                    </Button>
                  )}
                  <Button
                    onClick={() => setModalOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                  >
                    Close Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
