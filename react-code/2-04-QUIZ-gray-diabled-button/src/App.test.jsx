import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button click flow", () => {
  render(<App />);

  // find an element with a role of button and text matching /blue/i
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });

  // expect the class to be red
  expect(buttonElement).toHaveClass("red");

  // click button
  fireEvent.click(buttonElement);

  // expect the class to be blue
  expect(buttonElement).toHaveClass("blue");

  // expect the button text to match /red/i
  expect(buttonElement).toHaveTextContent(/red/i);
});

test("checkbox flow", () => {
  // render app
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // click checkbox to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("red");
});
