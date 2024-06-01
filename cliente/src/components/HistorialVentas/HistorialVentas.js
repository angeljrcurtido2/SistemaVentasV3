import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BlobProvider } from '@react-pdf/renderer';
import TicketPDF from '../Ventas/TicketPdf';
import { IoArrowUndoSharp, IoArrowRedo } from "react-icons/io5";
const HistorialVentas = () => {
    const [showModalDetalles, setShowModalDetalles] = useState(false);
    const [showModalTicket, setShowModalTicket] = useState(false);
    const [detalleVenta, setDetalleVenta] = useState(null);
    const [ventas, setVentas] = useState([]);
    const [ventaRealizada, setVentaRealizada] = useState(null);
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [numeroFacturaFilter, setNumeroFacturaFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ventasPerPage = 5;
    useEffect(() => {
        // Función para obtener las ventas
        const fetchVentas = async () => {
            try {
                const response = await axios.get('https://server-1-r6r7.onrender.com/ventas');
                setVentas(response.data);
            }
            catch (error) {
                console.error('Error al obtener las ventas:', error);
            }
        };
        fetchVentas();
    }, []);
    // Función para abrir el modal y mostrar los detalles de la venta
    const openModal = (venta) => {
        setDetalleVenta(venta);
        setShowModalDetalles(true);
    };
    // Función para cerrar el modal
    const closeModal = () => {
        setShowModalDetalles(false);
    };
    // Función para anular una venta
    const anularVenta = async (id) => {
        try {
            await axios.put(`https://server-1-r6r7.onrender.com/ventas/anular/${id}`);
            // Actualizar el estado de la venta en el frontend
            setVentas(ventas.map((venta) => venta._id === id ? { ...venta, estado: 'anulado' } : venta));
        }
        catch (error) {
            console.error('Error al anular la venta:', error);
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
    // Función para filtrar las ventas
    useEffect(() => {
        let filtered = ventas;
        if (numeroFacturaFilter) {
            filtered = filtered.filter(venta => venta.numeroFactura === numeroFacturaFilter);
        }
        if (estadoFilter) {
            filtered = filtered.filter(venta => venta.estado === estadoFilter);
        }
        if (startDate && endDate) {
            filtered = filtered.filter(venta => {
                const ventaDate = new Date(venta.fechaVenta);
                return ventaDate >= new Date(startDate) && ventaDate <= new Date(endDate);
            });
        }
        setFilteredVentas(filtered);
    }, [ventas, numeroFacturaFilter, estadoFilter, startDate, endDate]);
    // Función para abrir el modal de ticket y establecer la venta que se va a imprimir
    const openModalTicket = (venta) => {
        setVentaRealizada(venta);
        setShowModalTicket(true);
    };
    // Divide las ventas en páginas
    const indexOfLastVenta = currentPage * ventasPerPage;
    const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
    const currentVentas = filteredVentas.slice(indexOfFirstVenta, indexOfLastVenta);
    return (_jsxs("div", { children: [_jsx("h1", { className: "font-bold text-center border-b", children: "HISTORIAL VENTAS" }), _jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("div", { children: _jsx("input", { type: "text", placeholder: "N\u00FAmero de Factura", value: numeroFacturaFilter, onChange: (e) => setNumeroFacturaFilter(e.target.value) }) }), _jsx("div", { children: _jsxs("select", { value: estadoFilter, onChange: (e) => setEstadoFilter(e.target.value), children: [_jsx("option", { value: "", children: "Todos" }), _jsx("option", { value: "activo", children: "Activo" }), _jsx("option", { value: "anulado", children: "Anulado" })] }) }), _jsxs("div", { children: [_jsx("input", { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) }), _jsx("span", { children: " - " }), _jsx("input", { type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "N\u00FAmero de Factura" }), _jsx("th", { className: "border-r", children: "Fecha de Venta" }), _jsx("th", { className: "border-r", children: "Comercial" }), _jsx("th", { className: "border-r", children: "Total" }), _jsx("th", { className: "border-r", children: "Estado" }), _jsx("th", { className: "border-r", children: "Acciones" })] }) }), _jsx("tbody", { className: 'text-center', children: currentVentas.map((venta) => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: venta.numeroFactura }), _jsx("td", { className: "border", children: new Date(venta.fechaVenta).toLocaleString() }), _jsx("td", { className: "border", children: venta.comercial }), _jsxs("td", { className: "border", children: ["Gs.", venta.PrecioVentaTotal] }), _jsx("td", { className: "border", children: venta.estado }), _jsxs("td", { className: "border", children: [_jsx("button", { className: 'mr-4 mt-2 mb-2', onClick: () => openModal(venta), children: "Detalles" }), _jsx("button", { onClick: () => anularVenta(venta._id), disabled: venta.estado === 'anulado', children: "Anular" }), _jsx("button", { type: "button", className: "ml-3", onClick: () => openModalTicket(venta), children: "Imprimir Ticket" })] })] }, venta._id))) })] }), _jsxs("div", { className: "flex justify-center", children: [_jsx("button", { type: 'button', className: 'shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage - 1), disabled: currentPage === 1, children: _jsx(IoArrowUndoSharp, {}) }), _jsx("span", { className: 'font-bold text-xl mt-3', children: currentPage }), _jsx("button", { type: 'button', className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage + 1), disabled: currentPage === Math.ceil(filteredVentas.length / ventasPerPage), children: _jsx(IoArrowRedo, {}) })] }), showModalDetalles && detalleVenta && (_jsx("div", { className: "modal-background", onClick: () => setShowModalDetalles(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h2", { className: "font-bold text-center", children: "Detalles de la Venta" }), _jsxs("p", { children: ["N\u00FAmero de Factura: ", detalleVenta.numeroFactura] }), _jsxs("p", { children: ["Fecha de Venta: ", new Date(detalleVenta.fechaVenta).toLocaleString()] }), _jsxs("p", { children: ["Total: $", detalleVenta.PrecioVentaTotal] }), _jsxs("p", { children: ["Estado: ", detalleVenta.estado] }), _jsx("h3", { className: "text-center font-bold", children: "Productos:" }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "Producto" }), _jsx("th", { className: "border-r", children: "Cantidad" }), _jsx("th", { className: "border-r", children: "Precio" })] }) }), _jsx("tbody", { className: 'text-center', children: detalleVenta.productos.map((producto) => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: producto.nombreProducto }), _jsx("td", { className: "border", children: producto.cantidad }), _jsxs("td", { className: "border", children: ["$", producto.precioVenta] })] }, producto._id))) })] }), _jsxs("p", { className: "text-center font-bold", children: ["Total: ", detalleVenta.PrecioVentaTotal] }), _jsxs("p", { children: ["Iva 10%: ", detalleVenta.Iva10.toFixed(2)] }), _jsxs("p", { children: ["Iva 5%: ", detalleVenta.Iva5.toFixed(2)] })] }) })), showModalTicket && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Ticket de Compra" }), _jsx("div", { style: { width: '100%', height: '100%' }, children: _jsx(BlobProvider, { document: _jsx(TicketPDF, { venta: ventaRealizada }), children: ({ blob, url, loading, error }) => {
                                    if (blob) {
                                        return (_jsxs("div", { children: [_jsx("iframe", { src: url, style: { width: '100%', height: '100%' } }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { className: "bg-green-500 text-white p-1 rounded mt-4", onClick: () => printDocument(blob), children: "Imprimir" }), _jsx("button", { className: "bg-green-500 text-white p-1 rounded mt-4", onClick: () => setShowModalTicket(false), children: "Cerrar" })] })] }));
                                    }
                                    else if (loading) {
                                        return _jsx("div", { children: "Cargando..." });
                                    }
                                    else if (error) {
                                        return _jsx("div", { children: "Error al generar el PDF" });
                                    }
                                } }) })] }) }))] }));
};
export default HistorialVentas;
