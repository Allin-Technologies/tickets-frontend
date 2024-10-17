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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { contact } from "../../../../actions/contact";

const formSchema = z.object({
  fullname: z.string().min(2, { message: "Your name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  reason: z.string().min(1, { message: "Required" }),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await contact({
        email: values.email,
        html: `
          <html>
          <body>
          <h2>New Contact Form Submission</h2>
          <ul>
            <li>Fullname: ${values.fullname}</li>
            <li>Email: ${values.email}</li>
          </ul>
          <h3>Reason for Contact:</h3>
          <p>${values.reason}</p>
          <h3>Message:</h3>
          <p>${values.message}</p>
          </body>
          </html>
        `,
      });

      if (res.status === true) {
        toast.success("Thank you for your message!", {
          closeButton: true,
        });

        form.reset();
      } else {
        toast.error("Oops! Something went wrong", {
          description: "Please try again later",
          closeButton: true,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Oops! Something went wrong", {
        description: "Please try again",
        closeButton: true,
      });
    }
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
            name='reason'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-[hsla(0,_0%,_13%,_0.7)] group-focus-within:text-[hsla(257,_59%,_78%,_1)] transition ease-linear duration-200'>
                  Reason to contact
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      variant='underline'
                      size='underline'
                      className='rounded-none w-full pb-2'
                    >
                      <SelectValue placeholder='' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Need ticketsbyallin for an event'>
                      Need ticketsbyallin for an event
                    </SelectItem>
                    <SelectItem value='Need ticketsbyallin for facility management'>
                      Need ticketsbyallin for facility management
                    </SelectItem>
                    <SelectItem value='need ticket by allin for mobility'>
                      need ticket by allin for mobility
                    </SelectItem>
                    <SelectItem value='need ticket by allin for Meals'>
                      need ticket by allin for Meals
                    </SelectItem>
                    <SelectItem value='A complaint or dispute'>
                      A complaint or dispute
                    </SelectItem>
                    <SelectItem value='A review'>A review</SelectItem>
                  </SelectContent>
                </Select>
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
        <Button
          className='font-bold w-full space-x-3'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          <span>Submit</span>
          {form.formState.isSubmitting && (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='inline size-4 text-white/50 animate-spin fill-white'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
