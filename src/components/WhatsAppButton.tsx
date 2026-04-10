import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/96892830836?text=Hello!%20I'm%20interested%20in%20booking%20a%20tour%20with%20Sunshine%20Tours%20Oman."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
    style={{ backgroundColor: "#25D366" }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-7 w-7 text-white fill-white" />
  </a>
);
