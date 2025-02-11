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
  keepPreviousData,
} from "@tanstack/react-query";
import { getAllEvents } from "@/actions/events";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

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
const columns: ColumnDef<any>[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function Events(_props: { initailData: Array<any> }) {
  const isMobile = useIsMobile(1280);
  const [date, setDate] = React.useState<Date>();
  const [category, setCategory] = React.useState("all");
  const [price, setPrice] = React.useState("all");
  const [state, setState] = React.useState("all");

  // Queries
  const dataQuery = useQuery({
    queryKey: ["events", category, price, date, state],
    queryFn: async () => {
      return await getAllEvents(category, price, date, state);
    },
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  const defaultData = React.useMemo(
    () => _props.initailData,
    [_props.initailData]
  );

  const table = useReactTable({
    data: dataQuery.data ?? defaultData,
    pageCount: 1,
    manualPagination: true,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (dataQuery.error) {
    return <div>Error fetching data</div>; // Display error state
  }

  return (
    <>
      <Collapsible defaultOpen={!isMobile}>
        <div className='flex flex-col xl:flex-row justify-between items-start gap-4'>
          <div className='flex justify-between items-center w-full gap-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold text-primary'>
              Upcoming Events
            </h2>

            {isMobile && (
              <CollapsibleTrigger asChild>
                <Button variant='outline' size='icon' className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
                    />
                  </svg>
                </Button>
              </CollapsibleTrigger>
            )}
          </div>

          <CollapsibleContent className='grid grid-cols-2 sm:flex items-center gap-2 w-full'>
            <Select onValueChange={setCategory} defaultValue={category}>
              <SelectTrigger className='sm:w-[168px] text-white py-3.5 bg-primary focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
                <SelectValue placeholder='Select a Category' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All Categories</SelectItem>
                  <SelectItem value='Conferences & Seminars'>
                    Conferences & Seminars
                  </SelectItem>
                  <SelectItem value='Concerts & Music Festivals'>
                    Concerts & Music Festivals
                  </SelectItem>
                  <SelectItem value='Sports Events'>⁠Sports Events</SelectItem>
                  <SelectItem value='Theatre & Performing Arts'>
                    Theatre & Performing Arts
                  </SelectItem>
                  <SelectItem value='Parties & Social Events'>
                    Parties & Social Events
                  </SelectItem>
                  <SelectItem value='Exhibitions & Trade Shows'>
                    Exhibitions & Trade Shows
                  </SelectItem>
                  <SelectItem value='Cultural & Heritage Events'>
                    Cultural & Heritage Events
                  </SelectItem>
                  <SelectItem value='Workshops & Training'>
                    Workshops & Training
                  </SelectItem>
                  <SelectItem value='Charity & Fundraising Events'>
                    Charity & Fundraising Events
                  </SelectItem>
                  <SelectItem value='Food & Drink Festivals'>
                    Food & Drink Festivals
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={setPrice} defaultValue={price}>
              <SelectTrigger className='sm:w-[168px] text-white py-3.5 bg-primary focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
                <SelectValue placeholder='Price' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All Prices</SelectItem>
                  <SelectItem value='free'>Free</SelectItem>
                  <SelectItem value='paid'>Paid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={setState} defaultValue={state}>
              <SelectTrigger className='col-span-2 sm:col-span-1 sm:w-[168px] text-white py-3.5 bg-primary focus:ring-[hsla(257,59%,78%,0.6)] font-medium shadow-none border-transparent'>
                <SelectValue placeholder='Location' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All Location</SelectItem>
                  <SelectItem value='Abuja'>Abuja</SelectItem>
                  <SelectItem value='Lagos'>Lagos</SelectItem>
                  <SelectItem value='Rivers'>Rivers</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='secondary'
                  className={cn(
                    "col-span-2 sm:col-span-1 sm:w-[150px] lg:w-[280px] justify-start text-left font-medium text-white bg-primary",
                    !date && "text-white/50"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4 text-white' />
                  {date ? format(date, "PPP") : <span className="text-white">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
                <div className='p-2'>
                  <Button
                    variant='secondary'
                    className='w-full h-auto py-1 bg-primary text-white'
                    onClick={() => setDate(undefined)}
                  >
                    Clear
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {(dataQuery?.isPending || dataQuery?.isLoading) && (
        <div className='flex flex-col items-center space-y-14 w-full flex-1'>
          <div className='h-full w-full grid place-content-center'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/Logos-06.svg'
              alt='loading gif'
              className='size-28 rounded-full animate-bounce duration-700'
            />
          </div>
        </div>
      )}

{!dataQuery?.isLoading && !dataQuery?.isPending && (
  <div className='flex flex-col items-center space-y-14 w-full'>
    {table.getRowModel().rows.length === 0 ? (
       <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-[40px] mt-10 font-semibold'>
       Oops No Event Here
     </h2>
    ) : (
      <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {table
          .getRowModel()
          .rows.map((row) => {
            // Parse the date string into a Date object
            const date = parse(
              row.original?.date?.replace(/(\d+)(th|st|nd|rd)/, "$1"),
              "d MMMM, yyyy",
              new Date()
            );

            // Get the abbreviated month and day
            const month = format(date, "MMM"); // 'MMM' gives the abbreviated month (e.g., 'Oct' for October)
            const day = format(date, "dd"); // 'd' gives the day of the month without leading zeroes (e.g., '13')

            return {
              ...row.original,
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
              prefetch={true}
            >
              <Image
                className='aspect-video w-full object-cover'
                src={event?.imgsrc}
                alt={event?.title}
                width={800}
                height={450}
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
                    {event?.description ?? ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    )}
  </div>
)}

    </>
  );
}
