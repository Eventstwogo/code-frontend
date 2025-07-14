"use client";
import { useState } from "react";
import {
  FiChevronRight,
  FiBell,
  FiPackage,
  FiPlay,
  FiCreditCard,
  FiHelpCircle,
  FiSettings,
  FiGift,
  FiGlobe,
  FiLogOut,
  FiPhone,
} from "react-icons/fi";

const menuItems = [
  {
    icon: <FiPhone />,
    label: "Get tickets on Whatsapp/SMS!",
    subtext: "Add your Mobile Number",
    highlight: true,
  },
  {
    icon: <FiBell />,
    label: "Notifications",
  },
  {
    icon: <FiPackage />,
    label: "Your bookings",
    subtext: "View all your bookings & purchases",
  },
  {
    icon: <FiPlay />,
    label: "Stream Library",
    subtext: "Rented & Purchased Movies",
  },
  {
    icon: <FiCreditCard />,
    label: "Play Credit Card",
    subtext: "View your Play Credit Card details and offers",
  },
  {
    icon: <FiHelpCircle />,
    label: "Help & Support",
    subtext: "View commonly asked queries and Chat",
  },
  {
    icon: <FiSettings />,
    label: "Accounts & Settings",
    subtext: "Location, Payments, Permissions & More",
  },
  {
    icon: <FiGift />,
    label: "Rewards",
    subtext: "View your rewards & unlock new ones",
  },
  {
    icon: <FiGlobe />,
    label: "BookAChange",
  },
];

export function Sidebar() {
  const [open, setOpen] = useState(false); // Sidebar is hidden by default

  return (
    <>
      {/* Toggle Button to Open Sidebar */}
      {!open && (
        <button
          className="fixed top-4 left-4 z-40 px-4 py-2 bg-gray-800 text-white rounded shadow"
          onClick={() => setOpen(true)}
        >
          Show Sidebar
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[320px] bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Hey!</h2>
            <p className="text-sm text-blue-600 cursor-pointer">Edit Profile</p>
          </div>
          <FiChevronRight
            className="cursor-pointer text-gray-500"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Menu Items */}
        <div className="divide-y">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                item.highlight ? "bg-purple-100" : ""
              }`}
            >
              <div className="pt-1 text-gray-600">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                {item.subtext && (
                  <p className="text-xs text-gray-500">{item.subtext}</p>
                )}
              </div>
              <FiChevronRight className="mt-1 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t mt-auto">
          <button className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <FiLogOut /> Sign out
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
