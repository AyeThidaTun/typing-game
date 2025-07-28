import Faker from "./_components/random-words";
import Countdown from "./_components/countdown";
export default function HomePage() {
  return (
    <main className="">
      <p className="flex justify-center py-20  text-2xl font-mono">
        Welcome to Typo
      </p>
      <Countdown />
      <Faker />
    </main>
  );
}
