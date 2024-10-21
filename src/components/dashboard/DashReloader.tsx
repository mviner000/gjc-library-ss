"use client";

import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/page-container";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BookTransactionsSkeletonLoader from "../card/LibraryCardDashboard/BookTransactionsSkeletonLoader";
import dynamic from "next/dynamic";

const BookTransactionsAccordion = dynamic(
  () => import("../card/LibraryCardDashboard/BookTransactionsAccordion"),
  {
    loading: () => <BookTransactionsSkeletonLoader />,
    ssr: false, // Disable server-side rendering for this component
  }
);


export function DashReloader() {
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [selectedTab, setSelectedTab] = useState("pie-graph");

  useEffect(() => {

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown - 1 === 0) {
          window.location.reload();
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    localStorage.setItem("selectedVisitorTab", value);
  };


  return (
    <PageContainer scrollable={true}>
      <div>
        <p>Page will reload in {countdown} seconds.</p>
      </div>
      <div className="space-y-2">
        <Tabs
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
         
        </Tabs>
      </div>
    </PageContainer>
  );
}
