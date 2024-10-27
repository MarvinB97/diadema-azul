import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Animation.css';
import { OrbitControls } from '@react-three/drei';

function AnimatedObject() {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  useFrame(() => {
    setTime((prev) => prev<20 ? (prev + 0.04):0); // Incrementa el tiempo
    if (meshRef.current) {
      meshRef.current.position.y = Math.cos(time); // Aplica la función coseno a la posición Y
      meshRef.current.position.x = time-15; //movimiento lineal en el eje x
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshMatcapMaterial color={'blue'} />
    </mesh>
  );
}

function Animation() {
  return (
    <div className='container-animation'>
      <h1>Animacion</h1>
      <Canvas
        camera={{
          position: [2, 0, 5],
        }}
      >
        <OrbitControls />
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 10]} />

        {/* Caja animada */}
        <AnimatedObject />
      </Canvas>
      <Link to="/">Volver</Link>
    </div>
  );
}

export default Animation;