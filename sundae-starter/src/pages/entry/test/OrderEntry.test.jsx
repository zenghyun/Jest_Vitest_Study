import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

/**
 * Review of Alert Testing
 * - Override Mock Service Worker response for individual tests
 * - Misleading Unable to find role='alert' error
 * - Isolate file by typing p in Jest / Vitest watch mode
 * - Isolate test within file with 'test.only' or 'test.skip'
 * - MSW debugging
 *  - 'intercepted a request without a matching request 'handler' error
 *  - MSW docs debugging 'runbook:https:mswjs.io/docs/runbook/
 */

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");
  // const alerts = await screen.findAllByText(
  //   "An unexpected error occurred Please try again later."
  // );

  expect(alerts).toHaveLength(2);
});
