import { notFound } from "next/navigation";
import { api } from "../../../lib/api";
import { Discover } from "./client-side";
import { z } from "zod";

const validator = z.array(z.any());

export default async function Page() {
  const request = await api(validator, { method: "get", url: `/event/getall` });

  if (request.response_code !== 200) {
    notFound();
  }

  return (
    <main className='w-screen min-h-dvh'>
      <section className='w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8 xl:p-12 2xl:px-0 2xl:pt-40 space-y-16'>
        <Discover initailData={request.data ?? []} />
      </section>
    </main>
  );
}
