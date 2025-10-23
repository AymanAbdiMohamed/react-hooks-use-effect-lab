import { useState, useEffect } from "react";

export default function Question({ question, answers, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Use functional state update to ensure latest value
      setTimeRemaining(prev => {
        if (prev === 1) {
          onAnswered(false); // trigger parent callback
          return 10; // reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onAnswered]);

  return (
    <div>
      <h2>{question}</h2>
      <p>{timeRemaining} seconds remaining</p>
      <ul>
        {answers.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </div>
  );
}
