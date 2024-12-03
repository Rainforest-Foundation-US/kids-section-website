import clsx from "clsx";
import React from "react";

// Define the structure of a contributor
interface Contributor {
  name: string;
  role?: string;
}

// Define the structure of a category
interface CategoryProps {
  title: string;
  contributors: Contributor[];
  className?: string;
}

const contributorData = [
  {
    title: "Development",
    contributors: [
      { name: "Rowin Hernández", role: "Lead developer" },
      { name: "Kokan Malenko", role: "Lead developer" },
      { name: "Kari Hernández", role: "Developer" },
      { name: "Lokesh Pathrabe", role: "Developer" },
      { name: "Ali Aizaz", role: "Developer" },
      { name: "Mohammed Agboola", role: "Developer" },
      { name: "Amaan Salheen", role: "Developer" },
      { name: "Nelio Carneiro", role: "Developer" },
    ],
  },
  {
    title: "Project Management Support",
    contributors: [{ name: "Simone Theeboom" }],
  },
  {
    title: "Content Development",
    contributors: [
      { name: "Rainforest Foundation US" },
      { name: "Jeremy Kundtz " },
    ],
  },
  {
    title: "UX Design",
    contributors: [
      { name: "Darwin Álvarez", role: "Lead UX designer" },
      { name: "Salman Syed Muhammad", role: "UX designer" },
    ],
  },
  {
    title: "Assets",
    contributors: [
      { name: "Golshid Yazdi", role: "Illustrations" },
      { name: "Simon Dures Productions", role: "Video" },
      { name: "Rainforest Foundation US", role: "Images" },
      { name: "Adobe Stock", role: "Images" },
    ],
  },
];

// Random rotation and translation classes for playful positioning
const positionClasses = [
  "md:rotate-[-2deg]",
  "md:rotate-[2deg]",
  "md:rotate-[-1deg]",
  "md:rotate-[1deg]",
  "md:rotate-[-1deg]",
];

// Category component to render a single category of contributors
function Category({ title, contributors, className }: CategoryProps) {
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

// Main Credits Page Component
function CreditsPage() {
  // Comprehensive contributor data

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
