import { useEvent } from "@/utils/hooks";
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
  action: "add" | "remove"
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

  const dispatch: HomeSectionDispatchFn = useCallback((ref, action) => {
    if (!ref.current) return;

    setSections((prev) => {
      if (!ref.current) return prev;

      const newSections = Array.from(prev);

      if (action === "add") {
        observer.current?.observe(ref.current);
        newSections.push(ref);
      } else {
        const index = newSections.indexOf(ref);
        observer.current?.unobserve(ref.current);
        newSections.splice(index, 1);
      }

      return newSections;
    });
  }, []);

  const onObserverIntersect = useEvent(
    (entries: IntersectionObserverEntry[]) => {
      // During my tests, this entries should be at most 1 on Chrome.
      for (const entry of entries) {
        for (const [i, section] of sections.entries()) {
          if (!section?.current) continue;

          if (section.current === entry.target && entry.isIntersecting) {
            setCurrentSection(i);
            console.log("Section is intersecting", entry.isIntersecting);
          }
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

export function HomeSection(props: {
  className?: string;
  children?: React.ReactNode;
}) {
  const dispatch = useContext(HomeSectionDispatchContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dispatch) {
      dispatch(ref, "add");

      return () => dispatch(ref, "remove");
    }
  }, [dispatch]);

  return (
    <section ref={ref} className={props.className}>
      {props.children}
    </section>
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
