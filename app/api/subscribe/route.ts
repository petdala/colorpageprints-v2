import { NextResponse } from "next/server";

type SubscribePayload = {
  email?: string;
  tag?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubscribePayload;
    const email = payload.email?.trim() ?? "";
    const tag = payload.tag?.trim() ?? "";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!tag) {
      return NextResponse.json(
        { success: false, message: "Tag is required" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Integrate with Kit (ConvertKit) API — POST to https://api.convertkit.com/v3/forms/{form_id}/subscribe
    console.log("Subscribe submission", { email, tag });

    return NextResponse.json(
      { success: true, message: "Subscribed" },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Subscribe error", error);

    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
