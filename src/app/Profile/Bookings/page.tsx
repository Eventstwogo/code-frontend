"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"
import { toast } from "sonner"
import { useProfileStore } from "@/lib/ZustanStore/usermanagement"
import { useBookingStore } from "@/lib/ZustanStore/bookingStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import useStore from "@/lib/Zustand"

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [authChecked, setAuthChecked] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { checkAuth, userId, isAuthenticated } = useStore()
  const router = useRouter()
  const { profile, fetchProfile } = useProfileStore()
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    fetchBookings,
    fetchBookingDetails,
  } = useBookingStore()

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth()
      setAuthChecked(true)
    }
    initializeAuth()
  }, [])

  useEffect(() => {
    if (authChecked && !isAuthenticated && !userId) {
      console.log("🚫 Not authenticated, redirecting to login")
      router.push("/login")
      return
    }
  }, [authChecked, isAuthenticated, userId, router])

  useEffect(() => {
    if (profile?.user_id) {
      fetchBookings(profile.user_id)
    }
  }, [profile?.user_id, fetchBookings])

  const handleRefresh = () => {
    if (profile?.user_id) {
      fetchBookings(profile.user_id)
      toast.success("Bookings refreshed!")
    }
  }

  const handleViewBooking = async (orderId: string) => {
    try {
      const booking = await fetchBookingDetails(orderId)
      setSelectedBooking(booking)
      setModalOpen(true)
      toast.success(`Booking details for ${booking.event.title} loaded!`)
      console.log("Booking details:", booking)
    } catch (err) {
      toast.error("Failed to fetch booking details")
    }
  }

  const handleDownloadBooking = (orderId: string) => {
    const downloadUrl = `http://localhost:8000/api/v1/new-bookings/${orderId}/download`
    window.open(downloadUrl, "_blank")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "processing":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "failed":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const filteredBookings =
    bookings?.bookings?.filter((booking) => {
      const matchesSearch =
        booking.event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.order_id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || booking.booking_status.toLowerCase() === statusFilter
      return matchesSearch && matchesStatus
    }) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/Profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-slate-100">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Profile
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Bookings</h1>
                <p className="text-slate-600 mt-1">
                  {bookings?.pagination?.total_count || 0}{" "}
                  {bookings?.pagination?.total_count === 1 ? "booking" : "bookings"} found
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
              <RefreshCw className={`w-4 h-4 ${bookingsLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
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
                <p className="text-slate-600 font-medium">Loading your bookings...</p>
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
                <h3 className="text-lg font-semibold text-red-700">Error Loading Bookings</h3>
                <p className="text-red-600 text-sm max-w-md mx-auto">{bookingsError}</p>
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
                className="shadow-sm border-slate-200/60 bg-white/90 backdrop-blur-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-300 p-0"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative w-full lg:w-48 h-32 lg:h-auto flex-shrink-0">
                      <Image
                        src={booking.event.card_image || "/placeholder.svg"}
                        alt={booking.event.title}
                        fill
                        className="object-cover lg:rounded-l-lg rounded-t-lg lg:rounded-tr-none"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <Badge className={`${getStatusColor(booking.booking_status)} border font-medium text-xs`}>
                          {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                        </Badge>
                        <Badge
                          className={`${getPaymentStatusColor(booking.payment_status)} border font-medium text-xs`}
                        >
                          {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-0.5 leading-tight">
                            {booking.event.title}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mb-2">
                            <User className="w-3 h-3" />
                            <span className="font-medium text-sm">{booking.event.organizer_name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            ${booking.total_amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">
                            {booking.seat_categories.reduce((sum, seat) => sum + seat.num_seats, 0)} tickets
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
                              <Calendar className="w-3 h-3 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {new Date(booking.event.event_date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="text-xs text-slate-500">
                                {new Date(booking.event.event_date).getFullYear()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-6 h-6 bg-green-50 rounded-md flex items-center justify-center">
                              <Clock className="w-3 h-3 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{booking.event.event_time}</div>
                              <div className="text-xs text-slate-500">{booking.event.event_duration}</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-6 h-6 bg-purple-50 rounded-md flex items-center justify-center">
                              <MapPin className="w-3 h-3 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm truncate">{booking.event.address}</div>
                              <div className="text-xs text-slate-500">Location</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className="w-6 h-6 bg-orange-50 rounded-md flex items-center justify-center">
                              <Hash className="w-3 h-3 text-orange-600" />
                            </div>
                            <div>
                              <div className="font-medium font-mono text-xs">{booking.order_id}</div>
                              <div className="text-xs text-slate-500">Order ID</div>
                            </div>
                          </div>
                          {booking.payment_reference && (
                            <div className="flex items-center gap-2 text-slate-700">
                              <div className="w-6 h-6 bg-emerald-50 rounded-md flex items-center justify-center">
                                <CreditCard className="w-3 h-3 text-emerald-600" />
                              </div>
                              <div>
                                <div className="font-medium font-mono text-xs">{booking.payment_reference}</div>
                                <div className="text-xs text-slate-500">Payment Ref</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                          <Ticket className="w-3 h-3" />
                          Tickets
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {booking.seat_categories.map((seat, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-slate-50 border-slate-200 text-slate-700 px-2 py-0.5 text-xs"
                            >
                              <span className="font-medium">{seat.label}</span>
                              <span className="mx-1">•</span>
                              <span>
                                {seat.num_seats} × ${seat.price_per_seat}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-100">
                        <Button
                          onClick={() => handleViewBooking(booking.order_id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-white hover:bg-slate-50 border-slate-200 text-xs px-3 py-1.5"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDownloadBooking(booking.order_id)}
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
                    {searchQuery || statusFilter !== "all" ? "No matching bookings" : "No bookings yet"}
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
                      setSearchQuery("")
                      setStatusFilter("all")
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

        {modalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="relative p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 bg-white rounded-full p-2 shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4 pr-12">
                  <Image
                    src={selectedBooking.event.card_image || "/placeholder.svg"}
                    alt={selectedBooking.event.title}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedBooking.event.title}</h2>
                    <p className="text-slate-600 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedBooking.event.organizer_name}
                    </p>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(selectedBooking.booking_status)} font-medium`}>
                        {selectedBooking.booking_status}
                      </Badge>
                      <Badge className={`${getPaymentStatusColor(selectedBooking.payment_status)} font-medium`}>
                        {selectedBooking.payment_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-3">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {new Date(selectedBooking.event.event_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-slate-500">Event Date</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">{selectedBooking.event.event_time}</div>
                          <div className="text-sm text-slate-500">Start Time</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">{selectedBooking.event.address}</div>
                          <div className="text-sm text-slate-500">Location</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-3">Booking Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                          <Hash className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium font-mono text-sm">{selectedBooking.order_id}</div>
                          <div className="text-sm text-slate-500">Order ID</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Badge className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{selectedBooking.booking_status}</div>
                          <div className="text-sm text-slate-500">Booking Status</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">{selectedBooking.payment_status}</div>
                          <div className="text-sm text-slate-500">Payment Status</div>
                        </div>
                      </div>

                      {selectedBooking.payment_reference && (
                        <div className="flex items-center gap-3 text-slate-700">
                          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                            <Hash className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium font-mono text-sm">{selectedBooking.payment_reference}</div>
                            <div className="text-sm text-slate-500">Payment Reference</div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Ticket className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            ${selectedBooking.total_amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500">Total Amount</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Ticket className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {selectedBooking.seat_categories.reduce(
                              (sum: number, seat: any) => sum + seat.num_seats,
                              0,
                            )}{" "}
                            Tickets
                          </div>
                          <div className="text-sm text-slate-500">Total Quantity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-slate-200">
                  <Button
                    onClick={() => handleDownloadBooking(selectedBooking.order_id)}
                    variant="outline"
                    className="flex items-center gap-2 border-slate-200 hover:bg-slate-50"
                  >
                    <Download className="w-4 h-4" />
                    Download Ticket
                  </Button>
                  <Button onClick={() => setModalOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
