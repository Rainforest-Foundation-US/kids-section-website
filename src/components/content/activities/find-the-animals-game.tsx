import { CommonActivityOptions } from "./common";
import { Tooltip, TooltipRefProps } from "react-tooltip";
import type { PropsWithChildren } from "react";
import React from "react";

export interface FindTheAnimalsGameActivityOptions {
  test?: string[];
}

type FindTheAnimalsGameActivityProps = PropsWithChildren<
  FindTheAnimalsGameActivityOptions & CommonActivityOptions
>;

const animals = [
  "tamarin-monkey",
  "harpy-eagle",
  "harmonia-tigerwing-butterfly",
  "toucan",
  "collared-peccary",
  "blue-morpho-butterfly",
  "jaguar",
  "anaconda",
  "red-macaw",
  "woolly-monkey",
  "blue-macaw",
  "hummingbirds",
  "golden-poison-frog",
  "yellow-eyelash-viper",
  "capybaras",
  "ocelot",
  "armadillo",
  "fruit-eating-bat",
  "amazon-kingfisher",
  "sloth",
];

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

      animals.forEach((animalName) => {
        const animalElements = iframeDoc.querySelectorAll(
          `[id^=${animalName}]`,
        );
        const animalOutlineElement = iframeDoc.getElementById(
          `${animalName}-outline`,
        );

        animalElements.forEach((animalElement) => {
          if (animalElement && animalOutlineElement) {
            // Hide outline initially
            animalOutlineElement.style.opacity = "0";

            animalElement.addEventListener(
              "click",
              function animalElementOnClick() {
                // Get element position
                const rect = animalElement.getBoundingClientRect();
                const iframeRect = iframe.getBoundingClientRect();

                // Calculate absolute position (relative to the page)
                const absolutePosition = {
                  x: rect.left + iframeRect.left + rect.width / 2,
                  y: rect.top + iframeRect.top,
                };

                // Toggle outline visibility
                animalOutlineElement.style.opacity =
                  animalOutlineElement.style.opacity === "0" ? "1" : "0";
                tooltipRef.current?.open({
                  position: absolutePosition,
                  place: "top",
                  content: "Test", // TODO
                });
              },
            );
          }
        });
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
    <div className="h-screen w-4/5">
      <iframe
        ref={iframeRef}
        src="/rainforest.html"
        className="h-full w-full"
      />
      <Tooltip ref={tooltipRef} />
    </div>
  );
}
