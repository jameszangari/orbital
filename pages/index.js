import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Cloud } from "@react-three/drei";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Button from "../components/Button";
import FormButton from "../components/Form/FormButton";
// Color Picker
import { CirclePicker } from "react-color";
// Components
import Accordion from "../components/Accordion";
import Particles from "../components/Particles";

export default function Create() {
  // Set default values for all inputs
  const [pType, setType] = useState("Gas Giant");
  const [pSize, setSize] = useState("1");
  const [pCoreColor, setCoreColor] = useState("#f44336");
  const [pAtmosColor, setAtmosColor] = useState("#2196f3");
  // Log inputs
  console.log("type: " + pType);
  console.log("size: " + pSize);
  console.log("core: " + pCoreColor.hex);
  console.log("atmos: " + pAtmosColor.hex);

  // set type to variable
  const gasGiant = pType === "Gas Giant";
  const neptuneLike = pType === "Neptune-like";
  const superEarth = pType === "Super Earth";
  const terrestrial = pType === "Terrestrial";

  const gasTextures = [
    "/img/gaseous/Gaseous1.png",
    "/img/gaseous/Gaseous2.png",
    "/img/gaseous/Gaseous3.png",
    "/img/gaseous/Gaseous4.png",
  ];
  const neptuneTextures = [
    "/img/inhabitable/Icy.png",
    "/img/inhabitable/Martian.png",
    "/img/inhabitable/Venusian.png",
    "/img/inhabitable/Volcanic.png",
  ];
  const superTextures = [
    "/img/habitable/Alpine.png",
    "/img/habitable/Savannah.png",
    "/img/habitable/Swamp.png",
    "/img/habitable/Tropical.png",
  ];
  const terrestrialTextures = [
    "/img/terrestrial/Terrestrial1.png",
    "/img/terrestrial/Terrestrial2.png",
    "/img/terrestrial/Terrestrial3.png",
    "/img/terrestrial/Terrestrial4.png",
  ];
  const cloudTextures = [
    "/img/clouds/Clouds1.png",
    "/img/clouds/Clouds2.png",
    "/img/clouds/Clouds3.png",
    "/img/clouds/Clouds4.png",
  ];
  const setTextures = () => {
    return gasGiant
      ? "/img/gas-giant/Gaseous1.png"
      : neptuneLike
      ? "/img/habitable/Tropical.png"
      : superEarth
      ? "/img/habitable/Savannah.png"
      : terrestrial
      ? "/img/terrestrial/Terrestrial1.png"
      : "";
  };
  // console.log(setTextures());
  const [pCoreTexture, setCoreTexture] = useState(gasTextures[0]);
  const [pCloudTexture, setCloudTexture] = useState(cloudTextures[0]);
  const [pCloudAlpha, setCloudAlpha] = useState(1);
  console.log("core texture: " + pCoreTexture);
  console.log("cloud texture: " + pCloudTexture);
  console.log("cloud alpha: " + pCloudAlpha);

  const Planet = () => {
    const targetRef = useRef();
    return (
      <Sphere ref={targetRef} position={[0, 0, 0]} scale={pSize}>
        {/* <meshStandardMaterial color={"orange"} /> */}
        <LayerMaterial>
          <Base
            color={pCoreColor.hex}
            value={pCoreColor.hex}
            alpha={1}
            mode="normal"
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
          <Texture map={useTexture(pCoreTexture)} alpha={0.65} />
          <Texture
            map={useTexture(pCloudTexture)}
            alpha={pCloudAlpha}
            attachObject={Noise}
          />
          <Noise
            colorA={pAtmosColor.hex}
            colorB="#000000"
            onChange={(e) => setAtmosColor(e.target.value)}
            alpha={0.5}
            mode="darken"
          />
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
      pCoreTexture,
      pCloudTexture,
      pCloudAlpha,
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
      setCoreColor("#f44336");
      setAtmosColor("#2196f3");
      setCoreTexture(gasTextures[0]);
      setCloudTexture(cloudTextures[0]);
      setCloudAlpha(1);
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
          style={{ height: "100vh", width: "50vw", position: "fixed" }}
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
        <div className="m-auto fixed right-0 w-1/2 p-2 h-screen overflow-y-scroll">
          <form
            action=""
            className="flex flex-col justify-between h-full min-h-screen"
          >
            <Accordion
              title={"Planet Type"}
              className={"p-4 border-2 border-oBlue"}
              collapsed={false}
            >
              <div className="mt-4 flex gap-2 w-full">
                <FormButton
                  imgSrc={gasTextures[0]}
                  label={"Gas Giant"}
                  click={() => setType("Gas Giant")}
                />
                <FormButton
                  imgSrc={neptuneTextures[0]}
                  label={"Neptune-like"}
                  click={() => setType("Neptune-like")}
                />
                <FormButton
                  imgSrc={superTextures[0]}
                  label={"Super Earth"}
                  click={() => setType("Super Earth")}
                />
                <FormButton
                  imgSrc={terrestrialTextures[0]}
                  label={"Terrestrial"}
                  click={() => setType("Terrestrial")}
                />
              </div>
              <Button
                label={"Next"}
                click={(e) => {
                  e.preventDefault;
                  completed.push[0];
                }}
                className="mt-4"
              />
            </Accordion>
            <Accordion
              title={"Size"}
              className={"p-4 border-2 border-oBlue"}
              collapsed={false}
            >
              <div className="mt-4 flex flex-col space-y-2 w-full">
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
            <Accordion
              title={"Core"}
              className={"p-4 border-2 border-oBlue"}
              collapsed={false}
            >
              <div className="mt-4 w-full">
                <div className="mb-4 flex gap-2 w-full">
                  {gasGiant && (
                    <>
                      <FormButton
                        imgSrc={gasTextures[0]}
                        label={"Type 1"}
                        click={() => setCoreTexture(gasTextures[0])}
                      />
                      <FormButton
                        imgSrc={gasTextures[1]}
                        label={"Type 2"}
                        click={() => setCoreTexture(gasTextures[1])}
                      />
                      <FormButton
                        imgSrc={gasTextures[2]}
                        label={"Type 3"}
                        click={() => setCoreTexture(gasTextures[2])}
                      />
                      <FormButton
                        imgSrc={gasTextures[3]}
                        label={"Type 4"}
                        click={() => setCoreTexture(gasTextures[3])}
                      />
                    </>
                  )}
                  {neptuneLike && (
                    <>
                      <FormButton
                        imgSrc={neptuneTextures[0]}
                        label={"Type 1"}
                        click={() => setCoreTexture(neptuneTextures[0])}
                      />
                      <FormButton
                        imgSrc={neptuneTextures[1]}
                        label={"Type 2"}
                        click={() => setCoreTexture(neptuneTextures[1])}
                      />
                      <FormButton
                        imgSrc={neptuneTextures[2]}
                        label={"Type 3"}
                        click={() => setCoreTexture(neptuneTextures[2])}
                      />
                      <FormButton
                        imgSrc={neptuneTextures[3]}
                        label={"Type 4"}
                        click={() => setCoreTexture(neptuneTextures[3])}
                      />
                    </>
                  )}
                  {superEarth && (
                    <>
                      <FormButton
                        imgSrc={superTextures[0]}
                        label={"Type 1"}
                        click={() => setCoreTexture(superTextures[0])}
                      />
                      <FormButton
                        imgSrc={superTextures[1]}
                        label={"Type 2"}
                        click={() => setCoreTexture(superTextures[1])}
                      />
                      <FormButton
                        imgSrc={superTextures[2]}
                        label={"Type 3"}
                        click={() => setCoreTexture(superTextures[2])}
                      />
                      <FormButton
                        imgSrc={superTextures[3]}
                        label={"Type 4"}
                        click={() => setCoreTexture(superTextures[3])}
                      />
                    </>
                  )}
                  {terrestrial && (
                    <>
                      <FormButton
                        imgSrc={terrestrialTextures[0]}
                        label={"Type 1"}
                        click={() => setCoreTexture(terrestrialTextures[0])}
                      />
                      <FormButton
                        imgSrc={terrestrialTextures[1]}
                        label={"Type 2"}
                        click={() => setCoreTexture(terrestrialTextures[1])}
                      />
                      <FormButton
                        imgSrc={terrestrialTextures[2]}
                        label={"Type 3"}
                        click={() => setCoreTexture(terrestrialTextures[2])}
                      />
                      <FormButton
                        imgSrc={terrestrialTextures[3]}
                        label={"Type 4"}
                        click={() => setCoreTexture(terrestrialTextures[3])}
                      />
                    </>
                  )}
                </div>
                <CirclePicker color={pCoreColor} onChange={setCoreColor} />
                {/* <HuePicker color={pCore} onChange={setCore} />
                <AlphaPicker color={pCoreAlpha} onChange={setCoreAlpha} /> */}
              </div>
            </Accordion>
            <Accordion
              title={"Atmosphere"}
              className={"p-4 border-2 border-oBlue"}
              collapsed={false}
            >
              <div className="mt-4 w-full">
                <div className="mb-4 flex gap-2 w-full">
                  <FormButton
                    imgSrc={cloudTextures[0]}
                    label={"Type 1"}
                    click={() => setCloudTexture(cloudTextures[0])}
                  />
                  <FormButton
                    imgSrc={cloudTextures[1]}
                    label={"Type 2"}
                    click={() => setCloudTexture(cloudTextures[1])}
                  />
                  <FormButton
                    imgSrc={cloudTextures[2]}
                    label={"Type 3"}
                    click={() => setCloudTexture(cloudTextures[2])}
                  />
                  <FormButton
                    imgSrc={cloudTextures[3]}
                    label={"Type 4"}
                    click={() => setCloudTexture(cloudTextures[3])}
                  />
                </div>
                <CirclePicker
                  color={pAtmosColor.hex}
                  onChange={setAtmosColor}
                />
                <h1 className="mt-4">Opacity</h1>
                <div className="mt-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue="1"
                    onChange={(e) => setCloudAlpha(e.target.value)}
                    id="size"
                    // className="w-full"
                    className="form-range appearance-none w-full h-1 p-0 bg-oBlue focus:outline-none focus:ring-0 focus:shadow-none"
                  ></input>
                </div>
              </div>
            </Accordion>
            <div className="mt-4">
              <Button
                label={"Create Planet"}
                type={"submit"}
                click={handleSubmit}
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
        </div>
      </div>
    </>
  );
}
