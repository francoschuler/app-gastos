import { useEffect, useState } from 'react';
import { db } from './../firebase/firebaseConfig';
import  { useAuth } from './../contexts/AuthContext';
import { collection, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';

const useGetExpenses = () => {

    const {usuario} = useAuth();
    
    const [gastos, setGastos] = useState([]);
    const [ultimoGasto, setUltimoGasto] = useState(null);
    const [hayMas, setHayMas] = useState(false);

    const getMasGastos = () => {
        const consulta = query(
            collection(db, 'gastos'),
            where('usuarioUid', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

        onSnapshot(consulta, (snapshot) => {
            if (snapshot.docs.length > 0) {
                setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                setGastos(
                    gastos.concat(snapshot.docs.map(
                        (gasto) => {
                            return {...gasto.data(), id: gasto.id}
                        }
                )));
            } else {
                setHayMas(false);
            }
        }, (error) => { console.log(error) });
    }


    useEffect(() => {

        const consulta = query(
            collection(db, 'gastos'),
            where('usuarioUid', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsubscribe = onSnapshot(consulta, (snapshot) => {
            
            if(snapshot.docs.length > 0) {
                setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                setHayMas(true);
            } else {
                setHayMas(false);
            }
            
            setGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }));
        });

        return unsubscribe;
    }, [usuario]);
    
    return [gastos, getMasGastos, hayMas];
}
 
export default useGetExpenses;