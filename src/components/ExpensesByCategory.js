import React from 'react';
import {Titulo, ContenedorHeader, Header} from './../elements/Header';
import { Helmet } from 'react-helmet';
import BackButton from '../elements/BackButton';
import TotalExpenses from './TotalExpenses';
import useGetMonthExpensesByCategory from '../hooks/useGetMonthExpensesByCategory';
import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor
} from '../elements/ListElements';
import CategoryIcon from '../elements/CategoryIcon';
import formatCantidad from '../utils/CurrencyConverter';

const ExpensesByCategory = () => {

    const gastosPorCategoria = useGetMonthExpensesByCategory();

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

          <ListaDeCategorias>
            {gastosPorCategoria.map((gasto, index) => {
              return (
                <ElementoListaCategorias key={index}>
                  <Categoria> <CategoryIcon id={gasto.categoria}/> {gasto.categoria} </Categoria>
                  <Valor> {formatCantidad(gasto.cantidad)} </Valor>
                </ElementoListaCategorias>
              );
            }) }
          </ListaDeCategorias>

          <TotalExpenses />
        </>
      );
}
 
export default ExpensesByCategory;