import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Cloud } from "@react-three/drei";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Image from "next/image";
import Button from "../components/Button";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
// import Particles from "../components/Particles";

export default function Create() {
  const [formStatus, setFormStatus] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState(false);

  // Set default values for all inputs
  const [pType, setType] = useState("Gas Giant");
  const [pSize, setSize] = useState("1");
  const [pCore, setCore] = useColor("hex", "#ff000e");
  const [pAtmos, setAtmos] = useColor("hex", "#0700ff");
  // Log inputs
  console.log("type: " + pType);
  console.log(pType);
  console.log("size: " + pSize);
  console.log("core: " + pCore.hex);
  console.log("atmos: " + pAtmos.hex);

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
      pCore,
      pAtmos,
      pColor,
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
        <div className="m-auto w-1/2 p-4">
          <form action="">
            <div className="mb-4">
              <h1 className="mb-2">Planet Type</h1>
              <div className="flex gap-3 w-full">
                <a
                  value="Gas Giant"
                  className="cursor-pointer bg-white text-black p-2 w-full"
                  onClick={() => setType("Gas Giant")}
                >
                  <span className="flex flex-col justify-center items-center">
                    <Image
                      src="/metallic.jpg"
                      alt="Gas Giant"
                      layout="fixed"
                      width={50}
                      height={50}
                      className="rounded-full select-none"
                    />
                    <span className="mt-2">Gas Giant</span>
                  </span>
                </a>
                <a
                  value="Neptune-like"
                  className="cursor-pointer bg-white text-black p-2 flex flex-col justify-center items-center w-full"
                  onClick={() => setType("Neptune-like")}
                >
                  <Image
                    src="/rocky.jpg"
                    alt="Neptune-like"
                    layout="fixed"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span className="mt-2">Neptune-like</span>
                </a>
                <a
                  value="Super Earth"
                  className="cursor-pointer bg-white text-black p-2 flex flex-col justify-center items-center w-full"
                  onClick={(e) => setType("Super Earth")}
                >
                  <Image
                    src="/water.jpg"
                    alt="Super Earth"
                    layout="fixed"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span className="mt-2">Super Earth</span>
                </a>
                <a
                  value="Terrestrial"
                  className="cursor-pointer bg-white text-black p-2 flex flex-col justify-center items-center w-full"
                  onClick={(e) => setType("Terrestrial")}
                >
                  <Image
                    src="/terrestrial.jpg"
                    alt="Terrestrial"
                    layout="fixed"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span className="mt-2">Terrestrial</span>
                </a>
              </div>
            </div>
            <div className="mb-4 flex flex-col space-y-2 w-full">
              <h1 className="mb-2">Size</h1>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="1"
                onChange={(e) => setSize(e.target.value)}
                id="size"
                className="w-full"
              ></input>
              <ul className="flex justify-between w-full px-[10px] pb-4">
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
            <div className="mb-4 w-full">
              <h1>Core</h1>
              <ColorPicker
                width={300}
                height={150}
                color={pCore}
                onChange={setCore}
                useColor="hex"
                hideHEX
                hideRGB
                hideHSV
                dark
              />
            </div>
            <div className="mb-4 w-full">
              <h1>Atmosphere</h1>
              <ColorPicker
                width={300}
                height={150}
                color={pAtmos}
                onChange={setAtmos}
                useColor="hex"
                hideHEX
                hideRGB
                hideHSV
                dark
              />
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
          <div className="mt-4">
            <Button click={handleSubmit} label={"Submit Planet"} />
          </div>
        </div>
      </div>
    </>
  );
}
