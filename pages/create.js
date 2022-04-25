import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { LayerMaterial, Depth, Texture } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Button from "../components/Button";
import FormButton from "../components/Form/FormButton";
import { CirclePicker } from "react-color";
import Accordion from "../components/Accordion";
import Image from "../components/Image";
import {
  gasTextures,
  neptuneTextures,
  superTextures,
  terrestrialTextures,
  cloudTextures,
} from "../components/Images";
import Link from "../components/Link";
import Background from "../components/Background";
import RotateIcon from "../components/RotateIcon";
import Nav from "../components/Nav";
import { motion } from "framer-motion";
import { server } from "../lib/server";

// const defaultValues = {
//   type: "Gas Giant",
//   size: 5,
//   coreColor: "#2196f3",
//   cloudColor: "#f44336",
// };

export default function Create() {
  const random = (a, b) => a + Math.random() * b;
  const router = useRouter();
  const [pType, setType] = useState("Gas Giant");
  const [pSize, setSize] = useState("5");
  const [pCoreColor, setCoreColor] = useState({ hex: "#2196f3" });
  const [pCloudColor, setCloudColor] = useState({ hex: "#f44336" });
  //  TODO set these values based on type
  //  ie. larger planetes = slower; smaller planets = faster;
  // TODO Move these values to observe page ie. z/xRadius
  const pSpeed = random(0.05, 0.06);
  const pOffset = random(0, Math.PI * 2);

  const gasGiant = pType === "Gas Giant";
  const neptuneLike = pType === "Neptune-like";
  const superEarth = pType === "Super Earth";
  const terrestrial = pType === "Terrestrial";

  const [pCoreTexture, setCoreTexture] = useState(gasTextures[0]);
  const [pCloudTexture, setCloudTexture] = useState(cloudTextures[0]);
  const [pCloudAlpha, setCloudAlpha] = useState(0.5);
  const [pName, setName] = useState("Your Planet Name");
  const [zoom, setZoom] = useState(10);

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

  const preloadCloudTexture = (texturePath) =>
    new Promise((resolve, reject) => {
      const image = new window.Image(texturePath);
      image.onload = () => resolve(texturePath);
      image.src = texturePath;
    });
  const prepareCloudTexture = async (texturePath) => {
    try {
      await preloadCloudTexture(texturePath);
      setCloudTexture(texturePath);
    } catch (e) {
      console.log(e);
    }
  };

  const Planet = () => {
    const targetRef = useRef();
    useFrame(({ clock }) => {
      targetRef.current.rotation.y = clock.getElapsedTime() / 10;
    });
    useFrame((state) => {
      state.camera.position.z = zoom;
    });
    return (
      <>
        <Sphere ref={targetRef} position={[0, 0, 0]} scale={pSize}>
          <LayerMaterial
            color={pCoreColor.hex}
            alpha={1}
            lighting="physical"
            transmission={0.5}
          >
            <Texture map={useTexture(pCoreTexture)} alpha={0.65} />
            <Texture map={useTexture(pCloudTexture)} alpha={0.5} />
            <Depth
              colorA={pCloudColor.hex}
              colorB="#000000"
              onChange={(e) => setCloudColor(e.target.value)}
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
          <motion.div className="px-1 pt-2 grid grid-cols-4 gap-2 w-full">
            <FormButton
              imgSrc={gasTextures[0]}
              label={"Gas Giant"}
              click={() => {
                setType("Gas Giant");
                setSize("5");
                preloadCoreTexture(gasTextures[0]);
                prepareCoreTexture(gasTextures[0]);
                setZoom(10);
              }}
            />
            <FormButton
              imgSrc={neptuneTextures[0]}
              label={"Neptune-like"}
              click={() => {
                setType("Neptune-like");
                setSize("3.5");
                preloadCoreTexture(neptuneTextures[0]);
                prepareCoreTexture(neptuneTextures[0]);
                setZoom(10);
              }}
            />
            <FormButton
              imgSrc={superTextures[0]}
              label={"Super Earth"}
              click={() => {
                setType("Super Earth");
                setSize("2");
                preloadCoreTexture(superTextures[0]);
                prepareCoreTexture(superTextures[0]);
                setZoom(10);
              }}
            />
            <FormButton
              imgSrc={terrestrialTextures[0]}
              label={"Terrestrial"}
              click={() => {
                setType("Terrestrial");
                setSize("0.5");
                preloadCoreTexture(terrestrialTextures[0]);
                prepareCoreTexture(terrestrialTextures[0]);
                setZoom(10);
              }}
            />
          </motion.div>
          <motion.div className="px-1 pt-4 pb-1">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </motion.div>
        </Accordion>
        <Accordion
          title={"Size"}
          click={() => {
            setStep(2);
          }}
          selection={"Size: " + pSize}
          collapsed={step === 2 ? false : true}
        >
          <motion.div className="mt-6 flex flex-col space-y-2 w-full px-1">
            <motion.input
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
              className="slider-blue appearance-none w-full h-1 p-0 bg-blue-bg bg-opacity-75 focus:outline-none focus:ring-0 focus:shadow-none rounded outline-none slider-thumb mb-4"
            />
          </motion.div>
          <motion.div className="px-1 pt-4 pb-1">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </motion.div>
        </Accordion>
        <Accordion
          title={"Surface"}
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
              <motion.div
                style={{ backgroundColor: pCoreColor.hex }}
                className="w-[30px] h-[30px]"
              />
            </>
          }
          collapsed={step === 3 ? false : true}
        >
          <motion.div className="px-1 pt-2 w-full">
            <motion.div className="grid grid-cols-4 gap-2 w-full mb-4">
              {gasGiant && (
                <>
                  <FormButton
                    imgSrc={gasTextures[0]}
                    label={"Type 1"}
                    click={() => {
                      preloadCoreTexture(gasTextures[0]);
                      prepareCoreTexture(gasTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={gasTextures[1]}
                    label={"Type 2"}
                    click={() => {
                      preloadCoreTexture(gasTextures[1]);
                      prepareCoreTexture(gasTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={gasTextures[2]}
                    label={"Type 3"}
                    click={() => {
                      preloadCoreTexture(gasTextures[2]);
                      prepareCoreTexture(gasTextures[2]);
                    }}
                  />
                  <FormButton
                    imgSrc={gasTextures[3]}
                    label={"Type 4"}
                    click={() => {
                      preloadCoreTexture(gasTextures[3]);
                      prepareCoreTexture(gasTextures[3]);
                    }}
                  />
                </>
              )}
              {neptuneLike && (
                <>
                  <FormButton
                    imgSrc={neptuneTextures[0]}
                    label={"Type 1"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[0]);
                      prepareCoreTexture(neptuneTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={neptuneTextures[1]}
                    label={"Type 2"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[1]);
                      prepareCoreTexture(neptuneTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={neptuneTextures[2]}
                    label={"Type 3"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[2]);
                      prepareCoreTexture(neptuneTextures[2]);
                    }}
                  />
                  <FormButton
                    imgSrc={neptuneTextures[3]}
                    label={"Type 4"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[3]);
                      prepareCoreTexture(neptuneTextures[3]);
                    }}
                  />
                </>
              )}
              {superEarth && (
                <>
                  <FormButton
                    imgSrc={superTextures[0]}
                    label={"Type 1"}
                    click={() => {
                      preloadCoreTexture(superTextures[0]);
                      prepareCoreTexture(superTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={superTextures[1]}
                    label={"Type 2"}
                    click={() => {
                      preloadCoreTexture(superTextures[1]);
                      prepareCoreTexture(superTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={superTextures[2]}
                    label={"Type 3"}
                    click={() => setCoreTexture(superTextures[2])}
                  />
                  <FormButton
                    imgSrc={superTextures[3]}
                    label={"Type 4"}
                    click={() => {
                      preloadCoreTexture(superTextures[3]);
                      prepareCoreTexture(superTextures[3]);
                    }}
                  />
                </>
              )}
              {terrestrial && (
                <>
                  <FormButton
                    imgSrc={terrestrialTextures[0]}
                    label={"Type 1"}
                    click={() => {
                      preloadCoreTexture(terrestrialTextures[0]);
                      prepareCoreTexture(terrestrialTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={terrestrialTextures[1]}
                    label={"Type 2"}
                    click={() => {
                      preloadCoreTexture(terrestrialTextures[1]);
                      prepareCoreTexture(terrestrialTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={terrestrialTextures[2]}
                    label={"Type 3"}
                    click={() => {
                      preloadCoreTexture(terrestrialTextures[2]);
                      prepareCoreTexture(terrestrialTextures[2]);
                    }}
                  />
                  <FormButton
                    imgSrc={terrestrialTextures[3]}
                    label={"Type 4"}
                    click={() => {
                      preloadCoreTexture(terrestrialTextures[3]);
                      prepareCoreTexture(terrestrialTextures[3]);
                    }}
                  />
                </>
              )}
            </motion.div>
            <CirclePicker
              width={"100%"}
              color={pCoreColor}
              onChange={setCoreColor}
              className={"mt-2"}
            />
          </motion.div>
          <motion.div className="px-1 pt-4 pb-1">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </motion.div>
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
              <motion.div
                style={{ backgroundColor: pCloudColor.hex }}
                className="w-[30px] h-[30px]"
              />
            </>
          }
          collapsed={step === 4 ? false : true}
        >
          <motion.div className="px-1 pt-2 w-full">
            <motion.div className="grid grid-cols-4 gap-2 w-full mb-4">
              <FormButton
                imgSrc={cloudTextures[0]}
                label={"Type 1"}
                click={() => {
                  preloadCloudTexture(cloudTextures[0]);
                  prepareCloudTexture(cloudTextures[0]);
                }}
              />
              <FormButton
                imgSrc={cloudTextures[1]}
                label={"Type 2"}
                click={() => {
                  preloadCloudTexture(cloudTextures[1]);
                  prepareCloudTexture(cloudTextures[1]);
                }}
              />
              <FormButton
                imgSrc={cloudTextures[2]}
                label={"Type 3"}
                click={() => {
                  preloadCloudTexture(cloudTextures[2]);
                  prepareCloudTexture(cloudTextures[2]);
                }}
              />
              <FormButton
                imgSrc={cloudTextures[3]}
                label={"Type 4"}
                click={() => {
                  preloadCloudTexture(cloudTextures[3]);
                  prepareCloudTexture(cloudTextures[3]);
                }}
              />
            </motion.div>
            <CirclePicker
              width={"100%"}
              color={pCloudColor.hex}
              onChange={setCloudColor}
            />
          </motion.div>
          <motion.div className="px-1 pt-4 pb-1">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </motion.div>
        </Accordion>
        <Accordion
          title={"Name"}
          click={() => {
            setStep(5);
          }}
          selection={pName}
          collapsed={step === 5 ? false : true}
        >
          <motion.div className="px-1 pt-4">
            <motion.input
              type="text"
              name="name"
              id="name"
              placeholder={pName}
              onChange={(e) => setName(filter.clean(e.target.value))}
              className={
                "block text-sm font-medium w-full bg-transparent border-blue-border border-2 p-2"
              }
            />
          </motion.div>
          <motion.div className="px-1 pt-4 pb-1">
            <Link
              variant={"button"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              label={"Next"}
            />
          </motion.div>
        </Accordion>
        <Accordion
          title={"Finish"}
          click={() => {
            setStep(6);
          }}
          selection={""}
          collapsed={step === 6 ? false : true}
        >
          <motion.div className="px-1 pt-4 pb-1">
            <Button
              click={handleSubmit}
              label={"Create Your Planet"}
              className={"w-full"}
            />
          </motion.div>
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
      pCloudColor,
      pCoreTexture,
      pCloudTexture,
      pCloudAlpha,
      pName,
      createdAt: new Date().toISOString(),
    };

    // reset error and message
    setError("");
    setMessage("");

    // save the post
    let response = await fetch(`${server}/api/posts`, {
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
      setCloudColor({ hex: "#f44336" });
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
      <Nav />
      <motion.div
        className="portrait:hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1.5,
          },
        }}
        exit={{ opacity: 0 }}
      >
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{ fov: 75, position: [0, 0, zoom || 20] }}
          style={{
            height: "100vh",
            width: "40vw",
            position: "absolute",
            zIndex: 0,
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <pointLight position={[100, 100, 100]} />
            <Stars fade={true} />
            <Planet />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={false}
            />
          </Suspense>
        </Canvas>
        <motion.div
          className="absolute bottom-0 left-0 p-1 w-[40vw] bg-purple-bg"
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="flex flex-row items-center gap-2 px-1 border-pink-border border-2 py-1 shadow-sm shadow-pink-border/10">
            <motion.p className="font-secondary text-xs uppercase opacity-50 w-2/6">
              Planet Zoom
            </motion.p>
            <motion.span className="font-secondary text-xl opacity-50">
              +
            </motion.span>
            <motion.input
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
                  ? 10
                  : superEarth
                  ? 10
                  : neptuneLike
                  ? 10
                  : gasGiant
                  ? 10
                  : 10
              }
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              id="zoom"
              step="1"
              className="slider-purple appearance-none w-4/6 h-1 p-0 bg-purple-bg bg-opacity-75 focus:outline-none focus:ring-0 focus:shadow-none rounded outline-none slider-thumb"
            />
            <motion.span className="font-secondary text-xl opacity-50">
              -
            </motion.span>
          </motion.div>
        </motion.div>
        <motion.div
          className="z-0 absolute right-0 p-1 h-screen overflow-y-scroll overscroll-y-contain"
          style={{ width: "60vw" }}
          initial={{ opacity: 0, x: 50 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 1.5,
            },
          }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col justify-between h-max pb-4"
          >
            {RenderSteps()}
          </motion.form>
        </motion.div>
        {error ? (
          <motion.div className="block w-full my-3 mx-auto">
            <motion.h3 className="text-red-500">{error}</motion.h3>
          </motion.div>
        ) : null}
        {message ? (
          <motion.div className="absolute z-50 h-screen w-full flex flex-col justify-center items-center bg-black bg-opacity-75">
            <motion.div className="absolute z-50 flex flex-col justify-center items-center">
              <motion.h3 className="text-xl font-secondary uppercase p-8">
                {message}
              </motion.h3>
              <Background />
            </motion.div>
            <Link
              className="absolute mt-48 w-max p-4"
              click={() => router.push("/")}
              label={"Start Over"}
              variant={"link"}
            />
          </motion.div>
        ) : null}
      </motion.div>
      <motion.div className="landscape:hidden z-50 h-screen w-full flex flex-col justify-center items-center bg-black bg-opacity-75">
        <motion.div className="absolute z-50 flex flex-col justify-center items-center mx-4">
          <RotateIcon className={"block w-24 h-24 mt-8"} />
          <motion.h3 className="text-xl font-secondary uppercase p-8">
            Please rotate your device.
          </motion.h3>
          <Background />
        </motion.div>
      </motion.div>
    </>
  );
}
