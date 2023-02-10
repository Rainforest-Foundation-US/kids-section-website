import Image from "next/image";
import { NavBarButton } from "./buttons";

export function NavBar() {
  return (
    <header className="pt-6 pb-2 z-10 border-b-1 border-neutral-500 flex mx-6 flex-row justify-between">
      <Image
        src="/large-logo.png"
        height={66}
        width={262}
        alt="Rainforest Logo"
      />

      <div className="flex flex-row space-x-2 items-center">
        <NavBarButton>Home</NavBarButton>
        <NavBarButton>About the Amazon</NavBarButton>
        <NavBarButton>Narratives</NavBarButton>
        <NavBarButton>Q&A</NavBarButton>
      </div>
    </header>
  );
}
