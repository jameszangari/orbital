import React, { Suspense, useRef, useState, useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import { server } from "../lib/server";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Sphere, useTexture } from "@react-three/drei";
import { LayerMaterial, Depth, Texture } from "lamina";
import PlanetDetails from "../components/PlanetDetails";
import { motion } from "framer-motion";

const Joystick = dynamic(() => import("../components/Joystick"));
const Background = dynamic(() => import("../components/Background"));

const API_URL = `${server}/api/posts`;

async function fetcher(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return {
      posts: json["message"],
    };
  } catch (error) {
    return error;
  }
}

export default function Dashboard() {
  const { data, error } = useSWR(API_URL, fetcher, { refreshInterval: 60 });
  let allPlanets = data ? [...data.posts] : [];
  console.log(allPlanets);

  const [joyPos, setPos] = useState(0);
  console.log(allPlanets[joyPos]);

  let joystickMin = 0;
  let joystickMax = allPlanets.length - 1;
  let joystickPosition = joystickMin;
  let tiltReset;
  let device;

  useEffect(() => {
    if (!("hid" in navigator)) {
      console.log("WebHID is not available yet.");
    }

    navigator.hid.getDevices().then((devices) => {
      if (devices.length === 0) {
        console.log(
          `No HID devices selected. Press the "request device" button.`
        );
        return;
      }
      device = devices[0];
      console.log(
        `User previously selected "${device.productName}" HID device.`
      );
      console.log(`Now press "open device" button to receive input reports.`);
    });
  });

  // request device
  const requestDeviceButton = async (event) => {
    try {
      const filters = [{ vendorId: 1133, productId: 49685 }];

      [device] = await navigator.hid.requestDevice({ filters });
      if (!device) return;

      console.log(`User selected "${device.productName}" HID device.`);
      console.log(`Now press "open device" button to receive input reports.`);
    } finally {
      return;
    }
  };

  // open connection
  const openButton = async (event) => {
    if (!device) return;

    await device.open();
    console.log(`Waiting for user to press button...`);

    device.addEventListener("inputreport", (event) => {
      const { data, device, reportId } = event;

      // Handle only the Joystick
      if (device.productId !== 49685 && reportId !== 1133) return;

      //get input data
      const value = data.getUint16(0);
      var ch = value
        .toString(16)
        .match(/.{1,2}/g)
        .map(function (c) {
          return parseInt(c, 16);
        });

      //controls from input data - only using roll
      var controls = {
        roll: ((ch[1] & 0x03) << 8) + ch[0],
      };

      var roll = JSON.stringify(controls.roll) / 100;

      if (roll > 4 && roll < 6) {
        // joystickPosition = joystickPosition;
        tiltReset = true;
      }
      if (tiltReset === true) {
        if (roll > 9 && roll < 10.5) {
          increment(joystickPosition);
        }
        if (roll < 1 && roll > 0.5) {
          decrement(joystickPosition);
        }
      }
      console.log("Position: " + joystickPosition);
      // console.log("Roll: " + roll);
    });
  };

  // close connection
  const closeButton = async (event) => {
    if (!device) return;

    await device.close();
    console.log(`connection closed`);
  };

  // increment upon joystick move
  const increment = () => {
    tiltReset = false;
    joystickPosition++;
    if (joystickPosition > joystickMax) {
      joystickPosition = joystickMin;
    }
    setPos(joystickPosition);
    return;
  };

  // decrement upon joystick move
  const decrement = () => {
    tiltReset = false;
    joystickPosition--;
    if (joystickPosition < joystickMin) {
      joystickPosition = joystickMax;
    }
    setPos(joystickPosition);
    return;
  };

  // // number padding
  // function pad(num, size) {
  //   var s = "0" + num;
  //   return s.substr(s.length - size);
  // }

  // // get current planet count
  // const PlanetCount = Object.keys(data.posts).length;
  // let AllPlanets = [];
  // data.posts.forEach((planet) => {
  //   AllPlanets.push(planet);
  // });

  // // push most recent planet to it own array
  // let recentPlanet = [];
  // if (data) {
  //   Object.keys(data).forEach((key) => {
  //     recentPlanet.push(data[key].slice(-1)[0]);
  //   });
  // }

  const preloadCoreTexture = (texturePath) =>
    new Promise((resolve, reject) => {
      const image = new window.Image(texturePath);
      image.onload = () => resolve(texturePath);
      image.src = texturePath;
    });

  const prepareCoreTexture = async (texturePath) => {
    try {
      await preloadCoreTexture(texturePath);
      setCoreTexture(texturePath);
    } catch (e) {
      console.log(e);
    }
  };

  const Planet = () => {
    // preloadCoreTexture(recentPlanet[0].pCoreTexture);
    // prepareCoreTexture(recentPlanet[0].pCoreTexture);
    const targetRef = useRef();
    useFrame(({ clock }) => {
      targetRef.current.rotation.y = clock.getElapsedTime() / 10;
    });
    return (
      <>
        <Sphere
          ref={targetRef}
          position={[0, 0, 0]}
          // scale={allPlanets[joyPos] && allPlanets[joyPos].pSize}
          scale={6}
        >
          <LayerMaterial
            color={allPlanets[joyPos] && allPlanets[joyPos].pCoreColor.hex}
            alpha={1}
            lighting="physical"
            transmission={0.1}
          >
            <Texture
              map={useTexture(
                allPlanets[joyPos] && allPlanets[joyPos].pCoreTexture
              )}
              alpha={0.65}
            />
            <Texture
              map={useTexture(
                allPlanets[joyPos] && allPlanets[joyPos].pCloudTexture
              )}
              alpha={0.5}
            />
            <Depth
              colorA={allPlanets[joyPos] && allPlanets[joyPos].pCloudColor.hex}
              colorB="#000000"
              alpha={0.5}
              mode="darken"
              mapping={"vector"}
            />
          </LayerMaterial>
        </Sphere>
      </>
    );
  };

  // // set planet types to variables
  // const gasGiant = AllPlanets.filter(
  //   ({ pType }) => pType === "Gas Giant"
  // ).length;
  // const neptuneLike = AllPlanets.filter(
  //   ({ pType }) => pType === "Neptune-like"
  // ).length;
  // const superEarth = AllPlanets.filter(
  //   ({ pType }) => pType === "Super Earth"
  // ).length;
  // const terrestrial = AllPlanets.filter(
  //   ({ pType }) => pType === "Terrestrial"
  // ).length;
  if (error) {
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">
            Failed to load.
          </h3>
          <Background />
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">Loading...</h3>
          <Background />
        </div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Orbital | Planet Codex</title>
      </Head>
      <Joystick onChange={setPos} />
      <PlanetDetails
        className={"absolute bottom-5 mx-5 z-10"}
        name={allPlanets[joyPos].pName}
        type={allPlanets[joyPos].pType}
        size={allPlanets[joyPos].pSize}
        core={allPlanets[joyPos]?.pCoreTexture}
        coreColor={allPlanets[joyPos]?.pCoreColor.hex}
        atmos={allPlanets[joyPos]?.pCloudTexture}
        atmosColor={allPlanets[joyPos]?.pCloudColor.hex}
      />
      <div className="absolute z-10">
        <p>Give permission to use device (this only needs to be done once)</p>
        <button
          className="bg-white text-black p-2 hover:bg-opacity-75 mb-4"
          onClick={() => requestDeviceButton()}
        >
          {" "}
          Request Device
        </button>
        <p>Open connection with device</p>
        <button
          className="bg-white text-black p-2 hover:bg-opacity-75 mb-4"
          onClick={() => openButton()}
        >
          Open Device
        </button>
        <p>Close connection with device</p>
        <button
          className="bg-white text-black p-2 hover:bg-opacity-75"
          onClick={() => closeButton()}
        >
          Close Device
        </button>
      </div>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          camera={{ fov: 50, position: [0, 0, 20] }}
          style={{ height: "100vh", width: "100vw", position: "fixed" }}
          shadows
        >
          <ambientLight intensity={0.02} />
          <pointLight position={[100, 100, 100]} />
          {allPlanets && <Planet />}
          <Stars />
        </Canvas>
      </Suspense>
    </>
  );
}
