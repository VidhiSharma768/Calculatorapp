
import { useState } from "react";
import "./Calculator.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const operations = {
  "+": "add",
  "−": "subtract",
  "×": "multiply",
  "÷": "divide"
};

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [storedNumber, setStoredNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function reset() {
    setDisplay("0");
    setStoredNumber(null);
    setOperation(null);
    setWaitingForNumber(false);
    setError("");
    setLoading(false);
  }

  function inputDigit(digit) {
    if (loading) return;

    setError("");

    if (waitingForNumber) {
      setDisplay(digit);
      setWaitingForNumber(false);
      return;
    }

    setDisplay((current) => {
      if (current === "0") return digit;
      if (current.replace("-", "").length >= 15) return current;
      return current + digit;
    });
  }

  function inputDecimal() {
    if (loading) return;

    setError("");

    if (waitingForNumber) {
      setDisplay("0.");
      setWaitingForNumber(false);
      return;
    }

    setDisplay((current) =>
      current.includes(".") ? current : current + "."
    );
  }

  function chooseOperation(symbol) {
    if (loading) return;

    setError("");
    setStoredNumber(Number(display));
    setOperation(symbol);
    setWaitingForNumber(true);
  }

  function toggleSign() {
    if (loading) return;

    setError("");
    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : "-" + current
    );
  }

  function deleteLast() {
    if (loading) return;

    setError("");
    setDisplay((current) => {
      if (current.length <= 1) return "0";
      if (current.length === 2 && current.startsWith("-")) return "0";
      return current.slice(0, -1);
    });
  }

  async function calculate() {
    if (loading || !operation || storedNumber === null) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstNumber: storedNumber,
          secondNumber: Number(display),
          operation: operations[operation]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Calculation failed.");
      }

      setDisplay(String(data.result));
      setStoredNumber(null);
      setOperation(null);
      setWaitingForNumber(true);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Check your backend."
          : err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const buttons = [
    { label: "AC", className: "utility", action: reset },
    { label: "±", className: "utility", action: toggleSign },
    { label: "DEL", className: "utility", action: deleteLast },
    { label: "÷", className: "operator", action: () => chooseOperation("÷") },

    { label: "7", action: () => inputDigit("7") },
    { label: "8", action: () => inputDigit("8") },
    { label: "9", action: () => inputDigit("9") },
    { label: "×", className: "operator", action: () => chooseOperation("×") },

    { label: "4", action: () => inputDigit("4") },
    { label: "5", action: () => inputDigit("5") },
    { label: "6", action: () => inputDigit("6") },
    { label: "−", className: "operator", action: () => chooseOperation("−") },

    { label: "1", action: () => inputDigit("1") },
    { label: "2", action: () => inputDigit("2") },
    { label: "3", action: () => inputDigit("3") },
    { label: "+", className: "operator", action: () => chooseOperation("+") },

    {
      label: "0",
      className: "zero",
      action: () => inputDigit("0")
    },
    { label: ".", action: inputDecimal },
    {
      label: "=",
      className: "equals",
      action: calculate
    }
  ];

  return (
    <section className="calculator" aria-label="Calculator">
      <div className="calculator-display">
        <div className="expression" aria-live="polite">
          {storedNumber !== null && operation
            ? `${storedNumber} ${operation}`
            : "Ready to calculate"}
        </div>

        <output className="result" aria-live="polite">
          {loading ? "Calculating..." : display}
        </output>
      </div>

      {error && (
        <p className="calculator-error" role="alert">
          {error}
        </p>
      )}

      <div className="calculator-buttons">
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            className={`calculator-button ${button.className || ""}`}
            onClick={button.action}
            disabled={loading}
            aria-label={
              button.label === "AC"
                ? "Clear all"
                : button.label === "DEL"
                  ? "Delete last digit"
                  : button.label
            }
          >
            {button.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Calculator;
