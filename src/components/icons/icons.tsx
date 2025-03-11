import { RevertIcon } from "@sanity/icons";

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

export function FacebookIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="26"
      viewBox="0 0 15 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.2248 14.629L13.9355 10.0002H9.49922V7.00209C9.49922 5.73959 10.1217 4.50334 12.103 4.50334H14.1192V0.56709C14.1192 0.56709 12.2867 0.251465 10.5336 0.251465C6.87797 0.251465 4.49297 2.46959 4.49297 6.47584V10.0002H0.433594V14.629H4.49297V25.8071C5.30859 25.9383 6.14109 26.0002 6.99172 26.0002C7.84234 26.0002 8.67484 25.9302 9.49047 25.8071V14.629H13.2248Z"
        fill="white"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.8001 2.4985C18.1145 2.80253 17.3769 3.00817 16.6034 3.10001C17.3932 2.62684 17.9992 1.87816 18.2853 0.984586C17.5463 1.42296 16.7275 1.74097 15.8567 1.91238C15.1591 1.1694 14.1651 0.705078 13.0645 0.705078C10.9528 0.705078 9.24006 2.41778 9.24006 4.52949C9.24006 4.82925 9.274 5.12103 9.3396 5.4011C6.16119 5.24167 3.34301 3.7192 1.45661 1.4047C1.12748 1.96943 0.938666 2.62684 0.938666 3.32761C0.938666 4.65413 1.61433 5.82521 2.63996 6.51087C2.01335 6.49119 1.42324 6.3192 0.907863 6.032C0.907578 6.04825 0.907577 6.06451 0.907577 6.08048C0.907577 7.93351 2.2264 9.47908 3.97561 9.83017C3.65503 9.91802 3.31648 9.96451 2.96824 9.96451C2.72124 9.96451 2.48195 9.94083 2.24865 9.89634C2.73522 11.4154 4.14731 12.5212 5.82122 12.5522C4.51209 13.5782 2.86328 14.1894 1.071 14.1894C0.762974 14.1894 0.457797 14.1714 0.15918 14.1357C1.85078 15.2213 3.86152 15.8541 6.02115 15.8541C13.0556 15.8541 16.9026 10.0267 16.9026 4.97243C16.9026 4.80672 16.8989 4.64158 16.8915 4.47787C17.6393 3.93882 18.2876 3.26543 18.8001 2.4985Z"
        fill="white"
      />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.39878 0.0170317L5.70588 0.0875463C4.5102 0.112118 3.31154 0.0630693 2.13931 0.31764C0.356065 0.697989 0.229734 2.56293 0.097542 4.12726C-0.0846053 6.32651 -0.0140906 8.56567 0.329645 10.7466C0.523695 11.9703 1.28736 12.7005 2.46834 12.7799C6.45503 13.0683 10.4682 13.0341 14.4461 12.8996C14.8662 12.8873 15.2892 12.8198 15.7034 12.7431C17.7483 12.3689 17.7981 10.2555 17.9307 8.47642C18.0629 6.67899 18.007 4.87233 17.7544 3.08713C17.5517 1.60904 17.1638 0.369514 15.5271 0.249854C13.4764 0.0933838 11.4728 -0.0325842 9.41636 0.00752258C9.41645 0.0170307 9.40464 0.0170317 9.39878 0.0170317ZM7.22771 3.75915C8.77308 4.68554 10.289 5.5965 11.8255 6.51668C10.2772 7.44308 8.76424 8.35403 7.22771 9.27422V3.75915Z"
        fill="white"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0,0,256,256"
      {...props}
    >
      <g
        fill="#3c3e37"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
      </g>
      <g
        fill="#ffffff"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="scale(10.66667,10.66667)">
          <path d="M8,3c-2.757,0 -5,2.243 -5,5v8c0,2.757 2.243,5 5,5h8c2.757,0 5,-2.243 5,-5v-8c0,-2.757 -2.243,-5 -5,-5zM8,5h8c1.654,0 3,1.346 3,3v8c0,1.654 -1.346,3 -3,3h-8c-1.654,0 -3,-1.346 -3,-3v-8c0,-1.654 1.346,-3 3,-3zM17,6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,7c-2.757,0 -5,2.243 -5,5c0,2.757 2.243,5 5,5c2.757,0 5,-2.243 5,-5c0,-2.757 -2.243,-5 -5,-5zM12,9c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3z"></path>
        </g>
      </g>
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.5594 11.2868V17.8832H14.7349V11.7289C14.7349 10.1836 14.1827 9.12828 12.798 9.12828C11.7413 9.12828 11.1135 9.83875 10.8363 10.5267C10.7356 10.7725 10.7097 11.114 10.7097 11.4588V17.883H6.88494C6.88494 17.883 6.93628 7.45949 6.88494 6.38052H10.71V8.01053C10.7023 8.02336 10.6914 8.03591 10.6846 8.04817H10.71V8.01053C11.2182 7.22847 12.1246 6.11042 14.1568 6.11042C16.673 6.11042 18.5594 7.7544 18.5594 11.2868ZM2.88394 0.835938C1.57566 0.835938 0.719727 1.69472 0.719727 2.82303C0.719727 3.92739 1.55084 4.81098 2.83374 4.81098H2.85856C4.19251 4.81098 5.02191 3.92739 5.02191 2.82303C4.99653 1.69472 4.19251 0.835938 2.88394 0.835938ZM0.947043 17.8832H4.77035V6.38052H0.947043V17.8832Z"
        fill="white"
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
    <RevertIcon className={`${styles.revertIcon} ${className} `} {...rest} />
  );
}
