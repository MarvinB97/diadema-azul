/*
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/protected');
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
*/


import React, { useCallback, useState, useEffect } from 'react';
import { auth } from '../firebase';
import useAuthStore from '../stores/use-auth-store.js';
import { Link } from 'react-router-dom';

import '../styles/Login.css'


function Login() {
    const { user, loginGoogleWithPopUp, logout, observeAuthState } = useAuthStore(); // Desestructurar las funciones del store
    const [loading, setLoading] = useState(true); // Estado para manejar el "loading"

    // Asegura de que la función observeAuthState se ejecute cuando el componente
    // se cargue. Esto verifica si un usuario ya está autenticado
    useEffect(() => {
        const checkAuthState = async () => {
            await observeAuthState();
            setLoading(false); // Cambiar el estado de loading cuando se verifica la autenticación
        };
        checkAuthState();
    }, [observeAuthState]);
    
    // Función que se ejecuta cuando el usuario hace clic en el botón
    // de "Iniciar sesión". Esta función llama a loginGoogleWithPopUp para mostrar el popup de inicio
    // de sesión de Google
    const handleLogin = useCallback(() => {
        loginGoogleWithPopUp();
    }, [loginGoogleWithPopUp]);
    
    // Se ejecuta cuando el usuario hace clic en el botón de "Cerrar sesión".
    // Esta función llama a logout para desconectar al usuario
    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    // Si el estado loading es true, muestra un texto que dice "Cargando..."
    if (loading) {
        return <p className="loading-text">Cargando...</p>;
    }

    return (
        <div className="container-login">
            {user ? (
                <>
                    <p className="welcome-text">Bienvenido, {user.displayName}</p>
                    <Link to="/Animation">VER ANIMACION</Link>
                    <button className="button-logout" onClick={handleLogout}>Cerrar sesión</button>
                </>
            ) : (
                <button onClick={handleLogin}>Iniciar sesión</button>
            )}
        </div>
    );
}

export default Login;
