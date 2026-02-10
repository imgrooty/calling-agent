import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        // Optionally notify backend
        if (token) {
            try {
                await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            } catch (backendError) {
                console.warn("Backend logout failed or endpoint missing:", backendError);
                // We still want to clear the local cookie even if backend call fails
            }
        }

        // Clear the auth_token cookie
        cookieStore.delete("auth_token");

        return NextResponse.json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
        console.error("Logout Route Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
