import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, useAnimations } from '@react-three/drei';

// Componente para cargar el modelo con animaciones
const MineModel = () => {
  const { scene, animations } = useGLTF('/models-3d/mine.glb'); // Cargar el modelo mine.glb
  const { actions } = useAnimations(animations, scene); // Cargar las animaciones

  useEffect(() => {
    // Recorrer todas las acciones y reproducirlas
    Object.keys(actions).forEach((key) => {
      const action = actions[key];
      action.play(); // Reproducir cada animación
    });

    // Detener todas las animaciones al desmontar el componente
    return () => {
      Object.keys(actions).forEach((key) => {
        const action = actions[key];
        action.stop(); // Detener cada animación
      });
    };
  }, [actions])

  return (
    <primitive
      object={scene}
      scale={[5, 5, 5]} // Ajustar el tamaño del modelo
      position={[-20, -40, -100]} // Ajustar la posición del modelo
      rotation={[0, Math.PI / 35, 0]} // Rotar el modelo para una mejor vista
    />
  );
};

// Componente principal de la escena
const PollutionMine = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      {/* Sección 3D */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas style={{ height: '100%', width: '100%' }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <MineModel />
          <OrbitControls
            enableZoom={true} // Permitir zoom
            maxDistance={200} // Distancia máxima para alejar el zoom
            minDistance={5} // Distancia mínima para acercar el zoom
            enableRotate={true} // Permitir rotación
            rotateSpeed={1} // Ajustar la velocidad de rotación
            enablePan={true} // Permitir desplazamiento
          />
        </Canvas>

        {/* Flecha que indica interacción */}
        <div style={{
          position: 'absolute',
          top: '10%', // Ajustar la posición vertical hacia arriba
          left: '40%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L12 22M12 22L6 16M12 22L18 16" stroke="black" strokeWidth="2" />
          </svg>
          <span style={{ marginTop: '10px', color: '#333', fontSize: '1.2em' }}>Ejemplo de mineria</span>
        </div>
      </div>

      {/* Sección de contenido */}
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
          <h1 style={{ color: '#333', fontSize: '2.5em', fontWeight: 'bold', marginBottom: '20px' }}>
            Minería Ilegal y la Contaminación del Agua
          </h1>

          <p style={{ color: '#555', fontSize: '1.2em', lineHeight: '1.5', marginBottom: '20px' }}>
            La minería ilegal es una actividad que se ha expandido en diversas regiones del mundo, especialmente en áreas ricas en recursos naturales. Aunque puede parecer una fuente rápida de ingresos, sus consecuencias son devastadoras, particularmente en lo que respecta a la contaminación del agua.
          </p>

          <h3 style={{ color: '#555', fontSize: '2em', margin: '20px 0 10px' }}>Impactos de la Minería Ilegal en el Agua</h3>
          <ol style={{ textAlign: 'left', color: '#555', fontSize: '1.2em', lineHeight: '1.5' }}>
            <li><strong>Contaminación Química:</strong> La extracción de minerales, como el oro, a menudo implica el uso de sustancias químicas tóxicas, como el mercurio y el cianuro.</li>
            <li><strong>Sedimentación:</strong> La minería a cielo abierto y la remoción de vegetación generan una alta erosión del suelo.</li>
            <li><strong>Destrucción de Ecosistemas:</strong> Las operaciones mineras ilegales comprometen la calidad del agua al eliminar la vegetación que regula el ciclo hídrico.</li>
            <li><strong>Afectación a Comunidades Locales:</strong> La contaminación del agua impacta la salud de las comunidades que dependen de estos recursos hídricos.</li>
          </ol>

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

export default PollutionMine;