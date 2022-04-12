import Background from "./Background.js";

export default function Time() {
  return (
    <div className="relative w-full sm:w-1/2 flex-1">
      <Background />
      <div className="relative p-4">
        <p className="font-krona text-blue-accent uppercase text-xs md:text-sm pb-3 w-full font-normal">
          one night only
        </p>
        <p className="font-krona text-text-transparent uppercase text-xs md:text-sm leading-5 w-full font-normal">
          May 7th<br></br>
          urbn center Lobby<br></br>
          5:00pm - 6:30pm
        </p>
      </div>
    </div>
  );
}
