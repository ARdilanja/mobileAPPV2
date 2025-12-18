
// src/services/livekitToken.service.js

import { API_BASE } from "../config/api";

export async function fetchLiveKitToken({ roomName, identity }) {
    try {
        console.log("🔑 Fetching LiveKit token...");

        const res = await fetch(`${API_BASE}/api/livekit/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomName, identity }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
            throw new Error(data?.error || "Token API failed");
        }

        return data.token;
    } catch (error) {
        console.error("❌ Token fetch failed:", error);
        throw error;
    }
}

