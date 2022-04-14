import React, { useState } from "react";
import "./App.css";
import BmiScore from "./components/BmiScore/BmiScore";

function App() {
  const [score, setScore] = useState<number>(0);
  const steps = [
    { value: [0, 30], label: "underweight", color: "#c4c4c4" },
    { value: [30, 90], label: "normal", color: "#02c8a4" },
    { value: [90, 120], label: "overweight", color: "#c4c4c4" },
  ];

  return (
    <div className="App">
      <p>Mr. Nash's BMI is</p>
      <BmiScore score={30} />

      <p>Mr. Nash's BMI 2 is</p>
      <BmiScore score={50} maxLimit={120} steps={steps} barWeight={35} />

      <p>Mr. Nash's BMI 3 is</p>
      <BmiScore score={score} maxLimit={120} steps={steps} barWeight={35} />
      <input
        type="text"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        value={score}
        maxLength={3}
        onChange={(e) => setScore(+e.target.value)}
        placeholder="Choose score"
      />
    </div>
  );
}

export default App;
