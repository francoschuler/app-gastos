import React from 'react';
import { Helmet } from 'react-helmet';
import BackButton from '../elements/BackButton';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import TotalExpenses from './TotalExpenses';
import ExpenseForm from './ExpenseForm';
import { useParams } from 'react-router-dom';
import useGetExpense from '../hooks/useGetExpense';

const EditExpense = () => {

    const { id } = useParams();
    const [gasto] = useGetExpense(id);
    console.log(gasto);

    return (
        <>
          <Helmet>
            <title> Editar Gasto </title>
          </Helmet>
  
          <Header>
            <ContenedorHeader>
              <BackButton ruta='/list'/> 
              <Titulo> Editar Gasto </Titulo>
            </ContenedorHeader>
          </Header>

          <ExpenseForm gasto={gasto}/>

          <TotalExpenses />
        </>
    );
}
 
export default EditExpense;