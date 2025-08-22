'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

interface EventTicketProps {
  bookingDetails: {
    eventTitle: string;
    eventImage: string;
    eventAddress: string;
    selectedDate: string;
    startTime: string;
    numberOfTickets: number;
    categoryName: string;
    organizerName: string;
    bookingId: string;
    userEmail: string;
    businessLogo: string;
  };
}

const EventTicket: React.FC<EventTicketProps> = ({ bookingDetails }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('/qr-code.png'); // Default placeholder

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        console.log('Fetching QR code for booking ID:', bookingDetails.bookingId); // Debug log
        const response = await axiosInstance.get(`/api/v1/new-bookings/qrcode/${bookingDetails.bookingId}`);
        console.log('QR code response:', response.data); // Debug log
        if (response.data && response.data.qr_code_image) {
          setQrCodeUrl(response.data.qr_code_image); // Update QR code URL
        } else {
          throw new Error('No QR code URL in response');
        }
      } catch (error: any) {
        console.error('Error fetching QR code:', error);
        toast.error('Failed to load QR code. Using default placeholder.');
      }
    };

    if (bookingDetails.bookingId) {
      fetchQrCode();
    } else {
      console.warn('No booking ID provided');
      toast.error('No booking ID available for QR code.');
    }
  }, [bookingDetails.bookingId]); // Dependency on bookingId

  return (
    <div className="relative">
      <div className="flex bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 rounded-lg shadow-2xl overflow-hidden max-w-6xl h-80">
        <div className="relative w-15 bg-gradient-to-b from-purple-600 to-yellow-500 flex items-center justify-center rounded-l-lg">
          <div className="transform -rotate-90 whitespace-nowrap">
            <span className="text-black font-bold text-sm tracking-widest">
              {bookingDetails.eventTitle.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="w-24 bg-white flex flex-col items-center justify-between py-6">
          <div className="relative">
            <img
              src={bookingDetails.businessLogo}
              alt="organizer logo"
              className="w-16 h-16 object-contain rounded-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Add fallback
            />
          </div>

          <div className="relative flex flex-col items-center">
            <img
              src="/images/logo1.png"
              alt="Events 2Go Logo"
              className="w-16 h-20 object-contain transform -rotate-90"
            />
          </div>
          <div className="w-16 h-16">
            <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain rounded" />
          </div>
        </div>
        <div className="w-px bg-gray-400 relative">
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-1 h-4 bg-gray-400 mb-1 rounded-full" />
            ))}
          </div>
        </div>
        <div className="w-64 relative">
          <div
            className="h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url('${bookingDetails.eventImage}')`,
            }}
          >
            <div className="absolute inset-0 bg-black/60" /> {/* Added semi-transparent layer */}
            <div className="relative z-10 h-full p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <label className="text-white font-bold text-sm uppercase tracking-wide">NAME</label>
                  <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                    <span className="font-bold text-white text-sm">{bookingDetails.eventTitle}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm uppercase tracking-wide">EVENT DATE</label>
                    <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                      <span className="font-bold text-white text-sm">{formatDate(bookingDetails.selectedDate)}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm uppercase tracking-wide">EVENT TIME</label>
                    <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                      <span className="font-bold text-white text-sm">{bookingDetails.startTime}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm uppercase tracking-wide">CATEGORY</label>
                    <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                      <span className="font-bold text-white text-sm">{bookingDetails.categoryName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm uppercase tracking-wide">SEAT</label>
                    <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                      <span className="font-bold text-white text-sm">{bookingDetails.numberOfTickets}</span>
                    </div>
                  </div>
                  
                </div>
                <div>
                  <label className="text-white font-bold text-sm uppercase tracking-wide">VENUE</label>
                  <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                    <span className="font-bold text-white text-sm">{bookingDetails.eventAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-px bg-gray-400 relative">
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-1 h-4 bg-gray-400 mb-1 rounded-full" />
            ))}
          </div>
        </div>
        <div className="w-64 bg-white flex flex-col justify-between py-1 px-1">
          <div className="text-center mb-4">
            <h2 className="text-black font-bold text-sm uppercase tracking-wide">{bookingDetails.eventTitle}</h2>
          </div>
          <div className="flex items-center justify-center relative mb-2">
            <div className="relative">
              <img src="/images/logo1.png" alt="Events 2GoLogo" className="w-40 h-48 object-contain" />
              <div className="absolute -top-2 -left-4">
                <img
                  src={bookingDetails.businessLogo}
                  alt="organizer logo"
                  className="w-16 h-16 object-contain rounded-full"
                  onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Add fallback
                />
              </div>
            </div>
          </div>
          <div className="text-center space-y-0">
            <p className="text-black font-semibold text-sm">Please arrive 15 min before the Event start.</p>
            <p className="text-black font-medium text-sm">www.events2go.com.au</p>
          </div>
        </div>
        <div className="w-px bg-gray-400 relative">
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-1 h-4 bg-gray-400 mb-1 rounded-full" />
            ))}
          </div>
        </div>
        <div className="w-80 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 p-6 flex flex-col justify-between rounded-r-lg relative">
          <div className="absolute top-4 right-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16 object-contain rounded" />
          </div>
          <div className="text-white space-y-3 mt-8">
            <div>
              <label className="text-sm font-bold uppercase tracking-wide">NAME</label>
              <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                <span className="font-bold text-sm">{bookingDetails.eventTitle}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold uppercase tracking-wide">EVENT DATE</label>
                <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                  <span className="font-bold text-sm">{formatDate(bookingDetails.selectedDate)}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wide">EVENT TIME</label>
                <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                  <span className="font-bold text-sm">{bookingDetails.startTime}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10">
              <div>
                <label className="text-sm font-bold uppercase tracking-wide">CATEGORY</label>
                <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                  <span className="font-bold text-sm">{bookingDetails.categoryName}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-wide">SEAT</label>
                <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                  <span className="font-bold text-sm">{bookingDetails.numberOfTickets}</span>
                </div>
              </div>
              <div>
                    <label className="text-white font-bold text-sm uppercase tracking-wide">ADMIT</label>
                    <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                      <span className="font-bold text-white text-sm">{bookingDetails.numberOfTickets}</span>
                    </div>
                  </div>
            </div>
            <div>
              <label className="text-sm font-bold uppercase tracking-wide">VENUE</label>
              <div className="border-b-2 border-dotted border-white pb-1 mt-1">
                <span className="font-bold text-sm">{bookingDetails.eventAddress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;

