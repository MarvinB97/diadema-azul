import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Html, useTexture, KeyboardControls, useKeyboardControls} from '@react-three/drei';
import * as THREE from "three";
import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';
import './../styles/Home.css'; 

import Lights from '../components/Lights';
import FloorBosque from '../components/FloorBosque';
import ObjectsBosque from '../components/ObjectsBosque'; 

const Envir = () => {
  const textureMar = useTexture('/textures/marEnvir.jpg');

  return (
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureMar} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
};

const Model = () => {
  //-------------------EVENTOS DEL TECLADO------------
  const [subscribe, get] = useKeyboardControls();
  const meshRef = useRef();

    // Manejamos el movimiento de la caja
    useFrame(() => {
      const state = get(); // Estado actual de los controles
      const speed = 0.1;
  
      if (meshRef.current) {
        if (state.forward) meshRef.current.position.z -= speed;
        if (state.back) meshRef.current.position.z += speed;
        if (state.left) meshRef.current.position.x -= speed;
        if (state.right) meshRef.current.position.x += speed;
      }
    });
      // Opcional: Suscribirse para ver cambios en el estado
  useEffect(() => {
    const unsubscribe = subscribe((state) => {
      console.log('Controles activos:', state);
    });

    return () => unsubscribe();
  }, [subscribe]);

  return(
    <mesh ref={meshRef}>
      <ObjectsBosque castShadow />
      <FloorBosque receiveShadow />
    </mesh>
  )
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
        <KeyboardControls map = {[
    {name: "forward", keys: ["ArrowUp","KeyW"]},
    {name: "back", keys: ["ArrowDown","KeyS"]},
    {name: "left", keys: ["ArrowLeft","KeyA"]},
    {name: "right", keys: ["ArrowRight","KeyD"]},
    {name: "jump", keys: ["space"]},
    {name: "escape", keys: ["Escape"]},
  ]}>
          {/* Canvas con el modelo 3D */}
          <Canvas shadows style={{ height: '100%', width: '100%' }}>
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
            <Lights />
            <Envir />
            <Model/>
            <Html center distanceFactor={5} transform castShadow position={[0, 2, 0]}>
              <h1 style={{ color: "#18addefc", fontSize: '3em', textAlign: 'center', fontFamily: 'sans-serif' }}>
                Causas y Consecuencias de la Contaminación Marina
              </h1>
            </Html>
            <Html center distanceFactor={5} transform castShadow position={[0, -2, 0]}>
              <p style={{
                fontSize: '2em', 
                textAlign: 'justify', 
                maxWidth: '900px', 
                fontFamily: "sans-serif", 
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                padding: '10px', 
                borderRadius: '10px', 
                color: '#fff'
              }}>
                La contaminación marina, causada por plaguicidas, fertilizantes, plásticos, productos químicos y aguas residuales, genera problemas como eutrofización, intoxicación del agua y daño a la fauna marina. Sus consecuencias incluyen pérdida de biodiversidad, alteración de ecosistemas, riesgos para la salud humana por el consumo de mariscos contaminados y perjuicios económicos en sectores como la pesca y el turismo.
              </p>
            </Html>
          </Canvas>
          </KeyboardControls>
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
              
              <li><Link to="/climate-change" className="button-option">Cambio Climatico</Link></li>
              <li><Link to="/pollution" className="button-option">Contaminación del agua</Link></li>
              <li><Link to="/population-growth" className="button-option">Crecimiento Demográfico</Link></li>
              <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
            </ul>
            <Link to="/" className="styled-button">Volver al menu</Link>
          </div>
        </div>
      </div>

      {/* Contenedor flotante del libro */}
      <div className="book-container">
        <div className="book">
          <p></p>
          <div className="cover">
            <p>Solución al problema</p>
          </div>
          <div className="content">
            <p>
              Una posible solución para la contaminación marina es reducir el uso de plásticos de un solo uso, promover el reciclaje, implementar políticas de conservación marina y fomentar el uso de tecnologías limpias en las industrias pesqueras y turísticas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgriculturalOveruse;
