import { PlacesType, Tooltip, TooltipRefProps } from "react-tooltip";
import React from "react";
import { AppButton } from "@/components/buttons";

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

export function FindTheAnimalsGame() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const tooltipRef = React.useRef<TooltipRefProps>(null);
  const isLoadedRef = React.useRef(false);
  const animalElementsRef = React.useRef<{
    [key: string]: {
      element: HTMLElement;
      clickHandler: (e: MouseEvent) => void;
    };
  }>({});

  // Function to calculate positions
  const updatePositions = React.useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;

    const iframeRect = iframe.getBoundingClientRect();

    Object.entries(animalElementsRef.current).forEach(
      ([animalId, { element }]) => {
        const animal = animals.find((a) => a.id === animalId);
        if (!animal) return;

        const rect = element.getBoundingClientRect();
        const offset = getOffset(rect, animal.tooltipPlace);

        // Store the position in the click handler
        animalElementsRef.current[animalId].clickHandler = () => {
          element.style.opacity = "1";
          const currentRect = element.getBoundingClientRect();
          const currentOffset = getOffset(currentRect, animal.tooltipPlace);
          const currentPosition = {
            x: currentRect.left + currentOffset.x + iframeRect.left,
            y: currentRect.top + currentOffset.y + iframeRect.top,
          };

          tooltipRef.current?.open({
            position: currentPosition,
            place: animal.tooltipPlace,
            content: animal.name,
          });
        };

        // Update sloth tooltip position
        if (animal.id === "sloth" && !isLoadedRef.current) {
          tooltipRef.current?.open({
            position: {
              x: rect.left + offset.x + iframeRect.left,
              y: rect.top + offset.y + iframeRect.top,
            },
            place: animal.tooltipPlace,
            content:
              "Click on my friends to reveal their names! Can you find all 20?",
          });
          isLoadedRef.current = true;
        }
      },
    );
  }, []);

  const handleReset = React.useCallback(() => {
    Object.values(animalElementsRef.current).forEach(({ element }) => {
      element.style.opacity = "0";
    });
    tooltipRef.current?.close();
    isLoadedRef.current = false;
    updatePositions();
  }, [updatePositions]);

  React.useLayoutEffect(() => {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      if (!iframe?.contentDocument) return;

      const iframeDoc = iframe.contentDocument;

      animals.forEach((animal) => {
        const animalElement = iframeDoc.getElementById(`${animal.id}-outline`);
        if (!animalElement) return;

        // Hide outline initially
        animalElement.style.opacity = "0";

        // Initialize with dummy click handler
        animalElementsRef.current[animal.id] = {
          element: animalElement,
          clickHandler: () => {},
        };

        animalElement.addEventListener("click", (e) => {
          animalElementsRef.current[animal.id].clickHandler(e);
        });
      });

      updatePositions();
    };

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    // Add event listeners for various scenarios that might affect positioning
    window.addEventListener("scroll", updatePositions);
    window.addEventListener("resize", updatePositions);

    // Create an intersection observer to update positions when the component becomes visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updatePositions();
      }
    });

    if (iframe) {
      observer.observe(iframe);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
        observer.unobserve(iframe);
      }
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);

      // Cleanup event listeners
      Object.values(animalElementsRef.current).forEach(
        ({ element, clickHandler }) => {
          element.removeEventListener("click", clickHandler);
        },
      );
      animalElementsRef.current = {};
    };
  }, [updatePositions]);

  return (
    <div className="relative h-full w-full lg:w-5/6">
      <iframe
        ref={iframeRef}
        src="/rainforest.html"
        className="h-full w-full"
        style={{ aspectRatio: "7408.16/4697.1" }} // This is the SVG size inside the rainforest.html file
      />
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
        <AppButton variant="primary" size="small" onClick={handleReset}>
          Start over
        </AppButton>
      </div>
      <Tooltip
        ref={tooltipRef}
        className="!w-fit !max-w-48 !rounded-md !bg-neutral-100 !text-primary-700 !opacity-95"
      />
    </div>
  );
}
