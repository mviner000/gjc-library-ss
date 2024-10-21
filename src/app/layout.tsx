import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/authProviders";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { archivo, libre_franklin, oswald } from "@/utils/fonts";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

export const metadata: Metadata = {
  title: "GJC Library: Admin",
  description: "Manage and track student attendance and activity logs at the General De Jesus College Library.",
  keywords: "GJC Library, student attendance, student logs, college library management, academic resources",
  openGraph: {
    title: "GJC Library: Admin",
    description: "Monitor and record student attendance and activities at the General De Jesus College Library.",
    url: "https://admin.gjclibrary.com",
    siteName: "General De Jesus College Library",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GJC Library: Admin",
    description: "Streamline student library usage reporting at the General De Jesus College Library.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-customLightGreen dark:bg-slate-950 antialiased",
          `${archivo.variable} ${libre_franklin.variable} ${oswald.variable}`
        )}
      >
        <Suspense fallback={
          <>
            {/* null muna dito for smooth fidgetspinner loading */}
          </>
        }>
          <AuthProvider>
            <Providers>
              <NextTopLoader color="#E09900" />
              <NotificationsProvider>
                <Header />
                {children}
              </NotificationsProvider>
            </Providers>
            <Toaster />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
