import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import React from "react";

import { RoundSlothIllustration } from "./activities-illustrations";

interface PostcardProps {
  image: string | StaticImageData;
  alt: string;
  description?: string;
}

export function Postcard({ image, alt, description }: PostcardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div className="mx-auto w-full max-w-[814px]">
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
          <PolaroidFront image={image} />
          {description && <PolaroidBack />}
        </motion.div>
      </div>
    </div>
  );
}

function PolaroidFront({ image }: { image: string | StaticImageData }) {
  return (
    <Image
      placeholder="blur"
      className="absolute w-full bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray lg:p-4"
      src={image}
      style={{
        backfaceVisibility: "hidden",
      }}
      aria-hidden
      alt="" // Add: alt
    />
  );
}

function PolaroidBack() {
  return (
    <div
      className="absolute flex h-full w-full flex-col justify-center bg-secondary-100 p-2 align-middle text-primary-600 shadow-app-lg shadow-shadow-gray lg:p-4"
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)", // Rotate the back side
      }}
    >
      <RoundSlothIllustration className="self-center" />
      <div className="overflow-auto p-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
}
