import {
  FlamingoAndChameleonIllustration,
  HangingSlothOnTreeIllustration,
  TopLeftBushIllustration,
  RightBushIllustration,
} from "./illustrations/activities-illustrations";
import { motion } from "framer-motion";
import { AppButton } from "./buttons";
import { atom, useAtom } from "jotai";
import { SectionNames } from "./content/content";

type CongratulationsAtomValue = Record<SectionNames, boolean>;
export const congratulationsAtom = atom<Partial<CongratulationsAtomValue>>({
  "what-are-rainforests-quiz": false,
  "rainforests-are-important-quiz": false,
  "climate-change-quiz": false,
  "memory-game": false,
});

export function Congratulations({ name }: { name: SectionNames }) {
  const [congratulations, setCongratulations] = useAtom(congratulationsAtom);

  // Define animation variants
  const variants = {
    topLeft: { opacity: 0, x: -500 }, // For LeftBushIllustration
    topRight: { opacity: 0, y: -500 }, // For HangingSlothOnTreeIllustration
    bottomLeft: { opacity: 0, y: 500 }, // For FlamingoAndChameleonIllustration
    bottomRight: { opacity: 0, x: 500 }, // For RightBushIllustration
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full">
      <motion.div
        className="absolute inset-0 bg-primary-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Adjust opacity as needed
        transition={{ duration: 0.5 }} // Duration for the fade-in effect
      />

      <motion.div
        className="absolute left-0 top-0 h-1/2 w-1/2"
        initial="topLeft"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <TopLeftBushIllustration className="absolute left-0 top-0 h-auto max-h-full w-auto max-w-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 h-1/2 w-1/2"
        initial="bottomRight"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <RightBushIllustration className="absolute bottom-0 right-0 h-auto max-h-full w-auto max-w-full" />
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 h-full w-full"
        initial="topRight"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <HangingSlothOnTreeIllustration className="absolute right-8 top-0 h-auto max-h-full w-auto max-w-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 h-full w-full"
        initial="bottomLeft"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <FlamingoAndChameleonIllustration className="absolute bottom-0 left-0 h-auto max-h-full w-auto max-w-full" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-white mb-4 text-6xl font-bold">Congratulations!</h1>
        <p className="text-white mb-6 text-2xl">
          Great job on finishing the game!
        </p>
        <AppButton
          variant="primary"
          onClick={() => {
            setCongratulations({ ...congratulations, [name]: false });
          }}
        >
          New Game
        </AppButton>
      </motion.div>
    </div>
  );
}
