'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export default function TestAds() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API call to /api/v1/advertisements');
        const response = await axiosInstance.get('/api/v1/advertisements');
        console.log('API Response:', response.data);
        setData(response.data);
      } catch (err: any) {
        console.error('API Error:', err);
        console.error('Error response:', err.response?.data);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) {
    return <div className="p-4 bg-yellow-100">Testing API call...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800">
        <h3>API Error:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100">
      <h3 className="font-bold">API Test Results:</h3>
      <pre className="mt-2 text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}