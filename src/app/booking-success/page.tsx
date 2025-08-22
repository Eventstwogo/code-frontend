'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaDownload } from 'react-icons/fa';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';
import KangarooJump from '../../components/ui/kangaroo';
// Dynamic imports for jsPDF and html2canvas will be done in the function

interface BookingDetails {
  bookingId: string;
  eventTitle: string;
  eventImage: string;
  eventAddress: string;
  selectedDate: string;
  slotName: string;
  startTime: string;
  endTime: string;
  numberOfTickets: number;
  pricePerTicket: number;
  totalAmount: number;
  bookingDate: string;
  userEmail?: string;
  bookingStatus?: string;
  eventId?: string;
  slotId?: string;
  businessLogo?: string;
  categoryName?: string;
}

const BookingSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get booking ID from URL parameters
        const bookingId = searchParams.get('order_id') || searchParams.get('order)Id');

        if (!bookingId) {
          // Try to get from localStorage as fallback
          const savedBookingDetails = localStorage.getItem('lastBookingDetails');
          if (savedBookingDetails) {
            setBookingDetails(JSON.parse(savedBookingDetails));
          } else {
            setError('No booking ID provided');
          }
          return;
        }

        // Fetch booking details from API
        const response = await axiosInstance.get(`/api/v1/new-bookings/${bookingId}`);

        if (response.status === 200 && response.data) {
          const booking = response.data.data;
          console.log('Booking details fetched:', booking.seat_categories.num_seats);
          // Transform API response to match our interface
          const bookingDetails: BookingDetails = {
            bookingId: booking.booking_id?.toString() || bookingId,
            eventTitle: booking.event?.title || 'Event',
            eventImage: booking.event?.card_image || '/images/placeholder.svg',
            eventAddress: booking.event?.address || 'Address not available',
            selectedDate: booking.event.event_date || '',
            slotName: booking.slot || 'Standard Slot',
            categoryName: booking.seat_categories[0]?.label || 'General',
            startTime: booking.event?.event_time || '',
            endTime: booking.slot_time?.split(' - ')[1] || '',
            numberOfTickets: booking.seat_categories[0]?.num_seats || 1,
            pricePerTicket: booking.seat_categories[0].price_per_seat || 0,
            totalAmount: booking.total_amount || 0,
            bookingDate: booking.created_at || new Date().toISOString(),
            userEmail: booking.user?.email,
            bookingStatus: booking.booking_status || 'confirmed',
            eventId: booking.event?.event_id,
            slotId: booking.slot,
            businessLogo: booking.event?.business_logo,
          };

          console.log(bookingDetails)

          setBookingDetails(bookingDetails);

          // Save to localStorage for future reference
          localStorage.setItem('lastBookingDetails', JSON.stringify(bookingDetails));
        } else {
          setError('Booking not found');
        }
      } catch (error: any) {
        console.error('Error fetching booking details:', error);

        // Try localStorage as fallback
        const savedBookingDetails = localStorage.getItem('lastBookingDetails');
        if (savedBookingDetails) {
          setBookingDetails(JSON.parse(savedBookingDetails));
        } else {
          setError(error.response?.data?.message || 'Failed to load booking details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [searchParams]);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        if (!bookingDetails?.bookingId) return;

        console.log('Fetching QR code for booking ID:', bookingDetails.bookingId);
        const response = await axiosInstance.get(
          `/api/v1/new-bookings/qrcode/${bookingDetails.bookingId}`
        );
        console.log('QR code response:', response.data);

        if (response.data && response.data.qr_code_image) {
          setQrCodeUrl(response.data.qr_code_image); // base64 string from API
        } else {
          throw new Error('No QR code image in response');
        }
      } catch (error: any) {
        console.error('Error fetching QR code:', error);
        toast.error('Failed to load QR code. Using default placeholder.');
        setQrCodeUrl('/images/qr-placeholder.png'); // fallback image
      }
    };

    if (bookingDetails?.bookingId) {
      fetchQrCode();
    }
  }, [bookingDetails?.bookingId]);

  // Comprehensive OKLCH to RGB conversion function
  const convertOklchToRgb = (html: string): string => {
    return html.replace(/oklch\([^)]+\)/g, (match) => {
      try {
        // Extract L, C, H values from oklch(L C H) or oklch(L C H / A)
        const values = match.match(/oklch\(\s*([^)]+)\s*\)/);
        if (!values || !values[1]) return 'rgb(100, 100, 100)';
        
        const parts = values[1].split(/[\/\s]+/);
        const L = parseFloat(parts[0]) * 100; // Convert to 0-100 range
        const C = parseFloat(parts[1]) * 100; // Convert to 0-100 range
        const H = parseFloat(parts[2]); // Hue in degrees
        
        // Simple OKLCH to RGB conversion approximation
        // This is a simplified conversion for common values
        const commonConversions: { [key: string]: string } = {
          // Pure colors
          'oklch(1 0 0)': 'rgb(255, 255, 255)', // White
          'oklch(0 0 0)': 'rgb(0, 0, 0)', // Black
          
          // Gray scale
          'oklch(0.1 0 0)': 'rgb(26, 26, 26)',
          'oklch(0.2 0 0)': 'rgb(51, 51, 51)',
          'oklch(0.3 0 0)': 'rgb(77, 77, 77)',
          'oklch(0.4 0 0)': 'rgb(102, 102, 102)',
          'oklch(0.5 0 0)': 'rgb(128, 128, 128)',
          'oklch(0.6 0 0)': 'rgb(153, 153, 153)',
          'oklch(0.7 0 0)': 'rgb(179, 179, 179)',
          'oklch(0.8 0 0)': 'rgb(204, 204, 204)',
          'oklch(0.9 0 0)': 'rgb(230, 230, 230)',
          
          // Common brand colors approximations
          'oklch(0.278 0.029 256.848)': 'rgb(59, 64, 75)',
          'oklch(0.631 0.066 256.848)': 'rgb(139, 153, 177)',
          'oklch(0.859 0.023 256.848)': 'rgb(212, 218, 227)',
          'oklch(0.967 0.007 256.848)': 'rgb(245, 246, 248)',
          'oklch(0.986 0.003 256.848)': 'rgb(250, 251, 252)',
          
          // Gold colors
          'oklch(0.659 0.216 29.233)': 'rgb(218, 165, 32)',
          'oklch(0.804 0.171 83.096)': 'rgb(255, 215, 0)',
          
          // Purple colors  
          'oklch(0.647 0.248 258.338)': 'rgb(99, 102, 241)',
          'oklch(0.569 0.193 259.944)': 'rgb(139, 92, 246)',
          
          // Blue colors
          'oklch(0.573 0.214 220.38)': 'rgb(59, 130, 246)',
          'oklch(0.627 0.204 231.321)': 'rgb(96, 165, 250)',
          
          // Green colors
          'oklch(0.750 0.197 164.25)': 'rgb(34, 197, 94)',
          'oklch(0.696 0.143 142.495)': 'rgb(74, 222, 128)',
          
          // Red colors
          'oklch(0.627 0.257 29.234)': 'rgb(239, 68, 68)',
          'oklch(0.686 0.205 40.853)': 'rgb(248, 113, 113)'
        };
        
        // Check for exact matches first
        const normalized = match.toLowerCase().replace(/\s+/g, ' ').trim();
        for (const [oklch, rgb] of Object.entries(commonConversions)) {
          if (normalized === oklch.toLowerCase()) {
            return rgb;
          }
        }
        
        // Fallback conversion based on L value for grayscale
        if (C < 0.05) { // Very low chroma = grayscale
          const gray = Math.round(L * 255 / 100);
          return `rgb(${gray}, ${gray}, ${gray})`;
        }
        
        // Basic hue-based conversion for colored values
        let r, g, b;
        if (H >= 0 && H < 60) { // Red-Yellow
          r = Math.round((L + C * 0.5) * 255 / 100);
          g = Math.round((L + C * 0.3) * 255 / 100);
          b = Math.round((L - C * 0.2) * 255 / 100);
        } else if (H >= 60 && H < 120) { // Yellow-Green
          r = Math.round((L + C * 0.3) * 255 / 100);
          g = Math.round((L + C * 0.5) * 255 / 100);
          b = Math.round((L - C * 0.2) * 255 / 100);
        } else if (H >= 120 && H < 180) { // Green-Cyan
          r = Math.round((L - C * 0.2) * 255 / 100);
          g = Math.round((L + C * 0.5) * 255 / 100);
          b = Math.round((L + C * 0.3) * 255 / 100);
        } else if (H >= 180 && H < 240) { // Cyan-Blue
          r = Math.round((L - C * 0.2) * 255 / 100);
          g = Math.round((L + C * 0.3) * 255 / 100);
          b = Math.round((L + C * 0.5) * 255 / 100);
        } else if (H >= 240 && H < 300) { // Blue-Magenta
          r = Math.round((L + C * 0.3) * 255 / 100);
          g = Math.round((L - C * 0.2) * 255 / 100);
          b = Math.round((L + C * 0.5) * 255 / 100);
        } else { // Magenta-Red
          r = Math.round((L + C * 0.5) * 255 / 100);
          g = Math.round((L - C * 0.2) * 255 / 100);
          b = Math.round((L + C * 0.3) * 255 / 100);
        }
        
        // Clamp values to 0-255 range
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        
        return `rgb(${r}, ${g}, ${b})`;
        
      } catch (error) {
        console.warn('Failed to parse OKLCH color:', match);
        return 'rgb(128, 128, 128)'; // Fallback gray
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };



  const handleDownloadTicket = async () => {
    if (!bookingDetails) return;

    try {
      toast.info("Generating your ticket PDF...");
      
      const available_templates_names = ["Diamond", "Gold", "Platinum", "Silver", "Standard", "VIP", "VVIP"];
      console.log('Available templates:', available_templates_names);

      // Convert the categoryName to lower case for comparison
      const categoryName = bookingDetails.categoryName.toLowerCase();

      // Find a matching template name ignoring case
      let matchedTemplate = available_templates_names.find(
        name => name.toLowerCase() === categoryName
      );

      console.log('Matched template:', matchedTemplate);

      // If no match is found, use "Standard" as default
      if (!matchedTemplate) {
        matchedTemplate = "Standard";
      }
      console.log('Using template:', matchedTemplate);

      const templateUrl = `/templates/${matchedTemplate}.html`;

      // Fetch the HTML template
      let response = await fetch(templateUrl);

      if (!response.ok) {
        console.warn(`Template "${matchedTemplate}" not found. Using Standard.html`);
        response = await fetch(`/templates/Standard.html`);
      }

      let ticketHTML = await response.text();
      console.log("bookingDetails.categoryName.toUpperCase():", bookingDetails.categoryName ? bookingDetails.categoryName.toUpperCase() : 'STANDARD');

      // Replace placeholders dynamically with safe fallbacks
      ticketHTML = ticketHTML
        .replace(/\$\{bookingId\}/g, bookingDetails.bookingId || 'Booking ID')
        .replace(/\$\{eventTitle\}/g, bookingDetails.eventTitle || 'Event Title')
        .replace(/\$\{businessLogo\}/g, bookingDetails.businessLogo || '/images/placeholder.svg')
        .replace(/\$\{eventImage\}/g, bookingDetails.eventImage || '/images/event-placeholder.png')
        .replace(/\$\{selectedDate\}/g, formatDate(bookingDetails.selectedDate))
        .replace(/\$\{startTime\}/g, bookingDetails.startTime || 'TBD')
        .replace(/\$\{categoryName\}/g, bookingDetails.categoryName || 'General')
        .replace(/\$\{numberOfTickets\}/g, bookingDetails.numberOfTickets?.toString() || '1')
        .replace(/\$\{eventAddress\}/g, bookingDetails.eventAddress || 'Venue TBD')
        .replace(/\$\{qrCodeUrl\}/g, qrCodeUrl || '/images/qr-placeholder.png')
        .replace(/\$\{custom_category_name\}/g, (bookingDetails.categoryName ? bookingDetails.categoryName.toUpperCase() : 'STANDARD'));

      // Convert OKLCH colors to RGB
      ticketHTML = convertOklchToRgb(ticketHTML);

      // Try the modern approach first, fallback to simple method if it fails
      try {
        await generatePDFWithHtml2Canvas(ticketHTML);
      } catch (html2canvasError) {
        console.warn('html2canvas failed, trying fallback method:', html2canvasError);
        await generatePDFWithFallback(ticketHTML);
      }

      toast.success("Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF ticket:", error);
      toast.error("Failed to download ticket. Please try again.");
    }
  };

  const generatePDFWithHtml2Canvas = async (ticketHTML: string) => {
    // Create a temporary container to render the HTML
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-10000px';
    tempContainer.style.top = '0px';
    tempContainer.style.width = '794px'; // A4 width in pixels
    tempContainer.style.height = 'auto';
    tempContainer.style.zIndex = '-1000';
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.pointerEvents = 'none';
    
    // Set the innerHTML with additional wrapper
    tempContainer.innerHTML = `<div class="ticket-wrapper" style="width: 794px; min-height: 1123px; background: white; padding: 0; margin: 0;">${ticketHTML}</div>`;
    
    // Append to body
    document.body.appendChild(tempContainer);

    // Wait a bit for DOM to be ready
    await new Promise(resolve => setTimeout(resolve, 100));

    // Load images and wait for them to be ready
    const images = tempContainer.querySelectorAll('img');
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => {
            console.warn('Image failed to load:', img.src);
            resolve(true); // Continue even if image fails
          };
          // Set a timeout for image loading
          setTimeout(() => resolve(true), 3000);
        }
      });
    });

    await Promise.all(imagePromises);

    // Additional wait for any CSS animations or transitions
    await new Promise(resolve => setTimeout(resolve, 500));

    // Use html2canvas to convert HTML to canvas
    const html2canvas = (await import('html2canvas')).default;
    
    // Get the wrapper element for better targeting
    const targetElement = tempContainer.querySelector('.ticket-wrapper') as HTMLElement || tempContainer;
    
    const canvas = await html2canvas(targetElement, {
      scale: 1.5, // Reduced scale for better compatibility
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: 1123,
      logging: false, // Disable logging to reduce console noise
      removeContainer: false, // Don't let html2canvas remove the container
      foreignObjectRendering: false, // Disable for better compatibility
      onclone: (clonedDoc, element) => {
        try {
          // Make sure the cloned document has the right structure
          const clonedBody = clonedDoc.body;
          if (clonedBody) {
            clonedBody.style.margin = '0';
            clonedBody.style.padding = '0';
            clonedBody.style.width = '794px';
            clonedBody.style.height = 'auto';
          }
          
          // Apply additional fixes to cloned elements
          const allElements = element.querySelectorAll('*');
          allElements.forEach((el: any) => {
            try {
              // Remove any OKLCH colors from inline styles
              if (el.style) {
                const style = el.style;
                if (style.color && style.color.includes('oklch')) {
                  style.color = convertOklchToRgb(style.color);
                }
                if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
                  style.backgroundColor = convertOklchToRgb(style.backgroundColor);
                }
                if (style.borderColor && style.borderColor.includes('oklch')) {
                  style.borderColor = convertOklchToRgb(style.borderColor);
                }
              }
            } catch (styleError) {
              console.warn('Error fixing styles on element:', styleError);
            }
          });
        } catch (cloneError) {
          console.warn('Error in onclone callback:', cloneError);
        }
      }
    });

    // Clean up - remove temporary container
    try {
      if (tempContainer && tempContainer.parentNode) {
        document.body.removeChild(tempContainer);
      }
    } catch (cleanupError) {
      console.warn('Error cleaning up temp container:', cleanupError);
    }

    // Convert canvas to PDF
    const jsPDF = (await import('jspdf')).jsPDF;
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    // Save the PDF
    const fileName = `Events2Go_Ticket_${bookingDetails?.categoryName}_${bookingDetails?.bookingId}.pdf`;
    pdf.save(fileName);
  };

  const generatePDFWithFallback = async (ticketHTML: string) => {
    // Fallback method: Create a new window and use browser's print functionality
    const printWindow = window.open('', '_blank', 'width=794,height=1123');
    if (!printWindow) {
      throw new Error('Could not open print window. Please check popup blockers.');
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

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleViewMyBookings = () => {
    router.push('/Profile?tab=bookings');
  };

  if (loading || !bookingDetails?.bookingId || !qrCodeUrl) {
    return (
      <KangarooJump />
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <FaTicketAlt className="text-2xl text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? 'Error Loading Booking' : 'Booking Details Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find your booking details. Please check your booking ID or try again."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToHome}
              className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your tickets have been successfully booked</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-6 mb-6">
            <img
              src={bookingDetails.eventImage}
              alt={bookingDetails.eventTitle}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{bookingDetails.eventTitle}</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{bookingDetails.eventAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BsCalendar2EventFill className="text-purple-500" />
                  <span>{formatDate(bookingDetails.selectedDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-purple-500" />
                  <span>{bookingDetails.startTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-semibold">{bookingDetails.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Slot:</span>
                  <span className="font-semibold">{bookingDetails.slotName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Tickets:</span>
                  <span className="font-semibold">{bookingDetails.numberOfTickets}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Ticket:</span>
                  <span className="font-semibold">${bookingDetails.pricePerTicket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="font-semibold">{formatDate(bookingDetails.bookingDate)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-purple-600">${bookingDetails.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaDownload />
            Download PDF Ticket
          </button>
          <button
            onClick={handleViewMyBookings}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaTicketAlt />
            My Bookings
          </button>
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Email Confirmation Notice */}
        {bookingDetails.userEmail && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800">
              <MdEmail className="text-xl" />
              <span className="font-semibold">Email Confirmation Sent</span>
            </div>
            <p className="text-blue-700 mt-1">
              A confirmation email with your ticket details has been sent to {bookingDetails.userEmail}
            </p>
          </div>
        )}

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Information:</h4>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Please arrive at the venue at least 15 minutes before the event starts</li>
            <li>• Carry a valid ID proof along with your ticket</li>
            <li>• Screenshots of tickets are not valid for entry</li>
            <li>• For any queries, contact our support team</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const BookingSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
};

export default BookingSuccessPage;

