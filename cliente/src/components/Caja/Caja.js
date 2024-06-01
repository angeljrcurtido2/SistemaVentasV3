import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import InputText from '../Productos/InputText';
import { AiFillDelete } from "react-icons/ai";
import Button from '../Productos/Button';
import axios from 'axios';
const CajaComponent = () => {
    const [montoInicial, setMontoInicial] = useState(0);
    const [montoFinal, setMontoFinal] = useState(0);
    const [moneda, setMoneda] = useState(0);
    const [billete, setBillete] = useState(0);
    const [cheque, setCheque] = useState(0);
    const [tarjeta, setTarjeta] = useState(0);
    const [gastos, setGastos] = useState(0);
    const [ingresos, setIngresos] = useState(0);
    const [cajas, setCajas] = useState([]);
    const [cajasAbiertas, setCajasAbiertas] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [showModalCierreCaja, setShowModalCierreCaja] = useState(false);
    const [showModalAnularCaja, setShowModalAnularCaja] = useState(false);
    const [selectedCajaId, setSelectedCajaId] = useState(null);
    const [mostrarModalTotales, setMostrarModalTotales] = useState(false);
    const [mostrarModalCalcular, setMostrarModalCalcular] = useState(false);
    const [totalesVentas, setTotalesVentas] = useState(null);
    const [totalesCompras, setTotalesCompras] = useState(null);
    const [ingresosVarios, setIngresosVarios] = useState(0);
    const [diferencia, setDiferencia] = useState(null);
    useEffect(() => {
        obtenerCajas();
        obtenerCajasAbiertos();
    }, []);
    const abrirCaja = async () => {
        try {
            const response = await axios.post('https://server-1-r6r7.onrender.com/caja/abrir', {
                montoInicial,
                moneda: 0,
                billete: 0,
                cheque: 0,
                tarjeta: 0,
                gastos: 0,
                ingresos: 0,
            });
            setMensaje(`Caja abierta con éxito: ${JSON.stringify(response.data)}`);
            obtenerCajas();
            obtenerCajasAbiertos();
            setMontoInicial(0);
        }
        catch (error) {
            setMensaje(`Error al abrir la caja: ${error.response ? error.response.data : error.message}`);
        }
    };
    const cerrarCaja = async (id) => {
        try {
            const response = await axios.put(`https://server-1-r6r7.onrender.com/caja/cerrar/${id}`, {
                montoFinal,
                moneda,
                billete,
                cheque,
                tarjeta,
                gastos,
                ingresos,
            });
            setMensaje(`Caja cerrada con éxito: ${JSON.stringify(response.data)}`);
            obtenerCajas();
            obtenerCajasAbiertos();
            setMontoFinal(0);
        }
        catch (error) {
            setMensaje(`Error al cerrar la caja: ${error.response ? error.response.data : error.message}`);
        }
    };
    const anularCaja = async (id) => {
        try {
            const response = await axios.put(`https://server-1-r6r7.onrender.com/caja/anular/${id}`);
            setMensaje(`Caja anulada con éxito: ${JSON.stringify(response.data)}`);
            obtenerCajas();
            obtenerCajasAbiertos();
        }
        catch (error) {
            setMensaje(`Error al anular la caja: ${error.response ? error.response.data : error.message}`);
        }
    };
    const obtenerCajas = async () => {
        try {
            const response = await axios.get('https://server-1-r6r7.onrender.com/caja/activas');
            setCajas(response.data);
        }
        catch (error) {
            setMensaje(`Error al obtener las cajas: ${error.response ? error.response.data : error.message}`);
        }
    };
    const obtenerCajasAbiertos = async () => {
        try {
            const response = await axios.get('https://server-1-r6r7.onrender.com/caja/abiertas');
            setCajasAbiertas(response.data);
        }
        catch (error) {
            setMensaje(`Error al obtener las cajas: ${error.response ? error.response.data : error.message}`);
        }
    };
    const handleSubmitApertura = (event) => {
        event.preventDefault();
        abrirCaja();
    };
    const handleSubmitCierre = (event) => {
        event.preventDefault();
        if (selectedCajaId) {
            cerrarCaja(selectedCajaId);
        }
    };
    const mostrarTotalesVC = async () => {
        try {
            const ventasResponse = await axios.get('https://server-1-r6r7.onrender.com/ventas/total-del-dia');
            const comprasResponse = await axios.get('https://server-1-r6r7.onrender.com/compras/total-del-dia');
            setTotalesVentas(ventasResponse.data.total);
            setTotalesCompras(comprasResponse.data.total);
            setMostrarModalTotales(true);
        }
        catch (error) {
            setMensaje(`Error al obtener los totales: ${error.response ? error.response.data : error.message}`);
        }
    };
    const calcularTotales = async () => {
        try {
            const ventasResponse = await axios.get('https://server-1-r6r7.onrender.com/ventas/total-del-dia');
            const comprasResponse = await axios.get('https://server-1-r6r7.onrender.com/compras/total-del-dia');
            const ventas = ventasResponse.data.total;
            const compras = comprasResponse.data.total;
            setTotalesVentas(ventas);
            setTotalesCompras(compras);
            const diferenciaCalculada = ventas - compras + ingresosVarios;
            setDiferencia(diferenciaCalculada);
            setMostrarModalCalcular(true);
        }
        catch (error) {
            setMensaje(`Error al calcular los totales: ${error.response ? error.response.data : error.message}`);
        }
    };
    const cerrarModalCalcular = () => {
        if (diferencia !== null) {
            setMontoFinal(diferencia);
        }
        setMostrarModalCalcular(false);
        setTotalesVentas(null);
        setTotalesCompras(null);
        setDiferencia(null);
        setIngresosVarios(0);
    };
    const cerrarModal = () => {
        setMostrarModalTotales(false);
    };
    return (_jsxs("div", { children: [_jsx("h1", { className: "font-bold text-center border-b", children: "Apertura de Caja" }), _jsx("form", { onSubmit: handleSubmitApertura, children: _jsxs("div", { className: "flex flex-col justify-center items-center gap-4", children: [_jsx("label", { children: "Monto Inicial de Apertura:" }), _jsxs("div", { className: "flex ", children: [_jsx(InputText, { type: "number", value: montoInicial, onChange: (e) => setMontoInicial(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setMontoInicial(''), children: _jsx(AiFillDelete, {}) })] }), _jsxs("div", { className: "flex flex-row gap-4", children: [_jsx("button", { type: "submit", children: "Abrir Caja" }), _jsx("button", { onClick: () => setShowModalCierreCaja(true), type: "button", children: "Cerrar Caja" }), _jsx("button", { onClick: () => setShowModalAnularCaja(true), type: "button", children: "Anular Caja" })] })] }) }), showModalCierreCaja && (_jsx("div", { className: "modal-background", onClick: () => setShowModalCierreCaja(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'font-bold border-b text-center', children: "Cierre de Caja" }), _jsxs("form", { onSubmit: handleSubmitCierre, children: [_jsxs("div", { children: [_jsx("label", { className: 'font-bold', children: "Seleccionar Caja:" }), _jsxs("select", { className: ' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500', onChange: (e) => setSelectedCajaId(e.target.value), required: true, children: [_jsx("option", { value: "", children: "Seleccione una caja" }), cajasAbiertas.map((caja) => (_jsx("option", { value: caja._id, children: `Caja - Apertura: ${new Date(caja.fechaApertura).toLocaleString()}` }, caja._id)))] })] }), _jsxs("div", { className: 'flex flex-row items-center gap-4 mt-4', children: [_jsx("label", { className: 'font-bold', children: "Monto Final:" }), _jsx(InputText, { type: "number", value: montoFinal, onChange: (e) => setMontoFinal(Number(e.target.value)), required: true }), _jsx(Button, { className: 'mt-0 border border-gray-300 hover:border-gray-300', type: "button", onClick: calcularTotales, children: "Calcular" })] }), _jsxs("div", { className: 'grid grid-cols-3 gap-4 mt-4', children: [_jsxs("div", { className: 'flex flex-row items-center', children: [_jsx("label", { className: 'font-bold', children: "Moneda:" }), _jsxs("div", { className: 'flex flex-row', children: [_jsx(InputText, { type: "number", value: moneda, onChange: (e) => setMoneda(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setMoneda(''), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { className: 'flex flex-row items-center', children: [_jsx("label", { className: 'font-bold', children: "Billete:" }), _jsxs("div", { className: "flex flex-row", children: [_jsx(InputText, { type: "number", value: billete, onChange: (e) => setBillete(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setBillete(''), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { className: 'flex flex-row items-center', children: [_jsx("label", { className: 'font-bold', children: "Cheque:" }), _jsxs("div", { className: "flex flex-row", children: [_jsx(InputText, { type: "number", value: cheque, onChange: (e) => setCheque(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setCheque(''), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { className: 'flex flex-row items-center', children: [_jsx("label", { className: 'font-bold', children: "Tarjeta:" }), _jsxs("div", { className: "flex flex-row", children: [_jsx(InputText, { type: "number", value: tarjeta, onChange: (e) => setTarjeta(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setTarjeta(''), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { className: 'flex flex-row items-center', children: [_jsx("label", { className: 'font-bold', children: "Gastos:" }), _jsxs("div", { className: "flex flex-row", children: [_jsx(InputText, { type: "number", value: gastos, onChange: (e) => setGastos(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setGastos(''), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { className: 'flex flex-row items-center', children: [_jsx("label", { className: 'font-bold', children: "Ingresos:" }), _jsxs("div", { className: "flex flex-row", children: [_jsx(InputText, { type: "number", value: ingresos, onChange: (e) => setIngresos(Number(e.target.value)), required: true }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setIngresos(''), children: _jsx(AiFillDelete, {}) })] })] })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { className: 'border border-gray-300 hover:border-gray-300', onClick: () => setShowModalCierreCaja(false), type: "submit", children: "Cerrar Caja" }) })] })] }) })), ";", showModalAnularCaja && (_jsx("div", { className: "modal-background", onClick: () => setShowModalAnularCaja(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'font-bold border-b text-center', children: "Anulaci\u00F3n de Caja" }), _jsx("div", { className: 'border rounded pb-2 pt-2', children: cajas.map((caja) => (_jsxs("div", { className: 'flex items-center justify-center', children: [_jsx("span", { children: `Caja - Apertura: ${new Date(caja.fechaApertura).toLocaleString()}` }), _jsx(Button, { className: 'ml-3 mt-0 border-gray-300', onClick: () => anularCaja(caja._id), children: "Anular" })] }, caja._id))) })] }) })), mostrarModalCalcular && (_jsx("div", { className: "modal-background", onClick: () => setMostrarModalCalcular(null), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h2", { className: 'text-center font-bold', children: "Calcular Totales" }), _jsxs("div", { className: 'border rounded pb-2 pr-2 pl-2 mb-2', children: [_jsxs("p", { className: 'font-bold', children: ["Total Venta: ", totalesVentas !== null ? totalesVentas : 'Cargando...'] }), _jsxs("p", { className: 'font-bold', children: ["Total Compra: ", totalesCompras !== null ? totalesCompras : 'Cargando...'] }), _jsxs("div", { className: 'font-bold', children: [_jsx("label", { children: "Diferencia: " }), _jsx("span", { children: diferencia !== null ? diferencia : 'Calculando...' })] }), _jsx("div", { className: 'font-bold', children: _jsxs("div", { className: 'flex ', children: [_jsx("label", { className: 'mt-2 mr-2', children: "Ingresos Varios:" }), _jsx(InputText, { type: "number", value: ingresosVarios, onChange: (e) => setIngresosVarios(Number(e.target.value)) }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setIngresosVarios(''), children: _jsx(AiFillDelete, {}) })] }) })] }), _jsxs("div", { className: 'flex justify-center gap-4', children: [_jsx(Button, { className: 'border border-gray-300', onClick: () => setDiferencia((totalesVentas || 0) - (totalesCompras || 0) + ingresosVarios), children: "Recalcular" }), _jsx(Button, { className: 'border border-gray-300', onClick: cerrarModalCalcular, children: "Cerrar" })] })] }) })), mensaje && _jsx("p", { children: mensaje })] }));
};
export default CajaComponent;
