// import SummaryForm from "./pages/summary/SummaryForm";
import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

/**
 *
 * @argument
 * Backdrop to Test
 * - more complex user interactions
 *  - multiple form entry, moving through order phases
 * - mouseover popup
 *  - test that element disappears from DOM
 * - simulating server response
 *  - mock service worker
 * - async app updates
 *  - awaiting DOM changes
 * - global state via context
 */
function App() {
  // return; /// <div>
  {
    /* <h1>Sundaes on Demand</h1> */
  }
  {
    /* <SummaryForm /> */
  }
  // </div>
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
