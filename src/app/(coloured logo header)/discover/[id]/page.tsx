import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format, parse } from "date-fns";
import { notFound } from "next/navigation";
import { getEventTimeRange, formatEventDate } from "@/lib/utils";
import { api } from "@/lib/api";
import { eventSchema } from "@/lib/zod";
import { Count } from "./count";
import { z } from "zod";

const validator = z.array(z.any());

export default async function Page(props: { params: { id: string } }) {
  const request = await api(eventSchema, {
    method: "get",
    url: `/event/${props.params.id}`,
  });

  if (request.response_code !== 200 || !request.data) {
    notFound();
  }

  const more_request = await api(validator, {
    method: "get",
    url: `/event/getall`,
  });

  if (request.response_code !== 200) {
    notFound();
  }

  return (
    <main className='w-screen min-h-dvh'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:p-8 xl:px-12 2xl:px-0 2xl:py-56 space-y-24'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-8 max-w-lg mx-auto w-full'>
            <div className='aspect-[9/11]'>
              <Count date={request.data?.date} time={request.data?.time} />
              <Image
                className='w-full object-cover h-full rounded-3xl'
                src={request.data?.imgsrc}
                alt='demo'
                width={342}
                height={196}
              />
            </div>

            <Button>
              <Link href={`/pay/${props.params.id}`}>Get Ticket now</Link>
            </Button>
          </div>
          <div className='space-y-12'>
            <div className='text-dark-blue space-y-6'>
              <h2 className='text-5xl font-bold leading-normal'>
                {request.data.title}
              </h2>

              {request.data?.date && (
                <p>{formatEventDate(request.data?.date)}</p>
              )}

              {request.data?.time && (
                <p>
                  {getEventTimeRange(
                    request.data?.time,
                    request.data?.duration
                  )}
                </p>
              )}

              <p>Eko Convention Center | Eko Hotels & Suites</p>
            </div>

            <Separator />

            <div className='space-y-6'>
              <div className='flex space-x-4'>
                <p className='text-2xl font-semibold'>About this event</p>
                {request.data.event_type === "Paid" && (
                  <Badge
                    className='bg-secondary/20 text-dark-blue font-bold pointer-events-none'
                    variant='secondary'
                  >
                    PAID EVENT
                  </Badge>
                )}
                {request.data.event_type === "Free" && (
                  <Badge className='bg-primary/20 text-dark-blue font-bold pointer-events-none'>
                    FREE EVENT
                  </Badge>
                )}
              </div>

              <div>
                <p>{request.data.about}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          <h1 className='text-5xl font-bold leading-normal'>
            Other Events You May Like
          </h1>

          <div className='flex flex-col items-center space-y-14 w-full'>
            <div className='w-full grid grid-cols-3 gap-6'>
              {more_request?.data
                ?.filter((event) => event._id !== request.data?._id)
                ?.map((event, index) => {
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
              asChild
            >
              <Link href='/discover'>
                <span>See more events</span>
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
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
