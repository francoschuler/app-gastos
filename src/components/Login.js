import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {Titulo, ContenedorHeader, Header} from './../elements/Header'
import Button from './../elements/Button';
import {Formulario, Input, ContenedorBoton} from './../elements/FormElements';
import Boton from './../elements/Button';
import {ReactComponent as SvgLogin} from './../images/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from '../elements/Alert';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 200px */
    margin-bottom: 1.25rem; /* 20px */
`;

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState({});

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
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

        if (email === '' || password === '') {
            setEstadoAlerta(true);
            setMensajeAlerta({
                tipo: 'error',
                mensaje: 'Falta algún campo por rellenar.'
            });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            
            setEstadoAlerta(true);

            let mensaje;
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña es incorrecta para el correo electrónico introducido.'
                    break;

                case 'auth/user-not-found':
                    mensaje = 'No existe ninguna cuenta creada con el correo electrónico introducido.'
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
                <title> Iniciar Sesión </title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>
                        Iniciar Sesión
                    </Titulo>
                    <div>
                        <Button to='/register'> ¡Regístrate! </Button>
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

                <ContenedorBoton>
                    <Boton as='button' primario type='submit'> Iniciar Sesión </Boton>
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
 
export default Login;