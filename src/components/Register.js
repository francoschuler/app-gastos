import React from 'react';
import { Helmet } from 'react-helmet';
import {Titulo, ContenedorHeader, Header} from './../elements/Header'
import Button from './../elements/Button';
import {Formulario, Input, ContenedorBoton} from './../elements/FormElements';
import Boton from './../elements/Button';
import {ReactComponent as SvgLogin} from './../images/registro.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const Register = () => {
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
                <Input
                    type='password'
                    name='password2'
                    placeholder='Repetir Contraseña'
                />
                <ContenedorBoton>
                    <Boton as='button' primario type='submit'> Crear cuenta</Boton>
                </ContenedorBoton>

            </Formulario>
        </>
    );
}
 
export default Register;