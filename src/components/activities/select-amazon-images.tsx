import React, { useState } from "react";
import Image from "next/image";
import { selectAmazonActivityImages } from "@/utils/constants";
import { HomeGoToSectionButton } from "../buttons";

const PictureCard = (props: { imagePath: string }) => (
  <Image
    src={props.imagePath}
    width={248}
    height={164}
    aria-hidden
    alt=""
    className="h-full"
  />
);
const SelectAmazonImages = () => {
  const [selectedImages, setSelectedIamges] = useState<string[]>([]);

  const selectAmazonImage = (value: string): void => {
    let newImages: string[] = [];

    if (selectedImages.includes(value)) {
      newImages = selectedImages.filter((image) => image !== value);
    } else {
      newImages = [...selectedImages, value];
    }
    setSelectedIamges(newImages);
  };
  console.log(
    "selectedImages.includes(image.label)",
    selectedImages.includes("amazon-image-1")
  );
  return (
    <>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1 mx-auto">
          <Image
            src="/pages/about-the-amazon/activities/Sloth.png"
            width={184}
            height={184}
            aria-hidden
            alt=""
          />
          <Image
            src="/pages/about-the-amazon/activities/sloth-dialogue.png"
            width={184}
            height={184}
            aria-hidden
            alt=""
          />
        </div>
        <div className="col-span-3">
          <div className="my-8 text-center font-normal leading-snug text-4xl">
            Which images show the Amazon?
          </div>
          <div className="flex cursor-pointer flex-row flex-wrap gap-4">
            {selectAmazonActivityImages.map((image) => (
              <div
                className={`h-46 w-64 bg-neutral-100 p-2 ${
                  selectedImages.includes(image.label)
                    ? "border-4 border-primary-500"
                    : null
                }`}
                onClick={() => selectAmazonImage(image.label)}
              >
                <PictureCard imagePath={image.path} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
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
        </div>
      </div>
        <div className="flex flex-row justify-center my-8">
        <HomeGoToSectionButton />

        </div>

    </>
  );
};

export default SelectAmazonImages;
