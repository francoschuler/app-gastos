import React from 'react';
import {Titulo, ContenedorHeader, Header} from './../elements/Header';
import { Helmet } from 'react-helmet';
import BackButton from '../elements/BackButton';

const ExpensesByCategory = () => {
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
 
export default ExpensesByCategory;