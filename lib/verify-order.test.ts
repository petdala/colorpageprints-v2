import assert from "node:assert/strict";
import test from "node:test";

import { VERIFY_ORDER_UNAVAILABLE_MESSAGE, verifyOrderRequest } from "./verify-order.ts";

test("rejects download unlocks even when the submitted order looks valid", () => {
  const result = verifyOrderRequest(
    {
      email: "customer@example.com",
      order_number: "123-1234567-1234567",
      wave: 0
    },
    () => ({
      wave_number: 0,
      title: "The Opening",
      launch_date: "2026-04-20",
      status: "live",
      book_skus: ["CPP-HT-001"],
      exclusive_name: "Happy Town Activity Pack",
      exclusive_description: "Exclusive launch pack",
      exclusive_download_url: "/downloads/exclusives/happy-town-activity-pack.pdf",
      landing_page_slug: "wave-0"
    })
  );

  assert.equal(result.status, 403);
  assert.deepEqual(result.body, {
    success: false,
    message: VERIFY_ORDER_UNAVAILABLE_MESSAGE
  });
  assert.equal("download_url" in result.body, false);
});
