import Head from "next/head";
import { Suspense, useRef, useState } from "react";
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

const defaultVariables = {
  type: "Gas Giant",
  size: "5",
  coreColor: { hex: "#2196f3" },
  cloudColor: { hex: "#f44336" },
  coreTexture: gasTextures[0],
  cloudTexture: cloudTextures[0],
  name: "Your Planet Name",
  zoom: 10,
};

export default function Create() {
  const random = (a, b) => a + Math.random() * b;
  const [pType, setType] = useState(defaultVariables.type);
  const [pSize, setSize] = useState(defaultVariables.size);
  const [pCoreColor, setCoreColor] = useState(defaultVariables.coreColor);
  const [pCloudColor, setCloudColor] = useState(defaultVariables.cloudColor);
  //  TODO set these values based on type
  //  ie. larger planetes = slower; smaller planets = faster;
  // TODO Move these values to observe page ie. z/xRadius
  const pSpeed = random(0.05, 0.06);
  const pOffset = random(0, Math.PI * 2);

  const gasGiant = pType === "Gas Giant";
  const neptuneLike = pType === "Neptune-like";
  const superEarth = pType === "Super Earth";
  const terrestrial = pType === "Terrestrial";

  const [pCoreTexture, setCoreTexture] = useState(defaultVariables.coreTexture);
  const [pCloudTexture, setCloudTexture] = useState(
    defaultVariables.cloudTexture
  );
  const [pName, setName] = useState(defaultVariables.name);
  const [zoom, setZoom] = useState(defaultVariables.zoom);

  const [imageReady, setImageReady] = useState(false);
  const preloadCoreTexture = (texturePath) =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.onload = () => {
        resolve(texturePath);
        setImageReady(true);
      };
      image.src = texturePath;
    });
  const prepareCoreTexture = async (texturePath) => {
    try {
      await preloadCoreTexture(texturePath);
      setCoreTexture(texturePath);
    } catch (error) {
      console.log(error);
    }
  };

  const preloadCloudTexture = (texturePath) =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.onload = () => {
        resolve(texturePath);
        setImageReady(true);
      };
      image.src = texturePath;
    });
  const prepareCloudTexture = async (texturePath) => {
    try {
      await preloadCloudTexture(texturePath);
      setCloudTexture(texturePath);
    } catch (error) {
      console.log(error);
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
            <Texture map={useTexture(pCloudTexture)} alpha={0.3} />
            <Depth
              colorA={pCloudColor.hex}
              colorB="#000000"
              onChange={(e) => setCloudColor(e.target.value)}
              alpha={0.65}
              mode="darken"
              mapping={"vector"}
            />
          </LayerMaterial>
        </Sphere>
      </>
    );
  };
  const defaultValues = [
    {
      type: "Gas Giant",
      image: gasTextures[0],
      size: "5",
      zoom: 10,
    },
    {
      type: "Neptune-like",
      image: neptuneTextures[0],
      size: "3.5",
      zoom: 10,
    },
    {
      type: "Super Earth",
      image: superTextures[0],
      size: "2",
      zoom: 10,
    },
    {
      type: "Terrestrial",
      image: terrestrialTextures[0],
      size: "0.5",
      zoom: 10,
    },
  ];

  const PlanetType = () => {
    // const [isActive, setActive] = useState(false);
    return defaultValues.map((value, i) => {
      return (
        <FormButton
          key={i}
          imgSrc={value.image}
          label={value.type}
          // className={isActive ? "bg-orbital-blue" : null}
          click={() => {
            // setActive(!isActive);
            setType(value.type);
            setSize(value.size);
            prepareCoreTexture(value.image);
            setZoom(value.zoom);
          }}
        />
      );
    });
  };
  const defaultValues2 = [
    {
      type: "Minimal",
      image: cloudTextures[0],
    },
    {
      type: "Medium",
      image: cloudTextures[1],
    },
    {
      type: "Heavy",
      image: cloudTextures[2],
    },
    {
      type: "Smog",
      image: cloudTextures[3],
    },
  ];
  const AtmosType = () => {
    return defaultValues2.map((value, i) => {
      return (
        <FormButton
          key={i}
          imgSrc={value.image}
          label={value.type}
          click={() => {
            prepareCloudTexture(value.image);
          }}
        />
      );
    });
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
            {PlanetType()}
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
                    label={"Carbon"}
                    click={() => {
                      preloadCoreTexture(gasTextures[0]);
                      prepareCoreTexture(gasTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={gasTextures[1]}
                    label={"Earthy"}
                    click={() => {
                      preloadCoreTexture(gasTextures[1]);
                      prepareCoreTexture(gasTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={gasTextures[2]}
                    label={"Nuclear"}
                    click={() => {
                      preloadCoreTexture(gasTextures[2]);
                      prepareCoreTexture(gasTextures[2]);
                    }}
                  />
                  <FormButton
                    imgSrc={gasTextures[3]}
                    label={"Humid"}
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
                    label={"Icy"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[0]);
                      prepareCoreTexture(neptuneTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={neptuneTextures[1]}
                    label={"Martian"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[1]);
                      prepareCoreTexture(neptuneTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={neptuneTextures[2]}
                    label={"Venusian"}
                    click={() => {
                      preloadCoreTexture(neptuneTextures[2]);
                      prepareCoreTexture(neptuneTextures[2]);
                    }}
                  />
                  <FormButton
                    imgSrc={neptuneTextures[3]}
                    label={"Volcanic"}
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
                    label={"Alpine"}
                    click={() => {
                      preloadCoreTexture(superTextures[0]);
                      prepareCoreTexture(superTextures[0]);
                    }}
                  />
                  <FormButton
                    imgSrc={superTextures[1]}
                    label={"Savannah"}
                    click={() => {
                      preloadCoreTexture(superTextures[1]);
                      prepareCoreTexture(superTextures[1]);
                    }}
                  />
                  <FormButton
                    imgSrc={superTextures[2]}
                    label={"Swamp"}
                    click={() => setCoreTexture(superTextures[2])}
                  />
                  <FormButton
                    imgSrc={superTextures[3]}
                    label={"Tropical"}
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
              {AtmosType()}
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
                "block text-sm font-medium w-full bg-transparent border-blue-border border-2 p-2 focus:outline-blue-border"
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
          title={"Confirm"}
          click={() => {
            setStep(6);
          }}
          selection={""}
          collapsed={step === 6 ? false : true}
          final={"true"}
        >
          <motion.div className="px-1 pt-4 pb-1">
            <motion.p className="uppercase tracking-wider font-secondary text-base pb-4 text-orbital-blueLight">
              Are you finished customizing your planet?
            </motion.p>
            <Button
              click={handleSubmit}
              label={"Add to galaxy"}
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
      setType(defaultVariables.type);
      setSize(defaultVariables.size);
      setCoreColor(defaultVariables.coreColor);
      setCloudColor(defaultVariables.cloudColor);
      setCoreTexture(defaultVariables.coreTexture);
      setCloudTexture(defaultVariables.cloudTexture);
      setName(defaultVariables.name);
      setZoom(defaultVariables.zoom);
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
            height: "100%",
            width: "40vw",
            position: "absolute",
            zIndex: 0,
          }}
          shadows
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.02} />
            <pointLight position={[100, 100, 100]} intensity={2} />
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
          className="absolute bottom-0 left-0 p-1 w-[40vw] bg-purple-bg z-10"
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
          <motion.div className="flex flex-row items-center gap-2 px-1 border-purple-accent border-2 py-1 shadow-md shadow-oPurple/10">
            <motion.p className="font-secondary text-xs uppercase opacity-75 w-2/6">
              Zoom
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
          className="z-0 absolute right-0 p-1 h-full overflow-y-scroll overscroll-y-contain"
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
          <motion.div className="absolute z-50 h-screen w-full flex flex-col justify-center items-center bg-black bg-opacity-90">
            <motion.div className="absolute z-50 flex flex-col justify-center items-center">
              <motion.h3 className="text-xl font-secondary uppercase p-8">
                {message}
              </motion.h3>
              <Background color={"pink"} border={"pink"} />
            </motion.div>
            <Link
              className="absolute mt-48 w-max p-4"
              url={"/"}
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
          <Background color={"blue"} border={"blue"} />
        </motion.div>
      </motion.div>
    </>
  );
}
