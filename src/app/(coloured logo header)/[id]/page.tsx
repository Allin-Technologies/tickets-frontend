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
import { Metadata } from "next";

const validator = z.array(z.any());

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const request = await api(eventSchema, {
    method: "get",
    url: `/event/${props.params.id}`,
    headers: {
      next: { revalidate: 3600 },
    },
  });

  return {
    title: request?.data?.title,
    description: request?.data?.about,
    openGraph: {
      title: request?.data?.title,
      description: request?.data?.about,
      url: `https://www.ticketsbyallin.com/${request?.data?.slug}`,
      images: request?.data?.imgsrc
        ? [
            {
              url: request?.data?.imgsrc,
              width: 800,
              height: 600,
            },
          ]
        : undefined,
      type: "website",
    },
  };
}

export default async function Page(props: Props) {
  const request = await api(eventSchema, {
    method: "get",
    url: `/event/${props.params.id}`,
    headers: {
      next: { revalidate: 3600 },
    },
  });

  if (request.response_code !== 200 || !request.data) {
    notFound();
  }

  const more_request = await api(validator, {
    method: "get",
    url: `/event/getall`,
    headers: {
      next: { revalidate: 3600 },
    },
  });

  if (request.response_code !== 200) {
    notFound();
  }

  return (
    <main className='w-screen min-h-dvh'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 pb-8 pt-36 md:px-6 md:pb-8 lg:px-8 xl:px-12 xl:pb-12 2xl:px-0 md:pt-40 lg:pt-44 xl:pt-48 space-y-12 xl:space-y-16 2xl:space-y-24'>
        <div className='lg:grid grid-cols-2 gap-4 space-y-6 lg:space-y-0'>
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

            <Button className='hidden lg:block w-full sm:w-fit' asChild>
              <Link href={`/pay/${props.params.id}`}>Get Ticket now</Link>
            </Button>
          </div>
          <div className='space-y-12'>
            <div className='text-dark-blue space-y-3 lg:space-y-6'>
              <h2 className='text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-normal'>
                {request.data.title}
              </h2>

              {request.data?.date && (
                <div className='flex space-x-3 items-center'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-6'
                  >
                    <path
                      d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M9.5 9.5L13 13M16 8L11 13'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                  <p>{formatEventDate(request.data?.date)}</p>
                </div>
              )}

              {request.data?.time && (
                <div className='flex space-x-3 items-center'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-6'
                  >
                    <path
                      d='M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M7 4V2.5M17 4V2.5M2.5 9H21.5'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                    <path
                      d='M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z'
                      fill='black'
                    />
                  </svg>

                  <p>
                    {getEventTimeRange(
                      request.data?.time,
                      request.data?.duration
                    )}
                  </p>
                </div>
              )}

              <div className='flex space-x-3 items-center hover:text-dark-blue/60 transition ease-linear duration-200 cursor-pointer'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-6'
                >
                  <path
                    d='M13.06 20.82C12.8968 20.9372 12.701 21.0003 12.5 21.0003C12.2991 21.0003 12.1032 20.9372 11.94 20.82C7.11102 17.378 1.98602 10.298 7.16702 5.182C8.58937 3.78285 10.5049 2.99912 12.5 3C14.5 3 16.419 3.785 17.833 5.181C23.014 10.297 17.889 17.376 13.06 20.82Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12.5 12C13.0304 12 13.5391 11.7893 13.9142 11.4142C14.2893 11.0391 14.5 10.5304 14.5 10C14.5 9.46957 14.2893 8.96086 13.9142 8.58579C13.5391 8.21071 13.0304 8 12.5 8C11.9696 8 11.4609 8.21071 11.0858 8.58579C10.7107 8.96086 10.5 9.46957 10.5 10C10.5 10.5304 10.7107 11.0391 11.0858 11.4142C11.4609 11.7893 11.9696 12 12.5 12Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <p>
                  <Link href={request.data?.location_url ?? "#"}>
                    {request.data?.location}
                  </Link>
                </p>
              </div>
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

          <Button className='lg:hidden w-full sm:w-auto' asChild>
            <Link href={`/pay/${props.params.id}`}>Get Ticket now</Link>
          </Button>
        </div>

        <div className='space-y-4 xl:space-y-8'>
          <h1 className='text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-normal'>
            Other Events You May Like
          </h1>

          <div className='flex flex-col items-center space-y-14 w-full'>
            <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
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
