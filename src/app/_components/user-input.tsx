import Caret from "./caret";
import { cn } from "../utils/cn";

type Props = {
  characters: string;
  words: string;
};

export default function UserInput({ characters, words }: Props) {
  const userInput = characters.split("");

  return (
    <div className="absolute top-0 font-mono text-md leading-relaxed whitespace-pre-wrap break-words">
      {userInput.map((char, index) => {
        const expectedChar = words[index];
        const userInput = char;
        const isCorrect = expectedChar === userInput;
        const isWhitespace = expectedChar === " ";

        const displayChar = !isCorrect && isWhitespace 
        ? expectedChar : !isCorrect ? expectedChar : userInput;

        return (
          <span
            key={index}
            className={cn("text-yellow-700 text-md leading-9", {
              "text-red-300": !isCorrect && !isWhitespace,
              "text-yellow-800": isCorrect && !isWhitespace,
              "bg-red-500/50": !isCorrect && isWhitespace,
            })}
          >
            {displayChar}
          </span>
        );
      })}
      <Caret />
    </div>
  );
}
