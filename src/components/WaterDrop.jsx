import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const WaterDrop = () => {
  return (
    <Canvas style={{ height: '300px', width: '300px', margin: '20px auto' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="deepskyblue" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default WaterDrop;