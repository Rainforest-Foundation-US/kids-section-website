import { useEvent } from "@/utils/hooks";
import clsx from "@/utils/clsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const HomeSectionContext = createContext<
  React.RefObject<HTMLDivElement>[] | undefined
>(undefined);

type HomeSectionDispatchFn = (
  ref: React.RefObject<HTMLDivElement>,
  action: "add" | "remove",
  sectionNumber: number,
) => void;
const HomeSectionDispatchContext = createContext<
  HomeSectionDispatchFn | undefined
>(undefined);

const HomeSectionIndexContext = createContext<number | null>(null);

interface HomeSectionNavigationValue {
  onGoToSection: (sectionId: number | string) => void;
  onGoNext: () => void;
}

export function HomeSectionsContainer(props: { children: React.ReactNode }) {
  const observer = useRef<IntersectionObserver | null>();

  const [sections, setSections] = useState<React.RefObject<HTMLDivElement>[]>(
    [],
  );

  const dispatch: HomeSectionDispatchFn = useCallback(
    (ref, action, sectionNumber) => {
      if (!ref.current) return;

      setSections((prev) => {
        if (!ref.current) return prev;

        const newSections = Array.from(prev);

        if (action === "add") {
          observer.current?.observe(ref.current);
          newSections.splice(sectionNumber, 0, ref);
        } else {
          const index = newSections.indexOf(ref);
          observer.current?.unobserve(ref.current);
          newSections.splice(index, 1);
        }

        return newSections;
      });
    },
    [],
  );

  return (
    <HomeSectionContext.Provider value={sections}>
      <HomeSectionDispatchContext.Provider value={dispatch}>
        {props.children}
      </HomeSectionDispatchContext.Provider>
    </HomeSectionContext.Provider>
  );
}

export function useHomeSectionNavigation() {
  const context = useContext(HomeSectionIndexContext);

  if (context === null) {
    throw new Error(
      "useHomeSectionNavigation must be used within ActivitySection",
    );
  }

  const focusOnSection = useEvent((sectionId: number | string) => {
    const section = document.querySelector(
      `[data-section-number="${sectionId}"], [data-section-name="${sectionId}"]`,
    );

    if (!section) return;

    section.scrollIntoView({ behavior: "smooth" });
  });

  const onGoToSection: HomeSectionNavigationValue["onGoToSection"] = useEvent(
    (sectionId) => {
      focusOnSection(sectionId);
    },
  );

  const onGoNext: HomeSectionNavigationValue["onGoNext"] = useEvent(() => {
    const next = context + 1;
    onGoToSection(next);
  });

  return {
    onGoToSection,
    onGoNext,
  };
}

export function ActivitySection(props: {
  number: number;
  name?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const sectionNumber = props.number;
  const dispatch = useContext(HomeSectionDispatchContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dispatch) {
      dispatch(ref, "add", sectionNumber);

      return () => dispatch(ref, "remove", sectionNumber);
    }
  }, [dispatch, sectionNumber]);

  return (
    <HomeSectionIndexContext.Provider value={sectionNumber}>
      <section
        data-section-number={sectionNumber}
        data-section-name={props.name}
        ref={ref}
        className={clsx(
          "relative flex max-h-[80rem] min-h-[840px] snap-center flex-col py-8",
          props.className,
        )}
        style={props.style}
      >
        {props.children}
      </section>
    </HomeSectionIndexContext.Provider>
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
