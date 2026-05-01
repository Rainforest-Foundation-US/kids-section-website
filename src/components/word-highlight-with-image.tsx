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
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Generate a unique ID for each tooltip
  const tooltipId = React.useMemo(
    () => `image-tooltip-${Math.random().toString(36).substring(2, 11)}`,
    [],
  );

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Cached images may finish before React attaches `onLoad`, so re-check
  // once the <img> is in the DOM.
  React.useEffect(() => {
    if (mounted && imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsImageLoaded(true);
    }
  }, [mounted]);

  if (!value?.image) {
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
            className="!z-50 !rounded-md !border-primary-300 !bg-primary-600 !p-2 !opacity-95"
          >
            <div
              className="relative"
              style={{
                width: "200px",
                aspectRatio: isImageLoaded ? undefined : "1 / 1",
              }}
            >
              {!isImageLoaded && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse rounded bg-primary-300/40"
                />
              )}
              <Image
                ref={imgRef}
                src={image}
                alt={alt}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                onLoad={() => setIsImageLoaded(true)}
                style={{
                  width: "200px",
                  height: "auto",
                  opacity: isImageLoaded ? 1 : 0,
                }}
              />
            </div>
          </Tooltip>,
          document.getElementById("app-root")!,
        )}
    </>
  );
}
