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

import '../styles/Login.css';

function Login() {
    const { user, loginGoogleWithPopUp, logout, observeAuthState } = useAuthStore(); // Destructure functions from the store
    const [loading, setLoading] = useState(true); // State to manage loading

    // Ensure that the observeAuthState function runs when the component mounts
    useEffect(() => {
        const checkAuthState = async () => {
            await observeAuthState();
            setLoading(false); // Change loading state after authentication check
        };
        checkAuthState();
    }, [observeAuthState]);
    
    // Function that runs when the user clicks the login button
    const handleLogin = useCallback(() => {
        loginGoogleWithPopUp();
    }, [loginGoogleWithPopUp]);
    
    // Runs when the user clicks the logout button
    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    // If loading state is true, show a loading text
    if (loading) {
        return <p className="loading-text">Loading...</p>;
    }

    return (
        <div className="container-login">
            {user ? (
                <>
                    <p className="welcome-text">Welcome, {user.displayName}</p>
                    <div className="button-container">
                        <Link to="/Animation" className="button-option">VIEW ANIMATION</Link>
                        <button className="button-option" onClick={handleLogout}>Logout</button>
                        <Link to="/" className="button-option">Back to Main Menu</Link>
                    </div>
                </>
            ) : (
                <button className="button-option" onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}

export default Login;


