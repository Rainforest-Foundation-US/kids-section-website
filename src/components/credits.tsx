import React from "react";

interface Contributor {
  name: string;
  role?: string;
}

export interface ContributorData {
  title: string;
  contributors: Contributor[];
  className?: string;
}

const positionClasses = [
  "md:rotate-[-2deg]",
  "md:rotate-[2deg]",
  "md:rotate-[-1deg]",
  "md:rotate-[1deg]",
  "md:rotate-[-1deg]",
];

function Category({ title, contributors, className }: ContributorData) {
  return (
    <div
      className={`rounded-xl border border-primary-600 bg-primary-500 p-6 text-primary-800 shadow-app-lg shadow-shadow-green ${className} max-w-96`}
    >
      <h2 className="mb-4 border-b-2 pb-2 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-2">
        {contributors.map((contributor, index) => (
          <div key={index} className="rounded-md px-3 py-1 transition-all">
            <p className="font-semibold">{contributor.name}</p>
            {contributor.role && (
              <p className="text-emerald-200 text-sm">{contributor.role}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreditsPage({
  contributorData,
}: {
  contributorData: ContributorData[];
}) {
  return (
    <div className="bg-emerald-950 text-white">
      <h1 className="text-emerald-100 mb-12 text-center text-4xl font-extrabold">
        Project Credits
      </h1>
      <div className="container mx-auto px-4">
        <div className="flex flex-col flex-wrap gap-6 lg:h-[900px]">
          {contributorData.map((category, index) => (
            <Category
              key={category.title}
              title={category.title}
              contributors={category.contributors}
              className={positionClasses[index % positionClasses.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreditsPage;
