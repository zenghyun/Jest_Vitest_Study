import { useState } from "react";
import "./App.css";
function App() {
  const [isDisable, setIsDisable] = useState(false);
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const nextColor =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const className = isDisable ? "gray" : buttonColor;
  const handleClickbtn = () => {
    setButtonColor((prev) =>
      prev === "medium-violet-red" ? "midnight-blue" : "medium-violet-red"
    );
  };

  const handleClickCheckBox = () => {
    setIsDisable((prev) => {
      if (!prev) {
        setButtonColor("gray");
      } else {
        setButtonColor(nextColor);
      }
      return !prev;
    });
  };

  return (
    <div>
      <h1>I am gonna learn React Testing Library</h1>
      <button
        className={`${className}`}
        onClick={handleClickbtn}
        disabled={isDisable}
      >
        {`Change to ${nextColor}`}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        value={isDisable}
        onClick={handleClickCheckBox}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
