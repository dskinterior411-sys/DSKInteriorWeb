"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/api";

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchSettings() {
      const settings = await getSettings();
      // Use WhatsApp number from settings, or fallback to contact phone
      const number = settings.whatsapp_number || settings.contact_phone || "+919226146504";
      // Remove any non-digit characters except +
      const cleanNumber = number.replace(/[^\d+]/g, "");
      setWhatsappNumber(cleanNumber);
    }
    fetchSettings();
  }, []);

  if (!mounted || !whatsappNumber) {
    return null;
  }

  const handleClick = () => {
    // Pre-filled message
    const message = encodeURIComponent("Hi, I'm interested in your interior design services. Can you help me?");
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </button>
  );
}


