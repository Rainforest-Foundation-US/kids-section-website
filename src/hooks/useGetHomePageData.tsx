import { getHomePage } from "@/sanity/lib/queries";
import { HomePageData } from "@/sanity/schemaTypes/home";

import React from "react";

export function useGetHomePageData() {
  const [homePageData, setHomePageData] = React.useState<HomePageData>();

  React.useEffect(() => {
    async function getData() {
      const homePageDataFromServer = await getHomePage();
      setHomePageData(homePageDataFromServer);
    }

    getData();
  }, []);

  return homePageData;
}
