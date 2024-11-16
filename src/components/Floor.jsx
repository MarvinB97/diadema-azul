export default function Floor() {
  const size = 10;

  return (
    <mesh  rotation-x={Math.PI / -2} position={[0,-3,-1.5]} receiveShadow>
      <circleGeometry args={[size, size]} />
      <meshStandardMaterial color={"#0953FF"}/>
    </mesh>
  );
}