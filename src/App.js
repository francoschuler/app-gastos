import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elements/Header'
import Boton from './elements/Button'

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
              <Boton> X </Boton>
            </ContenedorBotones>
          </ContenedorHeader>
        </Header>
      </>
    );
}
 
export default App;