import React, { useContext, useEffect, useState } from 'react';
import useGetMonthExpenses from '../hooks/useGetMonthExpenses';

const TotalLastMonthContext = React.createContext();

const useTotalLastMonth = () => {
    return useContext(TotalLastMonthContext);
};

const TotalLastMonthProvider = ({children}) => {

    const [total, setTotal] = useState(0);
    const [gastos] = useGetMonthExpenses();

    useEffect(() => {
        let acumulado = 0;
        gastos.forEach((gasto) => {
            acumulado += gasto.cantidad;
        });
        console.log(acumulado);

        setTotal(acumulado);
        return () => {
            
        };
    }, [gastos]);

    return (
        <TotalLastMonthContext.Provider value={{total: total}}>
            {children}
        </TotalLastMonthContext.Provider>
    );
}

export {TotalLastMonthProvider, useTotalLastMonth}