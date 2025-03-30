import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2
        style={{
          color: "black",
        }}
      >
        Grand total: {formatCurrency(totals.scoops + totals.toppings)}
      </h2>
    </div>
  );
}
