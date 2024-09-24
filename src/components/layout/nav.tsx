import Image from "next/image";
import { AppLink, NavBarLink } from "../buttons";
import { IconMenu } from "../icons/icons";
import { useCallback, useState } from "react";
import clsx from "@/utils/clsx";
import Link from "next/link";

export function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded((v) => !v);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter") {
        toggleExpanded();
      }

      if (event.key === "Escape") {
        setExpanded(false);
      }
    },
    [toggleExpanded],
  );

  return (
    <header className="relative z-50 mx-6 flex flex-row justify-between border-b-1 border-neutral-500 pb-2 pt-6">
      <Link href="/">
        <Image
          src="/large-logo.png"
          height={66}
          width={262}
          priority
          alt="Rainforest Logo"
        />
      </Link>

      <nav
        role="navigation"
        aria-label="Main menu"
        className="flex flex-row items-center space-x-2"
      >
        <ul className="hidden flex-row space-x-1 md:flex">
          <li>
            <NavBarLink href="/">Home</NavBarLink>
          </li>
          <li>
            <NavBarLink href="/about-the-amazon">About the Amazon</NavBarLink>
          </li>
          <li>
            <NavBarLink href="/narratives">Narratives</NavBarLink>
          </li>
          <li>
            <NavBarLink href="/q-and-a">Q&A</NavBarLink>
          </li>
        </ul>

        <button
          aria-expanded={expanded}
          onKeyDown={onKeyDown}
          onClick={toggleExpanded}
        >
          <IconMenu />
        </button>

        <ul
          className={clsx(
            expanded
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-[-100vh] opacity-0 transition-none",
            "absolute inset-x-0 top-[calc(100%_-_1rem)] z-10 space-y-2 rounded-xl rounded-tr-none bg-neutral-dark-700 p-6 text-center transition-opacity duration-150 xs:bottom-auto xs:left-auto xs:right-0 xs:p-12",
          )}
          aria-hidden={!expanded}
        >
          <li className="flex justify-center">
            <AppLink href="https://rainforestfoundation.org/" variant="text">
              Main website
            </AppLink>
          </li>
          <li>
            <AppLink href="/" variant="text" className="block w-full">
              {"Kids' Corner"}
            </AppLink>
          </li>
          <li>
            <AppLink
              href="https://rainforestfoundation.org/our-work/"
              variant="text"
              className="block w-full"
            >
              Our work
            </AppLink>
          </li>
          <li>
            <AppLink
              href="https://rainforestfoundation.org/about/"
              variant="text"
              className="block w-full"
            >
              About us
            </AppLink>
          </li>
          <li>
            <AppLink
              href="https://rainforestfoundation.org/news/"
              variant="text"
              className="block w-full"
            >
              News
            </AppLink>
          </li>
          <li>
            <AppLink
              href="https://rainforestfoundation.org/engage/"
              variant="text"
              className="block w-full"
            >
              Take action
            </AppLink>
          </li>
          <li>
            <AppLink
              href="https://rainforestfoundation.org/"
              variant="primary"
              className="block w-full"
            >
              Donate now
            </AppLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
