"use client";

import Image from "next/image";
import Link from "next/link";
import { mobile_links, navLinks } from "../constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";

interface HeaderProps {
  variant: "white" | "coloured";
}

export function Header(props: HeaderProps) {
  return (
    <nav className='z-50 fixed backdrop-blur-sm top-0 left-0 right-0 w-screen px-4 pb-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0 pt-6 md:pt-8 lg:pt-12 xl:pt-14 2xl:pt-16'>
      <div className='w-full max-w-screen-2xl mx-auto flex justify-between items-center'>
        <Link href='/'>
          <Image
            src={
              props.variant === "white"
                ? "/tickets-by-All-In-logo-white.png"
                : "/tickets-by-All-In-logo.png"
            }
            alt='logo'
            width={300}
            height={100}
            quality={100}
            className='h-11 w-auto object-contain object-left'
          />
        </Link>

        <div className='hidden lg:flex item-center gap-5'>
          {navLinks.map((link, index) => (
            <Button
              key={index}
              className={cn(
                link.display === "link"
                  ? "px-2 py-1 min-w-0 text-primary-foreground hover:no-underline"
                  : "ml-8",
                link.display === "button" &&
                  props.variant === "white" &&
                  "text-white border-white bg-transparent",
                link.display !== "button" &&
                  props.variant === "white" &&
                  "text-white"
              )}
              variant={
                link.display === "button" && props.variant === "white"
                  ? "outline"
                  : link.display === "button"
                  ? "default"
                  : "link"
              }
              asChild
            >
              <Link href={link.url ?? "#"}>{link.title}</Link>
            </Button>
          ))}
        </div>

        <div className='lg:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className={cn(
                  "text-primary-foreground",
                  props.variant === "white" && "text-white"
                )}
                variant='link'
                size='icon'
              >
                <TextAlignJustifyIcon className='size-6' />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className='text-left'>Menu</SheetTitle>
              </SheetHeader>

              <div className='flex flex-col items-left space-y-6 pt-10'>
                {mobile_links.map((link, index) => (
                  <SheetClose asChild key={index}>
                    <Link className='text-2xl' href={link.url ?? "#"}>
                      {link.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
