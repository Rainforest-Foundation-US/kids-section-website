export function GlobalSVGDefinitions() {
  return (
    <svg
      width="0"
      height="0"
      style={{
        position: "absolute",
        visibility: "hidden",
        zIndex: -1,
        display: "block",
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="vignette" x="0%" y="0%" width="100%" height="100%">
          <feFlood floodColor="black" result="BLACK_FLOOD" />
          <feGaussianBlur
            in="BLACK_FLOOD"
            stdDeviation="90 30"
            result="BLURRED_BLACK_FLOOD"
          />
          <feComponentTransfer in="BLURRED_BLACK_FLOOD" result="VIGNETTE_MASK">
            <feFuncA type="table" tableValues="0 0 0 0 0 1" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="VIGNETTE_MASK" operator="in" />
        </filter>

        <filter id="lg-vignette" x="0%" y="0%" width="100%" height="100%">
          <feFlood floodColor="black" result="BLACK_FLOOD" />
          <feGaussianBlur
            in="BLACK_FLOOD"
            stdDeviation="200 150"
            result="BLURRED_BLACK_FLOOD"
          />
          <feComponentTransfer in="BLURRED_BLACK_FLOOD" result="VIGNETTE_MASK">
            <feFuncA type="table" tableValues="0 0 0 0 0 1" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="VIGNETTE_MASK" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
