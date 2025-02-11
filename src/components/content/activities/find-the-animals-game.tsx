import { CommonActivityOptions } from "./common";
import { PlacesType, Tooltip, TooltipRefProps } from "react-tooltip";
import type { PropsWithChildren } from "react";
import React from "react";

export interface FindTheAnimalsGameActivityOptions {
  test?: string[];
}

type FindTheAnimalsGameActivityProps = PropsWithChildren<
  FindTheAnimalsGameActivityOptions & CommonActivityOptions
>;

interface Animal {
  id: string;
  name: string;
  tooltipPlace: PlacesType;
}

const animals: Animal[] = [
  {
    id: "tamarin-monkey",
    name: "Tamarin monkey",
    tooltipPlace: "top",
  },
  {
    id: "harpy-eagle",
    name: "Harpy eagle",
    tooltipPlace: "top-end",
  },
  {
    id: "harmonia-tigerwing-butterfly",
    name: "Harmonia tigerwing butterfly",
    tooltipPlace: "top",
  },
  {
    id: "toucan",
    name: "Toucan",
    tooltipPlace: "top-end",
  },
  {
    id: "collared-peccary",
    name: "Collared peccary",
    tooltipPlace: "bottom-start",
  },
  {
    id: "blue-morpho-butterfly",
    name: "Blue morpho butterfly",
    tooltipPlace: "top",
  },
  {
    id: "jaguar",
    name: "Jaguar",
    tooltipPlace: "right",
  },
  {
    id: "anaconda",
    name: "Anaconda",
    tooltipPlace: "bottom-end",
  },
  {
    id: "red-macaw",
    name: "Red macaw",
    tooltipPlace: "top",
  },
  {
    id: "woolly-monkey",
    name: "Woolly monkey",
    tooltipPlace: "right",
  },
  {
    id: "blue-macaw",
    name: "Blue macaw",
    tooltipPlace: "right-start",
  },
  {
    id: "hummingbirds",
    name: "Hummingbirds",
    tooltipPlace: "top",
  },
  {
    id: "golden-poison-frog",
    name: "Golden poison frog",
    tooltipPlace: "top",
  },
  {
    id: "yellow-eyelash-viper",
    name: "Yellow eyelash viper",
    tooltipPlace: "bottom",
  },
  {
    id: "capybaras",
    name: "Capybaras",
    tooltipPlace: "top",
  },
  {
    id: "ocelot",
    name: "Ocelot",
    tooltipPlace: "left",
  },
  {
    id: "armadillo",
    name: "Armadillo or cingulata",
    tooltipPlace: "left",
  },
  {
    id: "fruit-eating-bat",
    name: "Fruit-eating bat",
    tooltipPlace: "top",
  },
  {
    id: "amazon-kingfisher",
    name: "Amazon kingfisher",
    tooltipPlace: "top",
  },
  {
    id: "sloth",
    name: "Three-toed sloth (that's me!)",
    tooltipPlace: "left",
  },
] as const;

function getOffset(rect: DOMRect, tooltipPlace: PlacesType) {
  switch (tooltipPlace) {
    case "top":
      return { x: rect.width / 2, y: 0 };
    case "top-start":
      return { x: 0, y: 0 };
    case "top-end":
      return { x: rect.width, y: 0 };
    case "right":
      return { x: rect.width, y: rect.height / 2 };
    case "right-start":
      return { x: rect.width, y: 0 };
    case "right-end":
      return { x: rect.width, y: rect.height };
    case "bottom":
      return { x: rect.width / 2, y: rect.height };
    case "bottom-start":
      return { x: 0, y: rect.height };
    case "bottom-end":
      return { x: rect.width, y: rect.height };
    case "left":
      return { x: 0, y: rect.height / 2 };
    case "left-start":
      return { x: 0, y: 0 };
    case "left-end":
      return { x: 0, y: rect.height };
  }
}

export function FindTheAnimalsGame(props: FindTheAnimalsGameActivityProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const tooltipRef = React.useRef<TooltipRefProps>(null);

  React.useEffect(() => {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      if (!iframe?.contentDocument) {
        return;
      }

      const iframeDoc = iframe.contentDocument;
      const iframeRect = iframe.getBoundingClientRect();

      animals.forEach((animal) => {
        const animalElement = iframeDoc.getElementById(`${animal.id}-outline`);

        if (animalElement) {
          // Hide outline initially
          animalElement.style.opacity = "0";

          // Get element position
          const rect = animalElement.getBoundingClientRect();

          const offset = getOffset(rect, animal.tooltipPlace);

          // Calculate absolute position (relative to the page)
          const absolutePosition = {
            x: rect.left + iframeRect.left + offset.x,
            y: rect.top + iframeRect.top + offset.y,
          };

          if (animal.id === "sloth") {
            tooltipRef.current?.open({
              position: absolutePosition,
              place: animal.tooltipPlace,
              content: "How many of my rainforest friends can you find?",
            });
          }

          animalElement.addEventListener("click", function animalElementClickHandler() {
            // Turn on outline visibility
            animalElement.style.opacity = "1";

            tooltipRef.current?.open({
              position: absolutePosition,
              place: animal.tooltipPlace,
              content: animal.name,
            });
          });
        }
      });
    };

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  return (
    <div className="h-full w-full md:w-5/6">
      <iframe
        ref={iframeRef}
        src="/rainforest.html"
        className="h-full w-full"
        style={{ aspectRatio: "7408.16/4697.1" }} // This is the SVG size inside the rainforest.html file
      />
      <Tooltip
        ref={tooltipRef}
        className="!w-fit !max-w-48 !rounded-md !bg-neutral-100 !text-primary-700 !opacity-95"
      />
    </div>
  );
}
