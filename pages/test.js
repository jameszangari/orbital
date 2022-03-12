import React from "react";

const Test = () => {
  for (let index = 0; index < 100; index++) {
    let post = {
      pType: "Gas Giant",
      pSize: "2.5",
      pSpeed: 0.09933477611769852,
      pOffset: 5.061883902059234,
      pCoreColor: { hex: "#9c27b0" },
      pAtmosColor: { hex: "#2196f3" },
      pCoreTexture: "/_next/static/media/Gaseous1.325cee2e.png",
      pCloudTexture: "/_next/static/media/Clouds1.68b17795.png",
      pCloudAlpha: 1,
      createdAt: 1646936286263,
    };

    let response = fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
  }
  return <></>;
};

export default Test;
