import React from 'react';
import { Helmet } from 'react-helmet';
import BackButton from '../elements/BackButton';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import useGetExpenses from '../hooks/useGetExpenses';
import TotalExpenses from './TotalExpenses';
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo
} from './../elements/ListElements';

import CategoryIcon from './../elements/CategoryIcon';
import formatCantidad from '../utils/CurrencyConverter';
import {ReactComponent as IconoEditar} from './../images/editar.svg';
import {ReactComponent as IconoBorrar} from './../images/borrar.svg';
import { Link } from 'react-router-dom';
import Boton from './../elements/Button';
import {format, fromUnixTime} from 'date-fns'
import { es } from 'date-fns/locale';
import borrarGasto from '../firebase/borrarGasto';


const ExpensesList = () => {

    const [ gastos, getMasGastos, hayMas ] = useGetExpenses();

    const formatFecha = (fecha) => {
      return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es});
    };

    const fechaEsIgual = (gastos, index, gasto) => {
      if (index !== 0) {
        const fechaActual = formatFecha(gasto.fecha);
        const fechaAnterior = formatFecha(gastos[index - 1].fecha);
        return fechaActual === fechaAnterior;
      }
    }

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

          <Lista>
            {gastos.map((gasto, index) => {
              return (
                <div key={gasto.id}>
                  {!fechaEsIgual(gastos, index, gasto) && 
                    <Fecha> {formatFecha(gasto.fecha)} </Fecha>
                  }
                  <ElementoLista>

                    <Categoria>
                      <CategoryIcon id={gasto.categoria}></CategoryIcon>
                      {gasto.categoria} 
                    </Categoria>

                    <Descripcion> {gasto.descripcion} </Descripcion>
                    <Valor> {formatCantidad(gasto.cantidad)} </Valor>

                    <ContenedorBotones>
                      <BotonAccion as={Link} to={`/edit/${gasto.id}`}>
                        <IconoEditar/>
                      </BotonAccion>
                      <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                        <IconoBorrar />
                      </BotonAccion>
                    </ContenedorBotones>

                  </ElementoLista>


                </div>
              );
            })}

            <ContenedorBotonCentral>
              {hayMas && 
                <BotonCargarMas onClick={() => getMasGastos()}> Cargar más </BotonCargarMas>
              }
            </ContenedorBotonCentral>

            {gastos.length === 0 &&
              <ContenedorSubtitulo>
                <Subtitulo> No hay gastos por mostrar </Subtitulo>
                <Boton as={Link} to='/'> Empezar a agregar gastos </Boton>
              </ContenedorSubtitulo>
            }
          </Lista>

          <TotalExpenses />
        </>
      );
}
 
export default ExpensesList;