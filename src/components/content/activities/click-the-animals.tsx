import { PlacesType, Tooltip } from "react-tooltip";

export interface ClickTheAnimalsActivityOptions {
  defaultText: string;
}

const animals: {
  id: string;
  content: string;
  place: PlacesType;
  offset?: {
    x: number;
    y: number;
  };
}[] = [
  {
    id: "flamingo",
    content:
      "Many of us live in trees and plants, and with forests disappearing, it’s harder to find a home",
    place: "right-start",
    offset: {
      x: 10,
      y: -190,
    },
  },
  {
    id: "chameleon",
    content: "Without fewer plants, animals don’t have enough food",
    place: "right-start",
    offset: {
      x: -10,
      y: -80,
    },
  },
  {
    id: "butterfly",
    content:
      "When animals are pushed out of their homes, it’s becoming more difficult for them to coexist peacefully with humans",
    place: "right-start",
    offset: {
      x: 0,
      y: 0,
    },
  },
  {
    id: "parrot",
    content:
      "When large parts of forests are cut down, animals could become isolated and sick",
    place: "left-start",
    offset: {
      x: -10,
      y: -60,
    },
  },
  {
    id: "lemur",
    content:
      "My friends and I—all the plants and animals of the rainforest—need people to keep our home safe!",
    place: "left",
  },

  {
    id: "frog",
    content:
      "People around the world need a healthy rainforest, just as much as my friends and I do!",
    place: "left",
    offset: {
      x: 0,
      y: 0,
    },
  },
];

export function ClickTheAnimals({
  defaultText,
}: ClickTheAnimalsActivityOptions) {
  return (
    <div>
      <div className="text-xl font-medium leading-snug text-primary-600">
        {defaultText}
      </div>
      {animals.map((animal) => (
        <Tooltip
          key={animal.id}
          anchorSelect={`#${animal.id}`}
          content={animal.content}
          place={animal.place}
          border="1px solid green"
          className="!lg:max-w-96 !z-[100] !w-fit max-w-72 !rounded-md !bg-neutral-100 !text-2xl !text-primary-700 !opacity-100"
          middlewares={[
            {
              name: "offset",
              fn: ({ x, y }: { x: number; y: number }) => {
                return {
                  x: x + (animal.offset?.x ?? 0),
                  y: y + (animal.offset?.y ?? 0),
                };
              },
            },
          ]}
          openOnClick
        />
      ))}
    </div>
  );
}
