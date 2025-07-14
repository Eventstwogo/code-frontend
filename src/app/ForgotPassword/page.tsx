'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email.')
      return
    }
console.log('hello')
 
    // try {
    //   await axiosInstance.post('/api/v1/auth/forgot-password', { email })

    
    //   setEmail('')
    // } catch (error: any) {
    //   console.error(error)
    //   toast.error(
    //     error?.response?.data?.message || 'Failed to send reset email.'
    //   )
    // } finally {
    //   setLoading(false)
    // }
      toast.success('Email sent successfully! Check your inbox.')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Forgot Your Password?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive password reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      </div>
    </div>
  )
}
