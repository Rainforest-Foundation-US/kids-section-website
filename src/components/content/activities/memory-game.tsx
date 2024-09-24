import React from "react";
import Image, { StaticImageData } from "next/image";
import { v4 as uuid } from "uuid";
import { CommonActivityOptions } from "./common";

import cardBack from "@/assets/activities/memory-game/card-back.png";
import clsx from "@/utils/clsx";

interface MemoryCard {
  id?: string;
  image: StaticImageData;
  altText: string;
  matched?: boolean;
}

export interface MemoryGameActivityOptions {
  cards: MemoryCard[];
}

type MemoryGameActivityProps = React.PropsWithChildren<
  MemoryGameActivityOptions & CommonActivityOptions
>;

export function MemoryGame(props: MemoryGameActivityProps) {
  const [localCards, setLocalCards] = React.useState<MemoryCard[]>([]);
  const [choiceOne, setChoiceOne] = React.useState<MemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = React.useState<MemoryCard | null>(null);

  // It disables clicking on the cards. This is done to prevent the user from opening additional (3 or more) cards at the same time while
  // the animation for the first 2 cards is still running.
  const [disabled, setDisabled] = React.useState(false);

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
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const shuffleCards = React.useCallback(
    function shuffleCards() {
      const shuffledCards = [...props.cards, ...props.cards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: uuid(), matched: false }));

      setChoiceOne(null);
      setChoiceOne(null);
      setLocalCards(shuffledCards);
    },
    [props.cards],
  );

  React.useEffect(() => {
    // It starts the game
    shuffleCards();
  }, [shuffleCards]);

  function handleChoice(card: MemoryCard) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
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

      <div className="mx-auto mt-10 grid max-w-full grid-cols-6 gap-5 lg:px-12 xl:max-w-[80%]">
        {localCards.map((card) => (
          <Card
            key={card.id}
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
  card: MemoryCard;
  flipped: boolean;
  disabled: boolean;
  handleChoice: (card: MemoryCard) => void;
}

function Card({ card, flipped, disabled, handleChoice }: CardProps) {
  function handleClick() {
    if (disabled) return;

    handleChoice(card);
  }

  return (
    <div className="relative even:mt-3">
      <div className="cursor-pointer">
        <Image
          src={card.image}
          alt={card.altText}
          className={clsx(
            "absolute block aspect-square w-full rounded-lg border-2 border-solid border-secondary-100 object-cover shadow-app-lg shadow-shadow-green transition-all duration-200 ease-in [transform:rotateY(90deg)]",
            flipped && "delay-200 [transform:rotateY(0deg)]",
          )}
        ></Image>
        <Image
          src={cardBack}
          alt="Card back side"
          className={clsx(
            "block aspect-square w-full rounded-lg border-2 border-solid border-secondary-100 object-cover shadow-app-lg shadow-shadow-green transition-all delay-200 duration-200 ease-in",
            flipped && "delay-0 [transform:rotateY(90deg)]",
          )}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
