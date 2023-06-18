import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const CurrentPageContext = createContext(0);
export const OnNextPageContext = createContext((next?: number) => {});

function Page(props: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      {props.children}
    </motion.div>
  );
}

function Pages(props: { children: React.ReactNode[] }) {
  const currentPage = useContext(CurrentPageContext);
  const setCurrentPage = useContext(OnNextPageContext);

  const pages = props.children;
  const pageCount = pages.length;

  useEffect(() => {
    if (currentPage < pageCount) return;

    setCurrentPage(0);
  }, [currentPage, pageCount, setCurrentPage]);

  return <AnimatePresence>{pages[currentPage]}</AnimatePresence>;
}

function Container(props: { children: React.ReactNode[] }) {
  const [currentPage, setCurrentPage] = useState(0);

  const onNext = useCallback((next?: number) => {
    setCurrentPage((v) => next ?? v + 1);
  }, []);

  return (
    <CurrentPageContext.Provider value={currentPage}>
      <OnNextPageContext.Provider value={onNext}>
        {props.children}
      </OnNextPageContext.Provider>
    </CurrentPageContext.Provider>
  );
}

export const Pager = {
  Page,
  Pages,
  Container,
  OnNextConsumer: OnNextPageContext.Consumer,
};
