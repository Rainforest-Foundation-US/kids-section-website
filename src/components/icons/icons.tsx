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

export function IconHeart(props: IconProps) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_342_953)">
        <path
          d="M14.3941 3.07357C14.0536 2.73291 13.6493 2.46267 13.2043 2.2783C12.7593 2.09392 12.2824 1.99902 11.8007 1.99902C11.3191 1.99902 10.8421 2.09392 10.3972 2.2783C9.95219 2.46267 9.5479 2.73291 9.2074 3.07357L8.50073 3.78024L7.79406 3.07357C7.10627 2.38578 6.17342 1.99938 5.20073 1.99938C4.22804 1.99938 3.29519 2.38578 2.6074 3.07357C1.9196 3.76137 1.5332 4.69422 1.5332 5.66691C1.5332 6.6396 1.9196 7.57245 2.6074 8.26024L3.31406 8.96691L8.50073 14.1536L13.6874 8.96691L14.3941 8.26024C14.7347 7.91974 15.005 7.51545 15.1893 7.07048C15.3737 6.6255 15.4686 6.14857 15.4686 5.66691C15.4686 5.18525 15.3737 4.70831 15.1893 4.26334C15.005 3.81836 14.7347 3.41408 14.3941 3.07357V3.07357Z"
          stroke="#5A9A36"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_342_953">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
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
