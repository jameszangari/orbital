import Head from "next/head";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva, LevaPanel, useControls } from "leva";
import { LayerMaterial, Base, Depth } from "lamina";
import { Sphere } from "@react-three/drei";
import Form from "../components/Form";
import Planet from "../components/Planet";
import Nav from "../components/Nav";

export default function AddPost() {
  // // here we create an array state to store the contact form data
  // const [contacts, updateContacts] = useState([]);
  // const addContact = (contact) => {
  //   console.log(contact);
  //   updateContacts([...contacts, contact]);
  // };

  const { scale } = useControls({
    scale: {
      value: 1,
      min: 1,
      max: 5,
      step: 1,
    },
  });
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
  const [{ title, type, baseColor, layerColorA, layerColorB }, set] =
    useControls(() => ({
      title: "",
      type: {
        options: ["Gas Giant", "Neptune-like", "Terrestrial", "Super Earth"],
      },
      baseColor: "#fff",
      layerColorA: "#121212",
      layerColorB: "#EDEDED",
    }));
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    let post = {
      title,
      type,
      baseColor,
      layerColorA,
      layerColorB,
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
    <div>
      <Head>
        <title>Orbital | Create</title>
      </Head>
      <Nav />
      {/* <div className="max-w-3xl mx-auto px-6 pt-4"> */}
      <div style={{ width: "100vw", height: "50vh" }}>
        <Canvas
          camera={{
            fov: 35,
            near: 1,
            far: 1000,
            position: [10, 10, 10],
          }}
          setPixelRatio={2160}
          // className="js-canvas"
        >
          {/* <ambientLight intensity={1} /> */}
          {/* <pointLight position={[0, 0, 0]} /> */}
          {/* <Sun /> */}
          {/* <Planet post={post} key={i} /> */}
          <Sphere ref={targetRef} position={[0, 0, 0]} scale={scale}>
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
            </LayerMaterial>
          </Sphere>
          <OrbitControls />
        </Canvas>
        <div className="max-w-3xl m-auto">
          <Leva
            fill={true}
            titleBar={{ drag: false, title: "Planet Options" }}
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
          <button onClick={handleSubmit}>Submit Planet</button>
        </div>
      </div>
      {/* <Form addContact={addContact} /> */}
      {/* </div> */}
    </div>
  );
}
