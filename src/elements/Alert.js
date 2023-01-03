import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Theme from '../Theme';

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* -20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;
 
const ContenedorAlerta = styled.div`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 1.25rem; /* 20px */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;
 
    p {
 
        background: ${({tipo}) => {
            console.log(tipo);
            
            if(tipo === 'error'){
                return Theme.rojo;
            } else if (tipo === 'exito') {
                return Theme.verde;
            } else {
                return '#000';
            }
        }};
        color: #fff;
        padding: 1.25rem 2.5rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
    }
`;

const Alert = ({tipo, mensaje, estadoAlerta, setEstadoAlerta}) => {

    console.log(tipo, mensaje);

    useEffect(() => {
        let tiempo;

        if(estadoAlerta === true) {
            tiempo = setTimeout(() => {
                setEstadoAlerta(false);
            }, 4000);
        }
        return () => clearTimeout(tiempo);

    }, [estadoAlerta, setEstadoAlerta]);

    return (

        <>
        {estadoAlerta && 
            <ContenedorAlerta>
                <p> {mensaje} </p>
            </ContenedorAlerta>
        }

        </>
        


    );
}
 
export default Alert;
