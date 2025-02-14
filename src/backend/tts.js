import { KokoroTTS } from "kokoro-js";

const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
const tts = await KokoroTTS.from_pretrained(model_id, {
  dtype: "q8", // Options: "fp32", "fp16", "q8", "q4", "q4f16"
});

export async function _tts(text) {
  const audio = await tts.generate(text, {
    voice: "af_bella",
  });

  return audio.toBlob();
}
