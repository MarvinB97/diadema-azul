import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/models-3d/ciudad_desierto.glb'); 
  return <primitive object={scene} scale={[1.0, 1.0, 1.0]} position={[-20, -500, -50]} />;
};

const InteractiveCityDesert = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      {/* Canvas with 3D model */}
      <div style={{ flex: 2 }}>
        <Canvas 
          style={{ height: '100%', width: '100%', background: 'linear-gradient(180deg, #87CEEB, #ffffff)' }} 
          camera={{ position: [0, 0, 500], fov: 90, near: 0.1, far: 7000 }}
        >
          <Environment preset="city" />
          <ambientLight intensity={0.7} />
          <directionalLight position={[0, 0, 0]} intensity={1.5} />
          <Model />
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={0} 
            rotateSpeed={0.8}
            zoomSpeed={1}
            panSpeed={0.5}
            minDistance={50} 
            maxDistance={2000} 
          />
        </Canvas>
      </div>

      {/* Informational text about "Crecimiento Demográfico" */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(178, 224, 230, 0.9)',
        backdropFilter: 'blur(10px)', 
        overflowY: 'auto',
        maxHeight: '100vh',
        marginLeft: '20px', 
        borderRadius: '10px',
      }}>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h1 style={{ color: '#000', fontSize: '2.5em', fontWeight: 'bold' }}>
            Crecimiento Demográfico
          </h1>
          <p style={{ color: '#333', fontSize: '1.2em', lineHeight: '1.6', marginBottom: '20px' }}>
            El crecimiento demográfico ejerce una presión cada vez mayor sobre los recursos hídricos.
            A medida que se expanden la urbanización y las actividades industriales, la demanda de agua aumenta exponencialmente.
            Las estrategias eficaces de gestión del agua son fundamentales para satisfacer las crecientes necesidades de las comunidades de todo el mundo.
          </p>

          <a href="/" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1.2em',
            marginTop: '20px',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
          >
            Volver al menú
          </a>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCityDesert;
















