"use client";
import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";

type Props = {
  wpm: number;
  errors: number;
  accuracy: number;
  state: State;
};

export default function Results({
  wpm,
  errors,
  accuracy,
  state,
}: Props) {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "finish") {
    return null;
  }

  return (
    <section className="flex justify-center font-mono text-yellow-500">
      <ul className="flex flex-col items-center space-y-2">
        {/* <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 0.1 }}
          className=""
        >
          Total Characters Typed: {totalTyped}
        </motion.li> */}
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 0.1 }}
          className=""
        >
          WPM: {wpm}
        </motion.li>
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 0.5 }}
          className="text-red-500"
        >
          Errors: {errors}
        </motion.li>
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 0.8 }}
          className=""
        >
          Accuracy: {accuracy.toFixed(2)}%
        </motion.li>
      </ul>
    </section>
  );
}
