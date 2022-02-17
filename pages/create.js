import Head from "next/head";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Cloud } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { LayerMaterial, Base, Depth, Fresnel, Texture } from "lamina";
import { Sphere } from "@react-three/drei";
import Button from "../components/Button";

export default function AddPost() {
  const typePosition = () => {
    return gasGiant
      ? 10
      : neptuneLike
      ? 7
      : superEarth
      ? 1
      : terrestrial
      ? -3
      : 1;
  };
  const targetRef = useRef();
  // TODO rotate planet slowly during creation
  // useFrame(({ clock }) => {
  //   targetRef.current.rotation.x = clock.getElapsedTime();
  //   // targetRef.current.rotation.y += 0.025;
  // });

  const [
    { title, type, baseColor, layerColorA, layerColorB, fresnelColor },
    set,
  ] = useControls(() => ({
    title: "",
    type: {
      options: ["Gas Giant", "Neptune-like", "Super Earth", "Terrestrial"],
    },
    baseColor: "#FFFFFF",
    layerColorA: "#D33CE7",
    layerColorB: "#FFFFFF",
    fresnelColor: "#496EEF",
  }));

  // set type to variable
  const gasGiant = type === "Gas Giant";
  const neptuneLike = type === "Neptune-like";
  const superEarth = type === "Super Earth";
  const terrestrial = type === "Terrestrial";
  const typeScale = () => {
    return gasGiant
      ? 2
      : neptuneLike
      ? 1.5
      : superEarth
      ? 1
      : terrestrial
      ? 0.5
      : 1;
  };
  console.log(typeScale());

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // set database options
    let post = {
      title,
      type,
      baseColor,
      layerColorA,
      layerColorB,
      fresnelColor,
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
      // reset the fields
      set({ title: "" });
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
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false }}
        camera={{ fov: 50, position: [0, 0, 10] }}
        style={{ height: "50vh" }}
      >
        {/* TODO figure out lighting */}
        {/* <ambientLight intensity={1} /> */}
        {/* <pointLight position={[0, 0, 0]} /> */}
        {/* TODO add planet atmosphere */}
        {/* <Cloud position={[0, 0, 0]} args={[3, 2]} /> */}
        <Text
          fontSize={0.5}
          outlineWidth={"5%"}
          outlineColor="#000000"
          outlineOpacity={1}
          position={[0, 3, 0]}
          onChange={(e) => set({ title: e.target.value })}
        >
          {title}
        </Text>
        <Stars />
        <Sphere ref={targetRef} position={[0, 0, 0]} scale={typeScale()}>
          <LayerMaterial>
            <Base
              color={baseColor}
              value={baseColor}
              onChange={(e) => set({ baseColor: e.target.value })}
              alpha={1}
              mode="normal"
            />
            <Depth
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
              far={2}
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
            {/* TODO add texture */}
            {/* <Texture map={"/rocky.jpg"} alpha={1} /> */}
          </LayerMaterial>
        </Sphere>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="max-w-3xl m-auto">
        <Leva
          collapsed={false}
          hideCopyButton={true}
          fill={true}
          titleBar={{ drag: false, title: "Planet Options", filter: false }}
        />
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
    </>
  );
}
