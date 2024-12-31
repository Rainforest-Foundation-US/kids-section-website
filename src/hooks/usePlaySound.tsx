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
      console.log("pausing sounds");
      Object.values(sounds.current).forEach((sound) => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
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
