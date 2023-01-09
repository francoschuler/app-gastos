import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const agregarGasto = ({usuarioUid, categoria, descripcion, cantidad, fecha}) => {

    return addDoc(collection(db, 'gastos'), {
        usuarioUid: usuarioUid,
        categoria: categoria,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        fecha: fecha
    });
}

export default agregarGasto;