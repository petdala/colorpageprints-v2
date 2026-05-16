import type { Wave } from "./types";

type VerifyOrderPayload = {
  email?: string;
  order_number?: string;
  wave?: number;
};

type VerifyOrderResult = {
  status: number;
  body: {
    success: false;
    message: string;
  };
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VERIFY_ORDER_UNAVAILABLE_MESSAGE =
  "Exclusive download unlock is temporarily unavailable while order verification is being updated. Please email hello@colorpageprints.com for manual review.";

export function verifyOrderRequest(
  payload: VerifyOrderPayload,
  getWaveByNumber: (waveNumber: number) => Wave | undefined
): VerifyOrderResult {
  const email = payload.email?.trim() ?? "";
  const orderNumber = payload.order_number?.trim() ?? "";
  const waveNumber = payload.wave;

  if (!EMAIL_REGEX.test(email) || !orderNumber || typeof waveNumber !== "number") {
    return {
      status: 400,
      body: { success: false, message: "email, order_number, and wave are required" }
    };
  }

  const wave = getWaveByNumber(waveNumber);

  if (!wave) {
    return {
      status: 400,
      body: { success: false, message: "Wave not found" }
    };
  }

  return {
    status: 403,
    body: {
      success: false,
      message: VERIFY_ORDER_UNAVAILABLE_MESSAGE
    }
  };
}
