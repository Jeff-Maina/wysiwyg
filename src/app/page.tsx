"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import EditorComp from "./_components/editor";

const animVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};
export default function Home() {
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  return (
    <div className="p-4">
      {/* navbar */}
      <div className="relative">
        <button
          onClick={(e) => {
            setIsAboutVisible(!isAboutVisible);
          }}
          className="bg-neutral-200 relative z-20 py-1.5 px-4 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-300 transition-all duration-150 hover:text-black"
        >
          About
        </button>
        <AnimatePresence mode="wait">
          {isAboutVisible ? (
            <motion.div
              variants={animVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.2,
              }}
              className="absolute z-20 left-0 top-[140%] p-3 bg-neutral-200 max-w-sm rounded-lg text-sm text-neutral-700"
            >
              this is a recreation of slack's message input as a way to learn{" "}
              <b>Tiptap wysiwyg</b>
            </motion.div>
          ) : null}
        </AnimatePresence>
        {isAboutVisible ? (
          <div
            onClick={() => setIsAboutVisible(false)}
            className="w-[100vw] h-[100vh] fixed inset-0"
          ></div>
        ) : null}
      </div>

      {/* actual input */}
      <div className="w-full h-[90vh] mt-4 grid place-items-center">
        <EditorComp />
      </div>
    </div>
  );
}
