
import Calculator from "./components/Calculator.jsx";
import "./App.css";

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">SIMPLE TOOLS</p>
        <h1>Calculator</h1>
        <p className="subtitle">
          A clean calculator powered by React and Node.js.
        </p>
      </header>

      <Calculator />

      <footer className="app-footer">
        Built with React + Express
      </footer>
    </main>
  );
}

export default App;
