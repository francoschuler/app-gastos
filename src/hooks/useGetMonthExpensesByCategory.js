import { useEffect, useState } from 'react';
import useGetMonthExpenses from './useGetMonthExpenses';


const useGetMonthExpensesByCategory = () => {
    
    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
    const [gastos] = useGetMonthExpenses();


    useEffect(() => {
        const sumaGastos = gastos.reduce((objetoResult, objetoActual) => {
            const categoriaActual = objetoActual.categoria;
            const cantidadActual = objetoActual.cantidad;
            objetoResult[categoriaActual] += cantidadActual;
            return objetoResult;
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'ocio': 0,
        });
    
        setGastosPorCategoria(Object.keys(sumaGastos).map((elemento) => {
            return {categoria: elemento, cantidad: sumaGastos[elemento]};
        }));
        
        
    }, [gastos, setGastosPorCategoria]);

    
    return gastosPorCategoria;
}
 
export default useGetMonthExpensesByCategory;