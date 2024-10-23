"use client";
// header-client.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderActions } from "./header-actions";
import NotifsToggle from "@/components/layout/Notifs/notifs-toggle";

interface HeaderClientProps {
  user: any; // Replace 'any' with your actual user type
}

export function HeaderClient({ user }: HeaderClientProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-[99] bg-neutral-800 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/home" className="relative size-14">
            <img
              src="/images/library-logo.png"
              style={{ objectFit: "cover", width: "20vw", height: "auto" }}
              alt="Logo"
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-5">
          {/* <NotifsToggle /> */}
          {pathname !== "/login" && (
            <>
              <Link href="/news" className="font-bold text-lg text-white">
                News
              </Link>
              <Link href="/account" className="font-bold text-lg text-white">
                Account
              </Link>
              <Link href="/contact" className="font-bold text-lg text-white">
                Contact
              </Link>
              <Link href="/team" className="font-bold text-lg text-white">
                Team
              </Link>
            </>
          )}
          <HeaderActions user={user} />
        </div>
      </div>
    </div>
  );
}
