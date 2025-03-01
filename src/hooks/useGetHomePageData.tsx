import { getEducatorResources, getHomePage } from "@/sanity/lib/queries";
import { EducatorResource } from "@/sanity/schemaTypes/educatorResource";
import { HomePageData } from "@/sanity/schemaTypes/home";

import React from "react";

export function useGetHomePageData() {
  const [homePageData, setHomePageData] = React.useState<HomePageData>();
  const [educatorResources, setEducatorResources] = React.useState<
    EducatorResource[]
  >([]);

  React.useEffect(() => {
    async function getData() {
      const homePageDataFromServer = await getHomePage();
      const educatorResourcesFromServer = await getEducatorResources();

      setHomePageData(homePageDataFromServer);
      setEducatorResources(educatorResourcesFromServer);
    }

    getData();
  }, []);

  return { homePageData, educatorResources };
}
