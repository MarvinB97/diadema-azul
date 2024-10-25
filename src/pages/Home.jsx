import { Link } from 'react-router-dom';
import './../styles/Home.css';
import logo from './../assets/logo.png';
import PlayaModel from './../components/PlayaModel';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Home() {
  return (
    <div className="container-home">
      {/* Canvas para el modelo 3D */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 1000 }} 
        dpr={[1, 2]}
        antialias
      >
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

      {/* Contenido de la página */}
      <div className="header-content">
        <img src={logo} alt="Diadema Azul Logo" className="logo" />
        <h1 className="welcome-text">¡Welcome to Diadema Azul!</h1>
      </div>

      <div className="nav-links">
        <Link to="/login" className="nav-link">
          <button className="styled-button">Login</button>
        </Link>
        <Link to="/waterscarcity" className="nav-link">
          <button className="styled-button">Explore Water Scarcity</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;












