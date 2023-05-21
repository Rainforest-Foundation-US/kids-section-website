import Image, { StaticImageData } from "next/image";
import { Polaroid } from "../polaroid";
import firstPolaroid from "@/images/home/polaroids/climate-polaroid-1.png";
import secondPolaroid from "@/images/home/polaroids/climate-polaroid-2.png";
import { HomeGoToSectionButton } from "../buttons";
import { useState } from "react";
import PolaroidModal from "../polaroid-modal";

type SelectedPolaroidState = {
  image: StaticImageData | null;
  title?: string | null;
  description?: string | null;
};
const defaultPolaroidState = {
  image: null,
  title: null,
  description: null,
};
const polaroids = [
  {
    image: firstPolaroid,
    title: "Climate Change",
    description:
      "When we burn fuels that send greenhouse gasses into the atmosphere, we heat up / cool down our planet. This makes climate change better / worse.",
  },
  {
    image: secondPolaroid,
    title: "Deforestation",
    description:
      "When we burn fuels that send greenhouse gasses into the atmosphere, we heat up / cool down our planet. This makes climate change better / worse.",
  },
];
const ClimateChange = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedPolaroid, setSelectedPolaroid] =
    useState<SelectedPolaroidState>(defaultPolaroidState);

  return (
    <>
      <div className="climate-change-container w-full pt-10">
        <div className="float-right mr-6 flex h-24 w-24 flex-row justify-center rounded-2xl bg-neutral-100">
          <div>
            <Image
              src="/pages/about-the-amazon/activities/map.png"
              width={24}
              height={24}
              aria-hidden
              alt=""
              className="mx-4 mt-6 h-6"
            />
            <div className="text-center font-medium text-neutral-dark-600 text-base">
              Path
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-row justify-center">
          <div>
            <div className="mb-4 flex flex-row justify-center">
              <Image
                src="/pages/about-the-amazon/activities/Sloth.png"
                width={184}
                height={184}
                aria-hidden
                alt=""
              />
            </div>
            <div className="text-center text-neutral-100 text-2xl">
              I'm not sure what ‘climate change’ and ‘deforestation’ are.
            </div>
            <div className="text-center font-bold text-neutral-100 text-2xl">
              Let's take a deeper look!
            </div>
            <div className="my-8 flex flex-row justify-center">
              {polaroids.map((polaroid, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedPolaroid(polaroid);
                  }}
                >
                  <Polaroid
                    className={`relative w-[18rem] ${
                      index === 0 ? "-rotate-[6.5deg]" : "rotate-[6.5deg]"
                    }`}
                    src={polaroid.image}
                    caption={polaroid.title}
                  />
                </div>
              ))}
            </div>
            <div className="my-8 flex flex-row justify-center">
              <HomeGoToSectionButton />
            </div>
          </div>
        </div>
      </div>
      <div className="h-28 bg-neutral-dark-700"></div>
      <div className="bg-neutral-dark-800">
        <div className="my-6">
          <div className="float-right mr-6 flex h-24 w-24 flex-row justify-center rounded-2xl bg-neutral-100">
            <div>
              <Image
                src="/pages/about-the-amazon/activities/map.png"
                width={24}
                height={24}
                aria-hidden
                alt=""
                className="mx-4 mt-6 h-6"
              />
              <div className="text-center font-medium text-neutral-dark-600 text-base">
                Path
              </div>
            </div>
          </div>
          <div className="text-center text-neutral-100 text-2xl">
            I'm not sure what ‘climate change’ and ‘deforestation’ are.
          </div>
          <div className="text-center font-bold text-neutral-100 text-2xl">
            Let's take a deeper look!
          </div>
          <div className="my-8 flex flex-row justify-center">
              {polaroids.map((polaroid, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedPolaroid(polaroid);
                  }}
                >
                  <Polaroid
                    className={`relative w-[18rem] ${
                      index === 0 ? "-rotate-[6.5deg]" : "rotate-[6.5deg]"
                    }`}
                    src={polaroid.image}
                    caption={polaroid.title}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
      {isOpenModal && (
        <PolaroidModal
          onCloseModal={() => {
            setOpenModal(false);
          }}
          title={selectedPolaroid.title}
          description={selectedPolaroid.description}
          imageUrl={selectedPolaroid.image}
        />
      )}
    </>
  );
};

export default ClimateChange;
