import React from 'react';
import { Helmet } from 'react-helmet';
import {Titulo, ContenedorHeader, Header} from './../elements/Header'
import Button from './../elements/Button';
import {Formulario, Input, ContenedorBoton} from './../elements/FormElements';
import Boton from './../elements/Button';
import {ReactComponent as SvgLogin} from './../images/login.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 200px */
    margin-bottom: 1.25rem; /* 20px */
`;

const Login = () => {
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

            <Formulario>
                <Svg />
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                />

                <ContenedorBoton>
                    <Boton as='button' primario type='submit'> Iniciar Sesión </Boton>
                </ContenedorBoton>

            </Formulario>
        </>
    );
}
 
export default Login;