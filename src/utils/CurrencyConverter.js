const formatCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'es-ES',
        {
            style: 'currency', 
            currency: 'EUR',
            minimumFractionDigits: 2,
            useGrouping: true
        }
    ).format(cantidad);
}
 
export default formatCantidad;