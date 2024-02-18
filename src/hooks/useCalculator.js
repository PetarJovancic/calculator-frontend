import { useState, useCallback } from "react";
import performCalculation from "../services/calculateService";

export const useCalculator = () => {
  const [calc, setCalc] = useState({
    operation: "",
    operands: [],
    currentInput: "",
    display: "",
  });

  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const numClickHandler = useCallback((value) => {
    setCalc((prev) => {
      const currentInput =
        prev.currentInput === "0" && value !== "."
          ? value
          : prev.currentInput + value;
      return { ...prev, currentInput, display: currentInput };
    });
  }, []);

  const operationClickHandler = useCallback((operation) => {
    setCalc((prev) => ({
      ...prev,
      operands: prev.currentInput
        ? [...prev.operands, prev.currentInput]
        : prev.operands,
      operation,
      currentInput: "",
    }));
  }, []);

  const equalsClickHandler = useCallback(async () => {
    if (!calc.operation || calc.operands.length === 0 || !calc.currentInput) {
      console.log("Insufficient data for calculation");
      return;
    }
    const operands = [...calc.operands, calc.currentInput];
    const finalOperands = operands.filter(
      (operand) => !isNaN(parseFloat(operand)) && isFinite(operand)
    );

    const result = await performCalculation(finalOperands, calc.operation);
    setCalc({
      operation: "",
      operands: [],
      currentInput: result.toString(),
      display: result.toString(),
    });
  }, [calc]);

  const percentageClickHandler = useCallback(async () => {
    if (!isNaN(parseFloat(calc.currentInput))) {
      const result = await performCalculation([calc.currentInput], "%");
      setCalc({
        operation: "",
        operands: [],
        currentInput: result.toString(),
        display: result.toString(),
      });
    }
  }, [calc]);

  const resetClickHandler = useCallback(() => {
    setCalc({
      operation: "",
      operands: [],
      currentInput: "",
      display: "",
    });
  }, []);

  const invertSignHandler = useCallback(() => {
    setCalc((prev) => {
      return prev.currentInput && prev.currentInput !== "0"
        ? {
            ...prev,
            currentInput: String(-parseFloat(prev.currentInput)),
            display: String(-parseFloat(prev.currentInput)),
          }
        : prev;
    });
  }, []);

  const toggleSideDrawer = useCallback(() => {
    setIsSideDrawerOpen((prev) => !prev);
  }, []);

  return {
    calc,
    numClickHandler,
    operationClickHandler,
    equalsClickHandler,
    percentageClickHandler,
    resetClickHandler,
    invertSignHandler,
    toggleSideDrawer,
    isSideDrawerOpen,
  };
};
