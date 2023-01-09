import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const {usuario} = useAuth();
    if (usuario) {
        return children;
    } else {
        return <Navigate replace to='/login'/>
    }
}
 
export default PrivateRoute;