import { NextResponse } from "next/server";

type CustomIntakePayload = {
  name?: string;
  email?: string;
  purpose?: string;
  recipient?: string;
  feeling?: string;
  theme?: string;
  music_style?: string;
  deadline?: string;
  details?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CustomIntakePayload;

    if (
      !payload.name?.trim() ||
      !EMAIL_REGEX.test(payload.email ?? "") ||
      !payload.purpose?.trim() ||
      !payload.recipient?.trim() ||
      !payload.feeling?.trim() ||
      !payload.theme?.trim() ||
      !payload.music_style?.trim()
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required intake fields" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Send this as an email to hello@colorpageprints.com via SendGrid/Resend/etc.
    console.log("Custom intake submission", payload);

    return NextResponse.json(
      { success: true, message: "We'll be in touch within 2 business days." },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Custom intake error", error);

    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
