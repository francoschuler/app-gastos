import React from 'react';
import styled from 'styled-components';
import Theme from '../Theme';
import formatCantidad from '../utils/CurrencyConverter';

const BarraTotal = styled.div`
    background: ${Theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;


const TotalExpenses = () => {
    return (
        <BarraTotal>
            <p> Total gastado en el último mes </p>
            <p> {formatCantidad(0.00)} </p>
        </BarraTotal>
    );
}
 
export default TotalExpenses;