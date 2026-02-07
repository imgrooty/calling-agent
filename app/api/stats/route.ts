import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        const response = await fetch(`${API_BASE_URL}/api/v1/org-stats`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Accept": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            // Prevent caching for real-time stats
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend Error Details:", errorText);
            return NextResponse.json(
                { message: `Backend error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Proxy Error:", error);
        return NextResponse.json(
            { message: "Failed to connect to backend server." },
            { status: 500 }
        );
    }
}
