import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import React from "react";

import { RoundSlothIllustration } from "./illustrations/activities-illustrations";
import { FlipIcon } from "./icons/icons";

interface PostcardProps {
  image: string | StaticImageData;
  alt: string;
  description?: string;
}

export function Postcard({ image, alt, description }: PostcardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  if (!image) return null;

  return (
    <div className="mx-auto w-full max-w-[814px]">
      {/* Invisible image to make the parent grow to the child size, since that cannot be done with absolute positioning */}
      <Image className="invisible w-full" src={image} alt="" />

      <div
        className="absolute inset-0 -rotate-[4deg] cursor-pointer transition-transform duration-150 hover:rotate-0 hover:scale-105"
        style={{ perspective: "1000px" }}
        onClick={() => {
          if (!description) return;
          setIsFlipped((prev) => !prev);
        }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <PolaroidFront image={image} alt={alt} description={description} />
          {description && <PolaroidBack description={description} />}
        </motion.div>
      </div>
    </div>
  );
}

function PolaroidFront({
  image,
  alt,
  description,
}: {
  image: string | StaticImageData;
  alt: string;
  description?: string;
}) {
  return (
    <>
      <Image
        placeholder="blur"
        className="absolute w-full bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray lg:p-4"
        src={image}
        style={{
          backfaceVisibility: "hidden",
        }}
        aria-hidden
        alt={alt}
      />

      {description && (
        <>
          <div className="absolute right-4 top-4 h-8 w-8 bg-neutral-100 opacity-80" />
          <FlipIcon className="absolute right-4 top-4 h-8 w-8 text-neutral-dark-800" />
        </>
      )}
    </>
  );
}

function PolaroidBack({ description }: { description: string }) {
  return (
    <div
      className="absolute flex h-full w-full flex-col justify-center bg-secondary-100 p-2 align-middle text-primary-600 shadow-app-lg shadow-shadow-gray lg:p-4"
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)", // Rotate the back side
      }}
    >
      <RoundSlothIllustration className="self-center" />
      <div className="overflow-auto p-4">{description}</div>

      <FlipIcon className="absolute right-4 top-4 h-8 w-8 text-neutral-dark-800" />
    </div>
  );
}
