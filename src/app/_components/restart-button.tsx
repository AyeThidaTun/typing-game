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
    <section className="fixed bottom-22 left-0 right-0 flex justify-center">
      <button ref={buttonRef} onClick={handleClick}>
        <Icon icon="solar:restart-square-line-duotone" width="30" height="30"/>
      </button>
    </section>
  );
}
