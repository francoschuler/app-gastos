import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const editarGasto = async ({id, categoria, descripcion, cantidad, fecha}) => {

    return await updateDoc(doc(db, 'gastos', id), {
        categoria: categoria,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        fecha: fecha
    });
}

export default editarGasto;