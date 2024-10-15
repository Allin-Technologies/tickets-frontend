import Image from "next/image";
import bg from "../../../public/hero-bg.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className='w-screen h-dvh'>
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

        <div className='z-[2] p-4 md:p-6 lg:p-8 xl:p-12 2xl:px-0 max-w-[970px] mx-auto text-white text-center space-y-10'>
          <h1 className='text-8xl font-bold'>Ticket  experience made easy </h1>
          <p className='text-2xl'>for Meals, Events, Mobility & Spaces</p>

          <Button asChild>
            <Link href='#'>Get Started</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
