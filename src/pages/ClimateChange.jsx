import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, useTexture, Html, Environment, KeyboardControls, useKeyboardControls  } from '@react-three/drei';
import Lights from '../components/Lights';
import './../styles/Home.css'; 

import * as THREE from "three";

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';


const RotatingEarth = () => {
  const meshRef = useRef();
  const texture = useTexture('/textures/earth.png'); // Textura de la Tierra
  const atmosphereTexture = useTexture('/textures/earth_atmosphere.jpg'); // Textura para la atmósfera
  const textureEspacio = useTexture('/textures/espacioEnvir.jpg'); // Textura de la Tierra




  //-------------------EVENTOS DEL TECLADO------------
  const [subscribe, get] = useKeyboardControls();
  //const meshRef = useRef();

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



  // Animar la rotación de la esfera
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Rotación más lenta para suavidad
    }
  });

  return (
    <>
    <mesh ref={meshRef}>
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" map={texture} />
      </Sphere>

      {/* Esfera 3D (atmósfera) */}
      <Sphere args={[1.05, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" map={atmosphereTexture} transparent opacity={0.5} />
      </Sphere>
    </mesh>

    {/* Planeta Tierra */}

    <Html center distanceFactor={5} transform castShadow position={[0,2,0]}>
      <h1 style={{ fontSize: '3em', textAlign: 'center', fontFamily: 'sans-serif', color:"#18addefc"}}>Cambio Climático</h1>
    </Html>
    <Html center distanceFactor={5} transform castShadow position={[0,-2,0]}>
      <p style={{ fontSize: '1.2em', textAlign: 'justify', maxWidth: '600px' , fontFamily: "sans-serif"}}>
        El cambio climático agrava la escasez de agua debido a la mayor frecuencia de las sequías,
        el cambio de los regímenes pluviales y el aumento de las tasas de evaporación.
        A medida que aumenta la temperatura global, la disponibilidad de agua se vuelve más impredecible,
        afectando tanto a los ecosistemas como a las poblaciones humanas.
      </p>
    </Html>
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureEspacio} side={THREE.BackSide} />
      </mesh>
    </Environment>
  </>
  );
};


const ClimateChange = () => {
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
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF' // Color de texto blanco para contraste
    }}>

      <KeyboardControls map = {[
    {name: "forward", keys: ["ArrowUp","KeyW"]},
    {name: "back", keys: ["ArrowDown","KeyS"]},
    {name: "left", keys: ["ArrowLeft","KeyA"]},
    {name: "right", keys: ["ArrowRight","KeyD"]},
    {name: "jump", keys: ["space"]},
    {name: "escape", keys: ["Escape"]},
  ]}>
        <Canvas shadows style={{ height: '100%', width: '100%' }}>
          <Lights/>
          {/* Planeta Tierra */}
          <RotatingEarth />
          <OrbitControls 
            enableZoom={true} // Permitir acercar y alejar
            minDistance={1.5} // Distancia mínima de la cámara
            maxDistance={5} // Distancia máxima de la cámara
            enablePan={true} // Permitir mover la vista
            maxPolarAngle={Math.PI / 2} // Limitar el ángulo de rotación vertical
            minPolarAngle={0} // Limitar el ángulo de rotación vertical
          />
        </Canvas>
      </KeyboardControls>

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
                  
                  <li><Link to="/pollution" className="button-option">Contaminación del agua </Link></li>
                  <li><Link to="/population-growth" className="button-option">Crecimiento Demográfico</Link></li>
                  <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
                  <li><Link to="/quiz" className="button-option">Quiz</Link></li>
                </ul>
                
            
                <Link to= "/" className="styled-button">Volver al menu</Link>
              </div>
            </div>
          </div>

         
<div className="book-container">
  <div className="book">
    <p></p>
    <div className="cover">
      <p>Solución al problema</p>
    </div>
    <div className="content">
    <p style={{ fontSize: '0.8em', textAlign:'justify' }}>

      Para mitigar los efectos del cambio climático, se deben tomar medidas como la transición hacia energías renovables, la mejora de la eficiencia energética, la reducción de las emisiones de gases de efecto invernadero y el fomento de prácticas agrícolas sostenibles
      </p>
    </div>
  </div>
</div>
       
    </div>
  );
};

export default ClimateChange;