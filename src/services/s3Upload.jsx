import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3Client";
import { AWS_CONFIG } from "../config/awsConfig";
import { Platform } from "react-native";
import RNFS from "react-native-fs";

/**
 * Convert base64 string to Uint8Array (RN safe)
 */
const base64ToUint8Array = (base64) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
};

export const uploadImageToS3 = async (imageUri, userId) => {
    try {
        console.log("☁️ [S3] Upload started");
        console.log("☁️ [S3] Raw URI:", imageUri);

        const cleanUri =
            Platform.OS === "android"
                ? imageUri.replace("file://", "")
                : imageUri;

        console.log("☁️ [S3] Clean URI:", cleanUri);

        const fileName = `profilePictures/${userId}-${Date.now()}.jpg`;
        console.log("☁️ [S3] Key:", fileName);

        // 1️⃣ Read file as base64
        console.log("☁️ [S3] Reading file...");
        const base64 = await RNFS.readFile(cleanUri, "base64");

        // 2️⃣ Convert base64 → Uint8Array
        console.log("☁️ [S3] Converting to Uint8Array...");
        const fileBytes = base64ToUint8Array(base64);

        // 3️⃣ Upload to S3
        console.log("☁️ [S3] Uploading to bucket:", AWS_CONFIG.BUCKET);

        const command = new PutObjectCommand({
            Bucket: AWS_CONFIG.BUCKET,
            Key: fileName,
            Body: fileBytes, // ✅ RN-safe
            ContentType: "image/jpeg",
        });

        await s3Client.send(command);

        const url = `https://${AWS_CONFIG.BUCKET}.s3.${AWS_CONFIG.REGION}.amazonaws.com/${fileName}`;
        console.log("✅ [S3] Upload success:", url);

        return url;
    } catch (err) {
        console.error("❌ [S3] Upload failed:", err);
        throw err;
    }
};
