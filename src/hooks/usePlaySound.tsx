import { getSounds } from "@/sanity/lib/queries";
import React from "react";

export function usePlaySounds() {
  const sounds = React.useRef<{
    correct: HTMLAudioElement | null;
    incorrect: HTMLAudioElement | null;
    congratulations: HTMLAudioElement | null;
  }>({ correct: null, incorrect: null, congratulations: null });

  React.useEffect(() => {
    async function fetchSounds() {
      const soundUrls = await getSounds();

      sounds.current = {
        correct: new Audio(soundUrls.correct),
        incorrect: new Audio(soundUrls.incorrect),
        congratulations: new Audio(soundUrls.congratulations),
      };
    }

    if (sounds.current.correct === null) {
      fetchSounds();
    }

    return () => {
      if (sounds.current.correct) {
        sounds.current.correct.pause();
        sounds.current.correct.currentTime = 0;
      }
      if (sounds.current.incorrect) {
        sounds.current.incorrect.pause();
        sounds.current.incorrect.currentTime = 0;
      }
    };
  }, []);

  const playSound = React.useCallback(
    (type: "correct" | "incorrect" | "congratulations") => {
      const sound = sounds.current[type];
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }
    },
    [],
  );

  return { playSound };
}
