import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Componente para el modelo 3D
const Model = () => {
  const { scene } = useGLTF('/models-3d/tratamientoagua.glb');
  return <primitive object={scene} scale={[1, 1,1]} position={[0,-3,0]} />;
 // Ajusta la escala y la posición
};

// Componente principal de la contaminación
const Pollution = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
      {/* Canvas con el modelo 3D */}
      <div style={{ flex: 1, backgroundImage: `url('/ptar_agua.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Canvas style={{ height: '100%', width: '100%' }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} /> {/* Ajusta la intensidad */}
          <directionalLight position={[10, 10, 5]} intensity={2} />

          <Model />
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={0} 
            rotateSpeed={0.8}
            zoomSpeed={0.5}
            panSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Texto informativo */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
        maxHeight: '100vh',
      }}>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h1 style={{ color: '#333', fontSize: '2.5em', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginBottom: '20px' }}>
            Contaminación de las Fuentes de Agua
          </h1>
          <p style={{ color: '#555', fontSize: '1.2em', lineHeight: '1.5' }}>
            La contaminación procedente de la industria, la agricultura y los hogares contamina las fuentes de agua. 
            Los vertidos químicos, los vertidos de residuos y las escorrentías de los campos agrícolas degradan la calidad del agua dulce,
            convirtiéndola en insegura para el consumo humano y los ecosistemas. Hacer frente a la contaminación es clave para salvaguardar los recursos hídricos.
          </p>

          <Link to="/">
            <button style={{
                padding: '10px 22px',
                backgroundColor: '#007BFF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1em',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
            >
              Volver al menú
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pollution;




