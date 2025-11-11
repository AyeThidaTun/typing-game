type Props = {
  time: number;
};
export default function Countdown({ time }: Props) {
  return (
    <section className="flex justify-start px-30 md:px-100 pt-10 pb-5">
      <h5 className="text-yellow-700 font-mono">Time left: {time}</h5>
    </section>
  );
}