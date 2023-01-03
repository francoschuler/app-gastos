import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../elements/BackButton';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';

const ExpensesList = () => {

    return (
        <>
          <Helmet>
            <title> Gastos por Categoría </title>
          </Helmet>
  
          <Header>
            <ContenedorHeader>
              <BackButton /> 
              <Titulo> Gastos por Categoría </Titulo>
            </ContenedorHeader>
          </Header>
        </>
      );
}
 
export default ExpensesList;