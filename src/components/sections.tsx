import { useEvent } from "@/utils/hooks";
import clsx from "@/utils/clsx";
import { createContext, useContext, useEffect, useRef } from "react";
import { SectionName } from "@/hooks/useGetAboutTheAmazonContent";

const HomeSectionContext = createContext<
  React.RefObject<HTMLDivElement>[] | undefined
>(undefined);

interface HomeSectionNavigationValue {
  onGoToSection: (sectionId: SectionName, callback?: () => void) => void;
}

export function HomeSectionsContainer(props: { children: React.ReactNode }) {
  return (
    <HomeSectionContext.Provider value={[]}>
      {props.children}
    </HomeSectionContext.Provider>
  );
}

export function useHomeSectionNavigation() {
  const context = useContext(HomeSectionContext);

  if (context === null) {
    throw new Error(
      "useHomeSectionNavigation must be used within HomeSectionContext",
    );
  }

  const focusOnSection = useEvent(
    (sectionId: SectionName, callback?: () => void) => {
      const section = document.querySelector(
        `[data-section-name="${sectionId}"]`,
      );

      if (!section) return;

      const handleScrollEnd = () => {
        callback?.();
        window.removeEventListener("scrollend", handleScrollEnd);
      };

      window.addEventListener("scrollend", handleScrollEnd);

      section.scrollIntoView({ behavior: "smooth" });
    },
  );

  const onGoToSection: HomeSectionNavigationValue["onGoToSection"] = useEvent(
    (sectionId: SectionName, callback?: () => void) => {
      focusOnSection(sectionId, callback);
    },
  );

  return {
    onGoToSection,
  };
}

export function ActivitySection(props: {
  name?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      data-section-name={props.name}
      className={clsx(
        "relative flex min-h-[840px] snap-center flex-col py-8",
        props.className,
      )}
      style={props.style}
    >
      {props.children}
    </section>
  );
}

interface ActivitySectionDividerProps {
  variant?: "light" | "complementary" | "dark" | "default";
  position?: "top" | "bottom";
}
export function ActivitySectionDivider({
  position = "top",
  variant = "default",
}: ActivitySectionDividerProps) {
  let background: string;

  if (variant === "dark") {
    background =
      "linear-gradient(180deg, #1E1F1B 0%, rgba(30, 31, 27, 0) 100%)";
  } else if (variant === "light") {
    background =
      "linear-gradient(180deg, #FAF5EE 0%, rgba(250, 245, 238, 0) 100%)";
  } else if (variant === "complementary") {
    background =
      "linear-gradient(180deg, #F0F4EF 0%, rgba(240, 244, 239, 0.00) 100%)";
  } else {
    background =
      "linear-gradient(180deg, rgba(202, 203, 194, 0) 0%, #DADBD2 46%, #DADBD2 52.5%, rgba(217, 217, 201, 0) 100%)";
  }

  return (
    <div
      style={{
        background,
      }}
      className={clsx(
        "absolute inset-x-0",
        position === "bottom" && "bottom-0 h-[240px] -scale-y-100",
        position === "top" &&
          (variant === "light" || variant === "dark"
            ? "top-0 h-[318px]"
            : "top-0 h-[720px] -translate-y-[50%]"),
      )}
    />
  );
}
