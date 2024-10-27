"use client";

import Link from "next/link";
import { useState } from "react";

export const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDocsHovered, setIsDocsHovered] = useState(false);
  const [isLogsHovered, setIsLogsHovered] = useState(false);
  return (
    <section className="h-screen -mt-16 flex w-full flex-col justify-center gap-7 bg-[url(/mavs/back.jpg)] bg-cover bg-top text-white">
      <div className="text-center">
        <h2 className="text-yellow-500 xs:text-5xl text-6xl font-bold mb-8">
          Welcome To GJC
        </h2>
        <h2 className="text-yellow-500 xs:text-5xl text-6xl font-bold mb-8">
          We achieve great heights
        </h2>
        <div className="flex flex-row justify-center items-center gap-5 mx-10">
          <Link
            href="/browse"
            style={{
              height: "50px",
              width: "150px",
              fontSize: "18px",
              fontWeight: 600,
              color: "rgb(255, 179, 0)",
              backgroundColor: isHovered ? "#cc0000" : "green", // Changes to blue on hover
              border: "1px solid rgb(255, 179, 0)",
              borderRadius: "25px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Helvetica, Arial, sans-serif",
              outline: "none",
              transition: "0.4s",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            More about us
          </Link>

          <Link
            href="https://docs.gjclibrary.com/"
            style={{
              height: "50px",
              width: "150px",
              fontSize: "18px",
              fontWeight: 600,
              color: "rgb(255, 179, 0)",
              backgroundColor: isDocsHovered ? "#cc0000" : "green", // Changes to blue on hover
              border: "1px solid rgb(255, 179, 0)",
              borderRadius: "25px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Helvetica, Arial, sans-serif",
              outline: "none",
              transition: "0.4s",
            }}
            onMouseEnter={() => setIsDocsHovered(true)}
            onMouseLeave={() => setIsDocsHovered(false)}
          >
            Docs
          </Link>

          <Link
            href="/logger"
            style={{
              height: "50px",
              width: "150px",
              fontSize: "18px",
              fontWeight: 600,
              color: "rgb(255, 179, 0)",
              backgroundColor: isLogsHovered ? "#cc0000" : "green", // Changes to blue on hover
              border: "1px solid rgb(255, 179, 0)",
              borderRadius: "25px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Helvetica, Arial, sans-serif",
              outline: "none",
              transition: "0.4s",
            }}
            onMouseEnter={() => setIsLogsHovered(true)}
            onMouseLeave={() => setIsLogsHovered(false)}
          >
            Attendance Logger
          </Link>
        </div>
      </div>
    </section>
  );
};
