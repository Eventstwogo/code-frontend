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

// QR Code generator component
const QRCodeDisplay = ({
  value,
  size = 200,
}: {
  value: string;
  size?: number;
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Generate QR code using a simple library approach
    const generateQR = async () => {
      try {
        // Using QR Server API for QR code generation
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
          value
        )}&format=png&ecc=M&margin=1`;
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQR();
  }, [value, size]);

  return qrCodeUrl ? (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg border-2 border-dashed border-slate-300">
      <img src={qrCodeUrl} alt="QR Code" className="rounded-lg" />
      <p className="text-xs text-slate-500 mt-2 text-center">
        Scan for ticket verification
      </p>
    </div>
  ) : (
    <div className="flex items-center justify-center w-48 h-48 bg-slate-100 rounded-lg">
      <QrCode className="w-12 h-12 text-slate-400" />
    </div>
  );
};

export default function BookingsPage() {
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
      toast.success(`Booking details for ${booking.event.title} loaded!`);
      console.log("Booking details:", booking);
    } catch (err) {
      toast.error("Failed to fetch booking details");
    }
  };

  const handleDownloadBooking = (orderId: string) => {
    const downloadUrl = `http://localhost:8000/api/v1/new-bookings/${orderId}/download`;
    window.open(downloadUrl, "_blank");
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
                        <Button
                          onClick={() =>
                            handleDownloadBooking(booking.order_id)
                          }
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-white hover:bg-slate-50 border-slate-200 text-xs px-3 py-1.5"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
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
                              {new Date(
                                selectedBooking.event.event_date
                              ).toLocaleDateString("en-AU", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
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
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center justify-center gap-2">
                        <QrCode className="w-5 h-5 text-blue-600" />
                        Digital Ticket
                      </h3>

                      <div className="mb-4">
                        <QRCodeDisplay
                          value={JSON.stringify({
                            orderId: selectedBooking.order_id,
                            eventTitle: selectedBooking.event.title,
                            eventDate: selectedBooking.event.event_date,
                            totalAmount: selectedBooking.total_amount,
                            status: selectedBooking.booking_status,
                          })}
                          size={150}
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
                  <Button
                    onClick={() =>
                      handleDownloadBooking(selectedBooking.order_id)
                    }
                    variant="outline"
                    className="flex items-center gap-2 border-slate-200 hover:bg-slate-50 text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4" />
                    Download Ticket PDF
                  </Button>
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
