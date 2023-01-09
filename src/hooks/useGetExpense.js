import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';

const useGetExpense = (id) => {
    
    const [gasto, setGasto] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerGasto = async () => {
            const documento = await getDoc(doc(db, 'gastos', id));

            if(documento.exists) {
                setGasto(documento);
            } else {
                navigate('/list');
            }
        }

        obtenerGasto();

        return () => {
            
        };
    }, [navigate, id]);

    return [gasto];
}
 
export default useGetExpense;