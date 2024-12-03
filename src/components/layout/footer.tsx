import Image from "next/image";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "../icons/icons";
import Link from "next/link";
import { VercelLogo } from "../icons/vercel";
import { getEducatorResources } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";
import { EducatorResource } from "@/sanity/schemaTypes/educatorResource";

export function VercelSponsorshipBanner() {
  return (
    <a
      className="app-text self-center text-neutral-100"
      href="https://vercel.com?utm_source=kids-section-website&utm_campaign=oss"
      target="_blank"
      rel="noopener noreferrer"
    >
      {"Powered by "}
      <VercelLogo
        aria-label="Vercel Logo"
        className="inline h-4 w-auto fill-neutral-100"
      />
    </a>
  );
}

function DownloadResourcesLink({
  resources,
}: {
  resources: EducatorResource[];
}) {
  const onClick = () => {
    resources.forEach((resource, index) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = resource.link;
        link.download = resource.title;
        document.body.appendChild(link); // Append to body to make it work in Firefox
        link.click();
        document.body.removeChild(link);
      }, 200 * index);
    });
  };

  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-left text-base text-neutral-100"
    >
      Resources for educators
    </button>
  );
}

export function Footer() {
  const [resources, setResources] = useState<EducatorResource[]>([]);

  useEffect(() => {
    getEducatorResources().then(setResources);
  }, []);

  return (
    <footer className="relative z-10 bg-neutral-dark-700 py-10">
      <div className="mx-6 max-w-5xl lg:mx-auto">
        <div className="flex flex-col flex-wrap justify-between space-y-2 xs:flex-row xs:items-center xs:space-y-0">
          <Image
            src="/large-logo-white.png"
            height={66}
            width={262}
            alt="Rainforest Logo"
          />

          <div className="flex flex-row gap-2">
            <a
              href="https://www.facebook.com/RainforestUS"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <FacebookIcon className="ml-2 mt-1 inline" />
            </a>
            <a
              href="https://twitter.com/RainforestUS"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <TwitterIcon className="ml-2 mt-1 inline" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC9rUHT4FkKXfNSeVmpr2zYw"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <YoutubeIcon className="ml-2 mt-1 inline" />
            </a>
            <a
              href="https://www.instagram.com/rainforestUS/"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <InstagramIcon className="ml-1 mt-1 inline" />
            </a>
            <a
              href="https://www.linkedin.com/company/rainforestus"
              className="h-8 w-8 rounded-2xl bg-neutral-dark-600"
            >
              <LinkedinIcon className="ml-2 mt-1 inline" />
            </a>
          </div>
        </div>

        <div className="-mx-4 mb-6 mt-8 flex flex-col flex-wrap children:mx-4 children:mb-2 md:flex-row">
          <a
            href="https://rainforestfoundation.org/"
            className="cursor-pointer text-base text-neutral-100"
          >
            Foundation Main website
          </a>
          <Link
            href="/about-the-amazon"
            className="cursor-pointer text-base text-neutral-100"
          >
            About the amazon
          </Link>
          <Link
            href="/narratives"
            className="cursor-pointer text-base text-neutral-100"
          >
            Narratives
          </Link>
          <Link
            href="/q-and-a"
            className="cursor-pointer text-base text-neutral-100"
          >
            Questions and Answers
          </Link>
          <DownloadResourcesLink resources={resources} />
          <Link
            href="/credits"
            className="cursor-pointer text-base text-neutral-100"
          >
            Credits
          </Link>
        </div>
        <div className="text-xl font-semibold text-neutral-100">
          Land acknowledgment
        </div>
        <div className="pt-2 text-base text-neutral-dark-100">
          We at Rainforest Foundation US recognize and honor the original
          peoples of the land on which our headquarters is based in Brooklyn,
          New York: The Ramapough Munsee Lenape, who have cared for these lands
          and waters for generations. We ask the Ramapough Munsee Lenape
          people’s permission to be here as their guests and ask their blessing
          for the good continuation of our work.
        </div>
        <div className="pb-10 pt-8 text-base text-neutral-dark-100">
          RAINFOREST FOUNDATION US IS A 501 (C) (3) NOT FOR PROFIT
          ORGANIZATIONTAX ID: 95-1622945 | PRIVACY POLICY
        </div>

        <VercelSponsorshipBanner />
      </div>
    </footer>
  );
}
