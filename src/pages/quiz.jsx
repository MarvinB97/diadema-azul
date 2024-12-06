import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame } from '@react-three/fiber';

import { Plane, useGLTF, OrbitControls, Environment , Html, useTexture, KeyboardControls, useKeyboardControls } from '@react-three/drei';

import * as THREE from "three";

import Lights from '../components/Lights.jsx';
import './../styles/Home.css';

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';


const Model = () => {
    const { scene } = useGLTF('/models-3d/quiz_barco_oriental.glb');
  //-------------------EVENTOS DEL TECLADO------------
  const [subscribe, get] = useKeyboardControls();
  const meshRef = useRef();

  //-----------------ESTABLECER PUNTAJE---------
  const [puntaje, setPuntaje] = useState();

    // Manejamos el movimiento de la caja
    useFrame(() => {
      const state = get(); // Estado actual de los controles
      const speed = 0.1;
  
      if (meshRef.current) {
        //if (state.forward) meshRef.current.position.z -= speed;
        //if (state.back) meshRef.current.position.z += speed;
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


  return (
    <mesh ref={meshRef}>
      <primitive object={scene} scale={[12, 12,12]} position={[0,-2,0]} />
    </mesh>  
  );
};





const Objetos = () => {
    // Arreglo de rutas de modelos
    const modelos = [
      '/models-3d/quiz_basura_1.glb',
      '/models-3d/quiz_basura_2.glb',
      '/models-3d/quiz_basura_3.glb',
    ];
  
    // Estado para manejar el puntaje (ejemplo)
    const [puntaje, setPuntaje] = useState(0);



    const meshRef = useRef();
    const [time, setTime] = useState(0);

    useFrame(() => {
      setTime((prev) => prev<20 ? (prev + 0.04):0); // Incrementa el tiempo
      if (meshRef.current) {
        meshRef.current.position.y = 5-time; 
        meshRef.current.position.x = -5 + Math.cos(time);
      }
    });
  
    return (
      <>
        {modelos.map((modelo, index) => {
          // Cargar el modelo GLTF
          const { scene } = useGLTF(modelo);
  
          return (
            <mesh ref={meshRef} key={index}>
              <primitive
                object={scene}
                scale={[0.001, 0.001, 0.001]}
                position={[index * 3, 3, 0]} // Posicionar cada modelo
              />
            </mesh>
          );
        })}
      </>
    );
  };





const Envir = ()=>{
  const textureIndust = useTexture('/textures/quizEnvir.jpg');

  return(
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureIndust} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}



const Quiz = () => {
  
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
      <KeyboardControls map = {[
    //{name: "forward", keys: ["ArrowUp","keyW"]},
    //{name: "back", keys: ["ArrowDown","keyS"]},
    {name: "left", keys: ["ArrowLeft","keyA"]},
    {name: "right", keys: ["ArrowRight","keyD"]},
    //{name: "jump", keys: ["space"]},
    {name: "escape", keys: ["Escape"]},
  ]}>
        <Canvas shadows style={{ height: '100%', width: '100%' }} camera={{far: 5000}}>
          <Lights/>
          <Envir />
          <Model />
          <Objetos/>
          <OrbitControls 
            enableZoom={true} 
            maxDistance={2000} 
          />
          <Html center distanceFactor={2} transform castShadow position={[0,3,0]}>
            <h1 style={{color:"#18addefc", fontFamily: "sans-serif"}}>Quiz</h1>      
          </Html>
          <Html center distanceFactor={2} transform castShadow position={[0,2.5,0]}>
            <p style={{fontSize: '2em', textAlign: 'justify', maxWidth: '900px' , fontFamily: "sans-serif", backgroundColor:'rgba(0, 0, 0, 0.5)',padding:'10px', borderRadius: '10px', color: '#fff'}}> Debes evitar objetos relacionados con la contaminación del agua.</p>
          </Html>
        </Canvas>
      </KeyboardControls>
      {/* Canvas con el modelo 3D */}
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
                  
                  <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
                </ul>
                
            
                <Link to= "/" className="styled-button">Volver al menu</Link>
              </div>
            </div>
          </div>
    </div>
    
  );
};

export default Quiz;