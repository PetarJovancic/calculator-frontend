import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import SideDrawer from "./components/SideDrawer";
import ButtonMUI from "@mui/material/Button";
import { btnValues } from "./constants/buttonValues";

const App = () => {
  const {
    calc,
    numClickHandler,
    operationClickHandler,
    equalsClickHandler,
    percentageClickHandler,
    resetClickHandler,
    invertSignHandler,
    toggleSideDrawer,
    isSideDrawerOpen,
  } = useCalculator();

  const buttonClickHandler = (e, btn) => {
    switch (btn) {
      case "C":
        resetClickHandler();
        break;
      case "+-":
        invertSignHandler();
        break;
      case "=":
        equalsClickHandler();
        break;
      case "%":
        percentageClickHandler();
        break;
      default:
        if (!isNaN(btn) || btn === ".") {
          numClickHandler(btn);
        } else {
          operationClickHandler(btn);
        }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {isSideDrawerOpen && <SideDrawer />}
      <ButtonMUI onClick={toggleSideDrawer} style={{ fontSize: "24px" }}>
        <span
          style={{
            transform: isSideDrawerOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          &#8592;
        </span>
      </ButtonMUI>
      <Wrapper>
        <Screen value={calc.display} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={(e) => buttonClickHandler(e, btn)}
            />
          ))}
        </ButtonBox>
      </Wrapper>
    </div>
  );
};

export default App;
