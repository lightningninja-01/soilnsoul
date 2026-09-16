"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
        </>
      )}
    </>
  );
}
