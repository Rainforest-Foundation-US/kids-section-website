import { type PlacesType, Tooltip } from "react-tooltip";

export interface ClickTheAnimalsActivityOptions {
  defaultText: string;
  animals: {
    id: string;
    content: string;
    place: PlacesType;
    offset?: {
      x: number;
      y: number;
    };
  }[];
}

export function ClickTheAnimals({
  animals,
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
