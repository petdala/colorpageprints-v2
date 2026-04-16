import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as Record<string, string>;

  console.log("Custom intake request for hello@colorpageprints.com", payload);

  return NextResponse.json({
    ok: true,
    message: "Placeholder email sent to hello@colorpageprints.com"
  });
}
