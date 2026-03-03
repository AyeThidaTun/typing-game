"use client";
import useEngine from "../hooks/useEngine";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Countdown from "./countdown";
import Faker from "./random-words";
import RestartButton from "./restart-button";
import Results from "./results";
import { calAccuracy, calwpm } from "../hooks/useCalculator";

export default function TypingGame() {
  const [selectedTimer, setSelectedTimer] = useState(10);
  const { state, words, typed, timeLeft, errors, restart, totalTyped } =
    useEngine(selectedTimer);
  return (
    <section>
      <section className="px-100 pt-20 space-x-2">
        {[10, 30, 60].map((t) => (
          <Button
            key={t}
            variant="timer"
            onClick={() => setSelectedTimer(t)}
            className={`${
              selectedTimer === t
                ? "bg-yellow-900 hover:bg-yellow-900 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {t}s
          </Button>
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
        onClose={restart}
      />
    </section>
  );
}
