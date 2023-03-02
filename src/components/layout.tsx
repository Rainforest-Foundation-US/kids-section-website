import Image from "next/image";
import { AppButton, NavBarLink } from "./buttons";
import { IconChevronUp, IconHeart } from "./icons/icons";
import { useState } from "react";
import { animated, config, useSpring } from "@react-spring/web";
import { useMeasure } from "@/utils/hooks";
import clsx from "clsx";

export function NavBar() {
  return (
    <header className="relative z-10 mx-6 flex flex-row justify-between border-b-1 border-neutral-500 pt-6 pb-2">
      <Image
        src="/large-logo.png"
        height={66}
        width={262}
        priority
        alt="Rainforest Logo"
      />

      <div className="hidden flex-row items-center space-x-2 md:flex">
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
      <div className="mx-auto w-full max-w-[1022px]">
        <div className="flex flex-row items-center justify-between">
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
      className="overflow-hidden rounded-2xl border-1 border-neutral-600 bg-[rgba(250,245,238,0.8)] shadow-app-lg shadow-shadow-gray"
    >
      <div className="flex items-center justify-between p-6 text-xl text-neutral-dark-500">
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

          <div className="space-y-7 p-9 pt-6">
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
                        "mb-1 mr-2 inline-block h-8 w-8 rounded-full p-1 text-center align-middle text-neutral-100"
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
                          className="flex flex-row items-center space-x-6 pl-2"
                        >
                          <span className="block h-2 w-2 rounded-full bg-neutral-500" />

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
              <IconHeart className="mr-2 inline" /> How to help?
            </AppButton>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
