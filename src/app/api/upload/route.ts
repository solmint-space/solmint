import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// In-memory rate limiter: max 10 uploads per IP per 10 minutes
const uploadRateMap = new Map<string, { count: number; resetAt: number }>();
const UPLOAD_LIMIT = 10;
const UPLOAD_WINDOW_MS = 10 * 60 * 1000;

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function checkUploadRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = uploadRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    uploadRateMap.set(ip, { count: 1, resetAt: now + UPLOAD_WINDOW_MS });
    return true;
  }
  if (entry.count >= UPLOAD_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkUploadRateLimit(ip)) {
      return NextResponse.json(
        { error: "Troppi upload. Riprova tra qualche minuto." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const type = formData.get("type") as string;

    if (type === "image") {
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ error: "File mancante" }, { status: 400 });
      }

      // Validate MIME type
      if (!ALLOWED_MIME.has(file.type)) {
        return NextResponse.json(
          { error: "Formato non supportato. Usa PNG, JPG, GIF o WebP." },
          { status: 400 }
        );
      }

      // Validate size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Immagine troppo grande. Massimo 5 MB." },
          { status: 400 }
        );
      }

      const pinataForm = new FormData();
      pinataForm.append("file", file);
      pinataForm.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        pinataForm,
        {
          headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
          timeout: 20000,
        }
      );
      return NextResponse.json({
        url: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
      });
    }

    if (type === "metadata") {
      const raw = formData.get("metadata") as string | null;
      if (!raw) {
        return NextResponse.json({ error: "Metadata mancanti" }, { status: 400 });
      }

      let metadata: unknown;
      try {
        metadata = JSON.parse(raw);
      } catch {
        return NextResponse.json({ error: "Metadata JSON non valido" }, { status: 400 });
      }

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );
      return NextResponse.json({
        url: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
      });
    }

    return NextResponse.json({ error: "Tipo non valido" }, { status: 400 });
  } catch (e: any) {
    console.error("Upload error:", e.message);
    return NextResponse.json({ error: "Errore upload" }, { status: 500 });
  }
}
