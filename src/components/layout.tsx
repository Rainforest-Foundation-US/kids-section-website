import Image from "next/image";
import { AppButton, NavBarLink } from "./buttons";
import {
  IconChevronUp,
  IconHeart,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./icons/icons";
import { useState } from "react";
import { animated, config, useSpring } from "@react-spring/web";
import { useMeasure } from "@/utils/hooks";
import clsx from "clsx";
import Link from "next/link";

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
      <div className="mx-6 max-w-5xl lg:mx-auto">
        <div className="flex flex-col flex-wrap justify-between space-y-2 xs:flex-row xs:items-center xs:space-y-0">
          <Image
            src="/large-logo-white.png"
            height={66}
            width={262}
            alt="Rainforest Logo"
          />

          <div className="flex flex-row gap-2">
            <a
              href="https://www.facebook.com/RainforestUS"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <FacebookIcon className="mt-1 ml-2 inline" />
            </a>
            <a
              href="https://twitter.com/RainforestUS"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <TwitterIcon className="mt-1 ml-2 inline" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC9rUHT4FkKXfNSeVmpr2zYw"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <YoutubeIcon className="mt-1 ml-2 inline" />
            </a>
            <a
              href="https://www.instagram.com/rainforestUS/"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <InstagramIcon className="mt-1 ml-1 inline" />
            </a>
            <a
              href="https://www.linkedin.com/company/rainforestus"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <LinkedinIcon className="mt-1 ml-2 inline" />
            </a>
          </div>
        </div>

        <div className="-mx-4 mt-8 mb-6 flex flex-col flex-wrap justify-between children:mx-4 children:mb-2 md:flex-row">
          <a
            href="https://rainforestfoundation.org/"
            className="cursor-pointer text-base text-neutral-100"
          >
            Foundation Main website
          </a>
          <Link href="/" className="cursor-pointer text-base	text-neutral-100">
            Kids corner
          </Link>
          <Link
            href="/about-the-amazon"
            className="cursor-pointer text-base text-neutral-100"
          >
            About the amazon
          </Link>
          <Link
            href="/narratives"
            className="cursor-pointer text-base text-neutral-100"
          >
            Narratives
          </Link>
          <Link
            href="/q-and-a"
            className="cursor-pointer text-base text-neutral-100"
          >
            Q&A
          </Link>
          {/* TODO: Add link to resources for educators page */}
          <Link href="/" className="cursor-pointer text-base text-neutral-100">
            Resources for educatorss
          </Link>
        </div>
        <div className="text-xl font-semibold text-neutral-100">
          Land acknowledgment
        </div>
        <div className="pt-2 text-base text-neutral-dark-100">
          We at Rainforest Foundation US recognize and honor the original
          peoples of the land on which our headquarters is based in Brooklyn,
          New York: The Ramapough Munsee Lenape, who have cared for these lands
          and waters for generations. We ask the Ramapough Munsee Lenape
          people’s permission to be here as their guests and ask their blessing
          for the good continuation of our work.
        </div>
        <div className="pt-8 pb-10 text-base text-neutral-dark-100">
          RAINFOREST FOUNDATION US IS A 501 (C) (3) NOT FOR PROFIT
          ORGANIZATIONTAX ID: 95-1622945 | PRIVACY POLICY
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
