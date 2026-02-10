import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies, headers } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        console.log("Refresh API /api/auth/refresh hit. Token found in cookie:", !!token);

        if (!token) {
            console.warn("Refresh failed: No auth_token cookie present");
            return NextResponse.json(
                { message: "No active session" },
                { status: 401 }
            );
        }

        const backendUrl = `${API_BASE_URL}/api/v1/auth/refresh`;
        console.log("Attempting token refresh to:", backendUrl);

        const nextHeaders = await headers();
        const cookieHeader = nextHeaders.get("cookie") || "";

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(cookieHeader ? { "Cookie": cookieHeader } : {}),
            },
        });

        console.log("[Refresh Route] Backend status:", response.status);
        console.log("[Refresh Route] Backend headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

        if (!response.ok) {
            console.error("Refresh failed with status:", response.status);
            // If refresh fails, we might want to clear the cookie
            cookieStore.delete("auth_token");
            cookieStore.delete("refresh_token");
            return NextResponse.json(
                { message: "Session expired" },
                { status: 401 }
            );
        }

        const data = await response.json();
        let newToken = data.access_token || data.token;

        // Check headers if not in body
        if (!newToken) {
            const setCookie = response.headers.get("set-cookie");
            if (setCookie) {
                const match = setCookie.match(/(?:access_token|token|auth_token)=([^;]+)/i);
                if (match) newToken = match[1];
            }
        }

        if (!newToken) {
            throw new Error("No token received after refresh");
        }

        // Update the cookie
        cookieStore.set("auth_token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        // Update refresh token if shifted
        const refreshTokenMatch = response.headers.get("set-cookie")?.match(/refresh_token=([^;]+)/i);
        if (refreshTokenMatch) {
            cookieStore.set("refresh_token", refreshTokenMatch[1], {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/",
            });
        }

        return NextResponse.json({ success: true, message: "Token refreshed" });

    } catch (error: any) {
        console.error("Refresh Route Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
