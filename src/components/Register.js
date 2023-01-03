import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {Titulo, ContenedorHeader, Header} from './../elements/Header'
import Button from './../elements/Button';
import {Formulario, Input, ContenedorBoton} from './../elements/FormElements';
import Boton from './../elements/Button';
import {ReactComponent as SvgLogin} from './../images/registro.svg';
import styled from 'styled-components';
import {auth} from './../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Alert from '../elements/Alert';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        switch(e.target.name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'password2':
                setPassword2(value);
                break;
            default: break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstadoAlerta(false);
        setMensajeAlerta({});
        
        const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (!regex.test(email)) {
            setEstadoAlerta(true);
            setMensajeAlerta({
                tipo: 'error',
                mensaje: 'El correo electrónico introducido no es válido. Revisa que el correo electrónico tenga el formato correcto (p.e. correo@correo.com)'
            });
            return;
        }

        if (email === '' || password === '' || password2 === '') {
            setEstadoAlerta(true);
            setMensajeAlerta({
                tipo: 'error',
                mensaje: 'Falta algún campo por rellenar.'
            });
            return;
        }

        if (password !== password2) {
            setEstadoAlerta(true);
            setMensajeAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas introducidas deben coincidir.'
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.log(error)
            setEstadoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/weak-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;

                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico que has introducido.'
                    break;

                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido (p.e. correo@correo.com)'
                    break;

                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }

            setMensajeAlerta({
                tipo: 'error',
                mensaje: mensaje
            })
        }
        
    }

    return (
        <>
            <Helmet>
                <title> Crear Cuenta </title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>
                        Crear Cuenta
                    </Titulo>
                    <div>
                        <Button to='/login'> Inicia Sesión </Button>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password2'
                    placeholder='Repetir Contraseña'
                    value={password2}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as='button' primario type='submit'> Crear cuenta</Boton>
                </ContenedorBoton>

            </Formulario>

            <Alert 
                tipo={mensajeAlerta.tipo} 
                mensaje={mensajeAlerta.mensaje} 
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />
        </>
    );
}
 
export default Register;