import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function AdvancedCounter() {
  // useLocalStorage hook replaces manual localStorage logic
  const [count, setCount] = useLocalStorage<number>("advanced-count", 0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([0]);

  // Record history when count changes
  useEffect(() => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === count) return prev;
      return [...prev, count];
    });
  }, [count]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp") {
        setCount((c) => c + normalizeStep(step));
      } else if (e.key === "ArrowDown") {
        setCount((c) => c - normalizeStep(step));
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [step, setCount]);

  // Helpers
  function normalizeStep(value: number) {
    const n = Number(value);
    return Number.isFinite(n) && n !== 0 ? n : 1;
  }

  function increment() {
    setCount((c) => c + normalizeStep(step));
  }

  function decrement() {
    setCount((c) => c - normalizeStep(step));
  }

  function reset() {
    setCount(0);
    setHistory([0]);
  }

  return (
    <div className="card">
      <div className="row">
        <button onClick={decrement} aria-label="decrement">−</button>
        <div className="count" aria-live="polite" aria-atomic="true">
          {count}
        </div>
        <button onClick={increment} aria-label="increment">+</button>
      </div>

      <div className="row stepRow">
        <label htmlFor="step" className="stepLabel">Step:</label>
        <input
          id="step"
          className="stepInput"
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <button onClick={reset} className="resetBtn">Reset</button>
      </div>

      <p className="status">
        Arrow keys work here: <strong>ArrowUp</strong> = increment, <strong>ArrowDown</strong> = decrement.
      </p>

      <div className="history">
        <strong>Previous counts:</strong>{" "}
        {history.join(", ")}
      </div>
    </div>
  );
}