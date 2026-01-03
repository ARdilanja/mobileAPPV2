import RNFS from "react-native-fs";

const DEEPGRAM_API_KEY = "4ef7bd0d54281e63169e5a58c6149205e86cc758"; // restricted key

export async function transcribeWithDeepgram(filePath) {
  // Read wav file
  const audioBase64 = await RNFS.readFile(filePath, "base64");

  const binary = Uint8Array.from(
    atob(audioBase64),
    c => c.charCodeAt(0)
  );

  const response = await fetch(
    "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        "Content-Type": "audio/wav",
      },
      body: binary,
    }
  );

  const data = await response.json();

  return (
    data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || ""
  );
}
