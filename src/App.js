import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elements/Header'
import Boton from './elements/Button';
import CloseSessionButton from './elements/CloseSessionButton';
import ExpenseForm from './components/ExpenseForm';
import TotalExpenses from './components/TotalExpenses';

const App = () => {
    return (
      <>
        <Helmet>
          <title> Añadir Gasto </title>
        </Helmet>

        <Header>
          <ContenedorHeader>
            <Titulo> Añadir Gasto </Titulo>
            <ContenedorBotones>
              <Boton to="/categories"> Categorías </Boton>
              <Boton to="/list"> Lista de Gastos </Boton>
              <CloseSessionButton />
            </ContenedorBotones>
          </ContenedorHeader>
        </Header>

        <ExpenseForm />

        <TotalExpenses />
        
      </>
    );
}
 
export default App;