import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame } from '@react-three/fiber';

import { useGLTF, OrbitControls, Environment , Html, useTexture, KeyboardControls, useKeyboardControls } from '@react-three/drei';

import * as THREE from "three";

import Lights from '../components/Lights.jsx';
import './../styles/Home.css';

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';
import { Physics, RigidBody } from '@react-three/rapier';

const Model = () => {
  const { scene } = useGLTF('/models-3d/ciudad_desierto.glb'); 

  //-------------------EVENTOS DEL TECLADO------------
  const [subscribe, get] = useKeyboardControls();
  const meshRef = useRef();

    // Manejamos el movimiento de la caja
    useFrame(() => {
      const state = get(); // Estado actual de los controles
      const speed = 4;
  
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

  //FISICAS

  const rbRefer = useRef();

  const rbHandle = () => {
    rbRefer.current.applyImpulse({x: 0, y: 50, z: 0}, true);
  };


  return (
    <RigidBody ref={rbRefer} type='dynamic' colliders='cuboid' mass={10} >
      <mesh ref={meshRef} onClick={rbHandle}>
        <primitive object={scene} scale={[1.0, 1.0, 1.0]} position={[-150, -400, -300]} />
      </mesh>
    </RigidBody>
  );
};


const Envir = ()=>{
  const textureIndust = useTexture('/textures/desiertoEnvir.jpg');

  return(
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureIndust} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}



const InteractiveCityDesert = () => {
  
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
    {name: "forward", keys: ["ArrowUp","keyW"]},
    {name: "back", keys: ["ArrowDown","keyS"]},
    {name: "left", keys: ["ArrowLeft","keyA"]},
    {name: "right", keys: ["ArrowRight","keyD"]},
    {name: "jump", keys: ["space"]},
    {name: "escape", keys: ["Escape"]},
  ]}>
        <Canvas shadows style={{ height: '100%', width: '100%' }} camera={{far: 5000}}>
          <Lights/>
          <Envir />
          <Physics gravity={[0,0.1,0]}>
            <Model />
          </Physics>
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={0} 
            rotateSpeed={0.8}
            zoomSpeed={1}
            panSpeed={0.5}
            minDistance={50} 
            maxDistance={2000} 
          />
          <Html center distanceFactor={80} transform castShadow position={[0,5,0]}>
            <h1 style={{color:"#18addefc", fontFamily: "sans-serif"}}>Crecimiento Demográfico</h1>      
          </Html>
          <Html center distanceFactor={80} transform castShadow position={[0,-25,0]}>
            <p style={{fontSize: '2em', textAlign: 'justify', maxWidth: '900px' , fontFamily: "sans-serif", backgroundColor:'rgba(0, 0, 0, 0.5)',padding:'10px', borderRadius: '10px', color: '#fff'}}> El crecimiento demográfico ejerce una presión cada vez mayor sobre los recursos hídricos.
            A medida que se expanden la urbanización y las actividades industriales, la demanda de agua aumenta exponencialmente.
            Las estrategias eficaces de gestión del agua son fundamentales para satisfacer las crecientes necesidades de las comunidades de todo el mundo.</p>
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

    Para gestionar el crecimiento demográfico y su impacto sobre los recursos hídricos, es necesario implementar políticas de planificación urbana sostenible, mejorar la eficiencia en el uso del agua y promover tecnologías que optimicen su distribución.
      </p>
    </div>
  </div>
</div>
    </div>
    
  );
};

export default InteractiveCityDesert;