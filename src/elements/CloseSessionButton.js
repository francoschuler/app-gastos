import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { ReactComponent as IconoCerrarSesion} from './../images/log-out.svg';
import Boton from './Button';

const CloseSessionButton = () => {

    const navigate = useNavigate();

    const closeSession = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Boton iconoGrande as='button' onClick={closeSession}>
            <IconoCerrarSesion />
        </Boton>
    );
}
 
export default CloseSessionButton;