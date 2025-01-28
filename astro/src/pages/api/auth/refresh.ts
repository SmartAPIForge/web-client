import type { APIRoute } from "astro";
import { CONSTS } from "@/consts.ts";

export const POST: APIRoute = async ({ request, cookies }) => {
    const response = await fetch(`${CONSTS.API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refreshToken: cookies.get("refreshToken")
        }),
    });
    if (response && response.ok) {
        const { accessToken, refreshToken } = await response.json();
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

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
