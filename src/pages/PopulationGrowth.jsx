import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/models-3d/ciudad_desierto.glb'); // Load the 3D model
  return <primitive object={scene} scale={[2.0, 2.0, 2.0]} position={[0, 0, 0]} />; // Adjust scale and position as needed
};

const InteractiveCityDesert = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      {/* Canvas with 3D model */}
      <div style={{ flex: 1 }}>
        <Canvas style={{ height: '100%', width: '100%' }}>
          <Environment preset="city" />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
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
            minDistance={50} // Limit for zooming in
            maxDistance={10000} // High value for zooming out
          />
        </Canvas>
      </div>

      {/* Informational text */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(178, 224, 230, 0.9)', // Light ocean blue background
        backdropFilter: 'blur(10px)', // Background blur effect
        overflowY: 'auto',
        maxHeight: '100vh',
        marginLeft: '20px', // Adjust the margin as needed
        borderRadius: '10px', // Rounded corners for the info box
      }}>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h1 style={{ color: '#000', fontSize: '2.5em', fontWeight: 'bold' }}>
            Causas y Consecuencias de la Contaminación Marina
          </h1>
          <p style={{ color: '#333', fontSize: '1.2em', lineHeight: '1.6', marginBottom: '20px' }}>
            La contaminación marina tiene múltiples causas y efectos devastadores en nuestros océanos. Aquí exploramos algunas de ellas.
          </p>
          <h2 style={{ color: '#555', fontSize: '2em', margin: '20px 0 10px' }}>Causas de la Contaminación Marina</h2>
          <ul style={{ color: '#555', fontSize: '1.2em', lineHeight: '1.5' }}>
            <li><strong>Plaguicidas y Herbicidas:</strong> Estos productos químicos pueden llegar a los océanos a través de ríos y aguas subterráneas.</li>
            <li><strong>Fertilizantes y Detergentes:</strong> Su uso puede causar eutrofización en los cuerpos de agua.</li>
            <li><strong>Plásticos:</strong> Los plásticos desechados son una gran amenaza para la vida marina.</li>
          </ul>
          <h2 style={{ color: '#555', fontSize: '2em', margin: '20px 0 10px' }}>Consecuencias de la Contaminación Marina</h2>
          <ul style={{ color: '#555', fontSize: '1.2em', lineHeight: '1.5' }}>
            <li><strong>Pérdida de Biodiversidad:</strong> Muchas especies marinas están en peligro.</li>
            <li><strong>Impacto en la Salud Humana:</strong> Los contaminantes en mariscos afectan la salud humana.</li>
            <li><strong>Daño Económico:</strong> La industria pesquera se ve gravemente afectada.</li>
          </ul>

          {/* Back to menu button */}
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











