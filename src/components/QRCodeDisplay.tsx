"use client";

import { useEffect, useState } from "react";
import { QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  value: string; // URL or data to encode in the QR code
  size?: number; // Optional size for the QR code (default: 200)
}

const QRCodeDisplay = ({ value, size = 200 }: QRCodeDisplayProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(value, {
          width: size,
          margin: 1,
          errorCorrectionLevel: "M",
          color: {
            dark: "#1e293b",
            light: "#ffffff",
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR code. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (value) generateQRCode();
  }, [value, size]);

  const handleRedirect = () => {
    window.location.href = value;
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `ticket_qr_${value.split("orderId=")[1] || "ticket"}.png`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg border-2 border-dashed border-slate-300">
      {isLoading ? (
        <div className="flex items-center justify-center w-[200px] h-[200px] bg-slate-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center w-[200px] h-[200px] bg-red-50 rounded-lg">
          <QrCode className="w-12 h-12 text-red-400" />
          <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={qrCodeUrl ?? ""}
            alt="QR code"
            className="rounded-lg shadow-sm"
            width={size}
            height={size}
          />
          <button
            onClick={handleRedirect}
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100
                       transition-opacity duration-200 bg-blue-600/70 rounded-lg flex items-center justify-center"
          >
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Verify Ticket
            </span>
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-2 text-center">
        {isLoading
          ? "Generating QR code..."
          : error
          ? "Unable to display QR code"
          : "Click or scan for ticket verification"}
      </p>

      {/* {qrCodeUrl && !isLoading && !error && (
        <Button
          onClick={handleDownload}
          variant="outline"
          className="mt-2 flex items-center gap-2 border-slate-200 hover:bg-slate-50 text-sm"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </Button>
      )} */}
    </div>
  );
};

export default QRCodeDisplay;
