"use client";
import { useCallback, useState, useEffect } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTyping from "./useTyping";
// import ChangeTimers from "./changeTimer";
import { countErrors } from "./useCalculator";

export type State = "start" | "run" | "finish";

// future enhancements to be included > asking for user's preference
const numOfWords = 50;
// export const timer = 10;

export default function useEngine(timer: number) {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(numOfWords);
  const { timeLeft, startCountdown, resetCountdown } = useTimer(timer);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTyping(
    state !== "finish"
  );
  const [errors, setErrors] = useState(0);
  const sumErrors = useCallback(() => {
    //take words starting from index 0 to before cursor
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  const isStarting = state === "start" && cursor > 0;
  const isFinished = cursor === words.length;

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  useEffect(() => {
    if (!timeLeft) {
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  //generate new words when first shown words are finished
  useEffect(() => {
    if (isFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [cursor, words, clearTyped, typed, isFinished, updateWords, sumErrors]);

  const restart = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setState("start");
    updateWords();
    setErrors(0);
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  return { state, words, timeLeft, typed, errors, restart, totalTyped };
}
