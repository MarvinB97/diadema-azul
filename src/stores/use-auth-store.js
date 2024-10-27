//-----------Creando store Authentication-----------
/*
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import {auth} from '../firebase';
import { create } from 'zustand';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const provider = GoogleAuthProvider();

const useAuthStore = create((set) => ({
    //define los estados de user y loading
    user : null,
    loading : true,
    //función asíncrona que maneje el inicio de sesión con Google a través de un popup
    loginGoogleWithPopUp : async () => {
       await signInWithPopup(auth, provider).catch((error) => {
           console.log(error);
       });
    },
    //función asíncrona que maneje el cierre de sesión
    logout: async () => {
        await signOut(auth).then(() => {
            set({user: null});
        }).catch((error) => {
            console.log(error);
        });
    },
    //función que observe los cambios en el estado de autenticación
    observeAuthState: () => {
        set({loading: true});
        onAuthStateChanged(auth, (user) => {
            if (user){
                set({user, loading: false});
            } else {
                set({user: null, loading: false});
            }
        });
    },
 }))

*/


// src/store/useAuthStore.js
/*
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
*/



import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { create } from 'zustand';

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
    // Define los estados de user y loading
    user: null,
    loading: true,

    // Función asíncrona que maneja el inicio de sesión con Google a través de un popup
    loginGoogleWithPopUp: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // Aquí podrías manejar el resultado, como guardar el usuario
            console.log(result.user);
        } catch (error) {
            console.log(error);
        }
    },

    // Función asíncrona que maneja el cierre de sesión
    logout: async () => {
        try {
            await signOut(auth);
            set({ user: null });
        } catch (error) {
            console.log(error);
        }
    },

    // Función que observa los cambios en el estado de autenticación
    observeAuthState: () => {
        set({ loading: true });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set({ user, loading: false });
            } else {
                set({ user: null, loading: false });
            }
        });
    },
}));

export default useAuthStore;

