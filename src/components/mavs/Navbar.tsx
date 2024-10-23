import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-900 fixed top-0 w-full z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            <Image src="/images/log.png" alt="Logo" width={75} height={75} />
          </Link>

          <button className="lg:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/news"
              className="text-white hover:text-gray-300 font-bold"
            >
              News
            </Link>
            <Link
              href="/account"
              className="text-white hover:text-gray-300 font-bold"
            >
              Account
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-gray-300 font-bold"
            >
              Contact
            </Link>
            <button className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
