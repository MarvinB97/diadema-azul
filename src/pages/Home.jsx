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
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      await observeAuthState();
      setLoading(false);
    };
    checkAuthState();
  }, [observeAuthState]);

  const handleLogin = useCallback(() => loginGoogleWithPopUp(), [loginGoogleWithPopUp]);
  const handleLogout = useCallback(() => logout(), [logout]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCommentClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    alert('Comentario enviado: ' + comment);
    setComment('');
    setShowCommentBox(false);
  };
  

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div>
      {user ? (
        <>
          <div className="container-home">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 1000 }} dpr={[1, 2]} antialias>
              <OrbitControls />
              <Lights />
              <PlayaModel position={[0, -1.5, 0]} scale={[2, 2, 2]} castShadow />
              <Floor />
              <Html center distanceFactor={20} transform castShadow position={[0, 1, 0]}>
                <h1 className="welcome-text" style={{ fontFamily: "sans-serif" }}>¡Bienvenido a Diadema Azul!</h1>
              </Html>
              <Html center distanceFactor={20} transform castShadow position={[0, -1, 0]}>
                <p style={{ color: "white", fontFamily: "sans-serif" }}>Hola, {user.displayName}</p>
              </Html>
              <Environment preset="park" background resolution={4096} />
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
            <a href="https://github.com/MarvinB97/diadema-azul" target="_blank" className="btn-link">
            <button className="btn-github">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2066 10.6999 10.78 9.21992 10.9466C9.40659 11.1133 9.57992 11.4066 9.63992 11.84C10.0199 12 10.9999 12.3 11.5799 11.2866C11.5799 11.2866 11.9333 10.6466 12.5999 10.6C13.2533 10.6 12.5933 10.5866 12.7466 11C12.7466 11.2066 12.3333 11.2733 11.3333 12.8733C11.3333 13.4266 11.3333 13.8466 11.3333 14C11.4399 14.18 11.3466 14.3866 11.0133 14.3333C13.6666 13.4466 15.5799 10.9466 15.5799 7.99998C15.5799 6.23187 14.8775 4.53618 13.6273 3.28593C13.0082 2.66688 12.2732 2.17581 11.4644 1.84078C10.6555 1.50575 9.79859 1.33331 7.99992 1.33331Z"
                fill="white"
              />
            </svg>
            Ver el repositorio
  </button>
</a>
{/* Botón de comentario */}
      <button className="bookmarkBtn" onClick={handleCommentClick}>
        <span className="IconContainer">
          <svg fill="white" viewBox="0 0 512 512" height="1em" width="16">
            <path d="M9.42 12.92c-5.37-3.03-8.42-9.67-7.11-16.11 1.02-6.58 5.67-11.92 11.91-13.89 5.73-1.98 12.08-1.3 17.16 2.03 5.07 3.33 7.92 8.88 7.42 14.71-2.3 13.47-14.79 23.34-28.78 24.48-13.73 1.08-27.75-6.68-33.71-18.19L9.42 12.92z"></path>
          </svg>
        </span>
        <p className="text">Comentario</p>
      </button>

      {/* Caja de comentarios */}
      {showCommentBox && (
        <div className={`comment-box ${showCommentBox ? 'show' : ''}`}>
          <textarea
            placeholder="Escribe tu comentario aquí..."
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            cols="33"
            className="comment-textarea"
          />
          <button className="comment-submit-button" onClick={handleCommentSubmit}>
            Enviar
          </button>
        </div>
      )}
    
  
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
            <Html center distanceFactor={4} transform position={[0,0,0]} castShadow>
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
