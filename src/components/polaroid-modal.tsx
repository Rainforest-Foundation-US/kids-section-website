import Image, { StaticImageData } from "next/image";
import React from "react";

type ModalProps = {
  onCloseModal?: () => void;
  imageUrl: StaticImageData | null;
  title?: string | null;
  description?: string | null;
};
const PolaroidModal = ({
  onCloseModal,
  imageUrl,
  title,
  description,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={onCloseModal}
      ></div>
      <div className="flex min-h-full items-center px-4 py-8">
        <div className="relative mx-auto w-1/2 rounded-md bg-white p-4 shadow-lg">
          <div className="mt-3 sm:flex">
            <div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center px-4">
                    <div className="font-bold text-secondary-800 text-2xl pb-2">{title}</div>
                    <div className="text-base text-neutral-dark-500">{description}</div>
                </div>
                <div>
                  <Image
                    src={imageUrl as StaticImageData}
                    height={66}
                    width={262}
                    alt="Climate Change"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolaroidModal;
