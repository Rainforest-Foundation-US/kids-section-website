import React from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { ActivityHint } from "./activity-hint";
import { ActivityHintStatus } from "./activity-hint";
import { fontFamily } from "@/pages/_app";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  hint?: string;
}

export function Modal({ isOpen, onClose, children, title, hint }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 mx-1 flex flex-col items-center justify-center ${fontFamily.variable} font-sans`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-dark-800/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      {hint && (
        <div className="relative z-10 w-full max-w-2xl overflow-y-auto rounded-t-lg border border-neutral-dark-800 border-b-neutral-dark-100 bg-secondary-100 px-3 py-1 shadow-xl">
          <ActivityHint
            noAnimation
            hintSize="sm"
            hintPosition="end"
            hintData={{
              hint,
              status: ActivityHintStatus.CORRECT,
            }}
            slothClassName="w-12 sm:w-20 shadow-app-none shadow-shadow-transparent"
            hintClassName="w-max content-center self-center"
          />
        </div>
      )}

      <div
        className={clsx(
          "relative z-10 max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-neutral-dark-800 bg-secondary-100 px-4 py-3 shadow-xl",
          hint && "max-h-[calc(70vh_-_100px)] rounded-t-none border-t-0",
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="group sticky left-full right-0 top-0 -mr-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-neutral-dark-800/10 active:bg-neutral-dark-800/20"
          aria-label="Close modal"
        >
          <div className="relative h-4 w-4">
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 transform bg-neutral-dark-800 transition-transform group-hover:scale-110 group-active:scale-90" />
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 transform bg-neutral-dark-800 transition-transform group-hover:scale-110 group-active:scale-90" />
          </div>
        </button>

        <div className="-mt-6">
          {/* Title */}
          {title && (
            <h2 className="mb-4 max-w-[calc(100%_-_24px)] text-xl font-bold text-neutral-dark-800">
              {title}
            </h2>
          )}

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
