import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { Image as SanityImage } from "sanity";
import { urlFor } from "@/sanity/lib/image";
import React from "react";
import { createPortal } from "react-dom";

export function WordHighlightWithImage({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: { image: SanityImage };
}) {
  const [mounted, setMounted] = React.useState(false);

  // Generate a unique ID for each tooltip
  const tooltipId = React.useMemo(
    () => `image-tooltip-${Math.random().toString(36).substring(2, 11)}`,
    [],
  );

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!value) {
    return (
      <span className="group relative cursor-pointer underline">
        {children}
      </span>
    );
  }

  const image = urlFor(value.image).url();
  const alt =
    typeof value.image.alt === "string" ? value.image.alt : "default-alt-text";

  return (
    <>
      <span
        className="group relative cursor-pointer underline"
        data-tooltip-id={tooltipId}
      >
        {children}
      </span>

      {mounted &&
        createPortal(
          <Tooltip
            id={tooltipId}
            place="top"
            className="!z-50 !rounded-md !border-primary-300 !bg-primary-800 !p-2 !opacity-95"
          >
            <Image
              src={image}
              alt={alt}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "200px", height: "auto" }}
            />
          </Tooltip>,
          document.getElementById("app-root")!,
        )}
    </>
  );
}
