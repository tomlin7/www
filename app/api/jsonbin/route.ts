import { NextResponse } from "next/server";

// Dynamic fallback assignment
const MASTER_KEY =
  process.env.JSONBIN_MASTER_KEY || process.env.JSONBIN_API_KEY;

// Completely remove any automated fallbacks to public access keys
const ACCESS_KEY = process.env.JSONBIN_ACCESS_KEY;

// A single source of truth for the correct header key-value pair
function getAuthHeaders(): Record<string, string> {
  if (MASTER_KEY) return { "X-Master-Key": MASTER_KEY };
  if (ACCESS_KEY) return { "X-Access-Key": ACCESS_KEY };
  return {};
}

async function forward(url: string, options: RequestInit) {
  const res = await fetch(url, options);
  const text = await res.text();
  const headers: Record<string, string> = {};
  const ct = res.headers.get("content-type");
  if (ct) headers["content-type"] = ct;
  return new NextResponse(text, { status: res.status, headers });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const bin = url.searchParams.get("bin");
    if (!bin)
      return NextResponse.json(
        { message: "bin query required" },
        { status: 400 },
      );

    console.log(
      "api/jsonbin: masterKeyPresent=",
      !!MASTER_KEY,
      "accessKeyPresent=",
      !!ACCESS_KEY,
    );

    const authHeaders = getAuthHeaders();
    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json(
        { message: "server JSONBin key not configured" },
        { status: 500 },
      );
    }

    return await forward(`https://api.jsonbin.io/v3/b/${bin}/latest`, {
      headers: authHeaders,
    });
  } catch (err) {
    console.error("api/jsonbin GET error", err);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bin, messages } = body || {};
    if (!bin)
      return NextResponse.json({ message: "bin required" }, { status: 400 });
    if (!messages)
      return NextResponse.json(
        { message: "messages required" },
        { status: 400 },
      );

    const authHeaders = getAuthHeaders();
    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json(
        { message: "server JSONBin key not configured" },
        { status: 500 },
      );
    }

    return await forward(`https://api.jsonbin.io/v3/b/${bin}`, {
      method: "PUT",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });
  } catch (err) {
    console.error("api/jsonbin POST error", err);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}
