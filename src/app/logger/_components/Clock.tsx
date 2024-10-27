"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = format(time, "hh:mm aa");

  return <p className="text-5xl font-bold drop-shadow">{formattedTime}</p>;
};

export default Clock;
