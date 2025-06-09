"use client";

import { useState, useCallback } from "react";

// Define operation types for better type safety
type OperationType = "+" | "-" | "×" | "÷" | "%" | "";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  "aria-label": string;
};

// Button component for calculator buttons
const Button = ({
  children,
  onClick,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={className}
    aria-label={ariaLabel}
    tabIndex={0}
  >
    {children}
  </button>
);

export default function Page03() {
  // ----- STATE MANAGEMENT -----
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<OperationType>("");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  // ----- CALCULATION LOGIC -----
  const calculate = useCallback(
    (a: number, b: number, op: OperationType): number => {
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "×":
          return a * b;
        case "÷":
          if (b === 0) throw new Error("Division by zero");
          return a / b;
        case "%":
          return (a * b) / 100;
        default:
          return b;
      }
    },
    []
  );

  // ----- DISPLAY FORMATTING -----
  const formatDisplay = useCallback((value: string): string => {
    const num = Number.parseFloat(value);
    if (isNaN(num)) return "Error";

    if (Math.abs(num) > 999999999) {
      return num.toExponential(2);
    }

    if (value.includes(".")) {
      return value.replace(/\.?0+$/, "");
    }

    return value;
  }, []);

  const resetCalculator = useCallback(() => {
    setPreviousValue(null);
    setOperation("");
    setNewNumber(true);
  }, []);

  // ----- INPUT HANDLERS -----
  const handleClear = useCallback(() => {
    setDisplay("0");
    resetCalculator();
  }, [resetCalculator]);

  const handleNumber = useCallback(
    (num: string) => {
      if (display === "Error") {
        handleClear();
        return;
      }

      if (newNumber) {
        setDisplay(num);
        setNewNumber(false);
      } else if (display.length < 9) {
        setDisplay(display + num);
      }
    },
    [display, newNumber, handleClear]
  );

  const handleDecimal = useCallback(() => {
    if (display === "Error") {
      handleClear();
      return;
    }

    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, newNumber, handleClear]);

  const handleOperation = useCallback(
    (op: OperationType) => {
      if (display === "Error") {
        handleClear();
        return;
      }

      const current = Number.parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(current);
      } else if (operation) {
        try {
          const result = calculate(previousValue, current, operation);
          setPreviousValue(result);
          setDisplay(formatDisplay(String(result)));
        } catch {
          setDisplay("Error");
          resetCalculator();
          return;
        }
      }

      setOperation(op);
      setNewNumber(true);
    },
    [
      display,
      previousValue,
      operation,
      calculate,
      formatDisplay,
      resetCalculator,
      handleClear,
    ]
  );

  const handleEquals = useCallback(() => {
    if (display === "Error") {
      handleClear();
      return;
    }

    const current = Number.parseFloat(display);
    if (previousValue !== null && operation) {
      try {
        const result = calculate(previousValue, current, operation);
        setDisplay(formatDisplay(String(result)));
        resetCalculator();
      } catch {
        setDisplay("Error");
        resetCalculator();
      }
    }
  }, [
    display,
    previousValue,
    operation,
    calculate,
    formatDisplay,
    resetCalculator,
    handleClear,
  ]);

  // ----- STYLING -----
  const baseButtonStyles =
    "h-8 sm:h-12 " +
    "border-2 sm:border-3 " +
    "border-black dark:border-white " +
    "bg-white dark:bg-black " +
    "text-black dark:text-white " +
    "text-xl md:text-3xl " +
    "font-semibold " +
    "rounded-none " +
    "hover-none" +
    "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] " +
    "sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] " +
    "active:shadow-none dark:active:shadow-none " +
    "active:translate-y-1 dark:active:translate-y-1 " +
    "active:translate-x-1 dark:active:translate-x-1 " +
    "touch-manipulation dark:touch-manipulation";

  const buttonStyles = baseButtonStyles;
  const clearButtonStyles = baseButtonStyles;
  const equalsButtonStyles = `${baseButtonStyles} row-span-2 h-[calc(4rem+0.25rem)] sm:h-[calc(6rem+0.375rem)] flex items-end justify-center pb-1 sm:pb-2`;
  const zeroButtonStyles = `${baseButtonStyles} col-span-2`;

  const numberButtons = [
    { value: "7", label: "Seven" },
    { value: "8", label: "Eight" },
    { value: "9", label: "Nine" },
    { value: "4", label: "Four" },
    { value: "5", label: "Five" },
    { value: "6", label: "Six" },
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
  ];

  const operationButtons = [
    { value: "%", label: "Percentage" },
    { value: "÷", label: "Divide" },
    { value: "×", label: "Multiply" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto font-pixel w-full max-w-[200px] sm:max-w-[260px] select-none rounded-xl border-4 border-black dark:border-white bg-white dark:bg-black p-2.5 sm:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        <div className="mb-2 border-b-4 text-black dark:text-white dark:border-white border-black text-2xl sm:text-3xl font-bold -mt-2 sm:-mt-2">
          Calculator
        </div>

        <div className="mb-2 sm:mb-3 flex h-10 sm:h-12 items-center font-semibold justify-end overflow-hidden border-4 border-black dark:border-white bg-white dark:bg-black dark:text-white px-2 sm:px-3 text-2xl sm:text-4xl text-black">
          {formatDisplay(display)}
        </div>

        <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
          <Button
            onClick={handleClear}
            className={clearButtonStyles}
            aria-label="Clear"
          >
            C
          </Button>

          {operationButtons.map((op) => (
            <Button
              key={op.value}
              onClick={() => handleOperation(op.value as OperationType)}
              className={buttonStyles}
              aria-label={op.label}
            >
              {op.value}
            </Button>
          ))}

          {numberButtons.slice(0, 3).map((button) => (
            <Button
              key={button.value}
              onClick={() => handleNumber(button.value)}
              className={buttonStyles}
              aria-label={button.label}
            >
              {button.value}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation("-")}
            className={buttonStyles}
            aria-label="Subtract"
          >
            -
          </Button>

          {numberButtons.slice(3, 6).map((button) => (
            <Button
              key={button.value}
              onClick={() => handleNumber(button.value)}
              className={buttonStyles}
              aria-label={button.label}
            >
              {button.value}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation("+")}
            className={buttonStyles}
            aria-label="Add"
          >
            +
          </Button>

          {numberButtons.slice(6, 9).map((button) => (
            <Button
              key={button.value}
              onClick={() => handleNumber(button.value)}
              className={buttonStyles}
              aria-label={button.label}
            >
              {button.value}
            </Button>
          ))}
          <Button
            onClick={handleEquals}
            className={equalsButtonStyles}
            aria-label="Equals"
          >
            =
          </Button>
          <Button
            onClick={() => handleNumber("0")}
            className={zeroButtonStyles}
            aria-label="Zero"
          >
            0
          </Button>
          <Button
            onClick={handleDecimal}
            className={buttonStyles}
            aria-label="Decimal"
          >
            .
          </Button>
        </div>
      </div>
    </div>
  );
}
