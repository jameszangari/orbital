import * as THREE from "three";

export default function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  // TODO change 30 to db length
  for (let index = 0; index < 30; index++) {
    const angle = (index / 30) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#2b2b2b" linewidth={5} />
      {/* <lineBasicMaterial attach="material" color="#2F3237" linewidth={10} /> */}
    </line>
  );
}
