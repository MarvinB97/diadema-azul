import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';

import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import { Canvas, useFrame } from '@react-three/fiber';
import {Plane, OrbitControls, Environment , useTexture} from '@react-three/drei';



//-------style----------------
import PlayaModel from './../components/PlayaModel';
import './../styles/Home.css';
import '../styles/HamburgerMenu.css';

import * as THREE from "three";

function FlowingWater() {
  const waterRef = useRef();
  
  // Cargar una textura de agua
  const texture = useTexture("https://threejs.org/examples/textures/water.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  useFrame((state, delta) => {
    // Mueve la textura ligeramente en cada cuadro para crear un efecto de flujo
    texture.offset.x += delta * 0.1; // Controla la velocidad de desplazamiento en el eje X
    texture.offset.y += delta * 0.05; // Controla la velocidad de desplazamiento en el eje Y
  });

  return (
    <Plane
      ref={waterRef}
      args={[10, 10]} // tamaño de la superficie de agua
      rotation={[-Math.PI / 2, 0, 0]} // orientación horizontal
      receiveShadow
    >
      <meshStandardMaterial
        map={texture} // usa la textura como mapa de color
        transparent
        opacity={1} // nivel de transparencia
        color="lightblue" // color base del agua
      />
      
    </Plane>
  );
}










function Home() {

  const { user, loginGoogleWithPopUp, logout, observeAuthState } = useAuthStore(); // Destructure functions from the store
  const [loading, setLoading] = useState(true); // State to manage loading
  const [isOpen, setIsOpen] = useState(false);



  // Ensure that the observeAuthState function runs when the component mounts
  useEffect(() => {
      const checkAuthState = async () => {
          await observeAuthState();
          setLoading(false); // Change loading state after authentication check
      };
      checkAuthState();
  }, [observeAuthState]);
  
  // Function that runs when the user clicks the login button
  const handleLogin = useCallback(() => {
      loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);
  
  // Runs when the user clicks the logout button
  const handleLogout = useCallback(() => {
      logout();
  }, [logout]);

  // If loading state is true, show a loading text
  if (loading) {
      return <p className="loading-text">Loading...</p>;
  }


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    {user ? (
      <>
        <div className="container-home">
          {/* Canvas para el modelo 3D */}
          <Canvas
            shadows
            camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 1000 }} 
            dpr={[1, 2]}
            antialias>
            {/* Luces */}
            <ambientLight intensity={0.7} /> 
            <directionalLight
              castShadow
              position={[5, 10, 5]}
              intensity={2} 
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-near={0.5}
              shadow-camera-far={500}
              />
              
            {/* Modelo 3D de la playa */}
            <PlayaModel position={[0, -1.5, 0]} scale={[2,2,2]} /> 

            {/* Control de cámara */}
            <OrbitControls />
              
            {/* Ambiente HDR */}
            <Environment preset="warehouse" background resolution={4096}/>

          </Canvas>
        </div>
        <div className="header-content">
          <img src={logo} alt="Diadema Azul Logo" className="logo" />
          <h1 className="welcome-text">¡Welcome to Diadema Azul!</h1>
        </div>
        <div className="nav-links">
          <p className="welcome-text">Welcome, {user.displayName}</p>

          <div className="menu-container">
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`menu ${isOpen ? 'show' : ''}`}>
              <h3>MENU INFORMATIVO</h3>
                  <ul>
                    <li><Link to="/agricultural-overuse" className="button-option">Sobre explotación agricola</Link></li>
                    <li><Link to="/climate-change" className="button-option">Cambio Climatico</Link></li>
                    <li><Link to="/pollution" className="button-option">Contaminación</Link></li>
                    <li><Link to="/population-growth" className="button-option">Aumento de la contaminación</Link></li>
                    <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
                  </ul> 
              <h3>Evaluaciones</h3>
              <ul>
                <li><Link to="/#" className="button-option">quiz 1</Link></li>
                <li><Link to="/#" className="button-option">quiz 2</Link></li>
              </ul>

              <p>Acerca de Nosotros</p>
              <button className="button-option" onClick={handleLogout}>Logout</button>
          
            </div>
          </div>
        </div>
                

          
      </>
  ) : (
    <div className="container-home">
    {/* Canvas para el modelo 3D */}
    <Canvas shadows camera={{ position: [0, 1, 5], fov: 50}}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      

      <FlowingWater />{/* Agua fluyendo */}
      
      
      <OrbitControls />

      {/* Ambiente HDR */}
      <Environment preset="night" background resolution={4096}/>
    </Canvas>

    {/* Contenido de la página */}
    <div className="header-content">
      <img src={logo} alt="Diadema Azul Logo" className="logo" />
      <h1 className="welcome-text">¡Welcome to Diadema Azul!</h1>
      <p>"Exploramos la importancia del agua para la vida, su conservación y el impacto ambiental de su uso."</p>
      <button className="styled-button" onClick={handleLogin}>Login</button>
    </div>
    </div>)}
    </div>
  );
}

export default Home;















