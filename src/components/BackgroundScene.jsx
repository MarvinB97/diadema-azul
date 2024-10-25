// src/components/BackgroundScene.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Bubble = (props) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.position.y += Math.sin(Date.now() * 0.001) * 0.01;
  });

  return (
    <mesh ref={mesh} {...props}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="white" transparent opacity={0.7} />
    </mesh>
  );
};

const BackgroundScene = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#005f73" />
      </mesh>
      <Bubble position={[0, 0.5, -4]} scale={[0.2, 0.2, 0.2]} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Bubble key={i} position={[Math.random() * 20 - 10, Math.random() * 2 + 1, Math.random() * -20]} />
      ))}
      <Environment preset="sunset" />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default BackgroundScene;



