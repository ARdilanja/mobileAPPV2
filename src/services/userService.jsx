import { API_BASE } from "../config/api";

/* ================= GET PROFILE ================= */
export const getUserProfile = async (token) => {
    console.log("📥 [SERVICE] Fetching profile");

    const res = await fetch(`${API_BASE}/user/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    console.log("✅ [SERVICE] Profile response:", data);
    return data;
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (payload, token) => {
    console.log("📤 [SERVICE] Updating profile:", payload);

    const res = await fetch(`${API_BASE}/user/update-profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    return res.json();
};

/* ================= SAVE IMAGE URL ================= */
export const updateProfileImageUrl = async (photoUrl, token) => {
    console.log("📤 [SERVICE] Saving image URL to backend:", photoUrl);

    const res = await fetch(`${API_BASE}/user/update-profile-image`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ photoUrl }),
    });

    const data = await res.json();
    console.log("✅ [SERVICE] Image URL saved:", data);
    return data;
};
