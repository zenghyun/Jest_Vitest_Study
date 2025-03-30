import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("updatescoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // 이렇게 하면 다음 단계로 넘어가기 전에 수행해야 할 clear 메소드가 완료됨
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

/**
 * Code Quiz! What to test
 * - Assert on default toppings subtotal
 * - Find and tick one box, assert on updated subtotal
 *  - See src/mocks/handlers.js for server response (which toppings)
 *  - use await and find for checkbox (async)
 * - Tick another box, on, assert on subtotal
 *  - Make sure code can handle two simultaneous boxes
 * - Tick one of the boxes off (click it again), and assert on subtotal
 *  - make sure code can handle box checked then un-checked
 * - useEvent reminders: setup() and await
 */

test("updates toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"toppings"} />);

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");
  const mAndMsCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });

  await user.click(mAndMsCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  await user.click(mAndMsCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    // const grandTotal = screen.getByText("Grand total: ", { exact: false });
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    /**
     * Warning: An update to Options inside a test was not wrapped in act(...).
     *
     * Warning: Can't perform a React state update on an unmounted component.
     *
     * conponent is changing after the test is over
     * - test function quits before state updates are complete
     *
     * 이 테스트 케이스가 끝나면 렌더링된 컴포넌트를 정리해야 함
     * 이 컴포넌트가 렌더링되면 모든 데이터가 초기화되고 렌더링된 컴포넌트를 정리해야 함
     */
    unmount();
  });
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  }),
    test("grand total updates properly if topping is added first", async () => {
      const user = userEvent.setup();
      render(<OrderEntry />);
      const grandTotal = screen.getByRole("heading", {
        name: /Grand total: \$/,
      });
      expect(grandTotal).toHaveTextContent("0.00");
      const cherriesCheckbox = await screen.findByRole("checkbox", {
        name: "Cherries",
      });
      await user.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent("1.50");

      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      await user.clear(vanillaInput);
      await user.type(vanillaInput, "2");
      expect(grandTotal).toHaveTextContent("5.50");
    }),
    test("grand total updates properly if item is removed", async () => {
      const user = userEvent.setup();
      render(<OrderEntry />);
      const grandTotal = screen.getByRole("heading", {
        name: /Grand total: \$/,
      });
      expect(grandTotal).toHaveTextContent("0.00");
      const cherriesCheckbox = await screen.findByRole("checkbox", {
        name: "Cherries",
      });
      await user.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent("1.50");

      await user.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent("0.00");
    });
});
