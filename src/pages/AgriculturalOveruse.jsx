import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/models-3d/bosque.glb'); // Cargar el modelo sin modificaciones
  return <primitive object={scene} scale={[2.0, 2.0, 2.0]} position={[0, -10, 0]} />; // Escala ajustada
};

const AgriculturalOveruse = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
      {/* Canvas con el modelo 3D */}
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
            rotateSpeed={0.8} // Velocidad de rotación ajustada
            zoomSpeed={0.5} // Velocidad de zoom ajustada
            panSpeed={0.5} // Velocidad de desplazamiento ajustada
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
        backdropFilter: 'blur(10px)', // Efecto de desenfoque de fondo
        overflowY: 'auto', // Habilitar desplazamiento vertical
        maxHeight: '100vh', // Altura máxima del contenedor
      }}>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h1 style={{ color: '#333', fontSize: '2.5em', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginBottom: '20px' }}>
            Causas y Consecuencias de la Contaminación Marina
          </h1>

          <h2 style={{ color: '#555', fontSize: '2em', margin: '20px 0 10px' }}>Causas de la Contaminación Marina</h2>
          <ul style={{ textAlign: 'left', color: '#555', fontSize: '1.2em', lineHeight: '1.5' }}>
            <li><strong>Plaguicidas y Herbicidas:</strong> Estos productos químicos utilizados en la agricultura pueden llegar a los océanos a través de ríos y aguas subterráneas, afectando a la vida marina.</li>
            <li><strong>Fertilizantes y Detergentes:</strong> Los fertilizantes y detergentes contienen nutrientes y productos químicos que pueden causar eutrofización, una condición donde el exceso de nutrientes provoca un crecimiento excesivo de algas que agota el oxígeno en el agua.</li>
            <li><strong>Productos Químicos Industriales:</strong> Muchas industrias vierten residuos químicos en el mar, lo que puede ser tóxico para los organismos marinos.</li>
            <li><strong>Hidrocarburos:</strong> Derrames de petróleo y otros hidrocarburos pueden causar daños significativos a los ecosistemas marinos.</li>
            <li><strong>Plásticos y Microplásticos:</strong> Los plásticos desechados terminan en el océano, donde se descomponen en microplásticos que son ingeridos por la vida marina.</li>
            <li><strong>Aguas Residuales:</strong> El vertido de aguas residuales no tratadas puede introducir bacterias y otros contaminantes en el agua marina.</li>
            <li><strong>Redes Fantasma:</strong> Las redes de pesca abandonadas o perdidas pueden dañar a la vida marina al atrapar y matar a peces y otros animales.</li>
          </ul>

          <h2 style={{ color: '#555', fontSize: '2em', margin: '20px 0 10px' }}>Consecuencias de la Contaminación Marina</h2>
          <ul style={{ textAlign: 'left', color: '#555', fontSize: '1.2em', lineHeight: '1.5' }}>
            <li><strong>Pérdida de Biodiversidad:</strong> La contaminación puede llevar a la muerte de especies marinas y la destrucción de hábitats.</li>
            <li><strong>Alteración de Ecosistemas:</strong> La contaminación puede alterar los ecosistemas marinos, afectando la cadena alimentaria y el equilibrio natural.</li>
            <li><strong>Riesgos para la Salud Humana:</strong> Consumir mariscos contaminados puede ser perjudicial para la salud humana debido a la acumulación de toxinas en los organismos marinos.</li>
            <li><strong>Impacto Económico:</strong> La contaminación marina puede afectar la industria pesquera y el turismo, impactando las economías locales.</li>
          </ul>

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

export default AgriculturalOveruse;


