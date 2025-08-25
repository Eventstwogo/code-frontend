"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

interface Partner {
  partner_id: string;
  logo: string;
  website_url: string;
  partner_status: boolean;
  created_at: string;
  updated_at: string;
}

interface PartnersApiResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  method: string;
  path: string;
  data: Partner[];
}

export default function Partners() {
  const [partnersData, setPartnersData] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get<PartnersApiResponse>(
          "/api/v1/partners/active/all"
        );

        if (response.data.statusCode === 200) {
          setPartnersData(response.data.data);
        } else {
          setError("Failed to fetch partners data");
        }
      } catch (err: any) {
        console.error("Error fetching partners data:", err);
        setError(
          err.response?.data?.message || "Failed to load partners information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
            Our Partners
          </h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-gray-600">Loading partners...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
            Our Partners
          </h1>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (partnersData.length === 0) {
    return null; // Don't show the section if no partners
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
          Our Partners
        </h1>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {partnersData.map((partner) => (
          <div
            key={partner.partner_id}
            className="relative overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition-shadow cursor-pointer p-4 sm:p-6"
          >
            <a
              href={partner.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative w-full h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`Partner ${partner.partner_id}`}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                          <span class="text-gray-400 text-xs">Partner Logo</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
