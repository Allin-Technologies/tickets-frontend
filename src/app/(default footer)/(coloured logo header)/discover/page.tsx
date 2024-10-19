import { z } from "zod";
// import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { Discover } from "./client-side";

const validator = z.array(z.any());

export default async function Page() {
  const request = await api(validator, {
    method: "get",
    url: `/event/getall`,
    headers: {
      next: { revalidate: 3600 },
    },
  });

  // if (request.response_code !== 200) {
  //   notFound();
  // }

  return (
    <main className='w-screen min-h-dvh flex'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 pb-8 pt-24 md:px-6 md:pb-8 lg:px-8 xl:px-12 xl:pb-12 2xl:px-0 md:pt-26 lg:pt-32 xl:pt-36 2xl:pt-40 space-y-8 xl:space-y-16 flex flex-col flex-1'>
        <Discover initailData={request?.data ?? []} />
      </section>
    </main>
  );
}
