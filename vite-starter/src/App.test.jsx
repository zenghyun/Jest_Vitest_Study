import { render, screen } from "@testing-library/react";
import App from "./App";

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
