import type { APIRoute } from "astro";
import { CONSTS } from "@/consts.ts";

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const response = await fetch(`${CONSTS.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response && response.ok) {
    const { accessToken, refreshToken } = await response.json();
    cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return new Response(
      JSON.stringify({
        token: accessToken,
      }),
    );
  }
  return new Response("User login failed", { status: 400 });
};
