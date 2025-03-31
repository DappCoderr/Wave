import { useState, useEffect } from "react";

export default function useTimer(initialTime) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeRemaining;
}
