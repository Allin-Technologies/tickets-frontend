"use client";

import * as React from "react";
import { useCountDown } from "@/hooks/use-countdown";

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

  const timeToCount = Math.max(targetDate.getTime() - new Date().getTime(), 0);

  const [timeLeft, { start }] = useCountDown(timeToCount);

  React.useEffect(() => {
    start(timeToCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className='relative'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 md:px-8 py-4 md:py-6 rounded-xl bg-primary text-primary-foreground flex items-center space-x-4'>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {days > 9 ? days : `0${days}`}
          </p>
          <p className='text-sm leading-none'>Days</p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {hours > 9 ? hours : `0${hours}`}
          </p>
          <p className='text-sm leading-none'>Hours</p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {minutes > 9 ? minutes : `0${minutes}`}
          </p>
          <p className='text-sm leading-none'>Minutes</p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p
            className='text-[32px] font-medium leading-none'
            suppressHydrationWarning
          >
            {seconds > 9 ? seconds : `0${seconds}`}
          </p>
          <p className='text-sm leading-none'>Seconds</p>
        </div>
      </div>
    </div>
  );
}
