import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

test("does not show toppings subtotal when there are no toppings", async () => {
  const user = userEvent.setup();
  render(<App />);

  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubTotal).toHaveTextContent("2.00");

  const submitBtn = await screen.findByRole("button", {
    name: "Order Sundae!",
  });

  await user.click(submitBtn);

  const scoopsHeading = await screen.findByRole("heading", {
    name: /Scoops:/i,
  });

  expect(scoopsHeading).toBeInTheDocument();

  const toppingsTotal = screen.queryByText("Toppings: ", {
    exact: false,
  });
  expect(toppingsTotal).not.toBeInTheDocument();
});

test("two click scoops and toppings check and toggle", async () => {
  const user = userEvent.setup();
  render(<App />);

  const grandTotal = await screen.findByRole("heading", {
    name: /Grand total: \$/i,
  });
  expect(grandTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(vanillaInput);
  await user.clear(chocolateInput);

  await user.type(vanillaInput, "1");
  await user.type(chocolateInput, "2");

  expect(grandTotal).toHaveTextContent("6.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);
  expect(grandTotal).toHaveTextContent("7.50");

  await user.click(cherriesCheckbox);
  expect(grandTotal).toHaveTextContent("6.00");
});
