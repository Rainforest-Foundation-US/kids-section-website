import Image from "next/image";
import { AppButton, NavBarLink } from "./buttons";
import { IconChevronUp, IconHeart } from "./icons/icons";
import { useState } from "react";
import { animated, config, useSpring } from "@react-spring/web";
import { useMeasure } from "@/utils/hooks";
import clsx from "clsx";

export function NavBar() {
  return (
    <header className="relative pt-6 pb-2 z-10 border-b-1 border-neutral-500 flex mx-6 flex-row justify-between">
      <Image
        src="/large-logo.png"
        height={66}
        width={262}
        priority
        alt="Rainforest Logo"
      />

      <div className="flex-row space-x-2 items-center hidden md:flex">
        <NavBarLink href="/">Home</NavBarLink>
        <NavBarLink href="/about-the-amazon">About the Amazon</NavBarLink>
        <NavBarLink href="/narratives">Narratives</NavBarLink>
        <NavBarLink href="/q-and-a">Q&A</NavBarLink>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-dark-700 py-10">
      <div className="max-w-[1022px] w-full mx-auto">
        <div className="flex flex-row justify-between items-center">
          <Image
            src="/large-logo-white.png"
            height={66}
            width={262}
            alt="Rainforest Logo"
          />

          <nav>
            <ul>
              {/* <li>
                <a href="/">Home</a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const AnimatedIconChevronUp = animated(IconChevronUp);

export function LearningPath() {
  const [containerRef, size] = useMeasure<HTMLDivElement>();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    transform: isCollapsed
      ? "rotateY(180deg) rotateX(180deg)"
      : "rotateY(0deg) rotateX(0deg)",
    config: config.stiff,
  });

  const collapse = () => {
    setIsCollapsed((v) => !v);
  };

  const learningPath = [
    {
      id: "0",
      number: 1,
      title: "Defining Amazonia",
      activities: [
        {
          id: "0",
          title: "General definition",
        },
        {
          id: "1",
          title: "Visualize the Amazon",
        },
        {
          id: "2",
          title: "Biodiversity",
        },
        {
          id: "3",
          title: "Global climate",
        },
        {
          id: "4",
          title: "Threats",
        },
        {
          id: "5",
          title: "IPs",
        },
      ],
    },
    {
      id: "1",
      number: 2,
      title: "Narratives",
      activities: [],
    },
    {
      id: "2",
      number: 3,
      title: "Q&A",
      activities: [],
    },
  ];

  const activeSection = learningPath[0].id;
  const activeActivity = null; // learningPath[0].activities[0].id;

  return (
    <div
      role="menu"
      className="bg-[rgba(250,245,238,0.8)] rounded-2xl border-neutral-600 border-1 shadow-shadow-gray shadow-app-lg overflow-hidden"
    >
      <div className="p-6 text-xl text-neutral-dark-500 flex items-center justify-between">
        <p>Learning Path</p>

        <button type="button" onClick={collapse}>
          <AnimatedIconChevronUp style={chevronStyles} className="" />
        </button>
      </div>

      <animated.div
        role="menuitem"
        aria-expanded={isCollapsed}
        style={containerStyles}
        className="overflow-hidden"
      >
        <div ref={containerRef}>
          <div className="border-b-1 border-neutral-600" />

          <div className="p-9 pt-6 space-y-7">
            <ol className="space-y-7">
              {learningPath.map((section) => (
                <li key={section.id}>
                  <p
                    className={clsx(
                      activeSection === section.id
                        ? "text-primary-600"
                        : "text-neutral-dark-300",
                      "text-base font-medium"
                    )}
                  >
                    <span
                      className={clsx(
                        activeSection === section.id
                          ? "bg-primary-600"
                          : "bg-neutral-500",
                        "inline-block align-middle w-8 h-8 mb-1 rounded-full mr-2 text-neutral-100 text-center p-1"
                      )}
                    >
                      {section.number}
                    </span>
                    {section.title}
                  </p>

                  <div className="relative ml-1">
                    <div className="absolute top-2 bottom-2 w-[1px] translate-x-3 bg-neutral-500" />

                    <ul className="space-y-2">
                      {section.activities.map((activity) => (
                        <li
                          key={activity.id}
                          className="pl-2 flex flex-row items-center space-x-6"
                        >
                          <span className="w-2 h-2 bg-neutral-500 block rounded-full" />

                          <p
                            className={clsx(
                              activeActivity === activity.id
                                ? "text-primary-600"
                                : "text-neutral-dark-300"
                            )}
                          >
                            {activity.title}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <AppButton variant="secondary" className="w-full">
              <IconHeart className="inline mr-2" /> How to help?
            </AppButton>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
