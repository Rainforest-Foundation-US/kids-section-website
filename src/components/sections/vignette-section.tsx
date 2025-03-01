import Image, { StaticImageData } from "next/image";
import clsx from "@/utils/clsx";
import { SectionName } from "@/hooks/useGetDiscoverTheAmazonContent";
import React from "react";
import { HintContent } from "../hint-content";

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
  const [isLastSlide, setIsLastSlide] = React.useState(false);
  const [isFirstSlide, setIsFirstSlide] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isTransitioning = React.useRef(false);
  const touchStart = React.useRef<number | null>(null);
  const lastWheelTime = React.useRef(0);

  const handleScroll = React.useCallback(
    (deltaY: number) => {
      if (!containerRef.current) return false;

      const rect = containerRef.current.getBoundingClientRect();
      const now = Date.now();

      // Only activate when section is almost fully in viewport
      const isAlmostFullyVisible =
        rect.top <= window.innerHeight * 0.2 &&
        rect.bottom >= window.innerHeight * 0.8;

      // If we're not in the active zone, reset states and allow normal scroll
      if (!isAlmostFullyVisible) {
        isTransitioning.current = false;
        return false;
      }

      // Debounce rapid events
      if (now - lastWheelTime.current < 40) {
        return true;
      }
      lastWheelTime.current = now;

      // Allow normal scroll if:
      // 1. On last slide and scrolling down
      // 2. On first slide and scrolling up
      if ((isLastSlide && deltaY > 0) || (isFirstSlide && deltaY < 0)) {
        isTransitioning.current = false;
        return false;
      }

      // Don't process new events during transition
      if (isTransitioning.current) return true;

      const scrollingDown = deltaY > 0;

      if (scrollingDown && activeIndex < slides.length - 1) {
        isTransitioning.current = true;
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => {
          isTransitioning.current = false;
        }, 700);
        return true;
      } else if (!scrollingDown && activeIndex > 0) {
        isTransitioning.current = true;
        setActiveIndex((prev) => prev - 1);
        setTimeout(() => {
          isTransitioning.current = false;
        }, 700);
        return true;
      }

      return true;
    },
    [activeIndex, slides.length, isLastSlide, isFirstSlide],
  );

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const shouldPreventDefault = handleScroll(e.deltaY);
      if (shouldPreventDefault) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart.current) return;

      const touchEnd = e.touches[0].clientY;
      const delta = touchStart.current - touchEnd;

      // Only prevent default if we're handling the scroll
      if (Math.abs(delta) > 5) {
        // Add a small threshold to detect intentional scrolls
        const shouldPreventDefault = handleScroll(delta);
        if (shouldPreventDefault) {
          e.preventDefault();
        }
      }

      touchStart.current = touchEnd;
    };

    // Add both wheel and touch event listeners
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleScroll]);

  // Update isLastSlide and isFirstSlide when activeIndex changes
  React.useEffect(() => {
    setIsLastSlide(activeIndex === slides.length - 1);
    setIsFirstSlide(activeIndex === 0);
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
                  "break-all text-7xl font-medium text-neutral-100 transition-all duration-700",
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                {slide.title}
              </p>

              <p
                className={clsx(
                  "my-2 text-base text-secondary-100 transition-all duration-700",
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
