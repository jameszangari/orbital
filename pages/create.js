import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/router";
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
import Image from "next/image";
import * as Images from "../components/Images";
import Link from "../components/Link";
import Background from "../components/Background";

export default function Create() {
  const random = (a, b) => a + Math.random() * b;
  const router = useRouter();
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
  // // Log inputs
  // console.log("type: " + pType);
  // console.log("size: " + pSize);
  // console.log("core: " + pCoreColor.hex);
  // console.log("atmos: " + pAtmosColor.hex);

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
  // console.log("core texture: " + pCoreTexture);
  // console.log("cloud texture: " + pCloudTexture);
  // console.log("cloud alpha: " + pCloudAlpha);
  const [pName, setName] = useState("Your Planet Name");
  const [zoom, setZoom] = useState(10);

  const Planet = () => {
    const targetRef = useRef();
    useFrame(({ clock }) => {
      targetRef.current.rotation.y = clock.getElapsedTime() / 10;
    });
    useFrame((state) => {
      state.camera.position.z = zoom;
    });
    console.log("zoom: " + zoom);
    return (
      <>
        <Sphere ref={targetRef} position={[0, 0, 0]} scale={pSize}>
          {/* <meshStandardMaterial color={"orange"} /> */}
          <LayerMaterial
            color={pCoreColor.hex}
            alpha={1}
            lighting="physical"
            transmission={0.5}
          >
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
    // const prevStep = () => setStep(() => step - 1);
    var Filter = require("bad-words"),
      filter = new Filter();
    return (
      <>
        <Accordion
          title={"Planet Type"}
          click={() => {
            setStep(1);
          }}
          selection={pType}
          collapsed={step === 1 ? false : true}
        >
          <div className="px-1 pt-2 grid grid-cols-4 gap-2 w-full">
            <FormButton
              imgSrc={gasTextures[0]}
              label={"Gas Giant"}
              click={() => {
                setType("Gas Giant");
                setSize("5");
                setCoreTexture(gasTextures[0]);
                setZoom(10);
              }}
            />
            <FormButton
              imgSrc={neptuneTextures[0]}
              label={"Neptune-like"}
              click={() => {
                setType("Neptune-like");
                setSize("3.5");
                setCoreTexture(neptuneTextures[0]);
                setZoom(10);
              }}
            />
            <FormButton
              imgSrc={superTextures[0]}
              label={"Super Earth"}
              click={() => {
                setType("Super Earth");
                setSize("2");
                setCoreTexture(superTextures[0]);
                setZoom(10);
              }}
            />
            <FormButton
              imgSrc={terrestrialTextures[0]}
              label={"Terrestrial"}
              click={() => {
                setType("Terrestrial");
                setSize("0.5");
                setCoreTexture(terrestrialTextures[0]);
                setZoom(10);
              }}
            />
          </div>
          <div className="px-1 pt-4 pb-1">
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
        <Accordion
          title={"Size"}
          click={() => {
            setStep(2);
          }}
          selection={"Size: " + pSize}
          collapsed={step === 2 ? false : true}
        >
          <div className="mt-6 flex flex-col space-y-2 w-full px-1">
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
              className="appearance-none w-full h-1 p-0 bg-orbital-blue bg-opacity-75 focus:outline-none focus:ring-0 focus:shadow-none mb-4"
            ></input>
          </div>
          <div className="px-1 pt-4 pb-1">
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
        <Accordion
          title={"Core"}
          click={() => {
            setStep(3);
          }}
          selection={
            <>
              <Image
                src={pCoreTexture}
                alt={"Core Texture"}
                height={30}
                width={30}
              />
              <div
                style={{ backgroundColor: pCoreColor.hex }}
                className="w-[30px] h-[30px]"
              />
            </>
          }
          collapsed={step === 3 ? false : true}
        >
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
          <div className="px-1 pt-4 pb-1">
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
        <Accordion
          title={"Atmosphere"}
          click={() => {
            setStep(4);
          }}
          selection={
            <>
              <Image
                src={pCloudTexture}
                alt={"Cloud Texture"}
                height={30}
                width={30}
              />
              <div
                style={{ backgroundColor: pAtmosColor.hex }}
                className="w-[30px] h-[30px]"
              />
            </>
          }
          collapsed={step === 4 ? false : true}
        >
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
          </div>
          <div className="px-1 pt-4 pb-1">
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
        <Accordion
          title={"Title"}
          click={() => {
            setStep(5);
          }}
          selection={pName}
          collapsed={step === 5 ? false : true}
        >
          <div className="px-1 pt-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder={pName}
              onChange={(e) => setName(filter.clean(e.target.value))}
              className={
                "block text-sm font-medium w-full bg-transparent border-blue-border border-2 p-2"
              }
            />
          </div>
          <div className="px-1 pt-4 pb-1">
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
        <Accordion
          title={"Complete"}
          click={() => {
            setStep(6);
          }}
          collapsed={step === 6 ? false : true}
        >
          <div className="px-1 pt-4 pb-1">
            <Button
              click={handleSubmit}
              label={"Create Your Planet"}
              className={"w-full"}
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
      pName,
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
      setName("Your Planet Name");
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
      <div className="portrait:hidden">
        {/* TODO convert canvas to motioncanvas */}
        {/* @link https://www.framer.com/docs/motioncanvas/ */}
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{ fov: 75, position: [0, 0, zoom || 20] }}
          style={{
            height: "100vh",
            width: "40vw",
            position: "fixed",
            zIndex: 50,
          }}
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
            <Stars fade={true} />
            <Planet />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={false}
            />
          </Suspense>
        </Canvas>
        <div
          className="z-50 fixed right-0 p-1 h-screen overflow-y-scroll overscroll-y-contain"
          style={{ width: "60vw" }}
        >
          <div className="mt-6 flex flex-col space-y-2 w-full px-1 pb-4">
            <p>Planet Zoom</p>
            <input
              type="range"
              min={
                terrestrial
                  ? 1
                  : superEarth
                  ? 4
                  : neptuneLike
                  ? 7
                  : gasGiant
                  ? 10
                  : 10
              }
              max={
                terrestrial
                  ? 20
                  : superEarth
                  ? 20
                  : neptuneLike
                  ? 20
                  : gasGiant
                  ? 20
                  : 20
              }
              defaultValue={
                terrestrial
                  ? 20
                  : superEarth
                  ? 20
                  : neptuneLike
                  ? 20
                  : gasGiant
                  ? 20
                  : 20
              }
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              id="zoom"
              step="-1"
              className="appearance-none w-full h-1 p-0 bg-orbital-blue bg-opacity-75 focus:outline-none focus:ring-0 focus:shadow-none mb-4"
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col justify-between h-max pb-4"
          >
            {RenderSteps()}
          </form>
        </div>
        {error ? (
          <div className="block w-full my-3 mx-auto">
            <h3 className="text-red-500">{error}</h3>
          </div>
        ) : null}
        {message ? (
          <div className="absolute z-50 h-screen w-full grid place-items-center bg-black bg-opacity-75">
            <div className="absolute z-50 grid place-items-center">
              <h3 className="text-xl font-secondary uppercase p-8">
                {message}
              </h3>
              <Background />
            </div>
            <Link
              className="absolute mt-48 w-max p-4"
              click={() => router.push("/")}
              label={"Start Over"}
              variant={"link"}
            />
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