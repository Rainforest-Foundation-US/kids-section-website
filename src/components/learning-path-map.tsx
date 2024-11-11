import tailwindConfig from "tailwind.config";
import { IconChevronUp, MapIcon } from "./icons/icons";
import { animated, config, useSpring } from "@react-spring/web";
import { useMeasure } from "@/utils/hooks";
import clsx from "@/utils/clsx";
import React from "react";
import { useHomeSectionNavigation } from "./sections";
import { SectionName } from "@/hooks/useGetAboutTheAmazonContent";
import { getNavigation } from "@/sanity/lib/queries";

const AnimatedIconChevronUp = animated(IconChevronUp);

export function LearningPath() {
  const { onGoToSection } = useHomeSectionNavigation();
  const [containerRef, size] = useMeasure<HTMLDivElement>();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [learningPath, setLearningPath] = React.useState<
    { id: SectionName; title: string }[]
  >([]);
  const [activeActivity, setActiveActivity] = React.useState<
    SectionName | undefined
  >(undefined);

  React.useEffect(() => {
    getNavigation().then((data) => {
      const path = data.paths.map((path) => ({
        id: path.id,
        title: path.name,
      }));

      setActiveActivity(path?.[0]?.id ?? undefined);
      setLearningPath(path);
    });
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      let newActiveSection = null;

      for (const section of learningPath) {
        const element = document.querySelector(
          `[data-section-name="${section.id}"]`,
        );
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 0 && bottom > 0) {
            newActiveSection = section;
            break;
          }
        }
      }

      setActiveActivity((prev) => newActiveSection?.id ?? prev);

      if (
        window.scrollY > parseInt(tailwindConfig.theme.extend.height.header)
      ) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [learningPath]);

  const learningPathStyle = useSpring({
    from: {
      width: 289,
      height: "auto",
      display: "block",
    },
    to: {
      width: isCollapsed ? 64 : 289,
      height: isCollapsed ? 64 : "auto",
      display: isCollapsed ? "flex" : "block",
    },
    config: config.stiff,
  });
  const containerStyles = useSpring({
    from: {
      height: 0,
    },
    to: {
      height: isCollapsed ? 0 : size.scrollHeight,
    },
    config: config.stiff,
  });
  const chevronStyles = useSpring({
    transform: "rotateY(0deg) rotateX(0deg)",
    config: config.stiff,
  });

  const collapse = () => {
    setIsCollapsed((v) => !v);
  };

  return (
    <animated.div
      role="menu"
      className={clsx(
        "fixed right-10 overflow-hidden rounded-2xl border-1 border-neutral-600 bg-[rgba(250,245,238,0.8)] shadow-app-lg shadow-shadow-gray",
        isScrolled ? "top-[10px]" : "top-[110px]",
      )}
      style={learningPathStyle}
    >
      <div className="cursor-pointer items-center" onClick={collapse}>
        {isCollapsed ? (
          <div className="flex justify-center p-[18px]">
            <MapIcon />
          </div>
        ) : (
          <div className="flex justify-between p-6 text-xl text-neutral-dark-500">
            <p>Learning Path</p>

            <button type="button">
              <AnimatedIconChevronUp style={chevronStyles} />
            </button>
          </div>
        )}
      </div>

      <animated.div
        role="menuitem"
        aria-expanded={isCollapsed}
        style={containerStyles}
        className="overflow-hidden"
      >
        <div ref={containerRef}>
          <div className="border-b-1 border-neutral-600" />

          <div className="space-y-7 p-6">
            <div className="relative ml-1">
              <div className="absolute bottom-2 top-2 w-[1px] translate-x-3 bg-neutral-500" />

              <ul className="space-y-2">
                {learningPath.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex cursor-pointer flex-row items-center space-x-6 pl-2"
                    onClick={() => {
                      onGoToSection(activity.id, () => {
                        setActiveActivity(activity.id);
                      });
                    }}
                  >
                    <span className="block h-2 w-2 rounded-full bg-neutral-500" />

                    <p
                      className={clsx(
                        activeActivity === activity.id
                          ? "text-primary-600"
                          : "text-neutral-dark-300",
                      )}
                    >
                      {activity.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
}
