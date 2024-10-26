"use client";

import React, { useState } from "react";

interface MonthSelectorProps {
  initialDate?: Date;
  onMonthChange?: (newDate: Date) => void;
}

const months: readonly string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MonthSelector: React.FC<MonthSelectorProps> = ({
  initialDate = new Date(2024, 4), // Default to May 2024
  onMonthChange,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const handlePrevMonth = (): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      onMonthChange?.(newDate);
      return newDate;
    });
  };

  const handleNextMonth = (): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      onMonthChange?.(newDate);
      return newDate;
    });
  };

  const formatDate = (date: Date): string => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="w-full text-center">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevMonth}
          className="text-4xl hover:opacity-75 transition-opacity cursor-pointer"
          aria-label="Previous month"
          type="button"
        >
          ⬅️
        </button>
        <span className="text-4xl font-black">{formatDate(currentDate)}</span>
        <button
          onClick={handleNextMonth}
          className="text-4xl hover:opacity-75 transition-opacity cursor-pointer"
          aria-label="Next month"
          type="button"
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
