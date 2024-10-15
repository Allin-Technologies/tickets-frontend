import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { eventSchema } from "@/lib/zod";
import { Checkout } from "./checkout";

export default async function Page(props: { params: { id: string } }) {
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

  return (
    <main className='w-screen lg:min-h-dvh'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0 py-8 lg:py-12 2xl:py-16 space-y-8 2xl:space-y-16'>
        <div>
          <Link
            className='flex items-center gap-2 font-semibold text-[hsla(218,_15%,_59%,_1)]'
            href={`/discover/${props.params.id}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3}
              stroke='currentColor'
              className='size-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>

            <span className='leading-none'>Back</span>
          </Link>
        </div>

        <Checkout {...request.data} />
      </section>
    </main>
  );
}
