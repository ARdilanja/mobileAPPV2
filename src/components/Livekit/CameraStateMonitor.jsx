import { useEffect, useRef } from "react";
import { useTracks } from "@livekit/react-native";
import { Track } from "livekit-client";

/**
 * CameraStateMonitor (STABLE VERSION)
 * - Ignores initial LiveKit camera renegotiation
 * - Terminates ONLY if user manually turns off camera
 */
export default function CameraStateMonitor({
    onTerminate,
    enabled = true,
}) {
    const tracks = useTracks([Track.Source.Camera]);

    const hasEverHadCameraRef = useRef(false);
    const offTimerRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;

        // ✅ Camera exists
        if (tracks.length > 0) {
            hasEverHadCameraRef.current = true;

            // clear any pending terminate timer
            if (offTimerRef.current) {
                clearTimeout(offTimerRef.current);
                offTimerRef.current = null;
            }
            return;
        }

        // 🚫 No camera track
        // Ignore if camera was never ready
        if (!hasEverHadCameraRef.current) {
            return;
        }

        // ⏳ Debounce camera off (user action)
        if (!offTimerRef.current) {
            offTimerRef.current = setTimeout(() => {
                console.log("❌ [MOBILE] Camera turned off by user");
                onTerminate("CAMERA_OFF");
            }, 3000); // 3 seconds continuous OFF
        }

        return () => {
            if (offTimerRef.current) {
                clearTimeout(offTimerRef.current);
                offTimerRef.current = null;
            }
        };
    }, [tracks, enabled]);

    return null;
}
