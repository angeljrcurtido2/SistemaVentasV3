import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import fondo from '../assets/fondo4.jpg';
const Categoria = () => {
    const [nombre, setNombre] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNombre, setEditNombre] = useState('');
    useEffect(() => {
        const fetchCategorias = async () => {
            const response = await axios.get('https://server-1-r6r7.onrender.com/categorias');
            setCategorias(response.data);
            console.log(response.data);
        };
        fetchCategorias();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://server-1-r6r7.onrender.com/categorias', { nombre });
            setCategorias([...categorias, response.data]);
            setNombre('');
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleEdit = async (_id) => {
        const response = await axios.get(`https://server-1-r6r7.onrender.com/categorias/${_id}`);
        setEditId(_id);
        setEditNombre(response.data.nombre);
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://server-1-r6r7.onrender.com/categorias/${editId}`, { nombre: editNombre });
            setCategorias(categorias.map(categoria => categoria._id === editId ? response.data : categoria));
            setEditId(null);
            setEditNombre('');
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (_id) => {
        try {
            await axios.delete(`https://server-1-r6r7.onrender.com/categorias/${_id}`);
            setCategorias(categorias.filter(categoria => categoria._id !== _id));
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("div", { className: "w-full h-full flex flex-col items-center justify-start ", style: { backgroundImage: `url(${fondo})` }, children: [_jsx("h1", { className: "text-4xl font-bold text-center text-gray-800 py-2 border-b w-full ", children: "Cargar Categorias" }), _jsxs("form", { onSubmit: handleSubmit, className: "mb-4", children: [_jsxs("div", { className: "flex items-center mt-2 mb-2", children: [_jsx("label", { htmlFor: "nombre", className: 'font-medium mr-2', children: "Categoria:" }), _jsx("input", { className: "border rounded-md w-full h-10", id: "nombre", type: "text", value: nombre, onChange: (e) => setNombre(e.target.value), required: true })] }), _jsx("button", { className: 'ml-[30%] shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', type: "submit", children: "Crear categor\u00EDa" })] }), editId && (_jsxs("form", { onSubmit: handleUpdate, className: "mb-4 ml-12 flex flex-col items-center", children: [_jsx("label", { htmlFor: "editNombre", children: "Editar Categoria:" }), _jsx("input", { className: 'border rounded-md w-full h-10', id: "editNombre", type: "text", value: editNombre, onChange: (e) => setEditNombre(e.target.value), required: true }), _jsx("button", { className: 'shadow-xl mt-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', type: "submit", children: "Actualizar categor\u00EDa" })] })), _jsx("div", { className: 'rounded-lg overflow-hidden', children: _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "px-4 border", children: "N\u00B0" }), _jsx("th", { className: "px-4 border", children: "Categorias" }), _jsx("th", { className: "px-4 border", children: "Acciones" })] }) }), _jsx("tbody", { children: categorias.map((categoria, index) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 border", children: index + 1 }), _jsx("td", { className: "px-4 border", children: categoria.nombre }), _jsxs("td", { className: "px-4 border", children: [_jsx("button", { className: 'mr-3 mt-2 mb-2 shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => handleEdit(categoria._id), children: "Editar" }), _jsx("button", { className: 'shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: () => handleDelete(categoria._id), children: "Eliminar" })] })] }, categoria._id))) })] }) })] }));
};
export default Categoria;
