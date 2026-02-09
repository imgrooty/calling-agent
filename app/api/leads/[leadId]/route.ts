import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ leadId: string }> }
) {
    try {
        const { leadId } = await params;
        console.log("Lead Details API (/api/leads/[leadId]) hit for id:", leadId);

        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        const [detailsRes, leadRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/v1/details/${leadId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Accept": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
                cache: 'no-store'
            }),
            fetch(`${API_BASE_URL}/api/v1/leads/${leadId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Accept": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
                cache: 'no-store'
            })
        ]);

        if (!detailsRes.ok) {
            const errorText = await detailsRes.text();
            return NextResponse.json({ message: `Backend details error: ${detailsRes.statusText}` }, { status: detailsRes.status });
        }

        const detailsData = await detailsRes.json();
        let leadData = null;

        if (leadRes.ok) {
            const leadJson = await leadRes.json();
            leadData = leadJson.data || leadJson; // Support both {data: lead} and {lead}
        }

        return NextResponse.json({
            ...detailsData,
            lead: leadData
        });
    } catch (error: any) {
        console.error("Proxy Error:", error);
        return NextResponse.json(
            { message: "Failed to connect to backend server." },
            { status: 500 }
        );
    }
}
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ leadId: string }> }
) {
    try {
        const { leadId } = await params;
        const body = await request.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        const url = `${API_BASE_URL}/api/v1/leads/${leadId}`;
        console.log("Updating lead via backend URL:", url);

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { message: `Backend error: ${response.statusText}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Proxy PUT Error:", error);
        return NextResponse.json({ message: "Failed to update lead." }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ leadId: string }> }
) {
    try {
        const { leadId } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        const url = `${API_BASE_URL}/api/v1/leads/${leadId}`;
        console.log("Deleting lead via backend URL:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: `Backend error: ${response.statusText}` },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, message: "Lead deleted successfully" });
    } catch (error: any) {
        console.error("Proxy DELETE Error:", error);
        return NextResponse.json({ message: "Failed to delete lead." }, { status: 500 });
    }
}
