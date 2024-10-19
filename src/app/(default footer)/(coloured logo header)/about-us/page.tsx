import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='w-screen min-h-dvh bg-background text-[hsla(252,_5%,_18%,_1)] space-y-8 lg:pb-16'>
      <section className='w-full max-w-screen-2xl mx-auto xl:pb-12 md:pb-16 pt-28 md:pt-36 xl:pt-44 2xl:pt-56 space-y-8 xl:space-y-16 flex flex-col flex-1'>
        <div className='w-full max-w-5xl mx-auto space-y-3 lg:space-y-6 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0'>
          <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold'>
            <span className='text-primary'>We Are the Missing Ingredient</span>{" "}
            <br className='hidden lg:block' />
            in the Soup of a Hassle-Free Ticketing Experience
          </h1>
          <p className='text-lg md:text-xl xl:text-2xl leading-relaxed'>
            You know how salt is essential in almost all meals? That’s how we
            ensure your ticketing experience is hassle-free. We offer easy
            onboarding, track your ticket sales, and provide a seamless checkout
            system. Our platform connects event organizers and attendees across
            events, meals, spaces, and mobility. Choose Tickets by All-In for a
            convenient and efficient ticketing experience that lets you focus on
            enjoying every moment!
          </p>
        </div>

        <div className='max-w-6xl mx-auto w-full bg-white lg:shadow-xl lg:px-8 xl:px-12 2xl:px-0 lg:rounded-3xl overflow-clip'>
          <Image
            src='/about.png'
            alt=''
            width={807.39}
            height={1049}
            className='w-full aspect-video object-cover'
          />
          <div className='p-12 space-y-16'>
            <div className='space-y-4 text-base lg:text-xl xl:text-2xl'>
              <h1 className='text-4xl 2xl:text-5xl font-bold'>
                Why Tickets by All-In?
              </h1>

              <p>
                We developed Tickets by All-In because we believe businesses and
                users deserve better. Too many obstacles stand between you and
                the experiences you cherish.
              </p>

              <p>
                Long lines, hidden fees, and cumbersome processes can detract
                from the excitement.
              </p>

              <p>
                That&apos;s why we built this platform-to empower businesses
                across various industries to create exceptional experiences.
              </p>
            </div>

            <Button asChild>
              <Link href='#'>Book a demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
