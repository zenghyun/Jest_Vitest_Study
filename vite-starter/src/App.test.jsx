import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { describe, expect } from "vitest";
import { kebabCaseToTitleCase } from "./helpers";

/**
 * render
 * - Create simulated DOM for argument component
 * screen
 * - Access sumulated DOM via screen global
 * expect().toBeInTheDocument()
 * - assertion, causes test to succeed or fail
 *
 */

// eslint-disable-next-line vitest/no-commented-out-tests
// test("App contains correct heading", () => {
//   render(<App />);
//   const headingElement = screen.getByText(/learn React/i);
//   expect(headingElement).toBeInTheDocument();
// });

// eslint-disable-next-line vitest/no-commented-out-tests
// test("App contains correct heading", () => {
// render(<App />);
//  / / <= 정규 표현식, i <= 대소문자 구분하지 않겠다는 표시
// const headingElement1 = screen.getByText(/learn react/i);
// const headingElement2 = screen.getByRole("heading", { name: /learn React/i });
// 아래 expect를 통해 테스트가 성공하거나 실패하게 됨
// expect().toBeInTheDocument()
// assertion, causes test to succeed or fail
// headingElement가 이 문서에 있다고 단언한다.
// expect(headingElement1).toBeInTheDocument();
// expect(headingElement2).toBeInTheDocument();
// });

// eslint-disable-next-line vitest/no-commented-out-tests
// test("button click flow", () => {
//   // render App
//   render(<App />);
//   // find the button
//   const buttonElement = screen.getByRole("button", { name: /blue/i });
//   // check initial color
//   expect(buttonElement).toHaveClass("red");
//   // click the button
//   fireEvent.click(buttonElement);
//   // check button Text
//   expect(buttonElement).toHaveTextContent(/red/i);
//   // check the button color
//   expect(buttonElement).toHaveClass("blue");
//   expect(buttonElement).toHaveStyle({ "background-color": "rgb(0, 0, 255)" });
// });

test("button click flow", () => {
  // render App
  render(<App />);
  // find the button
  const buttonElement = screen.getByRole("button", { name: /midnight-blue/i });
  // check initial color
  expect(buttonElement).toHaveClass("medium-violet-red");
  // click the button
  fireEvent.click(buttonElement);
  // check button text
  expect(buttonElement).toHaveTextContent(/medium-violet-red/i);
  // check button color
  expect(buttonElement).toHaveClass("midnight-blue");
  // expect(buttonElement).toHaveStyle({ "background-color": "rgb(0,0,255)" });
});

test("checkbox flow", () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", { name: /midnight-blue/i });
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

  // click checkbox again to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphen", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
