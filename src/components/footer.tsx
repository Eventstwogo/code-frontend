import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
 
export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-10 px-6 md:px-20 border-t">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start text-sm">
        {/* Logo and Tagline */}
        <div className="md:col-span-1 flex flex-col items-start gap-2">
          <img src="/images/logo.png" alt="Events2Go Logo" className="h-20" />
          <p className="font-semibold text-lg">EVENTS 2 GO</p>
          <p className="text-xs text-gray-500">
            "Explore movies, trending events, workshops..."
          </p>
        </div>
 
        {/* Explore */}
        <div>
          <h4 className="font-bold mb-2">Explore</h4>
          <ul className="space-y-1">
            <li>Now Showing</li>
            <li>Trending Events</li>
            <li>Workshops</li>
            <li>Festivals</li>
            <li>Gift Cards</li>
          </ul>
        </div>
 
        {/* Help & Support */}
        <div>
          <h4 className="font-bold mb-2">Help & Support</h4>
          <ul className="space-y-1">
            <li>Customer Support</li>
            <li>FAQs</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
 
        {/* Subscribe */}
        <div className="md:col-span-1">
          <h4 className="font-bold mb-2">Stay Updated</h4>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="enter your mail"
              className="border rounded px-2 py-1 text-xs w-full"
            />
            <button className="bg-purple-500 text-white px-3 py-1 text-xs rounded">
              SUBSCRIBE
            </button>
          </div>
        </div>
 
        {/* Social Media */}
        <div className="flex flex-col gap-2 flex align-center ">
          <h4 className="font-bold">Social media</h4>
          <div className="flex gap-6 text-xl">
            <FaInstagram />
            <FaFacebookF />
            <FaXTwitter />
          </div>
        </div>
      </div>
 
      {/* Bottom Row */}
      <div className="mt-10 border-t pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-2">
        <p>©opyright 2025 Events2Go. All Rights Reserved.</p>
        <div className="flex gap-3">
          <img src="/images/appstore.png" alt="App Store" className="h-6" />
          <img src="/images/googleplay.png" alt="Google Play" className="h-6" />
        </div>
      </div>
    </footer>
  );
}
 
 