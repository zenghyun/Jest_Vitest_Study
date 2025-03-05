import { render, screen } from "@testing-library/react";
import App from "./App";

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

test("App contains correct heading", () => {
  render(<App />);
  //  / / <= 정규 표현식, i <= 대소문자 구분하지 않겠다는 표시
  const headingElement1 = screen.getByText(/learn react/i);
  const headingElement2 = screen.getByRole("heading", { name: /learn React/i });
  // 아래 expect를 통해 테스트가 성공하거나 실패하게 됨
  // expect().toBeInTheDocument()
  // assertion, causes test to succeed or fail
  // headingElement가 이 문서에 있다고 단언한다.
  expect(headingElement1).toBeInTheDocument();
  expect(headingElement2).toBeInTheDocument();
});

// eslint-disable-next-line vitest/no-commented-out-tests
// test("button starts with correct label and color", () => {
//   const { container } = render(<App />);
//   // 페이지가 엄청 크고 항목이 많을 때, 테스트 하는 곳을 찾기 유용함
//   logRoles(container);

//   const buttonElement = screen.getByRole("button", { name: /blue/i });
//   expect(buttonElement).toHaveClass("red");
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
//   // check button text
//   expect(buttonElement).toHaveTextContent(/red/i);
//   // check the button color
//   expect(buttonElement).toHaveClass("blue");
// });
