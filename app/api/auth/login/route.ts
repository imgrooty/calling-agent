import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

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

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({ email, password }),
        });

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
        let token = data.access_token || data.token; // Handle standard OAuth2 or custom token key

        if (!token) {
            console.error("No token in response:", data);
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

        return NextResponse.json({ success: true, user: data.user || {} });

    } catch (error: any) {
        console.error("Login Route Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
