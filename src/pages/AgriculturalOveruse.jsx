import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame } from '@react-three/fiber';

import { useGLTF, OrbitControls, Environment, Html, useTexture} from '@react-three/drei';

import * as THREE from "three";

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';
import './../styles/Home.css'; 


import Lights from '../components/Lights';
import FloorBosque from '../components/FloorBosque';
import ObjectsBosque from '../components/ObjectsBosque'; 

const Envir = ()=>{
  const textureMar = useTexture('/textures/marEnvir.jpg');

  return(
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureMar} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}


const AgriculturalOveruse = () => {
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
      {/* Canvas con el modelo 3D */}
        <Canvas shadows style={{ height: '100%', width: '100%' }}>
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
          <Lights/>
          <Envir/>
          <ObjectsBosque  castShadow/>
          <FloorBosque receiveShadow/>
          <Html center distanceFactor={5} transform castShadow position={[0,2,0]}>
            <h1 style={{color:"#18addefc", fontSize: '3em', textAlign: 'center', fontFamily: 'sans-serif'}}>Causas y Consecuencias de la Contaminación Marina</h1>      
          </Html>
          <Html center distanceFactor={5} transform castShadow position={[0,-2,0]}>
            <p style={{fontSize: '2em', textAlign: 'justify', maxWidth: '900px' , fontFamily: "sans-serif"}}>La contaminación marina, causada por plaguicidas, fertilizantes, plásticos, productos químicos y aguas residuales, genera problemas como eutrofización, intoxicación del agua y daño a la fauna marina. Sus consecuencias incluyen pérdida de biodiversidad, alteración de ecosistemas, riesgos para la salud humana por el consumo de mariscos contaminados y perjuicios económicos en sectores como la pesca y el turismo.</p>
          </Html>
        </Canvas>
        </div>
      {/* Texto informativo */}
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

export default AgriculturalOveruse;


