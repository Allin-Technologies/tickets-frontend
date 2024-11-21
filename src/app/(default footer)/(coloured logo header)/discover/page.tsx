import { getAllEvents } from "@/actions/events/get";
import { Discover } from "./client-side";

export default async function Page() {
  const initailData = await getAllEvents();
  return (
    <main className='w-screen min-h-dvh flex'>
      <section className='w-full max-w-screen-2xl mx-auto px-4 pb-8 pt-24 md:px-6 md:pb-8 lg:px-8 xl:px-12 xl:pb-12 2xl:px-0 md:pt-26 lg:pt-32 xl:pt-36 2xl:pt-40 space-y-8 xl:space-y-16 flex flex-col flex-1'>
        <Discover initailData={initailData} />
      </section>
    </main>
  );
}
