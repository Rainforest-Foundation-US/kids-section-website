import { useEvent } from "@/utils/hooks";
import clsx from "@/utils/clsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const HomeSectionContext = createContext<
  React.RefObject<HTMLDivElement>[] | undefined
>(undefined);

type HomeSectionDispatchFn = (
  ref: React.RefObject<HTMLDivElement>,
  action: "add" | "remove",
  sectionNumber: number
) => void;
const HomeSectionDispatchContext = createContext<
  HomeSectionDispatchFn | undefined
>(undefined);

interface HomeSectionNavigationValue {
  onGoToSection: (sectionIndex: number) => void;
  onGoNext: () => void;
}
const HomeSectionNavigationContext = createContext<
  HomeSectionNavigationValue | undefined
>(undefined);

export function HomeSectionsContainer(props: { children: React.ReactNode }) {
  const observer = useRef<IntersectionObserver | null>();
  const [currentSection, setCurrentSection] = useState(0);

  const [sections, setSections] = useState<React.RefObject<HTMLDivElement>[]>(
    []
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
    []
  );

  const onObserverIntersect = useEvent(
    (entries: IntersectionObserverEntry[]) => {
      // During my tests, this entries should be at most 1 on Chrome
      // but I left this here for completeness.
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const divElement = entry.target as HTMLDivElement;
          const sectionNumber = Number(divElement.dataset.sectionNumber);

          setCurrentSection(sectionNumber);
          break;
        }
      }
    }
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(onObserverIntersect, options);

    return () => observer.current?.disconnect();
  }, [onObserverIntersect]);

  const onFocusSection = useEvent((sectionIndex: number) => {
    const section = sections[sectionIndex];
    if (!section?.current) return;

    section.current.scrollIntoView({ behavior: "smooth" });
  });

  const onGoToSection: HomeSectionNavigationValue["onGoToSection"] = useEvent(
    (sectionIndex) => {
      setCurrentSection(sectionIndex);
      onFocusSection(sectionIndex);
    }
  );

  const onGoNext: HomeSectionNavigationValue["onGoNext"] = useEvent(() => {
    const next = currentSection + 1;
    if (next >= sections.length) return;
    onGoToSection(next);
  });

  const setCurrentSectionContextValue = useMemo(
    (): HomeSectionNavigationValue => ({
      onGoToSection,
      onGoNext,
    }),
    [onGoToSection, onGoNext]
  );

  return (
    <HomeSectionContext.Provider value={sections}>
      <HomeSectionDispatchContext.Provider value={dispatch}>
        <HomeSectionNavigationContext.Provider
          value={setCurrentSectionContextValue}
        >
          {props.children}
        </HomeSectionNavigationContext.Provider>
      </HomeSectionDispatchContext.Provider>
    </HomeSectionContext.Provider>
  );
}

export function useHomeSectionNavigation() {
  const context = useContext(HomeSectionNavigationContext);

  if (!context) {
    throw new Error(
      "useHomeSectionNavigation must be used within a HomeSectionNavigationContext"
    );
  }

  return context;
}

export function ActivitySection(props: {
  number: number;
  className?: string;
  children?: React.ReactNode;
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
    <section
      data-section-number={sectionNumber}
      ref={ref}
      className={clsx(
        "relative flex max-h-[80rem] snap-center flex-col py-8",
        props.className
      )}
    >
      {props.children}
    </section>
  );
}

export function ActivitySectionDivider() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(202, 203, 194, 0) 0%, #DADBD2 46%, #DADBD2 52.5%, rgba(217, 217, 201, 0) 100%)",
      }}
      className="absolute inset-x-0 h-[720px] -translate-y-[50%]"
    />
  );
}
