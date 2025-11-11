"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const isKeyboardCodeAllowed = (code: string) => {
  //valid typing inputs
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") || 
    code === "Backspace" ||
    code == "Space"
  );
};

export default function useTyping(enabled: boolean) {
  const [cursor, setCursor] = useState(0);

  //stores all characters user typed
  const [typed, setTyped] = useState<string>("");

  const totalTyped = useRef(0);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      switch (key) {
        case "Backspace":
          //removes the last character from the typed string
          setTyped((prev) => prev.slice(0, -1));
          //moves cursor one character backward
          setCursor(cursor - 1);
          //reduce total typed key count
          totalTyped.current -= 1;
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursor(cursor + 1);
          totalTyped.current += 1;
      }
    },
    [cursor, enabled]
  );

  const clearTyped = useCallback(() => {
    //resets typed string to an empty string
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    //resets total typed count
    totalTyped.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    //remove event listener on cleanup
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    //how many keys the user has typed
    totalTyped: totalTyped.current,
  };
}
