//-------style----------------
import logo from './../assets/logo.png';
import PlayaModel from './../components/PlayaModel';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import Home from './Home.jsx';




import '../styles/Login.css';

function Login() {
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

      



      <div className="nav-links">
          
          {user ? (
              <>
                  <p className="welcome-text">Welcome, {user.displayName}</p>
                  <div className="button-container">
                    <h3>MENU INFORMATIVO</h3>
                    <ul>
                      <li><Link to="/agricultural-overuse" className="button-option">Contaminacion Marina</Link></li>
                      <li><Link to="/climate-change" className="button-option">Cambio Climatico</Link></li>
                      <li><Link to="/pollution" className="button-option">Contaminación fuentes acuaticas</Link></li>
                      <li><Link to="/population-growth" className="button-option">Aumento de la contaminación</Link></li>
                      <li><Link to="/pollution-mine" className="button-option">Minería ilegal</Link></li>
                    </ul> 
                    <h3>Evaluaciones</h3>
                    <ul>
                      <li><Link to="/#" className="button-option">quiz 1</Link></li>
                      <li><Link to="/#" className="button-option">quiz 2</Link></li>
                    </ul>

                    <p>Acerca de Nosotros</p>
                    <Link to="/" className="button-option">Back to Main Menu</Link>
                    <button className="button-option" onClick={handleLogout}>Logout</button>
                  </div>
                  
                  
              </>
          ) : (
              <Home/>
          )}
      </div>
    </div>
        
    );
}

export default Login;


