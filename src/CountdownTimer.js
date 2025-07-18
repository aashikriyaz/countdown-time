import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
      setIsRunning(false);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, targetDate]);

  const startTimer = () => {
    if (targetDate && new Date(targetDate) > new Date()) {
      setTimeLeft(calculateTimeLeft());
      setIsRunning(true);
    } else {
      alert("Please select a valid future date and time.");
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft({});
    setTargetDate("");
  };

  const format = (val) => val.toString().padStart(2, "0");

  return (
    <div className="timer-container">
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {targetDate && (
        <div className="time-display">
          <div>
            <span>{format(timeLeft.days || 0)}</span>
            <p>Days</p>
          </div>
          <div>
            <span>{format(timeLeft.hours || 0)}</span>
            <p>Hours</p>
          </div>
          <div>
            <span>{format(timeLeft.minutes || 0)}</span>
            <p>Minutes</p>
          </div>
          <div>
            <span>{format(timeLeft.seconds || 0)}</span>
            <p>Seconds</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
