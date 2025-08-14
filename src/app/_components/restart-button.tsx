import { Icon } from "@iconify/react";
import { useRef } from "react";

export default function RestartButton({
  onRestart: handleRestart,
}: {
  onRestart: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <section className="py-10 px-30 md:px-100 flex justify-center">
      <button ref={buttonRef} onClick={handleClick}>
        <Icon
          icon="solar:restart-circle-bold"
          className="text-4xl text-gray-400"
        />
      </button>
    </section>
  );
}
