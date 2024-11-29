import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame } from '@react-three/fiber';

import { OrbitControls, useGLTF, Environment, Html, useTexture } from '@react-three/drei';

import * as THREE from "three";

import Lights from '../components/Lights';
import './../styles/Home.css'; 

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';

// Componente para el modelo 3D
const Model = () => {
  const { scene } = useGLTF('/models-3d/tratamientoagua.glb');
  return <primitive object={scene} scale={[1, 1,1]} position={[0,-3,-6]} />;
 // Ajusta la escala y la posición
};

//Entorno
const Envir = ()=>{
  const textureIndust = useTexture('/textures/industriaEnvir.jpg');

  return(
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureIndust} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}

// Componente principal de la contaminación
const Pollution = () => {

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
    <div className="container-home">
      {/* Canvas con el modelo 3D */}
      <Canvas  shadows style={{ height: '100%', width: '100%' }}>
        <Lights/>
        <Envir/>

        <Model receiveShadow/>
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
          
        <Html center distanceFactor={10} transform castShadow position={[0,3,0]} >
          <h1 style={{color:"#18addefc", fontFamily: "sans-serif"}}>Contaminación de las Fuentes de Agua</h1>      
        </Html>
        <Html center distanceFactor={10} transform castShadow position={[0,-1,0]} >
          <p style={{fontSize: '2em', textAlign: 'justify', maxWidth: '900px' , fontFamily: "sans-serif", backgroundColor:'rgba(0, 0, 0, 0.5)',padding:'10px', borderRadius: '10px', color: '#fff'}}>La contaminación procedente de la industria, la agricultura y los hogares contamina las fuentes de agua. Los vertidos químicos, los vertidos de residuos y las escorrentías de los campos agrícolas degradan la calidad del agua dulce, convirtiéndola en insegura para el consumo humano y los ecosistemas. Hacer frente a la contaminación es clave para salvaguardar los recursos hídricos.</p>
        </Html>
      </Canvas>
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
    </div>
  );
};

export default Pollution;




