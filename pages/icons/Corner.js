export default function Corner({ className, stroke }) {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="//www.w3.org/2000/svg"
      className={className}
    >
      <path
        opacity="0.6"
        d="M6 0V6H-1.19209e-07"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}
