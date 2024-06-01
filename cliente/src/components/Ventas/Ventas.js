import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import Button from '../Productos/Button';
import TicketPDF from './TicketPdf';
import axios from 'axios';
const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [showModalProductos, setShowModalProductos] = useState(false);
    const [showModalCobranza, setShowModalCobranza] = useState(false);
    const [showModalAlerta, setShowModalAlerta] = useState(false);
    const [clientes, setClientes] = useState([]);
    // Agregar estado para las cajas abiertas
    const [cajasAbiertas, setCajasAbiertas] = useState([]);
    const [ventaRealizada, setVentaRealizada] = useState(null);
    const [showModalTicket, setShowModalTicket] = useState(false);
    const [dineroCliente, setDineroCliente] = useState(0);
    const [codigoBarra, setCodigoBarra] = useState('');
    const [ventaData, setVentaData] = useState({
        numeroTimbrado: '',
        cliente: '',
        rucempresa: '',
        ruccliente: '',
        comercial: '',
        telefono: '',
        direccion: '',
        estado: 'activo'
    });
    useEffect(() => {
        axios.get('https://server-1-r6r7.onrender.com/caja/abiertas')
            .then(response => {
            setCajasAbiertas(response.data);
        })
            .catch(error => {
            console.error('Error fetching cajas abiertas:', error);
        });
    }, []);
    // Verificar si hay una caja abierta para el día actual
    const hayCajaAbiertaHoy = cajasAbiertas.some(caja => {
        const fechaApertura = new Date(caja.fechaApertura);
        const hoy = new Date();
        return fechaApertura.getDate() === hoy.getDate() &&
            fechaApertura.getMonth() === hoy.getMonth() &&
            fechaApertura.getFullYear() === hoy.getFullYear();
    });
    useEffect(() => {
        axios.get('https://server-1-r6r7.onrender.com/productos')
            .then(response => {
            setProductos(response.data);
            console.log(response.data);
        })
            .catch(error => {
            console.error('Error fetching productos:', error);
        });
    }, []);
    useEffect(() => {
        axios.get('https://server-1-r6r7.onrender.com/datos-empresa/ultimo')
            .then(response => {
            const { Timbrado, Comercial, Ruc, Direccion, Telefono } = response.data;
            setVentaData(prevData => ({
                ...prevData,
                numeroTimbrado: Timbrado,
                comercial: Comercial,
                rucempresa: Ruc,
                direccion: Direccion,
                telefono: Telefono
            }));
        })
            .catch(error => {
            console.error('Error fetching datos empresa:', error);
        });
    }, []);
    useEffect(() => {
        const fetchClientes = async () => {
            const response = await axios.get('https://server-1-r6r7.onrender.com/datos-cliente/');
            setClientes(response.data);
        };
        fetchClientes();
    }, []);
    const handleSelectProducto = (producto) => {
        const existingProduct = productosSeleccionados.find(p => p.producto._id === producto._id);
        if (existingProduct) {
            setProductosSeleccionados(productosSeleccionados.map(p => p.producto._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p));
        }
        else {
            setProductosSeleccionados([...productosSeleccionados, { producto, cantidad: 1 }]);
        }
    };
    const handleRemoveProducto = (productoId) => {
        setProductosSeleccionados(productosSeleccionados.filter(p => p.producto._id !== productoId));
    };
    const handleCantidadChange = (productoId, cantidad) => {
        setProductosSeleccionados(productosSeleccionados.map(p => p.producto._id === productoId ? { ...p, cantidad } : p));
    };
    const calcularTotalVenta = () => {
        return productosSeleccionados.reduce((total, p) => total + p.cantidad * p.producto.precioVenta, 0);
    };
    const calcularIVA = () => {
        let iva10 = 0;
        let iva5 = 0;
        productosSeleccionados.forEach(p => {
            if (p.producto.Iva === '10%') {
                iva10 += (p.producto.precioVenta * p.cantidad) / 11;
            }
            else if (p.producto.Iva === '5%') {
                iva5 += (p.producto.precioVenta * p.cantidad) / 21;
            }
        });
        return { iva10, iva5 };
    };
    const handleSubmitVenta = async () => {
        setShowModalCobranza(true);
    };
    const handleConfirmarVenta = async () => {
        try {
            const venta = {
                ...ventaData,
                productos: productosSeleccionados.map(p => ({
                    producto: p.producto._id,
                    cantidad: p.cantidad
                }))
            };
            const response = await axios.post('https://server-1-r6r7.onrender.com/ventas', venta);
            console.log('Venta creada:', response.data);
            // Guarda los detalles de la venta y muestra el modal de ticket
            setVentaRealizada(response.data);
            setShowModalTicket(true);
            // Reset form
            setVentaData({
                cliente: '',
                ruccliente: '',
                estado: 'activo'
            });
            setProductosSeleccionados([]);
            setShowModalCobranza(false);
            setDineroCliente(0);
        }
        catch (error) {
            console.error('Error creating venta:', error);
        }
    };
    const printDocument = (blob) => {
        const url = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        iframe.onload = function () {
            iframe.contentWindow.print();
        };
    };
    const buscarProductoPorCodigoBarra = async () => {
        try {
            const response = await axios.get(`https://server-1-r6r7.onrender.com/productos/codigo-barra/${codigoBarra}`);
            const producto = response.data;
            if (producto) {
                handleSelectProducto(producto);
                setCodigoBarra(''); // Reset the input field
            }
            else {
                setShowModalAlerta(true);
            }
        }
        catch (error) {
            setShowModalAlerta(true);
        }
    };
    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            buscarProductoPorCodigoBarra();
        }
    };
    const totalVenta = calcularTotalVenta();
    const { iva10, iva5 } = calcularIVA();
    const vuelto = dineroCliente - totalVenta;
    return (hayCajaAbiertaHoy ? (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: 'font-bold text-center border-b', children: "VENTAS" }), _jsxs("div", { className: "grid grid-cols-2 justify-center", children: [_jsxs("div", { className: "mb-4 mr-20 ml-20", children: [_jsx("label", { className: "block mb-2", children: "N\u00FAmero Timbrado" }), _jsx("input", { type: "text", placeholder: '22121321', className: "w-full p-2 border rounded", value: ventaData.numeroTimbrado, readOnly: true })] }), _jsxs("div", { className: "mb-4 mr-20 ml-20", children: [_jsx("label", { className: "block mb-2", children: "Cliente" }), _jsx("select", { className: "w-full p-2 border rounded", value: ventaData.cliente, onChange: e => {
                                    const clienteSeleccionado = clientes.find(cliente => cliente.nombreCliente === e.target.value);
                                    setVentaData({ ...ventaData, cliente: e.target.value, ruccliente: clienteSeleccionado.rucCliente });
                                }, children: clientes.map(cliente => (_jsx("option", { value: cliente.nombreCliente, children: cliente.nombreCliente }, cliente._id))) })] }), _jsxs("div", { className: "mb-4 mr-20 ml-20", children: [_jsx("label", { className: "block mb-2", children: "RUC EMPRESA" }), _jsx("input", { type: "text", placeholder: 'RUCEMPRESA', className: "w-full p-2 border rounded", value: ventaData.rucempresa, readOnly: true })] }), _jsxs("div", { className: "mb-4 mr-20 ml-20", children: [_jsx("label", { className: "block mb-2", children: "Comercial" }), _jsx("input", { type: "text", placeholder: "Libreria Ejemplo", className: "w-full p-2 border rounded", value: ventaData.comercial, readOnly: true })] })] }), _jsx("div", { className: 'flex justify-center', children: _jsx(Button, { className: "border-gray-300", onClick: () => setShowModalProductos(true), children: "Seleccionar Productos" }) }), _jsxs("div", { className: "flex justify-center mt-4", children: [_jsx("input", { type: "text", placeholder: "Buscar por c\u00F3digo de barra", className: "p-2 border rounded", value: codigoBarra, onChange: (e) => setCodigoBarra(e.target.value), onKeyPress: handleKeyPress }), _jsx("button", { className: "ml-2 bg-blue-500 text-white p-2 rounded", onClick: buscarProductoPorCodigoBarra, children: "Buscar" })] }), showModalProductos && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4 border-b", children: "Seleccionar Productos" }), _jsx("div", { className: "overflow-y-auto max-h-64 border border-gray-300", children: productos.map(producto => (_jsx("div", { className: "mb-2 ", children: _jsxs("div", { className: "flex justify-between items-center ", children: [_jsxs("span", { children: [producto.nombreProducto, " - Gs.", producto.precioVenta] }), _jsx("button", { className: "bg-green-500 text-white p-1 rounded", onClick: () => handleSelectProducto(producto), children: "Agregar" })] }) }, producto._id))) }), _jsx("button", { className: "mt-4 bg-red-500 text-white p-2 rounded", onClick: () => setShowModalProductos(false), children: "Cerrar" })] }) })), showModalAlerta && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Alerta" }), _jsx("p", { children: "El c\u00F3digo de barra no existe. Pruebe con otro producto." }), _jsx("button", { className: "mt-4 bg-red-500 text-white p-2 rounded", onClick: () => setShowModalAlerta(false), children: "Cerrar" })] }) })), _jsx("h2", { className: "text-xl font-bold mt-6 mb-4 text-center", children: "Productos Seleccionados" }), _jsx("div", { className: "overflow-x-auto max-h-60", children: _jsxs("table", { className: "min-w-full bg-white", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2", children: "Producto" }), _jsx("th", { className: "px-4 py-2", children: "Precio Unitario" }), _jsx("th", { className: "px-4 py-2", children: "Iva" }), _jsx("th", { className: "px-4 py-2", children: "Cantidad" }), _jsx("th", { className: "px-4 py-2", children: "Acciones" })] }) }), _jsx("tbody", { children: productosSeleccionados.map(p => (_jsxs("tr", { children: [_jsx("td", { className: "border px-4 py-2", children: p.producto.nombreProducto }), _jsxs("td", { className: "border px-4 py-2", children: ["Gs.", p.producto.precioVenta] }), _jsxs("td", { className: "border px-4 py-2 font-bold", children: ["IVA", p.producto.Iva] }), _jsx("td", { className: "border px-4 py-2 w-[10%] ", children: _jsx("input", { type: "number", min: "1", className: "w-full p-2 border rounded text-center", value: p.cantidad, onChange: e => handleCantidadChange(p.producto._id, parseInt(e.target.value)) }) }), _jsx("td", { className: "border pt-3 pb-3 flex justify-center align-middle items-center", children: _jsx("button", { className: "bg-red-500 text-white p-1 rounded", onClick: () => handleRemoveProducto(p.producto._id), children: "Eliminar" }) })] }, p.producto._id))) })] }) }), _jsxs("div", { className: "mt-4 flex justify-between", children: [_jsxs("h3", { className: "text-xl font-bold", children: ["Total: Gs.", totalVenta.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] }), _jsxs("h3", { className: "text-xl font-bold", children: ["IVA 10%: Gs.", iva10.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] }), _jsxs("h3", { className: "text-xl font-bold", children: ["IVA 5%: Gs.", iva5.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }), _jsx("div", { className: 'flex justify-center', children: _jsx("button", { className: "mt-6 border-gray-300", onClick: handleSubmitVenta, children: "Crear Venta" }) }), showModalCobranza && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Cobranza" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "Precio Venta" }), _jsxs("div", { className: "p-2 border rounded", children: ["Gs.", totalVenta.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "Dinero del Cliente" }), _jsx("input", { type: "text", className: "w-full p-2 border rounded", value: dineroCliente.toLocaleString('es'), onChange: e => setDineroCliente(parseFloat(e.target.value.replace(/\D/g, ''))) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "Vuelto / Cambio" }), _jsxs("div", { className: "p-2 border rounded", children: ["Gs.", vuelto.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] }), _jsx("button", { className: "bg-green-500 text-white p-2 rounded", onClick: handleConfirmarVenta, children: "Confirmar Venta" }), _jsx("button", { className: "mt-4 bg-red-500 text-white p-2 rounded", onClick: () => setShowModalCobranza(false), children: "Cancelar" })] }) })), showModalTicket && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Ticket de Compra" }), _jsx("div", { style: { width: '100%', height: '100%' }, children: _jsx(BlobProvider, { document: _jsx(TicketPDF, { venta: ventaRealizada }), children: ({ blob, url, loading, error }) => {
                                    if (blob) {
                                        return (_jsxs("div", { children: [_jsx("iframe", { src: url, style: { width: '100%', height: '100%' } }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { className: "bg-green-500 text-white p-1 rounded mt-4", onClick: () => printDocument(blob), children: "Imprimir" }), _jsx("button", { className: "bg-green-500 text-white p-1 rounded mt-4", onClick: () => setShowModalTicket(false), children: "Cerrar" })] })] }));
                                    }
                                    else if (loading) {
                                        return _jsx("div", { children: "Cargando..." });
                                    }
                                    else if (error) {
                                        return _jsx("div", { children: "Error al generar el PDF" });
                                    }
                                } }) })] }) }))] })) : (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("h1", { className: "text-2xl font-bold text-center", children: "No hay caja abierta para el d\u00EDa de hoy" }) })));
};
export default Ventas;
