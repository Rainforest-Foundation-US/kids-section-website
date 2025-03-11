import React from "react";
import Image, { StaticImageData } from "next/image";
import { v4 as uuid } from "uuid";
import sampleSize from "lodash/sampleSize";
import { CommonActivityOptions } from "./common";

import clsx from "@/utils/clsx";
import { congratulationsAtom } from "@/components/congratulations";
import { useAtom } from "jotai";
import { usePlaySounds } from "@/hooks/usePlaySound";

interface MemoryCard {
  id?: string;
  image: StaticImageData;
  text: string;
  matched?: boolean;
}

export interface MemoryGameActivityOptions {
  cards: MemoryCard[];
  backCardImage: StaticImageData;
  backCardImageAlt: string;
}

type MemoryGameActivityProps = React.PropsWithChildren<
  MemoryGameActivityOptions & CommonActivityOptions
>;

const MAX_UNIQUE_CARDS_IN_THE_GAME = 9;

export function MemoryGame(props: MemoryGameActivityProps) {
  const [congratulations, setCongratulations] = useAtom(congratulationsAtom);
  const [cardsLeft, setCardsLeft] = React.useState(
    MAX_UNIQUE_CARDS_IN_THE_GAME,
  );
  const [localCards, setLocalCards] = React.useState<MemoryCard[]>([]);
  const [choiceOne, setChoiceOne] = React.useState<MemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = React.useState<MemoryCard | null>(null);

  // It disables clicking on the cards. This is done to prevent the user from opening additional (3 or more) cards at the same time while
  // the animation for the first 2 cards is still running.
  const [disabled, setDisabled] = React.useState(false);

  const { playSound } = usePlaySounds();

  React.useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.image.src === choiceTwo.image.src) {
        setLocalCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image.src === choiceOne.image.src) {
              return { ...card, matched: true };
            }

            return card;
          });
        });
        setCardsLeft((prev) => prev - 1);
        resetTurn();
        playSound("correct");
      } else {
        setTimeout(() => {
          resetTurn();
        }, 2000);
        playSound("incorrect");
      }
    }
  }, [choiceOne, choiceTwo, playSound]);

  const shuffleCards = React.useCallback(
    function shuffleCards() {
      const randomlyPickedCards = sampleSize(
        props.cards,
        MAX_UNIQUE_CARDS_IN_THE_GAME,
      );
      const shuffledCards = [...randomlyPickedCards, ...randomlyPickedCards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: uuid(), matched: false }));

      setChoiceOne(null);
      setChoiceOne(null);
      setLocalCards(shuffledCards);
      setCardsLeft(MAX_UNIQUE_CARDS_IN_THE_GAME);
    },
    [props.cards],
  );

  React.useEffect(() => {
    if (cardsLeft === 0) {
      playSound("congratulations");
      setCongratulations({ ...congratulations, [props.name]: true });
      shuffleCards();
    }
  }, [
    cardsLeft,
    props.name,
    congratulations,
    setCongratulations,
    shuffleCards,
    playSound,
  ]);

  React.useEffect(() => {
    // It starts the game
    shuffleCards();
  }, [shuffleCards]);

  function handleChoice(card: MemoryCard) {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  return (
    <div>
      <h1 className="flex justify-center text-3xl font-normal leading-snug text-neutral-dark-700 md:text-5xl">
        Memory Game
      </h1>

      <div className="mx-auto mt-7 grid max-w-full grid-cols-6 gap-5 xl:max-w-[80%] xl:px-12 2xl:max-w-[50%]">
        {localCards.map((card, index) => (
          <Card
            key={card.id}
            index={index}
            backCardImage={props.backCardImage}
            backCardImageAlt={props.backCardImageAlt}
            card={card}
            // We show the face of the card if it's chosen in the current turn, or it's already matched with it's pair card.
            flipped={Boolean(
              card.id === choiceOne?.id ||
                card.id === choiceTwo?.id ||
                card.matched,
            )}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  index: number;
  card: MemoryCard;
  backCardImage: StaticImageData;
  backCardImageAlt: string;
  flipped: boolean;
  disabled: boolean;
  handleChoice: (card: MemoryCard) => void;
}

function Card({
  index,
  card,
  flipped,
  disabled,
  backCardImage,
  backCardImageAlt,
  handleChoice,
}: CardProps) {
  const [shouldRenderText, setShouldRenderText] = React.useState(false);

  React.useEffect(() => {
    if (flipped) {
      setTimeout(() => {
        setShouldRenderText(true);
      }, 350);
    } else {
      setShouldRenderText(false);
    }
  }, [flipped]);

  function handleClick() {
    if (disabled) return;

    handleChoice(card);
  }

  const textPositionClass = index % 2 === 0 ? "bottom-6" : "bottom-2";

  return (
    <div className="relative even:pt-3">
      <div className="cursor-pointer">
        <Image
          src={card.image}
          alt={card.text}
          className={clsx(
            "absolute block aspect-square w-full rounded-lg border-2 border-solid border-secondary-100 object-cover shadow-app-lg shadow-shadow-green transition-all duration-200 ease-in [transform:rotateY(90deg)]",
            flipped && "delay-200 [transform:rotateY(0deg)]",
          )}
          draggable={false}
        />

        {shouldRenderText && (
          <div
            className={clsx(
              "pointer-events-none absolute left-1 rounded-sm bg-neutral-dark-800 bg-opacity-40 px-1 text-neutral-100",
              textPositionClass,
            )}
          >
            <p>{card.text}</p>
          </div>
        )}

        <Image
          src={backCardImage}
          alt={backCardImageAlt}
          className={clsx(
            "block aspect-square w-full rounded-lg border-2 border-solid border-secondary-100 object-cover shadow-app-lg shadow-shadow-green transition-all delay-200 duration-200 ease-in",
            flipped && "delay-0 [transform:rotateY(90deg)]",
          )}
          onClick={handleClick}
          draggable={false}
        />
      </div>
    </div>
  );
}
