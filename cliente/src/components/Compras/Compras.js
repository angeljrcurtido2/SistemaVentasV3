import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import InputText from '../Productos/InputText';
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import Button from '../Productos/Button';
import CrearProductos from '../Productos/Productos';
import { GrCheckboxSelected } from "react-icons/gr";
import { BsInfoCircleFill } from "react-icons/bs";
import axios from 'axios';
const Compras = () => {
    const [proveedor, setProveedor] = useState('');
    const [productoId, setProductoId] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalProductos, setShowModalProductos] = useState(false);
    const [precioCompra, setPrecioCompra] = useState('');
    const [facturaNumero2, setFacturaNumero2] = useState('');
    // Agregar estado para las cajas abiertas
    const [cajasAbiertas, setCajasAbiertas] = useState([]);
    const [Telefono, setTelefono] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [compras2, setCompras2] = useState([]);
    const [facturaNumero, setFacturaNumero] = useState('');
    const [showModalCompras, setShowModalCompras] = useState(false);
    const [showModalCrearProducto, setShowModalCrearProducto] = useState(false);
    const productsPerPage = 5;
    const [compras, setCompras] = useState([]); // Nuevo estado para almacenar las compras
    // Crea un nuevo estado para los detalles del proveedor
    const [proveedorDetalles, setProveedorDetalles] = useState({ proveedor: '', facturaNumero: '', Telefono: '', Direccion: '' });
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
    // Actualiza el estado proveedorDetalles cuando cambie alguno de sus valores
    useEffect(() => {
        setProveedorDetalles({
            proveedor,
            facturaNumero,
            Telefono,
            Direccion
        });
    }, [proveedor, facturaNumero, Telefono, Direccion]);
    const handleAddProduct = () => {
        // Verifica que todos los campos estén llenos
        if (!productoId || !nombreProducto || !cantidad || !precioCompra) {
            alert('Por favor, completa todos los campos del producto');
            return;
        }
        const producto = {
            productoId,
            nombreProducto,
            cantidad,
            precioCompra
        };
        setCompras(prevCompras => [...prevCompras, producto]);
        setProductoId('');
        setNombreProducto('');
        setCantidad('');
        setPrecioCompra('');
    };
    const handleSubmit = async () => {
        // Verifica que todos los campos estén llenos
        if (!proveedorDetalles.proveedor || !proveedorDetalles.facturaNumero || !proveedorDetalles.Telefono || !proveedorDetalles.Direccion || compras.length === 0) {
            alert('Por favor, completa todos los campos');
            return;
        }
        try {
            // Combina los productos y los detalles del proveedor en un solo objeto
            const data = { productos: compras, ...proveedorDetalles };
            const response = await axios.post('https://server-1-r6r7.onrender.com/compras', data);
            console.log(response.data);
            alert('Compras realizadas con éxito');
            setCompras([]); // Vaciamos la lista de productos
            setProveedorDetalles({ proveedor: '', facturaNumero: '', Telefono: '', Direccion: '' }); // Vaciamos los detalles del proveedor
        }
        catch (error) {
            console.error('Error al realizar las compras:', error);
        }
    };
    const handleShowModal = async () => {
        try {
            const response = await axios.get('https://server-1-r6r7.onrender.com/proveedor');
            console.log(response.data);
            setProveedores(response.data);
            setShowModal(true);
        }
        catch (error) {
            console.error('Error al obtener los proveedores:', error);
        }
    };
    const handleShowModalProductos = async () => {
        try {
            const response = await axios.get('https://server-1-r6r7.onrender.com/productos');
            console.log(response.data);
            setProductos(response.data);
            setShowModalProductos(true);
        }
        catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };
    // Define la función que se ejecuta al pulsar el botón
    const handleShowModalCompras = async () => {
        try {
            const response = await axios.get('https://server-1-r6r7.onrender.com/compras');
            setCompras2(response.data);
            setShowModalCompras(true);
        }
        catch (error) {
            console.error('Error al obtener las compras:', error);
        }
    };
    //Eliminar Producto Agregado 
    const handleDeleteProduct = (index) => {
        const newCompras = [...compras];
        newCompras.splice(index, 1);
        setCompras(newCompras);
    };
    // Define la función que se ejecuta al cerrar el modal
    const handleCloseModalCompras = () => {
        setShowModalCompras(false);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCloseModalProductos = () => {
        setShowModalProductos(false);
    };
    const handleDeleteCompras = async (id) => {
        try {
            await axios.delete(`https://server-1-r6r7.onrender.com/compras/${id}`);
            //Actualizar la lista de compras despues de eliminar
            handleShowModalCompras();
        }
        catch (error) {
            console.error('Error al eliminar la compra', error);
        }
    };
    // Divide los productos en páginas
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
    // Define la cantidad de compras por página
    const comprasPerPage = 5;
    //Filtrar por numero de factura
    const handleFacturaNumeroChange = (event) => {
        setFacturaNumero(event.target.value);
    };
    // Aplica el filtro a todas las compras
    const allFilteredCompras = useMemo(() => {
        if (facturaNumero === '') {
            return compras2;
        }
        else {
            return compras2.filter(compra => compra.facturaNumero === facturaNumero);
        }
    }, [facturaNumero, compras2]);
    // Divide las compras en páginas
    const indexOfLastCompra = currentPage * comprasPerPage;
    const indexOfFirstCompra = indexOfLastCompra - comprasPerPage;
    const filteredCompras = allFilteredCompras.slice(indexOfFirstCompra, indexOfLastCompra);
    return (hayCajaAbiertaHoy ? (_jsxs("form", { onSubmit: (e) => { e.preventDefault(); handleSubmit(); }, children: [_jsx("h1", { className: "text-4xl font-bold text-center text-gray-800 py-2 border-b w-full ", children: "Crear Compras" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 ml-9 mr-9", children: [_jsxs("div", { className: 'flex', children: [_jsx("div", { className: 'flex-1', children: _jsx(InputText, { type: "text", label: 'Proveedor', value: proveedor, onChange: (e) => setProveedor(e.target.value), placeholder: "Proveedor", className: "flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" // Añade esta línea
                                 }) }), _jsx(Button, { className: 'mt-6', type: "button", onClick: handleShowModal, children: _jsx(GrCheckboxSelected, {}) })] }), _jsxs("div", { className: 'flex', children: [_jsx("div", { className: 'flex-1', children: _jsx(InputText, { type: "text", label: 'Producto', value: nombreProducto, readOnly // Asegúrate de que el usuario no pueda modificar este campo
                                    : true, placeholder: "Nombre del producto" }) }), _jsx(Button, { className: 'mt-6', type: "button", onClick: handleShowModalProductos, children: _jsx(GrCheckboxSelected, {}) })] }), _jsxs("div", { className: 'flex', children: [_jsx(InputText, { type: "number", label: "Cantidad", value: cantidad, onChange: (e) => setCantidad(Number(e.target.value)), placeholder: "Cantidad" }), _jsx("button", { type: 'button', className: 'ml-2 mt-6 shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCantidad(''), children: _jsx(AiFillDelete, {}) })] }), _jsxs("div", { className: 'flex', children: [_jsx(InputText, { type: "number", label: "Precio Compra", value: precioCompra, onChange: (e) => setPrecioCompra(Number(e.target.value)), placeholder: "Precio de compra" }), _jsx("button", { type: 'button', className: 'ml-2 mt-6 shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setPrecioCompra(''), children: _jsx(AiFillDelete, {}) })] }), _jsx(InputText, { type: "text", label: "N\u00FAmero de factura", value: facturaNumero, onChange: (e) => setFacturaNumero(e.target.value), placeholder: "N\u00FAmero de factura" }), _jsx(InputText, { type: "text", label: "Tel\u00E9fono", value: Telefono, onChange: (e) => setTelefono(e.target.value), placeholder: "Tel\u00E9fono del proveedor por cualquier eventualidad" }), _jsx(InputText, { type: "text", label: "Direcci\u00F3n", value: Direccion, onChange: (e) => setDireccion(e.target.value), placeholder: "Direcci\u00F3n" })] }), _jsxs("div", { className: "flex justify-center", children: [_jsx(Button, { type: "button", onClick: handleAddProduct, children: "Agregar Producto" }), _jsx(Button, { className: 'mr-5 ml-5', type: "submit", children: "Realizar Compras" }), _jsx(Button, { onClick: handleShowModalCompras, type: "button", className: 'mr-4', children: "Ver Compras" })] }), _jsx("div", { className: "flex justify-center items-center mt-9 font-bold ", children: _jsxs("table", { className: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ", children: [_jsx("thead", { className: 'text-xs text-gray-700 uppercase dark:text-gray-400 font-bold text-center ', children: _jsxs("tr", { children: [_jsx("th", { className: 'px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200', children: "N\u00B0" }), _jsx("th", { className: 'px-6 py-3', children: "Nombre del Producto" }), _jsx("th", { className: 'px-6 py-3 bg-gray-50 dark:bg-gray-800', children: "Cantidad" }), _jsx("th", { className: 'px-6 py-3', children: "Precio de Compra" }), _jsx("th", { className: 'px-6 py-3 bg-gray-50 dark:bg-gray-800 text-xs', children: "Total" }), _jsx("th", { className: 'px-6 py-3', children: "Acci\u00F3n" })] }) }), _jsxs("tbody", { className: 'border', children: [compras.map((compra, index) => (_jsxs("tr", { children: [_jsx("td", { className: 'text-center', children: index + 1 }), _jsx("td", { className: 'border', children: compra.nombreProducto }), _jsx("td", { className: 'border', children: compra.cantidad }), _jsx("td", { className: 'border', children: compra.precioCompra }), _jsx("td", { className: 'border', children: compra.precioCompra * compra.cantidad }), _jsx("td", { className: 'border text-center pb-2', children: _jsx(Button, { onClick: () => handleDeleteProduct(index), type: 'button', children: _jsx(AiFillDelete, {}) }) })] }, index))), _jsxs("tr", { children: [_jsx("td", { className: 'text-xl border-t-2 border-gray-100 text-center', colSpan: "4", children: "Total" }), _jsx("td", { className: ' text-xl', children: compras.reduce((total, compra) => total + compra.precioCompra * compra.cantidad, 0) })] })] })] }) }), showModal && (_jsx("div", { className: "modal-background", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'border-b font-bold text-center text-', children: "Proveedores" }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "N\u00B0:" }), _jsx("th", { className: "border-r", children: "Nombre:" }), _jsx("th", { className: "border-r", children: "RUC:" }), _jsx("th", { className: "border-r", children: "Direcci\u00F3n:" }), _jsx("th", { className: "border-r", children: "Tel\u00E9fono:" }), _jsx("th", { className: 'border-r', children: "Accion" })] }) }), _jsx("tbody", { children: proveedores.map((proveedor, index) => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: index + 1 }), _jsx("td", { className: "border", children: proveedor.nombreEmpresa }), _jsx("td", { className: "border", children: proveedor.ruc }), _jsx("td", { className: "border", children: proveedor.direccion }), _jsx("td", { className: "border", children: proveedor.telefono }), _jsxs("td", { children: [" ", _jsx(Button, { type: 'button', onClick: () => {
                                                            setProveedor(proveedor.nombreEmpresa);
                                                            setShowModal(false);
                                                        }, children: "Seleccionar" })] })] }, proveedor._id))) })] }), _jsx(Button, { onClick: handleCloseModal, children: "Cerrar" })] }) })), showModalProductos && (_jsx("div", { className: "modal-background", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'border-b font-bold text-center text-', children: "Productos" }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "N\u00B0:" }), _jsx("th", { className: "border-r", children: "Nombre:" }), _jsx("th", { className: "border-r", children: "Categoria:" }), _jsx("th", { className: "border-r", children: "P.Compra:" }), _jsx("th", { className: "border-r", children: "P.Venta:" }), _jsx("th", { className: 'border-r', children: "F.Venc.:" }), _jsx("th", { className: 'border-r', children: "S.Min.:" }), _jsx("th", { className: 'border-r', children: "S.Act.:" }), _jsx("th", { className: 'border-r', children: "Iva.:" }), _jsx("th", { className: 'border-r', children: "Proveedor.:" }), _jsx("th", { className: 'border-r', children: "U.Medida:" }), _jsx("th", { className: 'border-r', children: "Acciones:" })] }) }), _jsx("tbody", { children: currentProducts.map((producto, index) => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: index + 1 }), _jsx("td", { className: "border", children: producto.nombreProducto }), _jsx("td", { className: "border", children: producto.categoria }), _jsx("td", { className: "border", children: producto.precioCompra }), _jsx("td", { className: "border", children: producto.precioVenta }), _jsx("td", { className: "border", children: producto.fechaVencimiento }), _jsx("td", { className: "border", children: producto.stockMinimo }), _jsx("td", { className: "border", children: producto.stockActual }), _jsx("td", { className: "border", children: producto.Iva }), _jsx("td", { className: "border", children: producto.proveedor }), _jsx("td", { className: "border", children: producto.unidadMedida }), _jsx(Button, { type: 'button', onClick: () => {
                                                    setProductoId(producto._id);
                                                    setNombreProducto(producto.nombreProducto);
                                                    setShowModalProductos(false);
                                                }, children: "Seleccionar" })] }, producto._id))) })] }), _jsxs("div", { className: "flex justify-center", children: [_jsx("button", { type: 'button', className: 'shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage - 1), disabled: currentPage === 1, children: _jsx(IoArrowUndoSharp, {}) }), _jsx("span", { className: 'font-bold text-xl mt-3', children: currentPage }), _jsx("button", { type: 'button', className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage + 1), disabled: currentPage === Math.ceil(productos.length / productsPerPage), children: _jsx(IoArrowRedo, {}) })] }), _jsx(Button, { onClick: handleCloseModalProductos, children: "Cerrar" }), _jsx(Button, { onClick: () => setShowModalCrearProducto(true), children: "CrearProductoNuevo" })] }) })), showModalCrearProducto && (_jsx("div", { className: "modal-background", onClick: () => setShowModalCrearProducto(false), children: _jsx("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: _jsx(CrearProductos, { onClose: () => setShowModalCrearProducto(false) }) }) })), showModalCompras && (_jsx("div", { className: "modal-background", onClick: () => setShowModalCompras(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'border-b font-bold text-center text-', children: "Compras" }), _jsxs("div", { className: 'flex', children: [_jsx("div", { className: 'flex-1', children: _jsx(InputText, { id: "facturaNumero", label: "FacturaNumero", value: facturaNumero, onChange: handleFacturaNumeroChange }) }), _jsx(Button, { children: _jsx(BsInfoCircleFill, {}) })] }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { children: "Proveedor" }), _jsx("th", { children: "FacturaNumero" }), _jsx("th", { children: "Producto" }), _jsx("th", { children: "Cantidad" }), _jsx("th", { children: "Precio de compra" }), _jsx("th", { children: "Total de la compra" }), _jsx("th", { children: "Fecha" }), _jsx("th", { children: "Accion" })] }) }), _jsx("tbody", { children: filteredCompras.map(compra => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: compra.proveedor }), _jsx("td", { className: "border", children: compra.facturaNumero }), _jsx("td", { className: "border", children: compra.nombreProducto }), _jsx("td", { className: "border", children: compra.cantidad }), _jsx("td", { className: "border", children: compra.precioCompra }), _jsx("td", { className: "border", children: compra.precioCompraTotal }), _jsx("td", { className: "border", children: new Date(compra.fecha).toLocaleDateString() }), _jsx("td", { className: "border", children: _jsx(Button, { onClick: () => handleDeleteCompras(compra._id), type: 'button', children: _jsx(AiFillDelete, {}) }) })] }, compra._id))) })] }), _jsxs("div", { className: "flex justify-center", children: [_jsx("button", { type: 'button', className: 'shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage - 1), disabled: currentPage === 1, children: _jsx(IoArrowUndoSharp, {}) }), _jsx("span", { className: 'font-bold text-xl mt-3', children: currentPage }), _jsx("button", { type: 'button', className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage + 1), disabled: currentPage === Math.ceil(compras2.length / comprasPerPage), children: _jsx(IoArrowRedo, {}) })] })] }) }))] })) : (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("h1", { className: "text-2xl font-bold text-center", children: "No hay caja abierta para el d\u00EDa de hoy" }) })));
};
export default Compras;
