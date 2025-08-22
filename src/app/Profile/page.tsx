"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { User, Calendar, Camera, Save, ArrowLeft, Settings, BookOpen, LogOut } from "lucide-react"

import axiosInstance from "@/lib/axiosInstance"
import { useProfileStore } from "@/lib/ZustanStore/usermanagement"
import { useBookingStore } from "@/lib/ZustanStore/bookingStore"
import useStore from "@/lib/Zustand"
import UpdatePasswordCard from "@/components/Profile/UpdatePassword"

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required").regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),
  last_name: z.string().min(1, "Last name is required").regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),
  username: z.string().min(4, "Username must be at least 4 characters").max(32, "Username cannot exceed 32 characters"),
  email: z.string().email("Invalid email address"),
})

type ProfileSchemaType = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const router = useRouter()
  const { profile, fetchProfile } = useProfileStore()
  const { bookings, fetchBookings } = useBookingStore()
  const [authChecked, setAuthChecked] = useState(false);
  const { logout, userId, isAuthenticated, checkAuth } = useStore()

  const [isEditing, setIsEditing] = useState(false)
  const [newAvatar, setNewAvatar] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [usernameStatus, setUsernameStatus] = useState<{ available: boolean; message: string } | null>(null)
  const usernameTimer = useRef<NodeJS.Timeout | null>(null)
  const [originalUsername, setOriginalUsername] = useState<string>("")

  const { register, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: { first_name: "", last_name: "", username: "", email: "" },
  })

  const watchedUsername = watch("username")

  // Fetch profile on mount
  useEffect(() => { fetchProfile() }, [])

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 Initializing authentication check in BookingPage...');
      await checkAuth();
      setAuthChecked(true);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (authChecked && !isAuthenticated && !userId) {
      console.log('🚫 Not authenticated, redirecting to login');
      router.push('/login');
      return;
    }
  }, [authChecked, isAuthenticated, userId, router]);

  // Populate form values when profile is loaded
  useEffect(() => {
    if (profile) {
      setValue("first_name", profile.first_name || "")
      setValue("last_name", profile.last_name || "")
      setValue("username", profile.username || "")
      setValue("email", profile.email || "")
      setOriginalUsername(profile.username || "")
      if (profile.user_id) fetchBookings(profile.user_id)
    }
  }, [profile, setValue, fetchBookings])

  // Check username availability with debounce (only if changed)
  useEffect(() => {
    if (!isEditing || !watchedUsername || watchedUsername === originalUsername) {
      setUsernameStatus(null)
      return
    }

    if (usernameTimer.current) clearTimeout(usernameTimer.current)
    usernameTimer.current = setTimeout(async () => {
      try {
        const res = await axiosInstance.post("/api/v1/users/check-username", { username: watchedUsername })
        setUsernameStatus(res.data.data)
      } catch (err: any) {
        console.error("Username check failed:", err)
        setUsernameStatus(null)
      }
    }, 500) // 500ms debounce
  }, [watchedUsername, isEditing, originalUsername])

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return toast.error("Image size should be less than 5MB")
    setNewAvatar(URL.createObjectURL(file))
    setAvatarFile(file)
  }

  const handleSaveAvatar = async () => {
    if (!avatarFile) return toast.warning("No image selected.")
    const formData = new FormData()
    formData.append("profile_picture", avatarFile)
    try {
      await axiosInstance.patch("/api/v1/users/profile/picture", formData, { headers: { "Content-Type": "multipart/form-data" } })
      toast.success("Profile picture updated!")
      setAvatarFile(null)
      setNewAvatar(null)
      fetchProfile()
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to update avatar.")
    }
  }

  const onSubmit = async (data: ProfileSchemaType) => {
    // If username changed, check availability
    if (watchedUsername !== originalUsername && usernameStatus && !usernameStatus.available) {
      return toast.error(usernameStatus.message)
    }

    try {
      await axiosInstance.put("/api/v1/users/profile", data)
      toast.success("Profile updated successfully!")
      setIsEditing(false)
      fetchProfile()
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to update profile.")
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setNewAvatar(null)
    setAvatarFile(null)
    reset()
    if (profile) {
      setValue("first_name", profile.first_name || "")
      setValue("last_name", profile.last_name || "")
      setValue("username", profile.username || "")
      setValue("email", profile.email || "")
      setOriginalUsername(profile.username || "")
    }
    setUsernameStatus(null)
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/v1/users/logout")
      logout()
      localStorage.removeItem("auth_token")
      toast.success("Logged out successfully!")
      router.push("/")
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Logout failed. Try again.")
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete("/api/v1/users/profile/")
      toast.success("Account deleted successfully!")
      logout()
      localStorage.removeItem("auth_token")
      router.push("/")
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Account deletion failed.")
    }
  }

  const memberSince = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })
  const totalBookings = bookings?.pagination?.total_count || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/Profile/Bookings">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <BookOpen className="w-4 h-4" /> My Bookings
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You&apos;ll be redirected to the login page and your session will end.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Confirm Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="relative w-32 h-32">
                <Image
                  src={newAvatar || profile?.profile_picture || "/placeholder.svg?height=128&width=128&query=user avatar"}
                  alt={profile?.username || "User"}
                  fill
                  className="rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/50 rounded-full p-3 text-white hover:bg-black/70 transition-colors">
                    <Camera className="w-5 h-5" />
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                )}
              </div>
              {newAvatar && (
                <Button onClick={handleSaveAvatar} size="sm" className="w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Photo
                </Button>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile?.username ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1) : "Loading..."}
                </h2>
                <p className="text-gray-500">{profile?.email}</p>
                <Badge variant="secondary" className="mt-2">
                  <Calendar className="w-3 h-3 mr-1" /> Member since {memberSince}
                </Badge>
              </div>
              <Separator />
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <Badge variant="outline">{totalBookings}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Info Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4 flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> Profile Information
              </CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleCancelEdit} variant="outline" size="sm">Cancel</Button>
                  <Button onClick={handleSubmit(onSubmit)} size="sm" disabled={isSubmitting}>
                    <Save className="w-4 h-4 mr-2" /> {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["first_name", "last_name", "username", "email"].map((field) => (
                  <div key={field} className="space-y-2 relative">
                    <Label htmlFor={field} className="text-sm font-medium">{field.replace("_", " ")}</Label>
                    {isEditing ? (
                      <>
                        <Input id={field} {...register(field as keyof ProfileSchemaType)} />
                        {field === "username" && usernameStatus && (
                          <p
                            className={`text-sm mt-1 ${
                              usernameStatus.available ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {usernameStatus.message}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-900">{profile?.[field as keyof ProfileSchemaType] || "Not provided"}</p>
                      </div>
                    )}
                    {errors[field as keyof ProfileSchemaType] && (
                      <p className="text-sm text-red-500 mt-1">{errors[field as keyof ProfileSchemaType]?.message}</p>
                    )}
                  </div>
                ))}
              </form>
            </CardContent>
          </Card>

          {/* Password Update */}
          <UpdatePasswordCard />

          {/* Delete Account */}
          <Card className="shadow-md border-red-200">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-red-700">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                This action is irreversible. Please confirm before proceeding.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your account and all associated data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>Confirm Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
