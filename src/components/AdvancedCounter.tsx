import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function AdvancedCounter() {
  const [count, setCount] = useLocalStorage<number>("advanced-count", 0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([0]);
  const [saved, setSaved] = useState<boolean>(false);


  useEffect(() => {
    setHistory((prev) => (prev[prev.length - 1] === count ? prev : [...prev, count]));
  }, [count]);


  useEffect(() => {
    setSaved(true);
    const timer = setTimeout(() => setSaved(false), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setCount((c) => c + normalizeStep(step));
      if (e.key === "ArrowDown") setCount((c) => c - normalizeStep(step));
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [step, setCount]);

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
    <div className="counter">

      <p><strong>Current Count:</strong> {count}</p>

      <div className="buttons">
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="stepRow">
        <label htmlFor="step"><strong>Step Value:</strong></label>
        <input
          id="step"
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>

      {saved && <p className="savedMsg">Changes saved.</p>}

      <div className="history">
        <strong>Count History:</strong>
        <ul>
          {history.map((val, idx) => (
            <li key={idx}>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}