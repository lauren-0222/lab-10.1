import "./App.css";
import AdvancedCounter from "./components/AdvancedCounter";

export default function App() {
  return (
    <div className="app">
      <div className="card">
        <h1>
         React Counter
        </h1>
      </div>

      <div style={{ height: 16 }} />

      <AdvancedCounter />
    </div>
  );
}