"use client";
import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  wpm: number;
  errors: number;
  accuracy: number;
  state: State;
  onClose?: () => void;
};

export default function Results({
  wpm,
  errors,
  accuracy,
  state,
  onClose,
}: Props) {
  const [open, setOpen] = useState(true);
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  useEffect(() => {
    if (state === "finish") {
      setOpen(true);
    }
  }, [state]);

  if (state !== "finish") {
    return null;
  }

  return (
    <section className="">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen && onClose) onClose();
        }}
      >
        <form>
          <DialogContent className="py-10">
            <DialogHeader>
              <DialogTitle className="flex justify-center flex-col text-center font-mono text-yellow-950">
                <Icon
                  icon="streamline-pixel:food-drink-coffee"
                  width="32"
                  height="32"
                  className="mx-auto mb-5"
                />
                Your Coffee Type Results
              </DialogTitle>
              <DialogDescription>
                <ul className="flex flex-col items-center space-y-2 font-mono pt-10 text-md">
                  <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ ...duration, delay: 0.1 }}
                    className="text-yellow-800"
                  >
                    WPM: {wpm}
                  </motion.li>
                  <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ ...duration, delay: 0.5 }}
                    className="text-yellow-800"
                  >
                    Errors: {errors}
                  </motion.li>
                  <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ ...duration, delay: 0.8 }}
                    className="text-yellow-800"
                  >
                    Accuracy: {accuracy.toFixed(2)}%
                  </motion.li>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </form>
      </Dialog>
      {/* <motion.li
            initial={initial}
            animate={animate}
            transition={{ ...duration, delay: 0.1 }}
            className=""
          >
            Total Characters Typed: {totalTyped}
          </motion.li> */}
    </section>
  );
}
