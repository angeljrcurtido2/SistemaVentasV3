import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import fondo from '../../assets/fondo4.jpg';
import InputText from './InputText';
const EditarProductos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null); // Se usa any para evitar problemas con productos sin codigoBarra
    console.log('Probando' + id);
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const res = await axios.get(`https://server-1-r6r7.onrender.com/productos/${id}`);
                // Si el producto no tiene codigoBarra, se añade un campo vacío
                const productoData = res.data;
                if (!productoData.codigoBarra) {
                    productoData.codigoBarra = '';
                }
                setProducto(productoData);
                console.log(productoData);
            }
            catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };
        fetchProducto();
    }, [id]);
    const handleChange = (event) => {
        const updatedProducto = {
            ...producto,
            [event.target.id]: event.target.value
        };
        setProducto(updatedProducto);
        console.log(updatedProducto);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`https://server-1-r6r7.onrender.com/productos/${id}`, producto);
            setProducto(res.data);
            console.log('Funciona' + res.data);
            navigate('/productos');
        }
        catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };
    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.delete(`https://server-1-r6r7.onrender.com/productos/${id}`);
            console.log('Funciona eliminado' + res.data);
            navigate('/productos');
        }
        catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };
    if (!producto) {
        return _jsx("p", { children: "Cargando..." });
    }
    const fecha = new Date(producto.fechaVencimiento);
    const fechaInput = fecha.toISOString().split('T')[0];
    return (_jsxs("form", { onSubmit: handleSubmit, className: "w-full h-full", style: { backgroundImage: `url(${fondo})` }, children: [_jsx("h1", { className: 'font-bold text-center border-b w-full', children: "Editar Productos" }), producto ? (_jsxs("div", { className: "grid grid-cols-3 gap-4 ml-9 mr-9", children: [_jsxs("div", { children: [_jsx(InputText, { id: "nombreProducto", label: "Nombre Producto", value: producto.nombreProducto, onChange: handleChange }), _jsxs("div", { className: 'flex', children: [_jsx(InputText, { type: 'number', id: "precioVenta", label: "Precio Venta", value: producto.precioVenta, onChange: handleChange }), _jsx("button", { type: 'button', className: 'ml-2 mt-6 shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setProducto({ ...producto, precioVenta: '' }), children: _jsx(AiFillDelete, {}) })] }), _jsxs("div", { className: 'flex', children: [_jsx(InputText, { type: 'number', id: "precioCompra", label: "Precio Compra", value: producto.precioCompra, onChange: handleChange }), _jsx("button", { type: 'button', className: 'ml-2 mt-6 shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setProducto({ ...producto, precioCompra: '' }), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { children: [_jsx(InputText, { id: "proveedor", label: "Proveedor", value: producto.proveedor, onChange: handleChange }), _jsxs("div", { className: 'flex', children: [_jsx(InputText, { id: "stockActual", type: "number", label: "Stock actual", value: producto.stockActual, onChange: handleChange }), _jsx("button", { type: 'button', className: 'ml-2 mt-6 shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => setProducto({ ...producto, stockActual: '' }), children: _jsx(AiFillDelete, {}) })] }), _jsxs("div", { className: 'flex', children: [_jsx(InputText, { id: "stockMinimo", type: "number", label: "Stock m\u00EDnimo", value: producto.stockMinimo, onChange: handleChange }), _jsx("button", { type: 'button', className: 'ml-2 mt-6 shadow-xl hover:bg-gray-800 hover:text-white transform hover: scale-110 transition-all duration-200 hover:border-none', onClick: () => setProducto({ ...producto, stockMinimo: '' }), children: _jsx(AiFillDelete, {}) })] })] }), _jsxs("div", { children: [_jsx(InputText, { id: "ubicacion", label: "Ubicaci\u00F3n", value: producto.ubicacion, onChange: handleChange }), _jsx(InputText, { id: "unidadMedida", label: "Unidad de Medida", value: producto.unidadMedida, onChange: handleChange }), _jsx(InputText, { id: "categoria", label: "Categoria", value: producto.categoria, onChange: handleChange }), _jsx(InputText, { id: "codigoBarra", label: "C\u00F3digo de Barra", value: producto.codigoBarra, onChange: handleChange }), " "] }), _jsx("div", { children: _jsx(InputText, { type: 'date', id: "fechaVencimiento", label: "Fecha de vencimiento", value: fechaInput, onChange: handleChange }) }), _jsxs("select", { className: "shadow-sm w-[20%] mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", onChange: handleChange, id: "Iva", children: [_jsx("option", { value: producto.Iva, children: producto.Iva }), producto.Iva === "10%" ? (_jsx("option", { value: "5%", children: "5%" })) : (_jsx("option", { value: "10%", children: "10%" }))] })] })) : (_jsx("p", { children: "Cargando..." })), _jsxs("div", { className: 'flex justify-center gap-3', children: [_jsx("button", { className: 'shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', type: 'submit', children: "Guardar" }), _jsx("button", { className: 'shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: handleSubmitDelete, type: 'button', children: "Eliminar" })] })] }));
};
export default EditarProductos;
