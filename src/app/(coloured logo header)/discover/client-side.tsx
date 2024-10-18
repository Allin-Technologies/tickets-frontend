"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getAllEvents } from "../../../../actions/events";

// Create a client
const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Discover(props: { initailData: Array<any> }) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Events {...props} />
    </QueryClientProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Events(props: { initailData: Array<any> }) {
  const [date, setDate] = React.useState<Date>();

  const [category, setCategory] = React.useState("all");
  const [price, setPrice] = React.useState("all");

  // Queries
  const query = useQuery({
    queryKey: ["events", category, price, date],
    queryFn: async () => {
      return await getAllEvents(category, price, date);
    },
    initialData: props.initailData,
  });

  if (query.error) {
    return <div>Error fetching data</div>; // Display error state
  }

  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between items-start gap-4'>
        <h2 className='text-[40px] font-semibold text-dark-blue'>
          Upcoming Events
        </h2>
        <div className='grid grid-cols-2 sm:flex items-center gap-2'>
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className='sm:w-[168px] text-dark-blue py-3.5 bg-[hsla(257,59%,78%,0.2)] hover:bg-secondary/80 focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
              <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>All Categories</SelectItem>
                <SelectItem value='⁠Conferences & Seminars'>
                  ⁠Conferences & Seminars
                </SelectItem>
                <SelectItem value='⁠Concerts & Music Festivals'>
                  ⁠Concerts & Music Festivals
                </SelectItem>
                <SelectItem value='⁠Sports Events'>⁠Sports Events</SelectItem>
                <SelectItem value='⁠Theatre & Performing Arts'>
                  ⁠Theatre & Performing Arts
                </SelectItem>
                <SelectItem value='⁠Parties & Social Events'>
                  ⁠Parties & Social Events
                </SelectItem>
                <SelectItem value='Exhibitions & Trade Shows'>
                  Exhibitions & Trade Shows
                </SelectItem>
                <SelectItem value='⁠Cultural & Heritage Events'>
                  ⁠Cultural & Heritage Events
                </SelectItem>
                <SelectItem value='⁠Workshops & Training'>
                  ⁠Workshops & Training
                </SelectItem>
                <SelectItem value='⁠Charity & Fundraising Events'>
                  ⁠Charity & Fundraising Events
                </SelectItem>
                <SelectItem value='ood & Drink Festivals'>
                  ⁠Food & Drink Festivals
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setPrice} defaultValue={price}>
            <SelectTrigger className='sm:w-[168px] text-dark-blue py-3.5 bg-[hsla(257,59%,78%,0.2)] hover:bg-secondary/80 focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
              <SelectValue placeholder='Price' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='free'>Free</SelectItem>
                <SelectItem value='paid'>Paid</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='grid gap-2 col-span-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='secondary'
                  className={cn(
                    "sm:w-[280px] justify-start text-left font-medium text-dark-blue bg-secondary/20",
                    !date && "text-dark-blue/50"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {query?.isLoading && (
        <div className='flex flex-col items-center space-y-14 w-full flex-1'>
          <div className='h-full w-full grid place-content-center'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/loading.gif'
              alt='loading gif'
              className='size-28 rounded-full'
            />
          </div>
        </div>
      )}

      {query?.data && !query?.isLoading && (
        <div className='flex flex-col items-center space-y-14 w-full'>
          <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {query.data
              ?.map((event) => {
                // Parse the date string into a Date object
                const date = parse(
                  event?.date?.replace(/(\d+)(th|st|nd|rd)/, "$1"),
                  "d MMMM, yyyy",
                  new Date()
                );

                // Get the abbreviated month and day
                const month = format(date, "MMM"); // 'MMM' gives the abbreviated month (e.g., 'Oct' for October)
                const day = format(date, "dd"); // 'd' gives the day of the month without leading zeroes (e.g., '13')

                return {
                  ...event,
                  month,
                  day,
                  parsedDate: date,
                };
              })
              .sort((a, b) => {
                return a.parsedDate - b.parsedDate;
              })
              .map((event, index) => (
                <Link
                  href={`/${event?.slug}`}
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
                        {event.month}
                      </p>
                      <p className='text-2xl font-bold'>{event.day}</p>
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
              ))}
          </div>

          {/* <Button
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
  </Button> */}
        </div>
      )}
    </>
  );
}
