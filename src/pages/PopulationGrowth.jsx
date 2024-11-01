import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const PopulationGrowth = () => {
  const data = [
    { year: '2000', population: 4 },
    { year: '2005', population: 6 },
    { year: '2010', population: 9 },
    { year: '2015', population: 11 },
    { year: '2020', population: 14 },
  ];

  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Crecimiento Demográfico</h1>
      <p style={{ color: '#333', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
        El crecimiento demográfico ejerce una presión cada vez mayor sobre los recursos hídricos.
        A medida que se expanden la urbanización y las actividades industriales, la demanda de agua aumenta exponencialmente.
        Las estrategias eficaces de gestión del agua son fundamentales para satisfacer las crecientes necesidades de las comunidades de todo el mundo.
      </p>
      <Canvas style={{ height: '580px', marginBottom: '30px' }} camera={{ position: [0, 10, 35], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls />
        {/* Fondo de la gráfica en posición vertical */}
        <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#e0f7fa" side={THREE.DoubleSide} />
        </mesh>
        {data.map((entry, index) => (
          <mesh key={entry.year} position={[index * 4 - 8, entry.population / 2, 0]}>
            <boxGeometry args={[2, entry.population, 2]} />
            <meshStandardMaterial color="skyblue" />
            <Text
              position={[0, -entry.population / 2 - 0.5, 1]}
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {entry.year}
            </Text>
          </mesh>
        ))}
        <Text
          position={[0, -1.8, 0]}
          fontSize={1}
          color="blue"
          anchorX="center"
          anchorY="middle"
        >
          Impacto del Crecimiento en Colombia
        </Text>
      </Canvas>
      <p style={{ color: '#333', fontSize: '18px', marginBottom: '20px' }}>
        Datos conseguidos en: <a href="https://datosmacro.expansion.com/demografia/poblacion/colombia#:~:text=Colombia%20registra%20un%20incremento%20de%20su%20poblaci%C3%B3n&text=Seg%C3%BAn%20los%20%C3%BAltimos%20datos%20publicados,mundo%20por%20porcentaje%20de%20inmigraci%C3%B3n." target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'underline' }}>Datos Macro</a>
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
  );
};

export default PopulationGrowth;
