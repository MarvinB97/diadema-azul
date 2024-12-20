import React, { useRef, useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Canvas, useFrame} from '@react-three/fiber';

import { useGLTF, OrbitControls, Environment, useAnimations, Html, useTexture, KeyboardControls, useKeyboardControls  } from '@react-three/drei';

import * as THREE from "three";

import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';
import './../styles/Home.css'; 


import Lights from '../components/Lights';

const Envir = ()=>{
  const textureMine = useTexture('/textures/minaEnvir.jpg');

  return(
    <Environment background near={1} far={1000} resolution={1024}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={textureMine} side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}


// Componente para cargar el modelo con animaciones
const MineModel = () => {
  const { scene, animations } = useGLTF('/models-3d/mine.glb'); // Cargar el modelo mine.glb
  const { actions } = useAnimations(animations, scene); // Cargar las animaciones

  useEffect(() => {
    // Recorrer todas las acciones y reproducirlas
    Object.keys(actions).forEach((key) => {
      const action = actions[key];
      action.play(); // Reproducir cada animación
    });

    // Detener todas las animaciones al desmontar el componente
    return () => {
      Object.keys(actions).forEach((key) => {
        const action = actions[key];
        action.stop(); // Detener cada animación
      });
    };
  }, [actions])


     //-------------------EVENTOS DEL TECLADO------------
     const [subscribe, get] = useKeyboardControls();
     const meshRef = useRef();
   
       // Manejamos el movimiento de la caja
       useFrame(() => {
         const state = get(); // Estado actual de los controles
         const speed = 3;
     
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
   
  return (
    <mesh ref={meshRef}>
      <primitive
        object={scene}
        scale={[5, 5, 5]} // Ajustar el tamaño del modelo
        position={[-20, -40, -100]} // Ajustar la posición del modelo
        rotation={[0, Math.PI / 35, 0]} // Rotar el modelo para una mejor vista
      />
    </mesh>
  );
};



// Componente principal de la escena
const PollutionMine = () => {
  
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
          <Canvas style={{ height: '100%', width: '100%' }}>
            <OrbitControls
              enableZoom={true} // Permitir zoom
              maxDistance={200} // Distancia máxima para alejar el zoom
              minDistance={5} // Distancia mínima para acercar el zoom
              enableRotate={true} // Permitir rotación
              rotateSpeed={1} // Ajustar la velocidad de rotación
              enablePan={true} // Permitir desplazamiento
            />
            <Envir/>
            <Lights/>
            <MineModel castShadow/>
            <Html center distanceFactor={90} transform castShadow position={[-20, 5, -80]}>
              <h1 style={{color:"#18addefc", fontFamily: "sans-serif"}}>Minería Ilegal y la Contaminación del Agua</h1>      
            </Html>
            <Html center distanceFactor={80} transform castShadow position={[-20, -28, -80]}>
              <p style={{fontSize: '2em', textAlign: 'justify', maxWidth: '900px' , fontFamily: "sans-serif", backgroundColor:'rgba(0, 0, 0, 0.5)',padding:'10px', borderRadius: '10px', color: '#fff'}}>
              Aunque puede parecer una fuente rápida de ingresos, genera graves consecuencias ambientales, especialmente en la contaminación del agua. Esta actividad utiliza químicos tóxicos como mercurio y cianuro, provoca sedimentación por la erosión del suelo, destruye ecosistemas al alterar el ciclo hídrico y afecta directamente la salud y los recursos de las comunidades locales que dependen de estas fuentes de agua.
              </p>
            </Html>
          </Canvas>
        </KeyboardControls>
      </div>
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
    Para mitigar los efectos de la minería ilegal en las fuentes de agua, es crucial establecer políticas estrictas de control ambiental, promover tecnologías de extracción más limpias y sostenibles, y fortalecer la supervisión gubernamental en las zonas afectadas. 
      </p>
    </div>
  </div>
</div>
    </>
  );
};

export default PollutionMine;