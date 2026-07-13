import "./App.css";
import reactLogo from "../images/react-logo.svg";

export function App() {
  return (
    <div className="hello-world-container">
      <div className="hello-world-card">
        <div className="hello-world-glow" />
        <img src={reactLogo} alt="React" className="hello-world-logo" />
        <h1 className="hello-world-title">Hello World</h1>
        <div className="hello-world-divider" />
        <p className="hello-world-subtitle">Welcome to your first widget</p>
      </div>
    </div>
  );
}


