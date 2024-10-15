"use client";

import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import { useEffect, useState } from "react";

interface CountProps {
  date: string;
  time: string;
}

export function Count({ date, time }: CountProps) {
  const createTargetDate = (dateString: string, timeString: string) => {
    const cleanDateString = dateString.replace(/(\d+)(th|st|nd|rd)/, "$1");

    const combinedDateTimeString = `${cleanDateString} ${timeString}`;

    return new Date(combinedDateTimeString);
  };

  const targetDate = createTargetDate(date, time);

  const calculateTimeLeft = () => {
    const now = new Date();

    const days = Math.abs(differenceInDays(targetDate, now));
    const hours = Math.abs(differenceInHours(targetDate, now)) % 24;
    const minutes = Math.abs(differenceInMinutes(targetDate, now)) % 60;
    const seconds = Math.abs(differenceInSeconds(targetDate, now)) % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 rounded-xl bg-primary text-primary-foreground flex items-center space-x-4'>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {timeLeft.days > 9 ? timeLeft.days : `0${timeLeft.days}`}
          </p>
          <p className='text-sm leading-none'>Days</p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {timeLeft.hours > 9 ? timeLeft.hours : `0${timeLeft.hours}`}
          </p>
          <p className='text-sm leading-none'>Hours</p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {timeLeft.minutes > 9 ? timeLeft.minutes : `0${timeLeft.minutes}`}
          </p>
          <p className='text-sm leading-none'>Minutes</p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {timeLeft.seconds > 9 ? timeLeft.seconds : `0${timeLeft.seconds}`}
          </p>
          <p className='text-sm leading-none'>Seconds</p>
        </div>
      </div>
    </div>
  );
}
