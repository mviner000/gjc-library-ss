import { FC } from "react";
import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

const HomePage: FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/mavs/library.png"
          alt="Library Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Semi-transparent overlay */}
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-30" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* <Navbar /> */}
        <Hero />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
