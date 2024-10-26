"use client";

import { ContactFormData } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastProvider } from "@/components/ui/toast";

export const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);

    // Show toast notification with message details
    toast({
      title: "Message feature is in Beta Mode",
      description: `Message Details:\nFrom: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
      duration: 5000, // Extended duration to allow reading the details
      variant: "default",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ToastProvider>
      <section className="relative py-20" id="contact">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/mavs/books.jpeg"
            alt="Library Books Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">CONTACT US</h2>
            <h5 className="text-xl text-white italic">
              For Inquiries Contact us here!
            </h5>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto backdrop-blur-sm bg-slate-100 bg-opacity-50 p-8 rounded-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    placeholder="Enter Name*"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    placeholder="Enter Email*"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    placeholder="Enter Phone*"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-full min-h-[200px] px-4 py-3 bg-white bg-opacity-80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                  placeholder="Enter Message*"
                  required
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="px-8 py-3 text-lg font-medium text-black border-2 border-black rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </section>
    </ToastProvider>
  );
};
