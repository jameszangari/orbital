const Corner = ({ className, stroke }) => {
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
};
export default function Background() {
  return (
    <>
      <div
        className={
          "absolute z-0 w-full h-full bg-purple-bg border-2 border-solid border-pink-border grid grid-columns-2 grid-rows-2"
        }
      >
        {/* top left corner */}
        <Corner
          className={
            "row-span-1 col-span-1 rotate-180 self-start justify-self-start -mt-0.5 -ml-0.5"
          }
          stroke="#D33CE7"
        />
        {/* top right corner */}
        <Corner
          className={
            "row-span-1 col-start-2 -rotate-90 self-start justify-self-end -mt-0.5 -mr-0.5"
          }
          stroke="#D33CE7"
        />
        {/* bottom left corner */}
        <Corner
          className={
            "row-start-2 col-span-1 rotate-90 self-end justify-self-start -mb-0.5 -ml-0.5"
          }
          stroke="#D33CE7"
        />
        {/* bottom right corner */}
        <Corner
          className={
            "row-start-2 col-start-2 self-end justify-self-end -mb-0.5 -mr-0.5"
          }
          stroke="#D33CE7"
        />
      </div>
    </>
  );
}
