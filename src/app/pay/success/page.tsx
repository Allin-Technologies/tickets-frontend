import Link from "next/link";
// import { notFound } from "next/navigation";
// import { api } from "@/lib/api";
// import { eventSchema } from "@/lib/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { notFound, redirect, RedirectType } from "next/navigation";
import { api } from "@/lib/api";
import { z } from "zod";

const validator = z.object({
  _id: z.string(),
  event_info: z.array(
    z.object({
      price: z.number(),
    })
  ),
});

export default async function Page(props: { searchParams: { id?: string } }) {
  if (!props.searchParams.id) {
    redirect("/discover", RedirectType.replace);
  }

  const request = await api(validator, {
    method: "get",
    url: `/ticket/query/${props.searchParams.id}`,
    headers: {
      next: { revalidate: 3600 },
    },
  });

  if (request.response_code !== 200 || !request.data) {
    notFound();
  }

  return (
    <main className='w-screen lg:min-h-dvh'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0 py-24 space-y-12'>
        <div className='mx-auto max-w-xl w-full'>
          <div className='relative z-[3]'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 lg:p-6 bg-white shadow-md text-primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-14 lg:size-20'
              >
                <path
                  fillRule='evenodd'
                  d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>

          <div className='relative after:absolute after:top-0 after:left-0 after:w-full after:h-1/2 after:bg-white flex lg:min-h-[879.48px] bg-[url(/receipt.png)] bg-contain bg-no-repeat rounded-t-3xl drop-shadow-md bg-bottom overflow-clip'>
            <div className='z-[2] w-full flex-1 flex flex-col space-y-8 px-6 lg:px-9 xl:px-12 pt-24 pb-8'>
              <div className='text-center space-y-2'>
                <h3 className='font-bold text-4xl xl:text-[40px]'>
                  Here’s your ticket!
                </h3>
                <p>Your registration has been successfully done.</p>
              </div>

              <Separator />

              <div className='flex-1 flex flex-col justify-between space-y-12'>
                <div className='text-center'>
                  <p>Total Payment</p>
                  <h3 className='font-bold text-4xl'>
                    ₦
                    {parseFloat(
                      String(
                        request.data.event_info.reduce(
                          (accumulator, ticket) => accumulator + ticket.price,
                          0
                        )
                      )
                    )
                      ?.toFixed(2)
                      ?.toLocaleString()}
                  </h3>
                </div>

                <div className='py-8 border-t border-dashed'>
                  <p className='text-sm text-secondary-foreground text-center'>
                    Please check your mail for your ticket details
                  </p>
                </div>
              </div>
            </div>
          </div>
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
