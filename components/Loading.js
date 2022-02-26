import React from "react";
// import * as LottiePlayer from "@lottiefiles/lottie-player"; // import styles from "./Loading.module.css";

function Loading(props) {
  return (
    <div className={props.loading ? "block" : "hidden"}>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
      <lottie-player
        src="https://assets8.lottiefiles.com/packages/lf20_zt1zgu9x.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
}

export default Loading;
