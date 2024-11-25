import Image, { StaticImageData } from "next/image";
import { ActivitySection } from "../sections";
import clsx from "@/utils/clsx";
import { SectionName } from "@/hooks/useGetAboutTheAmazonContent";
import React from "react";

export interface VignetteSlide {
  _id: string;
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
}

export function VignetteSection({ slides, name }: VignetteSectionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const sectionRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  console.log({ slides, name });

  React.useEffect(() => {
    const currentSectionRef = sectionRefs.current;

    // Reset active index when scrolled to top
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.5, 1], // Detect at start, middle, and end of section
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = currentSectionRef.findIndex(
          (ref) => ref === entry.target,
        );

        if (index !== -1) {
          // Prioritize when section is more than 50% visible
          if (entry.intersectionRatio > 0.5) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    currentSectionRef.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      currentSectionRef.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <div className="relative h-[120px] bg-neutral-dark-700" />

      <section data-section-name={name} className="relative h-[2880px]">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`sticky top-0 h-[720px] w-full transition-all duration-700 ease-in-out ${
              index === activeIndex
                ? "z-10 opacity-100"
                : index < activeIndex
                  ? "z-0 opacity-30"
                  : "z-0 opacity-0"
            } `}
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
              className="absolute inset-x-0 top-0 h-[240px]"
            />

            <div
              style={{
                background:
                  "linear-gradient(180deg, #1E1F1B 0%, rgba(30, 31, 27, 0) 100%)",
              }}
              className="absolute inset-x-0 bottom-0 h-[240px] rotate-180"
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
                  <div className="my-2 h-1 w-8 bg-neutral-100" />
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
