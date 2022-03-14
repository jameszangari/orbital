import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Cloud } from "@react-three/drei";
import {
  LayerMaterial,
  Color,
  Depth,
  Fresnel,
  Texture,
  Noise,
  Matcap,
} from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Button from "../components/Button";
import FormButton from "../components/Form/FormButton";
import { CirclePicker } from "react-color";
import Accordion from "../components/Accordion";
// import Particles from "../components/Particles";
import * as Images from "../components/Images";
import Link from "./../components/Link";
import Background from "./../components/Background";

export default function Create() {
  const random = (a, b) => a + Math.random() * b;

  // Set default values for all inputs
  const [pType, setType] = useState("Gas Giant");
  const [pSize, setSize] = useState("5");
  const [pCoreColor, setCoreColor] = useState({ hex: "#2196f3" });
  const [pAtmosColor, setAtmosColor] = useState({ hex: "#f44336" });
  //  TODO set these values based on type
  //  ie. larger planetes = slower; smaller planets = faster;
  // TODO Move these values to observe page ie. z/xRadius
  const pSpeed = random(0.05, 0.06);
  const pOffset = random(0, Math.PI * 2);
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
    Images.Gaseous1.src,
    Images.Gaseous2.src,
    Images.Gaseous3.src,
    Images.Gaseous4.src,
  ];
  const neptuneTextures = [
    Images.Inhabitable1.src,
    Images.Inhabitable2.src,
    Images.Inhabitable3.src,
    Images.Inhabitable4.src,
  ];
  const superTextures = [
    Images.Habitable1.src,
    Images.Habitable2.src,
    Images.Habitable3.src,
    Images.Habitable4.src,
  ];
  const terrestrialTextures = [
    Images.Terrestrial1.src,
    Images.Terrestrial2.src,
    Images.Terrestrial3.src,
    Images.Terrestrial4.src,
  ];
  const cloudTextures = [
    Images.Clouds1.src,
    Images.Clouds2.src,
    Images.Clouds3.src,
    Images.Clouds4.src,
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
  const [pCloudAlpha, setCloudAlpha] = useState(0.5);
  console.log("core texture: " + pCoreTexture);
  console.log("cloud texture: " + pCloudTexture);
  console.log("cloud alpha: " + pCloudAlpha);

  const Planet = () => {
    const targetRef = useRef();
    return (
      <>
        <Sphere ref={targetRef} position={[0, 0, 0]} scale={pSize}>
          {/* <meshStandardMaterial color={"orange"} /> */}
          <LayerMaterial color={pCoreColor.hex} alpha={1}>
            {/* <Base
              color={pCoreColor.hex}
              value={pCoreColor.hex}
              alpha={1}
              mode="normal"
            /> */}
            {/* <Color color={pCoreColor.hex} alpha={1} /> */}
            <Texture map={useTexture(pCloudTexture)} alpha={0.5} />
            <Texture map={useTexture(pCoreTexture)} alpha={0.65} />
            {/* <Fresnel
              color={pAtmosColor.hex}
              // colorB="#000000"
              onChange={(e) => setAtmosColor(e.target.value)}
              // alpha={pCloudAlpha}
              alpha={0.5}
              // mode="darken"
            /> */}
            {/* <Noise
              colorA={pAtmosColor.hex}
              colorB="#000000"
              onChange={(e) => setAtmosColor(e.target.value)}
              alpha={0.5}
              mode="darken"
            /> */}
            <Depth
              colorA={pAtmosColor.hex}
              colorB="#000000"
              onChange={(e) => setAtmosColor(e.target.value)}
              alpha={0.5}
              mode="darken"
              mapping={"vector"}
            />
          </LayerMaterial>
        </Sphere>
      </>
    );
  };

  const RenderSteps = () => {
    const [step, setStep] = useState(1);
    const nextStep = () => setStep(() => step + 1);
    const prevStep = () => setStep(() => step - 1);
    // console.log(step);
    return (
      <>
        <Accordion
          title={"Planet Type"}
          collapsed={step === 1 ? false : true}
          click={() => {
            step >= 1 ? (collapsed = true) : false;
          }}
        >
          <div className="px-1 pt-2 grid grid-cols-4 gap-2 w-full">
            <FormButton
              imgSrc={gasTextures[0]}
              label={"Gas Giant"}
              click={() => {
                setType("Gas Giant");
                setSize("5");
                setCoreTexture(gasTextures[0]);
              }}
            />
            <FormButton
              imgSrc={neptuneTextures[0]}
              label={"Neptune-like"}
              click={() => {
                setType("Neptune-like");
                setSize("3.5");
                setCoreTexture(neptuneTextures[0]);
              }}
            />
            <FormButton
              imgSrc={superTextures[0]}
              label={"Super Earth"}
              click={() => {
                setType("Super Earth");
                setSize("2");
                setCoreTexture(superTextures[0]);
              }}
            />
            <FormButton
              imgSrc={terrestrialTextures[0]}
              label={"Terrestrial"}
              click={() => {
                setType("Terrestrial");
                setSize("0.5");
                setCoreTexture(terrestrialTextures[0]);
              }}
            />
          </div>
          <div className="flex gap-2 px-1 pt-4">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </div>
        </Accordion>
        <Accordion title={"Size"} collapsed={step === 2 ? false : true}>
          <div className="mt-6 flex flex-col space-y-2 w-full">
            <input
              type="range"
              min={
                terrestrial
                  ? "0.5"
                  : superEarth
                  ? "2"
                  : neptuneLike
                  ? "3.5"
                  : gasGiant
                  ? "5"
                  : "5"
              }
              max={
                terrestrial
                  ? "1.5"
                  : superEarth
                  ? "3"
                  : neptuneLike
                  ? "4.5"
                  : gasGiant
                  ? "6.5"
                  : "6.5"
              }
              defaultValue={
                terrestrial
                  ? "0.25"
                  : superEarth
                  ? "1"
                  : neptuneLike
                  ? "1.75"
                  : gasGiant
                  ? "2.5"
                  : "2.5"
              }
              onChange={(e) => setSize(e.target.value)}
              id="size"
              step="0.1"
              className="appearance-none w-full h-1 p-0 bg-oPurple bg-opacity-75 focus:outline-none focus:ring-0 focus:shadow-none mb-4 px-1"
            ></input>
            <div className="flex gap-2 px-1 pt-2">
              <Link
                variant={"button"}
                click={(e) => {
                  e.preventDefault;
                  prevStep();
                }}
                label={"Back"}
              />
              <Link
                variant={"button"}
                click={(e) => {
                  e.preventDefault;
                  nextStep();
                }}
                label={"Next"}
              />
            </div>
          </div>
        </Accordion>
        <Accordion title={"Core"} collapsed={step === 3 ? false : true}>
          <div className="px-1 pt-2 w-full">
            <div className="grid grid-cols-4 gap-2 w-full mb-4">
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
            <CirclePicker
              width={"100%"}
              color={pCoreColor}
              onChange={setCoreColor}
              className={"mt-2"}
            />
          </div>
          <div className="flex gap-2 px-1 pt-4">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                prevStep();
              }}
              label={"Back"}
            />
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </div>
        </Accordion>
        <Accordion title={"Atmosphere"} collapsed={step === 4 ? false : true}>
          <div className="px-1 pt-2 w-full">
            <div className="grid grid-cols-4 gap-2 w-full mb-4">
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
              width={"100%"}
              color={pAtmosColor.hex}
              onChange={setAtmosColor}
            />
            <div className="flex gap-2 px-1 pt-4">
              <Link
                variant={"button"}
                click={(e) => {
                  e.preventDefault;
                  prevStep();
                }}
                label={"Back"}
                className={"w-1/2"}
              />
              <Link
                variant={"button"}
                click={(e) => {
                  e.preventDefault;
                  nextStep();
                }}
                label={"Next"}
                className={"w-1/2"}
              />
            </div>
          </div>
        </Accordion>
        <Accordion title={"Complete"} collapsed={step === 5 ? false : true}>
          <p className="text-sm mt-2">
            // TODO: add overview of selections and option to go back and change
          </p>
          <div className="flex gap-2 px-1 pt-4">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                prevStep();
              }}
              label={"Back"}
              className={"w-1/2"}
            />
            <Button
              click={handleSubmit}
              label={"Submit Planet"}
              className={"w-1/2"}
            />
          </div>
        </Accordion>
      </>
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
      pSpeed,
      pOffset,
      pCoreColor,
      pAtmosColor,
      pCoreTexture,
      pCloudTexture,
      pCloudAlpha,
      createdAt: new Date().getTime(),
      // createdAt: new Date().toISOString(),
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
      setSize("5");
      setCoreColor({ hex: "#2196f3" });
      setAtmosColor({ hex: "#f44336" });
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
      <div className="portrait:hidden flex flex-row">
        {/* TODO convert canvas to motioncanvas */}
        {/* @link https://www.framer.com/docs/motioncanvas/ */}
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{ fov: 75, position: [0, 0, 20] }}
          style={{ height: "100vh", width: "40vw", position: "fixed" }}
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
        <div className="z-50 fixed right-0 w-[60vw] p-1 h-screen overflow-y-scroll">
          <form action="" className="flex flex-col justify-between h-screen">
            {RenderSteps()}
          </form>
        </div>
        {error ? (
          <div className="block w-full my-3 mx-auto">
            <h3 className="text-red-500">{error}</h3>
          </div>
        ) : null}
        {message ? (
          <div className="z-50 h-screen w-full grid place-items-center bg-black bg-opacity-75">
            <div className="absolute z-50 grid place-items-center">
              <h3 className="text-xl font-secondary uppercase p-8">
                {message}
              </h3>
              <Background />
            </div>
            <p className="absolute mt-48">Refresh the page to start again.</p>
          </div>
        ) : null}
      </div>
      <div className="landscape:hidden z-50 h-screen w-full grid place-items-center bg-black bg-opacity-75">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">
            Please rotate your device.
          </h3>
          <Background />
        </div>
      </div>
    </>
  );
}
