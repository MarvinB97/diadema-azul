import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import logo from './../assets/logo.png';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, OrbitControls, Environment, useTexture, Html } from '@react-three/drei';
import PlayaModel from './../components/PlayaModel';
import './../styles/Home.css';
import '../styles/HamburgerMenu.css';
import * as THREE from "three";


import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';

import Lights from '../components/Lights.jsx';
import Floor from '../components/Floor.jsx';

function FlowingWater() {
  const waterRef = useRef();
  const texture = useTexture("https://threejs.org/examples/textures/water.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  useFrame((state, delta) => {
    texture.offset.x += delta * 0.1;
    texture.offset.y += delta * 0.05;
  });

  return (
    <Plane ref={waterRef} args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial map={texture} transparent opacity={1} color="lightblue" />
    </Plane>
  );
}

function Home() {
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

  const handleLogin = useCallback(() => loginGoogleWithPopUp(), [loginGoogleWithPopUp]);
  const handleLogout = useCallback(() => logout(), [logout]);

  if (loading) return <p className="loading-text">Loading...</p>;

  const toggleMenu = () => setIsOpen(!isOpen);


  return (
    <div>
      {user ? (
        <>
          <div className="container-home">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 1000 }} dpr={[1, 2]} antialias>
              <OrbitControls />
              <Lights/>
              <PlayaModel position={[0, -1.5, 0]} scale={[2, 2, 2]} castShadow/>
              <Floor />
              <Html center distanceFactor={20} transform castShadow position={[0,1,0]}>
                <h1 className="welcome-text" style={{fontFamily: "sans-serif"}}>¡Bienvenido a Diadema Azul!</h1>
              </Html>
              <Html center distanceFactor={20} transform castShadow position={[0,-1,0]}>
                <p style={{color:"white", fontFamily: "sans-serif"}}>Hola, {user.displayName}</p>
              </Html>
              <Environment preset="park" background resolution={4096}/>
            </Canvas>
          </div>
          
          <div className="header-content">
            <img src={logo} alt="Diadema Azul Logo" className="logo" />  
          </div>
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
                
            
                <button className="styled-logout-button" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            </div>
          </div>
         
          <a href="https://github.com/MarvinB97/diadema-azul" target="_blank" class="btn-link">
  <button class="btn-github">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z"
        fill="currentcolor"
      ></path>
    </svg>
    <span>View on Github</span>
  </button>
</a>


         
  


        </>
      ) : (
        <div className="container-home">
          <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
            <FlowingWater />
            <OrbitControls />
            <Html center distanceFactor={4} transform position={[0,0.5,0]} castShadow>
                <h1 className="welcome-text">¡Bienvenido a Diadema Azul!</h1>
            </Html>
            <Html center distanceFactor={4} transform position={[0,-5,0]} castShadow>
              <p style={{color:"white"}}>"Exploramos la importancia del agua para la vida, su conservación y el impacto ambiental de su uso."</p>
            </Html>
            <Environment preset="night" background resolution={4096} />
          </Canvas>
          <div className="header-content">
            <img src={logo} alt="Diadema Azul Logo" className="logo" />
            <button className="styled-button" onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;















