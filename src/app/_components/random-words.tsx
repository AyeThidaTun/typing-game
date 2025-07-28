import { faker } from "@faker-js/faker";

const words = faker.word.words(50);
export default function Faker() {
  return (
    <section className="flex justify-center px-100">
      <p className="text-start text-lg leading-9 font-mono text-gray-300">{words}</p>
    </section>
  );
}
