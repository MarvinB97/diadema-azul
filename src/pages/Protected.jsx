// src/pages/Protected.jsx
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Protected() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenido, {user?.email}</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Protected;
