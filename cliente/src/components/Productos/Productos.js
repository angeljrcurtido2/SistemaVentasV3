import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import fondo from '../../assets/fondo4.jpg';
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaBookReader } from "react-icons/fa";
import { TiInfoOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import './style.css';
const Productos = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterProductName, setFilterProductName] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [highlightExpired, setHighlightExpired] = useState(false);
    const [highlightLowStock, setHighlightLowStock] = useState(false);
    const [selectedIva, setSelectedIva] = useState('all');
    const navigate = useNavigate();
    useEffect(() => {
        let filtered = products;
        if (filterProductName) {
            filtered = filtered.filter(product => product.nombreProducto.toLowerCase().includes(filterProductName.toLowerCase()));
        }
        if (filterCategory) {
            filtered = filtered.filter(product => product.categoria.toLowerCase().includes(filterCategory.toLowerCase()));
        }
        if (highlightExpired) {
            filtered = filtered.filter(product => new Date() > new Date(product.fechaVencimiento));
        }
        if (highlightLowStock) {
            filtered = filtered.filter(product => product.stockActual <= product.stockMinimo);
        }
        if (selectedIva !== 'all') {
            filtered = filtered.filter(product => {
                let productIva = product.Iva;
                if (typeof productIva === 'string') {
                    productIva = productIva.replace('%', ''); // quitar el signo de porcentaje si existe
                }
                return productIva === selectedIva;
            });
        }
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [products, filterProductName, filterCategory, highlightExpired, highlightLowStock, selectedIva]);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const getProducts = async () => {
        const response = await fetch('https://server-1-r6r7.onrender.com/productos');
        const data = await response.json();
        setProducts(data);
    };
    useEffect(() => {
        getProducts();
    }, []);
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [Iva, setIva] = useState('');
    const [stockActual, setStockActual] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [codigoBarra, setCodigoBarra] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');
    const [categoria, setCategoria] = useState('Universal');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const getProveedores = async () => {
        const response = await fetch('https://server-1-r6r7.onrender.com/proveedor');
        const data = await response.json();
        setProveedores(data);
    };
    const getCategorias = async () => {
        const response = await fetch('https://server-1-r6r7.onrender.com/categorias');
        const data = await response.json();
        setCategorias(data);
    };
    useEffect(() => {
        getProveedores();
        getCategorias();
    }, []);
    const handleEdit = (_id) => {
        setSelectedProductId(_id);
        navigate(`/editarproductos/${_id}`);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const producto = {
            nombreProducto,
            codigoBarra,
            precioCompra: precioCompra === '' ? 0 : precioCompra,
            precioVenta: precioVenta === '' ? 0 : precioVenta,
            fechaVencimiento,
            stockMinimo: stockMinimo === '' ? 0 : stockMinimo,
            Iva,
            stockActual: stockActual === '' ? 0 : stockActual,
            ubicacion,
            proveedor,
            unidadMedida,
            categoria
        };
        // Verificar que los campos obligatorios estén completos
        if (!nombreProducto || !codigoBarra || fechaVencimiento === '' || Iva === '' || !ubicacion || !proveedor || !unidadMedida || !categoria) {
            alert('Todos los campos son obligatorios');
            return;
        }
        try {
            await axios.post('https://server-1-r6r7.onrender.com/productos', producto);
            alert('Producto creado con éxito');
            getProducts();
            setNombreProducto('');
            setCodigoBarra('');
            setPrecioCompra('');
            setPrecioVenta('');
            setFechaVencimiento('');
            setStockMinimo('');
            setIva('');
            setStockActual('');
            setUbicacion('');
            setProveedor('');
            setUnidadMedida('');
            setCategoria('');
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("form", { className: "w-full h-full", style: { backgroundImage: `url(${fondo})` }, children: [_jsx("h1", { className: "text-4xl font-bold text-center text-gray-800 py-2 border-b w-full ", children: "Crear Producto" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 ml-9 mr-9", children: [_jsxs("div", { className: "mb-5", children: [_jsx("label", { htmlFor: "nombreProducto", children: "Nombre del producto" }), _jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "text", id: "nombreProducto", value: nombreProducto, onChange: (e) => setNombreProducto(e.target.value) }), _jsx("label", { htmlFor: "nombreProducto", children: "Codigo de Barra del producto" }), _jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "text", id: "codigoBarra", value: codigoBarra, onChange: (e) => setCodigoBarra(e.target.value) }), _jsx("label", { htmlFor: "precioCompra", children: "Precio de compra" }), _jsxs("div", { className: "flex", children: [_jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "number", id: "precioCompra", value: precioCompra, onChange: (e) => setPrecioCompra(Number(e.target.value)) }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setPrecioCompra(''), children: _jsx(AiFillDelete, {}) })] }), _jsx("label", { htmlFor: "precioVenta", children: "Precio de venta" }), _jsxs("div", { className: 'flex', children: [_jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "number", id: "precioVenta", value: precioVenta, onChange: (e) => setPrecioVenta(Number(e.target.value)) }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setPrecioVenta(''), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { className: "mb-5", children: [_jsx("label", { htmlFor: "fechaVencimiento", children: "Fecha de vencimiento" }), _jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "date", id: "fechaVencimiento", value: fechaVencimiento, onChange: (e) => setFechaVencimiento(e.target.value) }), _jsx("label", { htmlFor: "stockMinimo", children: "Stock m\u00EDnimo" }), _jsxs("div", { className: 'flex', children: [_jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "number", id: "stockMinimo", value: stockMinimo, onChange: (e) => setStockMinimo(Number(e.target.value)) }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setStockMinimo(''), children: _jsx(AiFillDelete, {}) })] }), _jsxs("select", { className: "shadow-sm w-[20%] mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", onChange: (e) => setIva(e.target.value), id: "Iva", children: [_jsx("option", { value: 'all', children: "Iva" }), _jsx("option", { value: '10%', children: "10%" }), _jsx("option", { value: '5%', children: "5%" })] })] }), _jsxs("div", { className: "mb-5", children: [_jsx("label", { htmlFor: "stockActual", children: "Stock actual" }), _jsxs("div", { className: 'flex', children: [_jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "number", id: "stockMinimo", value: stockActual, onChange: (e) => setStockActual(Number(e.target.value)) }), _jsx("button", { type: 'button', className: 'ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ', onClick: () => setStockActual(''), children: _jsx(AiFillDelete, {}) })] }), _jsx("label", { htmlFor: "ubicacion", children: "Ubicaci\u00F3n" }), _jsx("input", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", type: "text", id: "ubicacion", value: ubicacion, onChange: (e) => setUbicacion(e.target.value) }), _jsxs("select", { className: "shadow-sm mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", id: "categoria", value: proveedor, onChange: (e) => setProveedor(e.target.value), children: [_jsx("option", { value: "", children: "Selecciona un Proveedor" }), proveedores.map((proveedor) => (_jsx("option", { value: proveedor.nombreEmpresa, children: proveedor.nombreEmpresa }, proveedor._id)))] })] }), _jsx("div", { className: "mb-5", children: _jsxs("select", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", name: "unidadMedida", id: "unidadMedida", value: unidadMedida, onChange: (e) => setUnidadMedida(e.target.value), children: [_jsx("option", { value: "", children: "Selecciona Unidad de Medida:" }), _jsx("option", { value: "Unidad", children: "Unidad" }), _jsx("option", { value: "Kilogramo", children: "Kilogramo" }), _jsx("option", { value: "Litro", children: "Litro" })] }) }), _jsx("div", { className: "mb-5", children: _jsxs("select", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", id: "categoria", value: categoria, onChange: (e) => setCategoria(e.target.value), children: [_jsx("option", { value: "", children: "Selecciona una Categor\u00EDa" }), categorias.map((categoria) => (_jsx("option", { value: categoria.nombre, children: categoria.nombre }, categoria._id)))] }) })] }), _jsxs("div", { className: "flex justify-center", children: [_jsx("button", { className: "shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none", type: "button", onClick: handleSubmit, children: "Crear producto" }), _jsx("button", { className: "shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4", type: "button", onClick: () => setShowModal(true), children: "Ver Productos" })] }), showModal && (_jsx("div", { className: "modal-background", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("input", { type: "text", placeholder: "Filtrar por nombre de producto", onChange: (e) => setFilterProductName(e.target.value) }), _jsx("input", { type: "text", placeholder: "Filtrar por categor\u00EDa", onChange: (e) => setFilterCategory(e.target.value) }), _jsxs("div", { className: 'flex', children: [_jsxs("label", { className: "inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", onChange: (e) => setHighlightExpired(e.target.checked) }), _jsx("div", { className: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600" }), _jsx("span", { className: "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300", children: "Vencidos" })] }), _jsxs("label", { className: "inline-flex items-center cursor-pointer ml-4", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", onChange: (e) => setHighlightLowStock(e.target.checked) }), _jsx("div", { className: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-300" }), _jsx("span", { className: "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300", children: "Stock M\u00EDnimo" })] }), _jsxs("select", { onChange: (e) => setSelectedIva(e.target.value), children: [_jsx("option", { value: "all", children: "Iva" }), _jsx("option", { value: "5", children: "5%" }), _jsx("option", { value: "10", children: "10%" })] }), _jsx("div", { className: 'mt-1', children: _jsx(TiInfoOutline, { className: "ml-2 cursor-pointer", onClick: () => setShowModal2(true) }) })] })] }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "N\u00B0" }), _jsx("th", { className: "border-r", children: "Producto" }), _jsx("th", { className: "border-r", children: "Categoria" }), _jsx("th", { className: "border-r", children: "P.Compra" }), _jsx("th", { className: "border-r", children: "P.Venta" }), _jsx("th", { className: "border-r", children: "Fecha Venc" }), _jsx("th", { className: "border-r", children: "Stock Min" }), _jsx("th", { className: "border-r", children: "Stock Act" }), _jsx("th", { className: "border-r", children: "Iva" }), _jsx("th", { className: "border-r", children: "Ubicaci\u00F3n" }), _jsx("th", { className: "border-r", children: "Proveedor" }), _jsx("th", { className: "border-r", children: "Un.Medida" }), _jsx("th", { className: "border-r", children: "Acciones" })] }) }), _jsx("tbody", { className: 'border', children: currentProducts.map((product, index) => {
                                        const date = new Date(product.fechaVencimiento);
                                        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                        const isExpired = new Date() > date;
                                        const isLowStock = product.stockActual <= product.stockMinimo;
                                        return (_jsxs("tr", { className: `${isExpired && highlightExpired ? 'bg-red-300' : ''} ${isLowStock && highlightLowStock ? 'bg-yellow-300' : ''}`, children: [_jsx("td", { className: "border", children: index + 1 }), _jsx("td", { className: "border", children: product.nombreProducto }), _jsx("td", { className: "border", children: product.categoria }), _jsx("td", { className: "border", children: product.precioCompra }), _jsx("td", { className: "border", children: product.precioVenta }), _jsx("td", { className: "border", children: formattedDate }), _jsx("td", { className: "border", children: product.stockMinimo }), _jsx("td", { className: "border", children: product.stockActual }), _jsx("td", { className: "border", children: product.Iva }), _jsx("td", { className: "border", children: product.ubicacion }), _jsx("td", { className: "border", children: product.proveedor }), _jsx("td", { className: "border", children: product.unidadMedida }), _jsx("td", { className: "border", children: _jsx("button", { className: "shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-70 transition-all duration-200 hover:border-none ml-4 mr-4 mt-1 mb-1 text-sm", type: 'button', onClick: () => handleEdit(product._id), children: _jsx(FiEdit, {}) }) })] }, product._id));
                                    }) })] }), _jsxs("div", { className: "flex justify-center", children: [_jsx("button", { type: 'button', className: 'shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage - 1), disabled: currentPage === 1, children: _jsx(IoArrowUndoSharp, {}) }), _jsx("span", { className: 'font-bold text-xl mt-3', children: currentPage }), _jsx("button", { type: 'button', className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setCurrentPage(currentPage + 1), disabled: currentPage === Math.ceil(filteredProducts.length / productsPerPage), children: _jsx(IoArrowRedo, {}) })] })] }) })), showModal2 && (_jsx("div", { className: "modal-background", onClick: () => setShowModal2(false), children: _jsxs("div", { className: "modal-content flex flex-col items-center justify-center", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'font-bold border-b w-full text-center mb-2', children: "Informaciones" }), _jsxs("div", { className: 'items-start', children: [_jsxs("p", { className: "mb-4 flex", children: [_jsx(FaBookReader, { className: 'mt-1 mr-2' }), "La opci\u00F3n 'vencido' al activar va resaltar en rojo todos productos con fecha de vencimiento cumplidos y pasados."] }), _jsxs("p", { className: "mb-4 flex", children: [_jsx(FaBookReader, { className: 'mt-1 mr-2' }), "La opci\u00F3n 'Stock Minimo' al activar va resaltar en amarillo todos productos con stock minimos cumplidos y pasados."] }), _jsxs("p", { className: "mb-4 flex", children: [_jsx(FaBookReader, { className: 'mt-1 mr-2' }), "La opci\u00F3n 'Iva' al seleccionar un valor va filtrar los productos con el IVA seleccionado."] })] }), _jsx("button", { className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', type: 'button', onClick: () => setShowModal2(false), children: "Cerrar" })] }) }))] }));
};
export default Productos;
