import Head from "next/head";
import { useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { LayerMaterial, Base, Depth, Fresnel, Texture } from "lamina";
import { Sphere } from "@react-three/drei";
import Button from "../components/Button";

export default function AddPost() {
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
  const typeColor = () => {
    return gasGiant
      ? "#4443A7"
      : neptuneLike
      ? "#36c69b"
      : superEarth
      ? "#6fb23a"
      : terrestrial
      ? "#bdaa66"
      : "#ffffff";
  };
  const targetRef = useRef();
  // TODO rotate planet slowly during creation
  // useFrame((state, delta) => (targetRef.current.rotation.y += 0.025));
  const [
    { title, type, baseColor, layerColorA, layerColorB, fresnelColor },
    set,
  ] = useControls(() => ({
    title: "",
    type: {
      options: ["Gas Giant", "Neptune-like", "Terrestrial", "Super Earth"],
    },
    baseColor: "#fff",
    layerColorA: "#ff0000",
    layerColorB: "#fff",
    fresnelColor: "#00ff49",
  }));
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

    console.log(response);
    // // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      //   setTitle("");
      //   setContent("");
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
      <div>
        <Canvas
          camera={{
            fov: 35,
            near: 1,
            far: 1000,
            position: [10, 10, 10],
            zoom: 3,
          }}
          setPixelRatio={2160}
          style={{ height: "50vh" }}
        >
          {/* TODO figure out lighting */}
          {/* <ambientLight intensity={1} /> */}
          {/* <pointLight position={[0, 0, 0]} /> */}
          <Sphere ref={targetRef} position={[0, 0, 0]} scale={1}>
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
              {/* <Texture args={colorMap} /> */}
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
      </div>
      {/* <Form addContact={addContact} /> */}
      {/* </div> */}
    </>
  );
}
