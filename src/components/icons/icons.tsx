import { LinkIcon, RevertIcon } from "@sanity/icons";

import styles from "./turn-image-icon.module.css";
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function IconRight(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 5L12 19"
        stroke="#17260D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12L12 19L5 12"
        stroke="#17260D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 16H28"
        stroke="#5A9A36"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8H28"
        stroke="#5A9A36"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 24H28"
        stroke="#5A9A36"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronUp(props: IconProps) {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.5 20L16.5 12L8.5 20"
        stroke="#ABB0A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1537_2153)">
        <path
          d="M1.5 6V22L8.5 18L16.5 22L23.5 18V2L16.5 6L8.5 2L1.5 6Z"
          stroke="#5A9A36"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 2V18"
          stroke="#5A9A36"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 6V22"
          stroke="#5A9A36"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1537_2153">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FlipIcon(
  props: React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>,
) {
  const { className, ...rest } = props;

  return (
    <RevertIcon className={`${styles.revertIcon} ${className}`} {...rest} />
  );
}

export function JumpToIcon(
  props: React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>,
) {
  const { className, ...rest } = props;

  return <LinkIcon className={`${styles.revertIcon} ${className}`} {...rest} />;
}
