import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, useTexture } from '@react-three/drei';

const RotatingEarth = () => {
  const meshRef = useRef();
  const texture = useTexture('/textures/earth.png'); // Textura de la Tierra
  const atmosphereTexture = useTexture('/textures/earth_atmosphere.jpg'); // Textura para la atmósfera

  // Animar la rotación de la esfera
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Rotación más lenta para suavidad
    }
  });

  return (
    <>
      {/* Planeta Tierra */}
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" map={texture} />
      </Sphere>

      {/* Esfera 3D (atmósfera) */}
      <Sphere args={[1.05, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" map={atmosphereTexture} transparent opacity={0.5} />
      </Sphere>
    </>
  );
};

const ClimateChange = () => {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundImage: 'url(/textures/espacio.jpg)', // Fondo personalizado
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF' // Color de texto blanco para contraste
    }}>
      <h1 style={{ fontSize: '3em', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Cambio Climático</h1>
      <p style={{ fontSize: '1.2em', textAlign: 'center', maxWidth: '600px' }}>
        El cambio climático agrava la escasez de agua debido a la mayor frecuencia de las sequías,
        el cambio de los regímenes pluviales y el aumento de las tasas de evaporación.
        A medida que aumenta la temperatura global, la disponibilidad de agua se vuelve más impredecible,
        afectando tanto a los ecosistemas como a las poblaciones humanas.
      </p>

      <Canvas 
        style={{ height: '400px', marginTop: '20px' }}
        camera={{ position: [0, 0, 2.5], fov: 50 }} // Posición inicial de la cámara más cercana
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <pointLight position={[-10, -10, -10]} intensity={2} />

        {/* Planeta Tierra */}
        <RotatingEarth />
        <OrbitControls 
          enableZoom={true} // Permitir acercar y alejar
          minDistance={1.5} // Distancia mínima de la cámara
          maxDistance={5} // Distancia máxima de la cámara
          enablePan={true} // Permitir mover la vista
          maxPolarAngle={Math.PI / 2} // Limitar el ángulo de rotación vertical
          minPolarAngle={0} // Limitar el ángulo de rotación vertical
        />
      </Canvas>

      <div style={{ marginTop: '20px', textAlign: 'center', color: '#FFFFFF' }}>
        <h3 style={{ fontSize: '1.5em' }}>Interactúa con el planeta</h3>
        <p>Utiliza el mouse para girar y acercar el planeta.</p>
        <Link to="/">
        <button style={{
            padding: '10px 22px',
            backgroundColor: 'transparent',
            color: '#007BFF',
            border: '2px solid #007BFF',
            borderRadius: '8px',
            fontSize: '1em',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ color: '#ffffff' }}>Volver al menú</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClimateChange;
