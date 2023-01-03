import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    const [usuario, setUsuario] = useState();
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario);
            setLoading(false);
        });

        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
 
export {AuthContext, AuthProvider, useAuth};