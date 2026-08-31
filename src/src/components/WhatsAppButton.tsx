import { useLocation } from "@tanstack/react-router";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppButton({
  message = "Hi Sunshine Tours! I'd like to know more about your tours.",
}: {
  message?: string;
}) {
  const location = useLocation();
  const isBookingFlow = location.pathname.startsWith("/book/");
  const isToursCatalog = location.pathname === "/tours";
  const hasMobileStickyCta = /^\/tours\/[^/]+/.test(location.pathname);
  const href = `https://api.whatsapp.com/send?phone=96896964811&text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={[
        "ring-focus fixed right-[max(1rem,env(safe-area-inset-right))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform hover:scale-110 md:right-7 md:h-14 md:w-14",
        isToursCatalog ? "hidden sm:flex" : "",
        isBookingFlow ? "hidden lg:flex lg:bottom-7" : "",
        !isBookingFlow && hasMobileStickyCta
          ? "bottom-[calc(6rem+env(safe-area-inset-bottom))] lg:bottom-7"
          : "",
        !isBookingFlow && !hasMobileStickyCta
          ? "bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-7"
          : "",
      ].join(" ")}
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]"></span>
      </span>
    </a>
  );
}
