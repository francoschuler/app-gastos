import React, { useEffect, useState } from 'react';
import Boton from '../elements/Button';
import Select from '../elements/Select';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elements/FormElements';
import { ReactComponent as IconoPlus} from './../images/plus.svg';
import { ReactComponent as IconoEditar} from './../images/editar.svg';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import getUnixTime from 'date-fns/getUnixTime';
import { useAuth } from './../contexts/AuthContext';
import Alert from './../elements/Alert';
import formatCantidad from '../utils/CurrencyConverter';
import { fromUnixTime } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const ExpenseForm = ({gasto}) => {

    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());

    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});

    const { usuario } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'description') {
            setDescripcion(e.target.value);
        } else if (e.target.name === 'valor') {
            setCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    useEffect(() => {
        if (gasto) {
            const data = gasto.data()
            if (data.usuarioUid === usuario.uid) {
                setCategoria(data.categoria);
                setFecha(fromUnixTime(data.fecha));
                setDescripcion(data.descripcion);
                setCantidad(data.cantidad);
            } else {
                navigate('/list');
            }
        }
    }, [gasto, usuario, navigate]); 

    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidadParseada = parseFloat(cantidad).toFixed(2);

        if (descripcion !== '' && cantidad !== '') {

            if (cantidadParseada) {

                // UPDATE
                if (gasto) {
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        descripcion: descripcion,
                        cantidad: cantidadParseada,
                        fecha: getUnixTime(fecha),
                    })
                    .then(() => {

                        // setAlerta({tipo: 'exito', mensaje: 'El gasto fue editado correctamente.'});
                        // setEstadoAlerta(true);

                        navigate('/list');
                    })
                    .catch((error) => {
                        console.log(error);
                        // setAlerta({tipo: 'error', mensaje: 'Hubo un error al intentar agregar el gasto.'});
                        // setEstadoAlerta(true);
                    });

                //CREATE
                } else {
                    agregarGasto({
                        usuarioUid: usuario.uid,
                        categoria: categoria,
                        descripcion: descripcion,
                        cantidad: cantidadParseada,
                        fecha: getUnixTime(fecha),
                    })
                    .then(() => {
                        setCategoria('hogar')
                        setDescripcion('');
                        setCantidad('');
                        setFecha(new Date());
    
                        setAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente.'});
                        setEstadoAlerta(true);
                    })
                    .catch((error) => {
                        setAlerta({tipo: 'error', mensaje: 'Hubo un error al intentar agregar el gasto.'});
                        setEstadoAlerta(true);
                    });
                }

                
            } else {
                setAlerta({tipo: 'error', mensaje: 'La cantidad introducida no es correcta.'});
                setEstadoAlerta(true);
            }

        } else {
            setAlerta({tipo: 'error', mensaje: 'Por favor, rellena todos los campos.'});
            setEstadoAlerta(true);
        }


    };

    return ( 
        <Formulario onSubmit={handleSubmit}>

            <ContenedorFiltros>
                <Select categoria={categoria} setCategoria={setCategoria}/>
                <DatePicker fecha={fecha} setFecha={setFecha}/>
            </ContenedorFiltros>

            <div>
                <Input 
                    type='text'
                    name='description'
                    placeholder='Descripción'
                    value={descripcion}
                    onChange={handleChange}
                />

                <InputGrande 
                    type='text'
                    name='valor'
                    placeholder={formatCantidad(0.00)}
                    value={cantidad}
                    onChange={handleChange}
                />
            </div>

            <ContenedorBoton>
                <Boton as='button' primario conIcono type='submit'>
                    {gasto ? 'Editar Gasto ' : 'Añadir Gasto '} 
                    {gasto ? <IconoEditar /> : <IconoPlus />}
                </Boton>
            </ContenedorBoton>

            <Alert 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />

        </Formulario>
    );
}
 
export default ExpenseForm;