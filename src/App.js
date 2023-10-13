import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(-1);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    const newAdvice = data.slip.advice;

    if (newAdvice !== advice) {
      setAdvice(newAdvice);
      setCount((prevCount) => prevCount + 1);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="app-container">
      <h1 className="advice-text">{advice}</h1>
      <button className="advice-button" onClick={getAdvice}>
        Get Advice
      </button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p className="message-text">
      You have read <strong>{props.count}</strong> advices!
    </p>
  );
}
