import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas} from '@react-three/fiber';

import { useGLTF, OrbitControls, Environment, useAnimations, Html, useTexture } from '@react-three/drei';

import * as THREE from "three";

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';
import './../styles/Home.css'; 


import Lights from '../components/Lights';

const Envir = ()=>{
  const textureMine = useTexture('/textures/minaEnvir.jpg');

  return(
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureMine} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}


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

  const { user, loginGoogleWithPopUp, logout, observeAuthState } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      await observeAuthState();
      setLoading(false);
    };
    checkAuthState();
  }, [observeAuthState]);

  const handleLogout = useCallback(() => logout(), [logout]);

  if (loading) return <p className="loading-text">Loading...</p>;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="container-home">
        <Canvas style={{ height: '100%', width: '100%' }}>
          <OrbitControls
            enableZoom={true} // Permitir zoom
            maxDistance={200} // Distancia máxima para alejar el zoom
            minDistance={5} // Distancia mínima para acercar el zoom
            enableRotate={true} // Permitir rotación
            rotateSpeed={1} // Ajustar la velocidad de rotación
            enablePan={true} // Permitir desplazamiento
          />
          <Envir/>
          <Lights/>
          <MineModel castShadow/>
          <Html center distanceFactor={90} transform castShadow position={[-20, 0, -80]}>
            <h1 style={{color:"#18addefc", fontFamily: "sans-serif"}}>Minería Ilegal y la Contaminación del Agua</h1>      
          </Html>
          <Html center distanceFactor={80} transform castShadow position={[-20, -10, -80]}>
            <p style={{textAlign: "justify", width: "1000px", color: "white", fontFamily: "sans-serif"}}>
            aunque puede parecer una fuente rápida de ingresos, genera graves consecuencias ambientales, especialmente en la contaminación del agua. Esta actividad utiliza químicos tóxicos como mercurio y cianuro, provoca sedimentación por la erosión del suelo, destruye ecosistemas al alterar el ciclo hídrico y afecta directamente la salud y los recursos de las comunidades locales que dependen de estas fuentes de agua.
            </p>
          </Html>
        </Canvas>
      </div>
       {/*MENU HAMBURGUESA*/}
       <div className="nav-links">
            <div className="menu-container">
              <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`menu ${isOpen ? 'show' : ''}`}>
                <h3><Link to="/" className="button-option">Menú</Link></h3>
                <ul>
                  <li><Link to="/agricultural-overuse" className="button-option">Contaminacion marina</Link></li>
                  <li><Link to="/climate-change" className="button-option">Cambio Climatico</Link></li>
                  <li><Link to="/pollution" className="button-option">Contaminación del agua </Link></li>
                  <li><Link to="/population-growth" className="button-option">Crecimiento Demográfico</Link></li>
                  <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
                </ul>
                
            
                <Link to= "/" className="styled-button">Volver al menu</Link>
              </div>
            </div>
       </div>
    </>
  );
};

export default PollutionMine;