"use client";
import Faker from "./_components/random-words";
import Countdown from "./_components/countdown";
import RestartButton from "./_components/restart-button";
import Results from "./_components/results";
import useEngine from "./hooks/useEngine";
import { calAccuracy, calwpm } from "./hooks/useCalculator";
import { timer } from "./hooks/useEngine";
// import Timers from "./_components/timers";

export default function HomePage() {
  const { state, words, typed, timeLeft, errors, restart, totalTyped } =
    useEngine();
  return (
    <main className="">
      <p className="flex justify-center pt-20 pb-10 text-2xl font-mono">
        🍄 Welcome to Mushroom Space 🍄
      </p>
      <Countdown time={timeLeft} />
      <div className="px-100">
        <Faker words={words} typed={typed} />
      </div>
      <RestartButton onRestart={restart} />
      <Results
        wpm={calwpm(totalTyped, timer)}
        errors={errors}
        accuracy={calAccuracy(errors, totalTyped)}
        state={state}
      />
    </main>
  );
}
