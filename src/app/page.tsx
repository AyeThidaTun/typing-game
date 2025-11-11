"use client";
import Faker from "./_components/random-words";
import Countdown from "./_components/countdown";
import RestartButton from "./_components/restart-button";
import Results from "./_components/results";
import useEngine from "./hooks/useEngine";
import { calAccuracy, calwpm } from "./hooks/useCalculator";
// import { timer } from "./hooks/useEngine";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
// import Timers from "./_components/timers";

export default function HomePage() {
  const [selectedTimer, setSelectedTimer] = useState(30);
  const { state, words, typed, timeLeft, errors, restart, totalTyped } =
    useEngine(selectedTimer);
  return (
    <main className="">
      <p className="flex justify-center pt-20 pb-10 text-2xl font-mono text-yellow-950">
        Coffee Type {""} 
        <Icon icon="streamline-pixel:food-drink-coffee" width="32" height="32" className="ml-3"/>
      </p>
      <section className="px-100 space-x-2">
        {[10, 30, 60].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTimer(t)}
            className={`px-4 py-1 rounded-full font-mono text-sm border-0 ${
              selectedTimer === t
                ? "bg-yellow-900 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {t}s
          </button>
        ))}
      </section>
      <Countdown time={timeLeft} />
      <div className="px-100">
        <Faker words={words} typed={typed} />
      </div>
      <RestartButton onRestart={restart} />
      <Results
        wpm={calwpm(totalTyped, selectedTimer)}
        errors={errors}
        accuracy={calAccuracy(errors, totalTyped)}
        state={state}
      />
    </main>
  );
}
