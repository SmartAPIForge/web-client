import type { APIRoute } from "astro";
import {CONSTS} from "@/consts.ts";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const response = await fetch(`${CONSTS.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  if (response && response.ok) {
    return new Response("User registered successfully", { status: 200 });
  }
  return new Response("User registration failed", { status: 400 });
};
