import { endOfMonth, getUnixTime, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from '../contexts/AuthContext';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useGetMonthExpenses = () => {
    
    const [gastos, setGastos] = useState([]);
    const { usuario } = useAuth();
    
    useEffect(() => {

        const inicioMes = getUnixTime(startOfMonth(new Date()));
        const finMes = getUnixTime(endOfMonth(new Date()));
        
        if (usuario) {


            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioMes),
                where('fecha', '<=', finMes),
                where('usuarioUid', '==', usuario.uid)
            );

            const unsubscribe = onSnapshot(consulta, (snapshot) => {
                setGastos(snapshot.docs.map(documento => {
                    return { ...documento.data(), id: documento.id}
                }));
            }, (error) => { console.log(error); })

            return unsubscribe;
        }

    }, [usuario]);

    return [gastos];
}
 
export default useGetMonthExpenses;