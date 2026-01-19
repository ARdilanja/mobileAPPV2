
// src/services/livekitToken.service.js

// import { API_BASE } from "../config/api";
import { API_BASE } from '@env';

export async function fetchLiveKitToken({ roomName, identity }) {
    try {
        console.log("🔑 Fetching LiveKit token...");

        const res = await fetch(`${API_BASE}/livekit/token`, {
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

export async function startEgressRecording({ roomName, interviewId }) {
    try {
        console.log("🎬 [MOBILE] Start egress request");

        const res = await fetch(`${API_BASE}/livekit/egress/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName, interviewId }),
        });

        const data = await res.json();
        console.log("📤 [MOBILE] Start egress response:", data);

        if (!data.ok) throw new Error("Start egress failed");

        return data.egressId;
    } catch (err) {
        console.error("❌ [MOBILE] Start egress error:", err);
        throw err;
    }
}

/**
 * STOP EGRESS
 */
export async function stopEgressRecording(egressId) {
    try {
        console.log("🛑 [MOBILE] Stop egress request:", egressId);

        const res = await fetch(`${API_BASE}/livekit/egress/stop`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ egressId }),
        });

        const data = await res.json();
        console.log("📤 [MOBILE] Stop egress response:", data);

        if (!data.ok) throw new Error("Stop egress failed");
    } catch (err) {
        console.error("❌ [MOBILE] Stop egress error:", err);
        throw err;
    }
}
