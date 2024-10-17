import Image from "next/image";
import Link from "next/link";
import { footer } from "../constants";
import { ContactForm } from "./form";

export function Footer() {
  return (
    <footer>
      <div className='relative lg:after:absolute lg:after:left-0 lg:after:top-0 lg:after:bottom-0 lg:after:h-full lg:after:w-1/2 lg:after:z-[1] lg:after:bg-primary/20 lg:before:absolute lg:before:right-0 lg:before:top-0 lg:before:bottom-0 lg:before:h-full lg:before:w-1/2 lg:before:z-[1] lg:before:bg-secondary/10'>
        <div className='w-full max-w-screen-2xl mx-auto lg:gap-6 lg:px-8 xl:px-12 2xl:px-0 flex flex-col-reverse lg:grid grid-cols-2'>
          <div className='z-[2] space-y-10 p-8 pt-16 lg:px-0 w-full bg-primary/20 lg:bg-transparent'>
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
          <div
            id='contact'
            className='z-[2] pt-16 p-8 pb-8 lg:px-16 w-full bg-secondary/10 lg:bg-transparent'
          >
            <div className='text-2xl space-y-4 w-full'>
              <h3 className='font-bold'>Fill in your details</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary-foreground'>
        <div className='grid w-full max-w-screen-2xl mx-auto gap-6 p-8 xl:px-12 2xl:px-0'>
          <div>
            <Image
              src='/tickets-by-All-In-icon-logo-white.png'
              alt='Icon logo'
              width={40}
              height={52}
              className='size-6'
            />
          </div>
          <div className='text-white grid lg:grid-cols-2 gap-8'>
            <div className='flex item-center flex-wrap gap-x-5 gap-y-2 my-auto'>
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
