import { Link } from 'react-router-dom';
import './../styles/Home.css'
import logo from './../assets/logo.png'

function Home() {
  return (
    <div className='container-home'>
      <h1>Página de Inicio</h1>
      <img  src={logo} height={'200 px'}/>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default Home;