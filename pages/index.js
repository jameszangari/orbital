import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Cloud } from "@react-three/drei";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Button from "../components/Button";
// import Particles from "../components/Particles";

export default function Create() {
  const [formStatus, setFormStatus] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState(false);

  // Set default values for all inputs
  const [pType, setType] = useState("Gas Giant");
  const [pSize, setSize] = useState(1);
  const [pCore, setCore] = useState("#FFFFFF");
  const [pAtmos, setAtmos] = useState("#FFFFFF");
  // Log inputs
  console.log(pType);
  console.log(pSize);
  console.log(pCore);
  console.log(pAtmos);

  // const baseColor = "#FFFFFF";
  // const layerColorA = "#D33CE7";
  // const layerColorB = "#FFFFFF";
  // const noiseColorA = "#D33CE7";
  // const noiseColorB = "#FFFFFF";
  // const fresnelColor = "#496EEF";

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
        <LayerMaterial>
          <Base color={pCore} value={pCore} alpha={1} mode="normal" />
          {/* <Particles /> */}
          <Noise
            colorA="#000000"
            colorB={pAtmos}
            onChange={(e) => setAtmos(e.target.value)}
            alpha={1}
            mode="lighten"
          />
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
          <Texture map={chooseTexture()} alpha={0.85} />
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
          style={{ height: "100vh" }}
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
        <div className="m-auto absolute right-0">
          <form action="">
            <div>
              <h1>Planet Type</h1>
              <div className="flex gap-3">
                <a
                  value="Gas Giant"
                  className="cursor-pointer bg-white text-black p-2"
                  onClick={(e) => setType(e.target.text)}
                >
                  Gas Giant
                </a>
                <a
                  value="Neptune-like"
                  className="cursor-pointer bg-white text-black p-2"
                  onClick={(e) => setType(e.target.text)}
                >
                  Neptune-like
                </a>
                <a
                  value="Super Earth"
                  className="cursor-pointer bg-white text-black p-2"
                  onClick={(e) => setType(e.target.text)}
                >
                  Super Earth
                </a>
                <a
                  value="Terrestrial"
                  className="cursor-pointer bg-white text-black p-2"
                  onClick={(e) => setType(e.target.text)}
                >
                  Terrestrial
                </a>
              </div>
            </div>
            <div>
              <h1>Size</h1>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="1"
                onChange={(e) => setSize(e.target.value)}
                id=""
              ></input>
            </div>
            <div>
              <h1>Core</h1>
              <input
                onChange={(e) => setCore(e.target.value)}
                type="color"
                name=""
                id="core"
              />
            </div>
            <div>
              <h1>Atmosphere</h1>
              <input
                onChange={(e) => setAtmos(e.target.value)}
                type="color"
                name=""
                id="atmos"
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
