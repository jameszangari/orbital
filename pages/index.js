import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Cloud } from "@react-three/drei";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Image from "next/image";
import Button from "../components/Button";
import { CirclePicker } from "react-color";
// Color Picker
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Accordion from "../components/Accordion";
import Particles from "../components/Particles";
import GasGiant from "../public/metallic.jpg";
import NeptuneLike from "../public/rocky.jpg";
import SuperEarth from "../public/water.jpg";
import Terrestrial from "../public/terrestrial.jpg";

export default function Create() {
  // Set default values for all inputs
  const [pType, setType] = useState("Gas Giant");
  const [pSize, setSize] = useState("1");
  const [pCore, setCore] = useColor("hex", "#ff000e");
  const [pAtmos, setAtmos] = useColor("hex", "#0700ff");
  const pCoreColor = pCore.hex;
  const pAtmosColor = pAtmos.hex;
  // Log inputs
  console.log("type: " + pType);
  console.log("size: " + pSize);
  console.log("core: " + pCoreColor);
  console.log("atmos: " + pAtmosColor);

  // set type to variable
  const gasGiant = pType === "Gas Giant";
  const neptuneLike = pType === "Neptune-like";
  const superEarth = pType === "Super Earth";
  const terrestrial = pType === "Terrestrial";

  const Planet = () => {
    const targetRef = useRef();
    const texture = useTexture([
      "/metallic.jpg",
      "/rocky.jpg",
      "/water.jpg",
      "/terrestrial.jpg",
    ]);
    const chooseTexture = () => {
      if (gasGiant) {
        return texture[0];
      }
      if (neptuneLike) {
        return texture[1];
      }
      if (superEarth) {
        return texture[2];
      }
      if (terrestrial) {
        return texture[3];
      }
    };
    return (
      <Sphere ref={targetRef} position={[0, 0, 0]} scale={pSize}>
        <meshStandardMaterial color={"orange"} />
        <LayerMaterial>
          <Base color={pCore.hex} value={pCore.hex} alpha={1} mode="normal" />
          <Noise
            colorA="#000000"
            colorB={pAtmos.hex}
            onChange={(e) => setAtmos(e.target.value)}
            alpha={1}
            mode="lighten"
          />
          {/* <Particles /> */}
          {/* <Depth
            colorA={layerColorA}
            colorB={layerColorB}
            onChange={(e) =>
              set({
                layerColorA: e.target.value,
                layerColorB: e.target.value,
              })
            }
            alpha={1}
            mode="multiply"
            near={0}
            // far={2}
            origin={[1, 1, 1]}
          />
          <Fresnel
            color={fresnelColor}
            onChange={(e) => set({ fresnelColor: e.target.value })}
            alpha={1}
            mode="softlight"
            power={1}
            intensity={1}
            bias={0.1}
          />
          <Noise
            colorA={noiseColorA}
            colorB={noiseColorB}
            onChange={(e) =>
              set({
                noiseColorA: e.target.value,
                noiseColorB: e.target.value,
              })
            }
            alpha={1}
            mode="lighten"
          /> */}
          <Texture map={chooseTexture()} alpha={0.65} />
        </LayerMaterial>
      </Sphere>
    );
  };
  // set variables for error and message
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // submit planet data to mongodb
  const handleSubmit = async (event) => {
    event.preventDefault();

    // catch variables and set database options
    let post = {
      pType,
      pSize,
      pCoreColor,
      pAtmosColor,
      createdAt: new Date().toISOString(),
    };

    // reset error and message
    setError("");
    setMessage("");

    // save the post
    let response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields back to default values
      setType("Gas Giant");
      setSize(1);
      setCore("#FFFFFF");
      setAtmos("#FFFFFF");
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };
  return (
    <>
      <Head>
        <title>Orbital | Create</title>
      </Head>
      <div className="flex flex-row">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{ fov: 50, position: [0, 0, 20] }}
          style={{ height: "100vh", width: "50vw" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <pointLight position={[100, 100, 100]} />
            {/* TODO figure out planet name tags */}
            {/* <Text
            fontSize={0.5}
            outlineWidth={"5%"}
            outlineColor="#000000"
            outlineOpacity={1}
            position={[0, 3, 0]}
            onChange={(e) => set({ title: e.target.value })}
          >
            {title}
          </Text> */}
            <Stars />
            <Planet />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
        {/* TODO convert form elements to collapsible accordion */}
        <div className="m-auto w-1/2 p-4 h-screen">
          <form action="" className="flex flex-col justify-between h-full">
            <Accordion
              title={"Planet Type"}
              className={"p-4 border-2 border-oBlue"}
            >
              <div className="flex gap-3 w-full">
                <a
                  className="cursor-pointer bg-oBlue bg-opacity-50 border-oBlue text-levaHighlight3 border-2 p-2 flex flex-col justify-center items-center w-full active:bg-oPurple focus:bg-oPurple hover:bg-oPurple active:border-oPurple focus:border-oPurple hover:border-oPurple active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 "
                  onClick={() => setType("Gas Giant")}
                >
                  <span className="flex flex-col justify-center items-center">
                    <Image
                      src={GasGiant}
                      alt="Gas Giant"
                      layout="fixed"
                      width={50}
                      height={50}
                      placeholder="blur"
                      className="rounded-full pointer-events-none"
                    />
                    <span className="mt-2 pointer-events-none">Gas Giant</span>
                  </span>
                </a>
                <a
                  className="cursor-pointer bg-oBlue bg-opacity-50 border-oBlue text-levaHighlight3 border-2 p-2 flex flex-col justify-center items-center w-full active:bg-oPurple focus:bg-oPurple hover:bg-oPurple active:border-oPurple focus:border-oPurple hover:border-oPurple active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 "
                  onClick={() => setType("Neptune-like")}
                >
                  <Image
                    src={NeptuneLike}
                    alt="Neptune-like"
                    layout="fixed"
                    width={50}
                    height={50}
                    placeholder="blur"
                    className="rounded-full pointer-events-none"
                  />
                  <span className="mt-2 pointer-events-none">Neptune-like</span>
                </a>
                <a
                  className="cursor-pointer bg-oBlue bg-opacity-50 border-oBlue text-levaHighlight3 border-2 p-2 flex flex-col justify-center items-center w-full active:bg-oPurple focus:bg-oPurple hover:bg-oPurple active:border-oPurple focus:border-oPurple hover:border-oPurple active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 "
                  onClick={(e) => setType("Super Earth")}
                >
                  <Image
                    src={SuperEarth}
                    alt="Super Earth"
                    layout="fixed"
                    width={50}
                    height={50}
                    placeholder="blur"
                    className="rounded-full pointer-events-none"
                  />
                  <span className="mt-2 pointer-events-none">Super Earth</span>
                </a>
                <a
                  className="cursor-pointer bg-oBlue bg-opacity-50 border-oBlue text-levaHighlight3 border-2 p-2 flex flex-col justify-center items-center w-full active:bg-oPurple focus:bg-oPurple hover:bg-oPurple active:border-oPurple focus:border-oPurple hover:border-oPurple active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 "
                  onClick={(e) => setType("Terrestrial")}
                >
                  <Image
                    src={Terrestrial}
                    alt="Terrestrial"
                    layout="fixed"
                    width={50}
                    height={50}
                    placeholder="blur"
                    className="rounded-full pointer-events-none"
                  />
                  <span className="mt-2 pointer-events-none">Terrestrial</span>
                </a>
              </div>
            </Accordion>
            <Accordion title={"Size"} className={"p-4 border-2 border-oBlue"}>
              <div className="flex flex-col space-y-2 w-full">
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="1"
                  onChange={(e) => setSize(e.target.value)}
                  id="size"
                  // className="w-full"
                  className="form-range appearance-none w-full h-1 p-0 bg-oBlue focus:outline-none focus:ring-0 focus:shadow-none"
                ></input>
                <ul className="flex justify-between w-full px-[10px] py-4 font-bold">
                  <li className="flex justify-center relative">
                    <span className="absolute">1</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">2</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">3</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">4</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">5</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">6</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">7</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">8</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">9</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">10</span>
                  </li>
                </ul>
              </div>
            </Accordion>
            <Accordion title={"Core"} className={"p-4 border-2 border-oBlue"}>
              <div className="w-full">
                <CirclePicker color={pCore} onChange={setCore} />
                {/* <ColorPicker
                  width={300}
                  height={150}
                  color={pCore}
                  onChange={setCore}
                  useColor="hex"
                  hideHEX
                  hideRGB
                  hideHSV
                  dark
                /> */}
              </div>
            </Accordion>
            <Accordion
              title={"Atmosphere"}
              className={"p-4 border-2 border-oBlue"}
            >
              <div className="w-full">
                <CirclePicker color={pAtmos} onChange={setAtmos} />
                {/* <ColorPicker
                  width={300}
                  height={150}
                  color={pAtmos}
                  onChange={setAtmos}
                  useColor="hex"
                  hideHEX
                  hideRGB
                  hideHSV
                  dark
                /> */}
              </div>
            </Accordion>
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="text-lg bg-oBlue bg-opacity-50 border-oBlue border-2 text-levaHighlight3 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full"
              >
                Submit Planet
              </button>
              {/* <Button click={handleSubmit} label={"Submit Planet"} /> */}
            </div>
          </form>
          {error ? (
            <div className="block w-full my-3 mx-auto">
              <h3 className="text-red-500">{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className="block w-full my-3 mx-auto">
              <h3 className="text-green-500">{message}</h3>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
