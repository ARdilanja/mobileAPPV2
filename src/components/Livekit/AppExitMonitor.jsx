import { useEffect } from "react";
import { AppState, BackHandler } from "react-native";

/* Monitors app exit, background, and back press */

export default function AppExitMonitor({ onTerminate }) {
    useEffect(() => {
        const appStateSub = AppState.addEventListener("change", (state) => {
            if (state !== "active") {
                console.log("⚠️ [MOBILE] App backgrounded");
                onTerminate("APP_BACKGROUND");
            }
        });

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                console.log("⚠️ [MOBILE] Back pressed");
                onTerminate("BACK_PRESS");
                return true;
            }
        );

        return () => {
            appStateSub.remove();
            backHandler.remove();
        };
    }, []);

    return null;
}
