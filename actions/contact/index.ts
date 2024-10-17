"use server";

import { api } from "@/lib/api";
import { z } from "zod";

const validator = z.object({}).optional();

export async function contact(data: { email: string; html: string }) {
  try {
    const response = await api(validator, {
      url: "/ticket/contactus",
      method: "post",
      data,
    });

    return {
      status: true,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error creating ticket:", error);
    return {
      status: false,
      message: "Error",
      data: null,
    };
  }
}
