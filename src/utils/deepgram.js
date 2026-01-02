import RNFS from 'react-native-fs';

const DEEPGRAM_API_KEY = 'dg_xxxxxxxxxxxxx'; // 🔐 restricted key

export async function transcribeWithDeepgram(filePath) {
  const audioBase64 = await RNFS.readFile(filePath, 'base64');

  const binary = Uint8Array.from(
    atob(audioBase64),
    c => c.charCodeAt(0)
  );

  const res = await fetch(
    'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true',
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'audio/m4a',
      },
      body: binary,
    }
  );

  const data = await res.json();

  return (
    data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || ''
  );
}
