import Image from "next/image";
import { NavBarLink } from "./buttons";

export function NavBar() {
  return (
    <header className="pt-6 pb-2 z-10 border-b-1 border-neutral-500 flex mx-6 flex-row justify-between">
      <Image
        src="/large-logo.png"
        height={66}
        width={262}
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
