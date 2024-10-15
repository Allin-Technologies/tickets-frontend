"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullname: z.string().min(2, { message: "Your name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  reason: z.string().min(10, { message: "Required" }),
  message: z.string().min(10, { message: "Message is required" }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      reason: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-20 w-full'
      >
        <div className='space-y-8'>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem className='space-y-0 group'>
                <FormLabel className='font-bold text-[hsla(0,_0%,_13%,_0.7)] group-focus-within:text-[hsla(257,_59%,_78%,_1)] transition ease-linear duration-200'>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Joseph Adu'
                    variant='underline'
                    size='underline'
                    className='w-full'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-0 group'>
                <FormLabel className='font-bold text-[hsla(0,_0%,_13%,_0.7)] group-focus-within:text-[hsla(257,_59%,_78%,_1)] transition ease-linear duration-200'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='joseph.adu@mail.co'
                    variant='underline'
                    size='underline'
                    className='w-full'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='space-y-0 group'>
                <FormLabel className='font-bold text-[hsla(0,_0%,_13%,_0.7)] group-focus-within:text-[hsla(257,_59%,_78%,_1)] transition ease-linear duration-200'>
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hi there, I'd like to..."
                    variant='underline'
                    size='underline'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='font-bold w-full' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
