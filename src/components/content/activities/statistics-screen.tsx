import PortableTextRenderer from "@/components/portable-text-renderer";
import { StatisticsCard } from "@/sanity/schemaTypes/statisticsCard";
import Image from "next/image";

export function StatisticsScreen({ cards }: { cards: StatisticsCard[] }) {
  return (
    <div className="flex flex-col flex-wrap gap-8 px-6 py-8 md:flex-row">
      {cards?.map((card) => (
        <div
          key={card.title}
          className="flex h-[480px] w-72 flex-col gap-4 border border-neutral-600 bg-complementary-100 p-12 text-sm shadow-[6px_6px_0px_0px_rgba(60,62,55,0.08)] sm:even:mt-24"
        >
          <Image
            src={card.image.data}
            alt={card.title}
            width={194}
            height={160}
          />
          <span className="text-5xl text-secondary-800">
            <PortableTextRenderer content={card.title} />
          </span>
          <span className="text-base text-neutral-dark-500">
            <PortableTextRenderer content={card.description} />
          </span>
        </div>
      ))}
    </div>
  );
}
