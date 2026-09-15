"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { whatsapp } from "@/data/journeys";
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hidden = ["/admin", "/hakunamata"].some((p) => pathname.startsWith(p));
  return (
    <>
      {!hidden && (
        <>
          <a className="sn-skip" href="#main-content">
            Skip to content
          </a>
          <Navbar />
        </>
      )}
      <main id="main-content">{children}</main>
      {!hidden && (
        <>
          <Footer />
          <a
            className="sn-concierge"
            href={whatsapp(
              "Hi Soil n Soul, I would love to design a journey.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire with our concierge on WhatsApp"
          >
            <span aria-hidden="true">↗</span>
            <span>Let's talk</span>
          </a>
        </>
      )}
    </>
  );
}
