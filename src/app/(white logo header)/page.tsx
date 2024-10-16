"use client";

import Image from "next/image";
import bg from "../../../public/hero-bg.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { features, partners } from "./constant";

export default function Home() {
  return (
    <main className='w-screen min-h-dvh bg-background text-[hsla(252,_5%,_18%,_1)]'>
      <section className='relative w-full min-h-dvh flex justify-center items-center'>
        <Image
          src={bg}
          alt=''
          placeholder='blur'
          quality={100}
          fill
          sizes='100vw'
          style={{
            objectFit: "cover",
          }}
          className='z-[1]'
        />

        <div className='absolute top-0 left-0 right-0 bottom-0 z-[2] bg-gradient-to-b from-[hsla(248,_76%,_49%,_1)] to-[40%] to-black/20'></div>

        <div className='z-[3] p-4 md:p-6 lg:p-8 xl:p-12 2xl:px-0 max-w-[970px] mx-auto text-white text-center space-y-4 2xl:space-y-10'>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold'>
            Ticket  experience made easy{" "}
          </h1>
          <div className='space-y-3 2xl:space-y-6'>
            <p className='lg:text-lg xl:text-xl 2xl:text-2xl'>
              for Meals, Events, Mobility & Spaces
            </p>

            <Button asChild>
              <Link href='/discover'>Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className='p-12'></div>

      <section className='w-full px-4 py-16 md:px-6 lg:px-16 xl:px-20 space-y-7 xl:space-y-12'>
        <div className='max-w-screen-2xl mx-auto w-full space-y-4'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold'>
            <span className='text-primary'>Explore</span> our features
          </h1>
          <p className='lg:text-lg xl:text-xl 2xl:text-2xl'>
            Find events and make memories that last a lifetime. Your passport to
            unforgettable experiences
          </p>
        </div>
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            AutoPlay({
              playOnInit: true,
              stopOnInteraction: false,
              delay: 5000,
            }),
          ]}
          className='w-full'
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className='basis-full md:basis-[33%] 2xl:basis-[23%]'
              >
                <div className='p-1'>
                  <div className='p-10 bg-secondary/10 rounded-2xl group'>
                    <div className='flex flex-col aspect-square items-start justify-end gap-8'>
                      {feature.icon}

                      <div className='space-y-4'>
                        <p className='text-2xl font-extrabold'>
                          {feature.title}
                        </p>
                        <p className='text-secondary-foreground'>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className='w-full px-4 py-16 md:px-6 lg:px-16 xl:px-20 space-y-7 xl:space-y-12'>
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[
            AutoScroll({
              playOnInit: true,
              stopOnInteraction: false,
            }),
          ]}
          className='w-full'
        >
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem key={index} className='basis-[33%]'>
                <div className='p-1'>
                  <div className=''>
                    <div className='flex items-center justify-center'>
                      <Image
                        src={partner}
                        alt='icon'
                        width={500}
                        height={140}
                        className='w-64 object-contain'
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className='w-full'>
        <div className='w-full overflow-clip px-4 py-16 md:px-6 lg:px-16 xl:px-20 space-y-7 xl:space-y-12'>
          <div className='max-w-screen-2xl mx-auto w-full'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-center'>
              <span className='text-primary'>Real people,</span>{" "}
              <br className='sm:hidden' /> Real reviews
            </h1>
          </div>

          <Carousel
            opts={{
              loop: true,
              align: "center",
            }}
            plugins={[
              AutoPlay({
                playOnInit: true,
                stopOnInteraction: false,
                delay: 5000,
              }),
            ]}
            className='w-full'
          >
            <CarouselContent containerClassName='overflow-visible'>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='basis-full lg:basis-[66%] xl:basis-[50%]'
                >
                  <div className='p-1'>
                    <div className='p-10 bg-secondary/10 space-y-3'>
                      <div className='flex flex-col items-center justify-center lg:p-6 space-y-3'>
                        <svg
                          viewBox='0 0 30 30'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='size-7 self-start'
                        >
                          <g clip-path='url(#clip0_5_23)'>
                            <path
                              d='M5.72875 21.6513C4.44125 20.2838 3.75 18.7501 3.75 16.2638C3.75 11.8888 6.82125 7.96756 11.2875 6.02881L12.4038 7.75131C8.235 10.0063 7.42 12.9326 7.095 14.7776C7.76625 14.4301 8.645 14.3088 9.50625 14.3888C11.7613 14.5976 13.5388 16.4488 13.5388 18.7501C13.5388 19.9104 13.0778 21.0232 12.2573 21.8437C11.4369 22.6641 10.3241 23.1251 9.16375 23.1251C7.8225 23.1251 6.54 22.5126 5.72875 21.6513ZM18.2288 21.6513C16.9412 20.2838 16.25 18.7501 16.25 16.2638C16.25 11.8888 19.3213 7.96756 23.7875 6.02881L24.9038 7.75131C20.735 10.0063 19.92 12.9326 19.595 14.7776C20.2662 14.4301 21.145 14.3088 22.0062 14.3888C24.2612 14.5976 26.0387 16.4488 26.0387 18.7501C26.0387 19.9104 25.5778 21.0232 24.7573 21.8437C23.9369 22.6641 22.8241 23.1251 21.6637 23.1251C20.3225 23.1251 19.04 22.5126 18.2288 21.6513Z'
                              fill='#381DDB'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_5_23'>
                              <rect width='30' height='30' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>

                        <p className='text-center max-w-[90%] mx-auto'>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry&apos;s standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type
                          and scrambled it to make a type specimen book.
                        </p>

                        <svg
                          viewBox='0 0 30 30'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='size-7 rotate-180 self-end'
                        >
                          <g clip-path='url(#clip0_5_23)'>
                            <path
                              d='M5.72875 21.6513C4.44125 20.2838 3.75 18.7501 3.75 16.2638C3.75 11.8888 6.82125 7.96756 11.2875 6.02881L12.4038 7.75131C8.235 10.0063 7.42 12.9326 7.095 14.7776C7.76625 14.4301 8.645 14.3088 9.50625 14.3888C11.7613 14.5976 13.5388 16.4488 13.5388 18.7501C13.5388 19.9104 13.0778 21.0232 12.2573 21.8437C11.4369 22.6641 10.3241 23.1251 9.16375 23.1251C7.8225 23.1251 6.54 22.5126 5.72875 21.6513ZM18.2288 21.6513C16.9412 20.2838 16.25 18.7501 16.25 16.2638C16.25 11.8888 19.3213 7.96756 23.7875 6.02881L24.9038 7.75131C20.735 10.0063 19.92 12.9326 19.595 14.7776C20.2662 14.4301 21.145 14.3088 22.0062 14.3888C24.2612 14.5976 26.0387 16.4488 26.0387 18.7501C26.0387 19.9104 25.5778 21.0232 24.7573 21.8437C23.9369 22.6641 22.8241 23.1251 21.6637 23.1251C20.3225 23.1251 19.04 22.5126 18.2288 21.6513Z'
                              fill='#381DDB'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_5_23'>
                              <rect width='30' height='30' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      <div className='flex items-center space-x-3'>
                        <Image
                          src='/demo-person.jpeg'
                          alt='demo-person'
                          width={240}
                          height={240}
                          className='size-12 aspect-square rounded-full object-cover'
                        />

                        <p className='font-bold'>Precious Micah</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </main>
  );
}
