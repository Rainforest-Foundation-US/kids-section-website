import { DEFAULT_DESCRIPTION, getDefaultOgImageUrl } from "@/lib/site";
import { SEO_DEFAULT_TITLES, type SeoProps } from "@/components/seo";
import type { HomePageData } from "@/sanity/schemaTypes/home";
import type { StoryCompositionData } from "@/sanity/schemaTypes/storyComposition";

type SeoFromCms = {
  title?: string;
  description?: string;
  imageUrl?: string | null;
  noIndex?: boolean;
};

function pickCms(
  cms: SeoFromCms | undefined,
  defaults: { title: string; description: string },
): Pick<SeoProps, "title" | "description" | "imageUrl" | "noIndex"> {
  return {
    title: cms?.title || defaults.title,
    description: cms?.description || defaults.description,
    imageUrl: cms?.imageUrl || getDefaultOgImageUrl(),
    noIndex: cms?.noIndex ?? false,
  };
}

export function resolveHomeSeo(home: HomePageData | null) {
  return pickCms(home?.seo, {
    title: SEO_DEFAULT_TITLES.home,
    description: DEFAULT_DESCRIPTION,
  });
}

export function resolveStoriesSeo(data: StoryCompositionData | null) {
  return pickCms(data?.seo, {
    title: SEO_DEFAULT_TITLES.stories,
    description:
      data?.description?.slice(0, 160) ||
      "Interactive Amazon stories and activities for kids at Kids' Corner.",
  });
}

export function resolveFaqSeo(seo: SeoFromCms | undefined) {
  return pickCms(seo, {
    title: SEO_DEFAULT_TITLES.qAndA,
    description:
      "Questions and answers about the Amazon rainforest, wildlife, and how we can protect it.",
  });
}

export function staticPageSeo(
  which: "discover" | "credits",
): Pick<SeoProps, "title" | "description" | "imageUrl" | "noIndex"> {
  const defaults = {
    discover: {
      title: SEO_DEFAULT_TITLES.discover,
      description:
        "An interactive path to learn what the Amazon is, who lives there, and why rainforests matter.",
    },
    credits: {
      title: SEO_DEFAULT_TITLES.credits,
      description: "The people and partners behind Kids' Corner.",
    },
  }[which];
  return { ...defaults, imageUrl: getDefaultOgImageUrl(), noIndex: false };
}
