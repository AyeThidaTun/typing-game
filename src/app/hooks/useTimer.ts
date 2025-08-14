"use client";
import { useCallback, useRef, useState, useEffect } from "react";

export default function useTimer(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  //stores interval ID from setInterval
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(() => {
    console.log("starting countdown...");
    intervalRef.current = setInterval(() => {
      //decreases timeLeft by 1 every 1 second
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  }, [setTimeLeft]);

  const resetCountdown = useCallback(() => {
    console.log("resetting countdown...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(seconds);
  }, [seconds]);
  // [seconds] makes sure resetCountdown always has the latest initial time

  useEffect(() => {
    if (!timeLeft && intervalRef.current) {
      console.log("time's up");
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, intervalRef]);

  return { timeLeft, startCountdown, resetCountdown };
}
