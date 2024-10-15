"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Discover(props: { initailData: Array<any> }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <>
      <div className='flex justify-between items-start'>
        <h2 className='text-[40px] font-semibold text-dark-blue'>
          Upcoming Events
        </h2>
        <div className='flex items-center gap-4'>
          <Select defaultValue='all'>
            <SelectTrigger className='min-w-[168px] text-dark-blue py-3.5 bg-[hsla(257,59%,78%,0.2)] hover:bg-secondary/80 focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
              <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>All Categories</SelectItem>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
                <SelectItem value='blueberry'>Blueberry</SelectItem>
                <SelectItem value='grapes'>Grapes</SelectItem>
                <SelectItem value='pineapple'>Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='min-w-[168px] text-dark-blue py-3.5 bg-[hsla(257,59%,78%,0.2)] hover:bg-secondary/80 focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
              <SelectValue placeholder='Price' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='free'>Free</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='grid gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='secondary'
                  className={cn(
                    "w-[280px] justify-start text-left font-medium text-dark-blue bg-secondary/20",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center space-y-14 w-full'>
        <div className='w-full grid grid-cols-3 gap-6'>
          {props.initailData.map((event, index) => {
            // Parse the date string into a Date object
            const date = parse(
              event?.date?.replace(/(\d+)(th|st|nd|rd)/, "$1"),
              "d MMMM, yyyy",
              new Date()
            );

            // Get the abbreviated month and day
            const month = format(date, "MMM"); // 'MMM' gives the abbreviated month (e.g., 'Oct' for October)
            const day = format(date, "dd"); // 'd' gives the day of the month without leading zeroes (e.g., '13')

            return (
              <Link
                href={`/discover/${event?.slug}`}
                key={index}
                className='bg-white rounded-2xl overflow-clip'
              >
                <Image
                  className='aspect-video w-full object-cover'
                  src={event?.imgsrc}
                  alt={event?.title}
                  width={342}
                  height={196}
                />
                <div className='flex space-x-6 p-6'>
                  <div className='flex flex-col items-center'>
                    <p className='text-sm font-bold text-primary uppercase'>
                      {month}
                    </p>
                    <p className='text-2xl font-bold'>{day}</p>
                  </div>
                  <div className='space-y-2'>
                    <p className='font-bold line-clamp-2 text-ellipsis'>
                      {event?.title}
                    </p>
                    <p className='text-[hsla(0,_0%,_42%,_1)] line-clamp-2 text-ellipsis'>
                      {event?.about}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Button
          className='border-primary focus-visible:ring-primary focus-visible:ring-2 ring-offset-2 ring-offset-background space-x-3'
          variant='outline'
        >
          <span>Load more events</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='size-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
        </Button>
      </div>
    </>
  );
}
