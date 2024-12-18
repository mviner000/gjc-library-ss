import Link from "next/link";
import { redirect } from "next/navigation";
import { HeaderActions } from "./header-actions";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import getCurrentUser from "@/utils/getCurrentUser";

export async function HeaderClient() {
  const user = await getCurrentUser();

  // Define navigation links based on authentication status
  const navigationLinks = user
    ? [
      { href: "/logger", label: "Attendance" },
        { href: "https://docs.gjclibrary.com/", label: "Docs" },
        { href: "/team", label: "Team" },
      ]
    : [
        { href: "/news", label: "News" },
        { href: "/contact", label: "Contact" },
        { href: "/login", label: "Login" },
      ];

  return (
    <div className="sticky top-0 z-[99] bg-neutral-800 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="relative size-14">
            <img
              src="/images/library-logo.png"
              style={{ objectFit: "cover", width: "20vw", height: "auto" }}
              alt="Logo"
              className="object-cover"
            />
          </Link>
        </div>

        <div className="flex justify-center items-center gap-5">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bold text-lg text-white hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="p-2">
                <Menu className="h-6 w-6 text-white" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-neutral-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-20">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-bold text-lg text-white hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <HeaderActions user={user} />
        </div>
      </div>
    </div>
  );
}

export default HeaderClient;