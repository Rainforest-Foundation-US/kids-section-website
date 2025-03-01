import Image from "next/image";
import { AppButton, AppLink, NavBarLink } from "../buttons";
import { IconMenu } from "../icons/icons";
import { useCallback, useState } from "react";
import clsx from "@/utils/clsx";
import Link from "next/link";

export function NavBar({ styles }: { styles?: string }) {
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
    <header
      className={clsx(
        "relative z-50 flex flex-row justify-between border-b-1 border-neutral-500 px-6 pb-2 pt-6",
        styles,
      )}
    >
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
        <ul className="hidden flex-row items-center space-x-1 lg:flex">
          <li>
            <NavBarLink href="/">Home</NavBarLink>
          </li>
          <li>
            <NavBarLink href="/discover-the-amazon">
              Discover the Amazon
            </NavBarLink>
          </li>
          <li>
            <NavBarLink href="/stories">Stories</NavBarLink>
          </li>
          <li>
            <NavBarLink href="/q-and-a">Q&A</NavBarLink>
          </li>

          <li>
            <NavBarLink href="https://rainforestfoundation.org/engage/start-a-fundraiser/">
              <AppButton variant="primary" size="small">
                Start a fundraiser
              </AppButton>
            </NavBarLink>
          </li>
        </ul>

        <button
          aria-expanded={expanded}
          onKeyDown={onKeyDown}
          onClick={toggleExpanded}
          className="lg:hidden"
        >
          <IconMenu />
        </button>

        <ul
          className={clsx(
            expanded
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-[-100vh] opacity-0 transition-none",
            "absolute inset-x-0 top-[calc(100%_-_1rem)] z-10 space-y-2 rounded-xl rounded-tr-none bg-neutral-dark-700 p-6 text-center transition-opacity duration-150 xs:bottom-auto xs:left-auto xs:right-0 xs:p-12 lg:hidden",
          )}
          aria-hidden={!expanded}
        >
          <li>
            <AppLink href="/" variant="text" className="block w-full">
              Home
            </AppLink>
          </li>
          <li>
            <AppLink
              href="/discover-the-amazon"
              variant="text"
              className="block w-full"
            >
              Discover the Amazon
            </AppLink>
          </li>
          <li>
            <AppLink href="/stories" variant="text" className="block w-full">
              Stories
            </AppLink>
          </li>
          <li>
            <AppLink href="/q-and-a" variant="text" className="block w-full">
              Q&A
            </AppLink>
          </li>
          <li>
            <AppLink
              href="https://rainforestfoundation.org/"
              variant="primary"
              className="block w-full"
            >
              Start a fundraiser
            </AppLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
