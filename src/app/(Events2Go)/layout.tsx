import Link from 'next/link'
import '../globals.css'
import HeaderClient from '@/components/HeaderClient'
import Footer from '@/components/footer'



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >

      
       

        <main >
          {children}
        </main>

      

      
      </body>
    </html>
  )
}
