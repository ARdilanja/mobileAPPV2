// import axios from 'axios';
// import { API_BASE } from '../config/api';



// export const getUserProfile = async (token) => {
//     const res = await axios.get(`${API_BASE}/user/profile`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.data.user;
// };

// export const uploadProfileImage = async (userId, image, token) => {
//     const formData = new FormData();

//     formData.append('file', {
//         uri: image,
//         type: 'image/jpeg',
//         name: 'profile.jpg',
//     });

//     const res = await axios.post(
//         `${API_BASE}/user/upload-profile/${userId}`,
//         formData,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         }
//     );

//     return res.data;
// };





// import axios from 'axios';
// import { Platform } from 'react-native';
// import { API_BASE } from '../config/api';

// // ================= GET USER PROFILE =================
// export const getUserProfile = async (token) => {
//     const res = await axios.get(`${API_BASE}/user/profile`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.data.user;
// };

// // ================= UPDATE USER INFO =================
// export const updateUserInfo = async (data, token) => {
//     const res = await axios.put(`${API_BASE}/user/update-profile`, data, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.data;
// };

// // ================= UPLOAD PROFILE IMAGE =================
// export const uploadProfileImage = async (imageUri, token) => {
//     try {
//         console.log('📤 [SERVICE] Preparing image upload');

//         const formData = new FormData();

//         // Normalize URI
//         const uri =
//             Platform.OS === 'android'
//                 ? imageUri
//                 : imageUri.replace('file://', '');

//         const fileName = uri.split('/').pop() || 'profile.jpg';

//         formData.append('file', {
//             uri,
//             name: fileName,
//             type: 'image/jpeg',
//         });

//         console.log('📡 [SERVICE] Sending request to backend...');

//         const response = await fetch(`${API_BASE}/user/upload-profile-image`, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: 'application/json',
//                 // ❌ Do NOT set Content-Type
//             },
//         });

//         const contentType = response.headers.get('content-type');

//         if (!contentType || !contentType.includes('application/json')) {
//             const text = await response.text();
//             console.error('🔥 [SERVICE] Non-JSON response:', text);
//             throw new Error('Server error (non-JSON response)');
//         }

//         const result = await response.json();
//         console.log('✅ [SERVICE] Upload success:', result);

//         return result;
//     } catch (error) {
//         console.error('🔥 [SERVICE] Upload failed:', error);
//         throw error;
//     }
// };


import { API_BASE } from "../config/api";

/* ================= GET USER PROFILE ================= */
export const getUserProfile = async (token) => {
    console.log("📥 [SERVICE] Fetching profile...");

    const res = await fetch(`${API_BASE}/user/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    const data = await res.json();
    console.log("✅ [SERVICE] Profile response:", data);

    return data; // { message, user }
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

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

/* ================= UPLOAD PROFILE IMAGE ================= */
export const uploadProfileImage = async (imageUri, token) => {
    const formData = new FormData();

    const fileName = imageUri.split("/").pop();

    formData.append("file", {
        uri: imageUri,
        name: fileName,
        type: "image/jpeg",
    });

    console.log("📤 [SERVICE] Uploading image:", imageUri);

    const res = await fetch(`${API_BASE}/user/upload-profile-image`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            // ❌ DO NOT set Content-Type manually
        },
        body: formData,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json(); // { message, image }
};
