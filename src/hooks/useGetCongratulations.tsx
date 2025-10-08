import { getCongratulations } from "@/sanity/lib/queries";
import { CongratulationsData } from "@/sanity/schemaTypes/congratulations";

import React from "react";

export function useGetCongratulations() {
  const [congratulationsData, setCongratulationsData] =
    React.useState<CongratulationsData>();

  React.useEffect(() => {
    async function getData() {
      const congratulationsFromServer = await getCongratulations();

      setCongratulationsData(congratulationsFromServer);
    }

    getData();
  }, []);

  return congratulationsData;
}
