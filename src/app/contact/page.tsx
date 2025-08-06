


// 'use client'

// import React, { useState } from 'react'
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Calendar } from 'lucide-react'
// import { toast } from 'sonner'
// import axiosInstance from '@/lib/axiosInstance'

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     phone_number: '',
//      message: ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Form state at submit:", formData) 
//     setIsSubmitting(true)

//     try {
       
       
//      const response=await axiosInstance.post('/api/v1/admin/enquiries',formData)
//       toast.success("Message sent successfully! We'll get back to you soon.")
//       setFormData({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phone_number: '',
     
//         message: ''
//       })
//     } catch (error) {
//       toast.error('Failed to send message. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: 'Visit Us',
//       details: ['123 Event Street', 'Entertainment District', 'City, State 12345']
//     },
//     {
//       icon: Phone,
//       title: 'Call Us',
//       details: ['+61430194569']
//     },
//     {
//       icon: Mail,
//       title: 'Email Us',
//       details: ['info@events2go.com', 'support@events2go.com']
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       {/* Hero Section */}
//       <div className="bg-purple-700 text-white py-16 shadow-md">
//         <div className="container mx-auto px-4 text-center max-w-3xl">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Get in Touch
//           </h1>
//           <p className="text-lg text-white/90">
//             Have questions or need help planning your next event? We're here to bring your vision to life.
//           </p>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="container mx-auto px-10 py-16">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Side Info */}
//           <div className="lg:col-span-1 space-y-6">
//             {contactInfo.map((info, index) => (
//               <Card key={index} className="bg-white shadow-md hover:shadow-lg transition">
//                 <CardContent className="p-6">
//                   <div className="flex gap-4">
//                     <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                       <info.icon className="h-6 w-6 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
//                       {info.details.map((detail, idx) => (
//                         <p key={idx} className="text-sm text-muted-foreground">
//                           {detail}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Right Side Form */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-primary">
//                   <Send className="h-5 w-5" />
//                   Send Us a Message
//                 </CardTitle>
//                 <CardDescription>
//                   Fill out the form and we’ll contact you shortly.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="firstName">First Name *</Label>
//                       <Input
//                         id="firstname"
//                         name="firstname"
//                         value={formData.firstname}
//                         onChange={handleInputChange}
//                         placeholder="First name"
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="lastName">Last Name *</Label>
//                       <Input
//                         id="lastname"
//                         name="lastname"
//                         value={formData.lastname}
//                         onChange={handleInputChange}
//                         placeholder="Last name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address *</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter your email"
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="phone_number">Phone Number</Label>
//                       <Input
//                         id="phone_number"
//                         name="phone_number"
//                         type="tel"
//                         value={formData.phone_number}
//                         onChange={handleInputChange}
//                         placeholder="Phone number"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="message">Message *</Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       placeholder="Tell us about your inquiry..."
//                       className="min-h-[120px]"
//                       required
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full md:w-auto bg-purple-500 text-white hover:bg-purple-700"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="h-4 w-4 mr-2" />
//                         Send Message
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ContactPage


'use client'

import React, { useState } from 'react'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("SUBMIT CALLED")
    console.log("Form state at submit:", JSON.parse(JSON.stringify(formData)))

    if (!formData.phone_number) {
      console.warn("⚠ Phone number is empty!")
    }

    setIsSubmitting(true)

    try {
      await axiosInstance.post('/api/v1/admin/enquiries', formData, {
        headers: { 'Content-Type': 'application/json' }
      })

      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        message: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Australia']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+61430194565']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@events2go.com.au']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="bg-purple-700 text-white py-16 shadow-md">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/90">
            Have questions or need help planning your next event? We're here to bring your vision to life.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Side Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Send className="h-5 w-5" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form and we’ll contact you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* DEBUG LINE - remove later */}
              

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">First Name *</Label>
                      <Input
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Last Name *</Label>
                      <Input
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone Number *</Label>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your inquiry..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-purple-500 text-white hover:bg-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
