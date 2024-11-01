import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Componente para el modelo 3D
const Model = ({ onClick }) => {
  const { scene } = useGLTF('/models-3d/tratamientoagua.glb');
  const meshRef = useRef();

  // Se llama a la función onClick cuando se hace clic en el modelo
  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={3}
      position={[0, -1, -10]}
      onClick={onClick} // Agregamos el manejador de clics
    />
  );
};

// Componente para el letrero de información
const InfoBox = ({ position, info, onClose }) => {
  return (
    <div style={{ position: 'absolute', top: position[1], left: position[0], background: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px', zIndex: 2 }}>
      <p>{info}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

// Componente principal de la contaminación
const Pollution = () => {
  const [info, setInfo] = useState(null);
  const [position, setPosition] = useState([0, 0]);

  // Maneja el clic en el modelo
  const handleClick = (event) => {
    const { clientX, clientY } = event.event; 
    setPosition([clientX, clientY]); 
  };

  const handleClose = () => {
    setInfo(null); // Cierra el tooltip
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundImage: `url('/ptar_agua.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Canvas para el modelo 3D */}
      <Canvas style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Modelo 3D */}
        <Model onClick={handleClick} />

        <OrbitControls />
      </Canvas>

      <div style={{ position: 'relative', zIndex: 1, padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#FFFFFF' }}>Contaminación de las fuentes de agua</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 20px auto', color: '#FFFFFF' }}>
          La contaminación procedente de la industria, la agricultura y los hogares contamina las fuentes de agua. 
          Los vertidos químicos, los vertidos de residuos y las escorrentías de los campos agrícolas degradan la calidad del agua dulce,
          convirtiéndola en insegura para el consumo humano y los ecosistemas. Hacer frente a la contaminación es clave para salvaguardar los recursos hídricos.
        </p>

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

      {/* Mostrar el letrero de información si hay información disponible */}
      {info && <InfoBox position={position} info={info} onClose={handleClose} />}
    </div>
  );
};

export default Pollution;

