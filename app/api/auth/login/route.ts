import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies, headers } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const backendUrl = `${API_BASE_URL}/api/v1/auth/login`;
        console.log("Attempting login to:", backendUrl);

        const nextHeaders = await headers();
        const cookieHeader = nextHeaders.get("cookie") || "";

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(cookieHeader ? { "Cookie": cookieHeader } : {}),
            },
            body: JSON.stringify({ email, password }),
        });

        console.log("[Login Route] Backend status:", response.status);
        console.log("[Login Route] Backend headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend Login Error:", errorText);

            // Try to parse error message if JSON
            let errorMessage = "Login failed";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.detail || errorJson.message || "Login failed";
            } catch (e) {
                // If text is short enough use it, otherwise generic
                if (errorText.length < 100) errorMessage = errorText;
            }

            return NextResponse.json(
                { message: errorMessage },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log("Backend response data keys:", Object.keys(data));
        let token = data.access_token || data.token; // Handle standard OAuth2 or custom token key

        // If token not in body, check headers (some backends set it in cookies)
        if (!token) {
            const setCookie = response.headers.get("set-cookie");
            console.log("Checking Set-Cookie header for token. Header present:", !!setCookie);
            if (setCookie) {
                console.log("Raw Set-Cookie header:", setCookie);
                // Try to find access_token, token, or auth_token in the set-cookie header
                const match = setCookie.match(/(?:access_token|token|auth_token)=([^;]+)/i);
                if (match) {
                    token = match[1];
                    console.log("Token extracted from Set-Cookie header successfully");
                }
            }
        }

        if (!token) {
            console.error("No token in response body or headers:", data);
            return NextResponse.json(
                { message: "Server error: No token received" },
                { status: 500 }
            );
        }

        console.log("Token received from backend (first 20 chars):", token.substring(0, 20));

        // Remove 'Bearer ' prefix if present in the token value itself to avoid double prefixing later
        if (token.startsWith("Bearer ")) {
            console.log("Stripping 'Bearer ' prefix from token value");
            token = token.replace("Bearer ", "");
        }

        // Set HttpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        // Also handle refresh token if present
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

        return NextResponse.json({ success: true, user: data.user || {} });

    } catch (error: any) {
        console.error("Login Route Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
