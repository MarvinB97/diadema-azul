// src/pages/WaterScarcityScene.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const boxesData = [
  { color: 'lightblue', position: [-2, 1, 0], route: '/agricultural-overuse' },
  { color: 'salmon', position: [0, 1, 0], route: '/pollution' },
  { color: 'lightgreen', position: [2, 1, 0], route: '/climate-change' },
  { color: 'gold', position: [0, -1, 0], route: '/population-growth' },
];

const InteractiveBox = ({ color, position, onClick }) => {
  return (
    <mesh position={position} onClick={onClick} scale={1.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const WaterScarcityScene = () => {
  const navigate = useNavigate();

  const handleBoxClick = (route) => {
    navigate(route);
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#e0f7fa', position: 'relative' }}>
      <Canvas camera={{ position: [5, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="sunset" />

        {boxesData.map((box, index) => (
          <InteractiveBox
            key={index}
            color={box.color}
            position={box.position}
            onClick={() => handleBoxClick(box.route)}
          />
        ))}

        <OrbitControls />
      </Canvas>

      <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginTop: '20px', 
          textShadow: '2px 2px 4px black', 
          position: 'absolute', 
          top: '10px', 
          left: '50%', 
          transform: 'translateX(-50%)' 
        }}>
        Water Scarcity
      </h1>
      <p style={{ color: 'black', textAlign: 'center', position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)' }}>
        Water scarcity affects billions of people worldwide...
      </p>

      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <button
          style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', background: '#007BFF', color: 'white', border: 'none' }}
          onClick={() => navigate('/')}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default WaterScarcityScene;












