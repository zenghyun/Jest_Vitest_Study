import { render, screen } from "../../../src/test-utils/testing-library-utils";
import SummaryForm from "../summary/SummaryForm";
import { userEvent } from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox disables button on first click and enables on second click", async () => {
  // user 인스턴스 생성
  // userEvent API는 promise를 반환하기 때문에 async await 처리 필수!!!
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  // first click
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  // second click
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // popover starts out hidden
  // getBy는 요소가 보이지 않으면 사용할 수 없어서 popover 같은 것에서는 다른 걸 사용해야 함
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears on mouseover of checkbox label
  const termsConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsConditions);
  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  // popover disappears  when we mouse out
  await user.unhover(termsConditions);
  expect(popover).not.toBeInTheDocument();
});
