import { getFaqs } from "@/sanity/lib/queries";
import React from "react";
import { TypedObject } from "sanity";

export interface QAndAQuestion {
  question: string;
  hint: string;
  answer: string;
  description: TypedObject;
}

export function useGetQAndAContent(): QAndAQuestion[] {
  const [faqs, setFaqs] = React.useState<QAndAQuestion[]>([]);

  React.useEffect(() => {
    async function getData() {
      const faqsFromServer = await getFaqs();
      setFaqs(faqsFromServer[0].entries);
    }

    getData();
  }, []);

  return faqs;
}
