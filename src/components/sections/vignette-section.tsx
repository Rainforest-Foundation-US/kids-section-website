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
  hintContent?: { hint: string };
}
export interface VignetteSectionOptions {
  slides: VignetteSlide[];
}

interface VignetteSectionProps extends VignetteSectionOptions {
  name?: SectionName;
}

export function VignetteSection({ slides, name }: VignetteSectionProps) {
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
        {/* Left Arrow Navigation */}
        <GoToButton
          direction="left"
          onClick={goToPrevSlide}
          disabled={false}
          className="absolute bottom-12 left-1/4 z-20 md:left-1/3"
        />
        {/* Right Arrow Navigation */}
        <GoToButton
          direction="right"
          onClick={goToNextSlide}
          disabled={false}
          className="absolute bottom-12 right-1/4 z-20 md:right-1/3"
        />

        {slides.map((slide, index) => (
          <React.Fragment key={slide._id}>
            {slide.hintContent?.hint && index === activeIndex && (
              <HintContent
                name={name}
                hintContent={{ text: slide.hintContent.hint }}
              />
            )}

            <div
              className={`absolute inset-0 h-full w-full transition-all duration-700 ease-in-out ${
                index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              <div className="absolute inset-0">
                <Image
                  className={clsx(
                    "absolute inset-0 h-full w-full object-cover",
                  )}
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

              <p
                className={clsx(
                  "absolute left-1/2 top-32 w-max -translate-x-1/2 break-all text-5xl font-semibold text-neutral-100 transition-all duration-700 md:top-8 md:text-7xl",
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                {slide.title}
              </p>

              <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
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
                    <p className="my-2 max-w-xl text-base text-secondary-100">
                      {slide.body}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </section>
    </>
  );
}
