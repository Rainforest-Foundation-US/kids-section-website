import Image, { StaticImageData } from "next/image";
import clsx from "@/utils/clsx";
import { SectionName } from "@/hooks/useGetDiscoverTheAmazonContent";
import React from "react";
import { HintContent } from "../hint-content";
import { GoToButton } from "../buttons";

export interface VignetteSlide {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  image: {
    data: string | StaticImageData;
    alt: string;
    height: number;
    width: number;
  };
  body?: string;
  imageAlignment?: "start" | "middle" | "end";
}
export interface VignetteSectionOptions {
  slides: VignetteSlide[];
}

interface VignetteSectionProps extends VignetteSectionOptions {
  name?: SectionName;
  defaultHintContent?: { hint: string };
}

export function VignetteSection({
  slides,
  name,
  defaultHintContent,
}: VignetteSectionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Navigation functions
  const goToNextSlide = React.useCallback(() => {
    if (activeIndex === slides.length - 1) {
      // If last slide, wrap to first slide
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => prev + 1);
    }
  }, [activeIndex, slides.length]);

  const goToPrevSlide = React.useCallback(() => {
    if (activeIndex === 0) {
      // If first slide, wrap to last slide
      setActiveIndex(slides.length - 1);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  }, [activeIndex, slides.length]);

  return (
    <>
      <div className="relative h-[120px] bg-neutral-dark-700" />

      <section
        ref={containerRef}
        data-section-name={name}
        className="relative h-[80svh]"
      >
        {defaultHintContent && (
          <HintContent
            name={name}
            hintContent={{ text: defaultHintContent.hint }}
          />
        )}

        {/* Left Arrow Navigation */}
        <GoToButton
          direction="left"
          onClick={goToPrevSlide}
          disabled={false}
          className="absolute bottom-12 left-1/3 z-20"
        />
        {/* Right Arrow Navigation */}
        <GoToButton
          direction="right"
          onClick={goToNextSlide}
          disabled={false}
          className="absolute bottom-12 right-1/3 z-20"
        />

        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 h-full w-full transition-all duration-700 ease-in-out ${
              index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                className={clsx("absolute inset-0 h-full w-full object-cover")}
                src={slide.image.data}
                height={slide.image.height}
                width={slide.image.width}
                alt={slide.image.alt}
                aria-hidden
              />
            </div>

            <div
              style={{
                background:
                  "linear-gradient(180deg, #1E1F1B 0%, rgba(30, 31, 27, 0) 100%)",
              }}
              className="absolute inset-x-0 top-0 h-[120px]"
            />

            <div
              style={{
                background:
                  "linear-gradient(180deg, #1E1F1B 0%, rgba(30, 31, 27, 0) 100%)",
              }}
              className="absolute inset-x-0 bottom-0 h-[120px] rotate-180"
            />

            <div className="relative z-20 flex h-full flex-col items-center justify-center p-10 text-center">
              <p
                className={clsx(
                  "break-all text-7xl font-semibold text-neutral-100 transition-all duration-700",
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                {slide.title}
              </p>

              <p
                className={clsx(
                  "my-2 text-base font-semibold text-neutral-100 transition-all duration-700",
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                {slide.subtitle}
              </p>

              {slide.body && (
                <div
                  className={clsx(
                    "transition-all duration-700",
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0",
                  )}
                >
                  <div className="my-2 h-1 w-24 justify-self-center bg-neutral-100/75" />
                  <p className="my-2 max-w-xl text-base text-secondary-100">
                    {slide.body}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
