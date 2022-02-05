import React, { useState } from "react";
import { render } from "react-dom";
import { a, config } from "@react-spring/three";
import { Controls, useControl } from "react-three-gui";

const GROUP = "Extra";

function Extra() {
  const rotateX = useControl("Rotate X", {
    type: "number",
    group: GROUP,
    distance: 10,
    scrub: true,
    min: -Infinity,
    max: Infinity,
    spring: true,
  });
  const rotateY = useControl("Rotate Y", {
    type: "number",
    group: GROUP,
    distance: 10,
    scrub: true,
    min: -Infinity,
    max: Infinity,
    spring: true,
  });
  return (
    <a.mesh position={[1.5, 0, 0.5]} rotation-x={rotateX} rotation-y={rotateY}>
      <boxGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
      <a.meshStandardMaterial attach="material" color={0xffff00} />
    </a.mesh>
  );
}

function Box() {
  const [show, set] = useState(false);
  const posX = useControl("Pos X", { type: "number", spring: true });
  const posY = useControl("Pos Y", {
    type: "number",
    spring: config.wobbly,
  });
  const rotateXY = useControl("Rotation", { type: "xypad", distance: Math.PI });
  const color = useControl("Material Color", { type: "color" });
  useControl("Toggle cube", {
    group: GROUP,
    type: "button",
    onClick: () => set((s) => !s),
  });
  return (
    <>
      <a.mesh
        rotation-x={rotateXY.x}
        rotation-y={rotateXY.y}
        position-x={posX}
        position-y={posY}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial attach="material" color={color} />
      </a.mesh>
      {show && <Extra />}
    </>
  );
}

function App() {
  return (
    <Controls.Provider>
      <Controls.Canvas style={{ width: 598, height: 598 }}>
        <ambientLight />
        <pointLight position={[10, 0, 10]} intensity={1} />
        <Box />
      </Controls.Canvas>
      <Controls />
    </Controls.Provider>
  );
}

render(<App />, document.querySelector("#root"));
