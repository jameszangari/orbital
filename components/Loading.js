import React from "react";
import Image from "../components/Image";
import OrbitalIcon from "../public/orbital-icon.png";
// import * as LottiePlayer from "@lottiefiles/lottie-player"; // import styles from "./Loading.module.css";

function Loading(props) {
  console.log(props);
  return (
    <div className={props.loading === true ? "block" : "hidden"}>
      <Image
        src={OrbitalIcon}
        alt={"icon"}
        width={1000}
        height={1000}
        placeholder={"blur"}
      />
      {/* <div className={props.loading ? "block" : "hidden"}> */}
      {/* <lottie-player
        src="https://assets8.lottiefiles.com/packages/lf20_zt1zgu9x.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></lottie-player> */}
    </div>
  );
}

export default Loading;
