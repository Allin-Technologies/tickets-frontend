import Image from "next/image";
import Link from "next/link";
import { footer } from "../constants";
import { ContactForm } from "./form";

export function Footer() {
  return (
    <footer>
      <div className='relative after:absolute after:left-0 after:top-0 after:bottom-0 after:h-full after:w-1/2 after:z-[1] after:bg-primary/20 before:absolute before:right-0 before:top-0 before:bottom-0 before:h-full before:w-1/2 before:z-[1] before:bg-secondary/10'>
        <div className='w-full max-w-screen-2xl mx-auto gap-6 py-8 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0 grid grid-cols-2'>
          <div className='z-[2] space-y-10 pt-16 pb-8'>
            <div className='text-2xl space-y-4'>
              <h3 className='font-bold'>Contact us</h3>
              <p className='text-secondary-foreground'>
                Have an inquiry? We’ll be happy to assist you
              </p>
            </div>

            <div className='space-y-6'>
              {footer.contacts.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.url ?? "#"}
                  className='hover:opacity-80 transition-opacity ease-linear duration-200 flex items-center space-x-3.5 font-bold'
                >
                  <Image
                    className='size-6'
                    src={contact.icon}
                    alt=''
                    width={60}
                    height={60}
                  />

                  <span>{contact.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className='z-[2] pt-16 pb-8 px-16 w-full'>
            <div className='text-2xl space-y-4 w-full'>
              <h3 className='font-bold'>Fill in your details</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary-foreground'>
        <div className='grid w-full max-w-screen-2xl mx-auto gap-6 py-8 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0'>
          <div>
            <Image
              src='/tickets-by-All-In-icon-logo-white.png'
              alt='Icon logo'
              width={40}
              height={52}
            />
          </div>
          <div className='text-white grid grid-cols-2'>
            <div className='flex item-center gap-5 my-auto'>
              {footer.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url ?? "#"}
                  className='font-medium text-sm'
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className='flex justify-center item-center gap-5'>
              {footer.socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.url ?? "#"}
                  className='hover:opacity-80 size-8 transition-opacity ease-linear duration-200'
                >
                  <Image src={social.icon} alt='' width={60} height={60} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
