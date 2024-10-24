"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageContainer from "@/components/layout/page-container";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BookTransactionsSkeletonLoader from "../card/LibraryCardDashboard/BookTransactionsSkeletonLoader";
import InspirationalQuoteModal from "./InspirationalQuoteModal";
import BookTransactionsTable from "../card/BookTransactionsTable";
import MonthSelector from "./MonthSelector";

// Dynamically import Lottie component with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BookTransactionsAccordion = dynamic(
  () => import("../card/LibraryCardDashboard/BookTransactionsAccordion"),
  {
    loading: () => <BookTransactionsSkeletonLoader />,
    ssr: false,
  }
);

// Define the type for the Lottie animation data
type LottieAnimationData = {
  v: string;
  meta: { g: string; a: string; k: string; d: string; tc: string };
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
};

export function DashReloader() {
  const [countdown, setCountdown] = useState(900);
  const [selectedTab, setSelectedTab] = useState("pie-graph");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confettiData, setConfettiData] = useState<LottieAnimationData | null>(
    null
  );

  useEffect(() => {
    setShowConfetti(true);

    // Load confetti data
    import("./confetti.json").then(
      (module: { default: LottieAnimationData }) => {
        setConfettiData(module.default);
      }
    );

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown - 1 === 0) {
          window.location.reload();
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Hide confetti after 5 seconds and show modal
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
      setShowModal(true);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(confettiTimer);
    };
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    localStorage.setItem("selectedVisitorTab", value);
  };

  return (
    <PageContainer scrollable={true}>
      {showConfetti && confettiData && typeof window !== "undefined" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <Lottie animationData={confettiData} loop={true} />
        </div>
      )}
      {/* <div>
        <p>Page will reload in {countdown} seconds.</p>
      </div> */}
      <div className="w-full text-center">
        <MonthSelector />
      </div>
      <div className="mt-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <BookTransactionsTable />
          <BookTransactionsTable />
        </div>
      </div>
      <div className="space-y-2">
        {/* <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsContent value="pie-graph" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4 md:col-span-3">
                <BookTransactionsAccordion />
              </div>
            </div>
          </TabsContent>
        </Tabs> */}
        {showModal && (
          <InspirationalQuoteModal
            quote="Your time is limited, so don't waste it living someone else's life."
            author="Steve Jobs"
            buttonText="Let's do it"
          />
        )}
      </div>
    </PageContainer>
  );
}
