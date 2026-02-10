import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Create Leads API (/api/leads/create) hit with body:", JSON.stringify(body, null, 2));

        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        const url = `${API_BASE_URL}/api/v1/leads`;
        console.log("Posting to backend URL:", url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend Create Leads Error:", errorText);
            return NextResponse.json(
                { message: `Backend error: ${response.statusText}`, details: errorText },
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
