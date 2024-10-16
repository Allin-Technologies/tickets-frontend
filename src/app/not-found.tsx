import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className='w-screen min-h-dvh'>
      <section className='w-full min-h-dvh max-w-screen-2xl mx-auto px-4 pb-8 pt-24 md:px-6 md:pb-8 lg:px-8 xl:px-12 xl:pb-12 2xl:px-0 md:pt-26 lg:pt-32 xl:pt-36 2xl:pt-40 space-y-16 flex flex-col justify-center items-center'>
        <Image
          src='/not-found.png'
          alt=''
          width={800}
          height={300}
          className='max-w-2xl w-full mx-auto'
        />

        <div className='flex flex-col items-center text-center space-y-6 lg:space-y-8'>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold'>
            Oops!
          </h1>

          <div className='space-y-3 lg:space-y-5'>
            <p className='text-lg xl:text-2xl 2xl:text-3xl'>
              This page will be coming soon.
            </p>

            <Button asChild>
              <Link href='/'>Go back homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
