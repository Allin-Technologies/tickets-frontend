import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { eventSchema } from "@/lib/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function Page(props: { params: { id: string } }) {
  // const request = await api(eventSchema, {
  //   method: "get",
  //   url: `/event/${props.params.id}`,
  // });

  // if (request.response_code !== 200 || !request.data) {
  //   notFound();
  // }

  // console.log(request.data);

  return (
    <main className='w-screen min-h-dvh'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:p-8 xl:px-12 2xl:px-0 2xl:py-16 space-y-16'>
        <div className='mx-auto max-w-xl w-full bg-white p-12 rounded-3xl shadow-sm space-y-8'>
          <div className='text-center space-y-2'>
            <h3 className='font-bold text-4xl'>Your ticket is ready!</h3>
            <p>Your registration has been successfully done.</p>
          </div>

          <Separator />

          <div className='text-center'>
            <p>Total Payment</p>
            <h3 className='font-bold text-2xl'>₦0.00</h3>
          </div>

          <p className='text-center'>
            Please check your mail for your ticket details
          </p>
        </div>

        <div className='flex justify-center items-center'>
          <Button asChild>
            <Link href={`/discover`}>Return to Events</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
