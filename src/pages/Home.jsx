import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, OrbitControls, Environment, useTexture } from '@react-three/drei';
import PlayaModel from './../components/PlayaModel';
import './../styles/Home.css';
import '../styles/HamburgerMenu.css';
import * as THREE from "three";

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
              <ambientLight intensity={0.7} />
              <directionalLight castShadow position={[5, 10, 5]} intensity={2} />
              <PlayaModel position={[0, -1.5, 0]} scale={[2, 2, 2]} />
              <OrbitControls />
              <Environment preset="park" background resolution={4096} />
            </Canvas>
          </div>
          <div className="header-content">
            <img src={logo} alt="Diadema Azul Logo" className="logo" />
            <h1 className="welcome-text">¡Bienvenido a Diadema Azul!</h1>
          </div>
          <div className="nav-links">
            <p className="welcome-text">Hola, {user.displayName}</p>
            <div className="menu-container">
              <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`menu ${isOpen ? 'show' : ''}`}>
                <h3>MENU INFORMATIVO</h3>
                <ul>
                  <li><Link to="/agricultural-overuse" className="button-option">Contaminacion marina</Link></li>
                  <li><Link to="/climate-change" className="button-option">Cambio Climatico</Link></li>
                  <li><Link to="/pollution" className="button-option">Contaminación fuentes de agua </Link></li>
                  <li><Link to="/population-growth" className="button-option">Aumento de la contaminación</Link></li>
                  <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
                </ul>
                
            
                <button className="styled-logout-button" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container-home">
          <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
            <FlowingWater />
            <OrbitControls />
            <Environment preset="night" background resolution={4096} />
          </Canvas>
          <div className="header-content">
            <img src={logo} alt="Diadema Azul Logo" className="logo" />
            <h1 className="welcome-text">¡Bienvenido a Diadema Azul!</h1>
            <p>"Exploramos la importancia del agua para la vida, su conservación y el impacto ambiental de su uso."</p>
            <button className="styled-button" onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;















