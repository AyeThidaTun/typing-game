import UserInput from "./user-input";

type Props = {
  words: string;
  typed: string;
};

export default function Faker({ words, typed }: Props) {
  return (
    <div className="relative leading-relaxed">
      <section className="flex flex-col justify-center">
        <p className="text-start text-lg leading-9 font-mono text-gray-500">
          {words}
        </p>
        <UserInput characters={typed} words={words} />
      </section>
    </div>
  );
}
