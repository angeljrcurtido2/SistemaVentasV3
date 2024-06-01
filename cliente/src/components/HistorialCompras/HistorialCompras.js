import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputText from '../Productos/InputText';
const HistorialCompras = () => {
    const [data, setData] = useState([]);
    const [detalle, setDetalle] = useState(null);
    const [facturaNumero, setFacturaNumero] = useState('');
    const [fechaInicio, setFechaInicio] = useState(''); // Nuevo estado para la fecha de inicio
    const [fechaFinal, setFechaFinal] = useState(''); // Nuevo estado para la fecha final
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://server-1-r6r7.onrender.com/compras');
            console.log(result.data);
            setData(result.data);
        };
        fetchData();
    }, []);
    const handleDetalleClick = (item) => {
        console.log(item);
        setDetalle(item);
    };
    const handleDeleteCompra = async (id) => {
        try {
            await axios.delete(`https://server-1-r6r7.onrender.com/compras/${id}`);
            const result = await axios.get('https://server-1-r6r7.onrender.com/compras');
            setData(result.data);
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-center font-bold border-b", children: "HISTORIAL COMPRAS" }), _jsxs("div", { className: 'flex gap-6 border-b', children: [_jsx(InputText, { type: "text", value: facturaNumero, onChange: e => setFacturaNumero(e.target.value), placeholder: "Buscar por n\u00FAmero de factura" }), _jsx(InputText, { type: "date", value: fechaInicio, onChange: e => setFechaInicio(e.target.value), placeholder: "Fecha de inicio" }), " ", _jsx(InputText, { type: "date", value: fechaFinal, onChange: e => setFechaFinal(e.target.value), placeholder: "Fecha final" }), " "] }), _jsx("div", { className: 'overflow-x-auto max-h-80', children: _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { children: "Proveedor" }), _jsx("th", { children: "FacturaNumero" }), _jsx("th", { children: "Fecha" }), _jsx("th", { children: "Accion" })] }) }), _jsx("tbody", { className: 'text-center ', children: data.filter(item => {
                                const fecha = new Date(item.fecha);
                                return (item.facturaNumero && item.facturaNumero.includes(facturaNumero)) &&
                                    (!fechaInicio || fecha >= new Date(fechaInicio)) &&
                                    (!fechaFinal || fecha <= new Date(fechaFinal));
                            }).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: item.proveedor }), _jsx("td", { children: item.facturaNumero }), _jsx("td", { children: new Date(item.fecha).toLocaleDateString() }), _jsxs("td", { children: [_jsx("button", { onClick: () => handleDetalleClick(item), children: "Detalles" }), _jsx("button", { type: "button", onClick: () => handleDeleteCompra(item._id), children: "Eliminar" })] })] }, index))) })] }) }), detalle && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", onClick: () => setDetalle(null), children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-4", children: ["Detalle de la factura: ", detalle.facturaNumero] }), _jsxs("p", { children: ["Proveedor: ", detalle.proveedor] }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "Producto" }), _jsx("th", { className: "border-r", children: "Cantidad" }), _jsx("th", { className: "border-r", children: "Precio de compra" })] }) }), _jsx("tbody", { className: 'text-center border ', children: detalle.producto.map((prod, index) => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: prod.nombreProducto }), _jsx("td", { className: "border", children: prod.cantidad }), _jsx("td", { className: "border", children: prod.precioCompra })] }, index))) })] }), _jsxs("p", { children: ["Precio total de compra: Gs. ", detalle.precioCompraTotal.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] }), _jsxs("p", { children: ["Telefono: ", detalle.Telefono] }), _jsxs("p", { children: ["Direccion: ", detalle.Direccion] })] }) }))] }));
};
export default HistorialCompras;
