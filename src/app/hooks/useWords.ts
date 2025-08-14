"use client";
import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";

const generateWords = (count: number) => faker.word.words(count);

export default function useWords(count: number) {
  const [words, setWords] = useState<string>("");

  // Generate words only on the client
  useEffect(() => {
    setWords(generateWords(count));
  }, [count]);

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
}
