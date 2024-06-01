import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
const DatosClientes = () => {
    const [clienteData, setClienteData] = useState({ nombreCliente: '', rucCliente: '', direccionCliente: '' });
    const [clientes, setClientes] = useState([]);
    const [showModalClientes, setShowModalClientes] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingClienteId, setEditingClienteId] = useState(null);
    const fetchClientes = () => {
        axios.get('https://server-1-r6r7.onrender.com/datos-cliente')
            .then(response => {
            setClientes(response.data);
        })
            .catch(error => {
            console.error('Error fetching clientes:', error);
        });
    };
    useEffect(() => {
        fetchClientes();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClienteData({ ...clienteData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editingClienteId) {
            axios.put(`https://server-1-r6r7.onrender.com/datos-cliente/${editingClienteId}`, clienteData)
                .then(() => {
                fetchClientes();
                resetForm();
            })
                .catch(error => {
                console.error('Error updating cliente:', error);
            });
        }
        else {
            axios.post('https://server-1-r6r7.onrender.com/datos-cliente', clienteData)
                .then(() => {
                fetchClientes();
                resetForm();
            })
                .catch(error => {
                console.error('Error creating cliente:', error);
            });
        }
    };
    const handleEdit = (cliente) => {
        setIsEditing(true);
        setEditingClienteId(cliente._id);
        setClienteData(cliente);
    };
    const handleDelete = (clienteId) => {
        axios.delete(`https://server-1-r6r7.onrender.com/datos-cliente/${clienteId}`)
            .then(() => {
            fetchClientes();
        })
            .catch(error => {
            console.error('Error deleting cliente:', error);
        });
    };
    const resetForm = () => {
        setIsEditing(false);
        setEditingClienteId(null);
        setClienteData({ nombreCliente: '', rucCliente: '', direccionCliente: '' });
    };
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-3xl text-center font-bold mb-4 border-b", children: isEditing ? 'Editar Cliente' : 'Crear Cliente' }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "text", name: "nombreCliente", placeholder: "Nombre Cliente", value: clienteData.nombreCliente, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsx("input", { type: "text", name: "rucCliente", placeholder: "RUC Cliente", value: clienteData.rucCliente, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsx("input", { type: "text", name: "direccionCliente", placeholder: "Direcci\u00F3n Cliente", value: clienteData.direccionCliente, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded", children: isEditing ? 'Actualizar Cliente' : 'Crear Cliente' }), _jsx("button", { className: " bg-blue-500 text-white p-2 rounded", type: "button", onClick: () => setShowModalClientes(true), children: "Ver Datos Clientes" })] })] }), showModalClientes && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-center border-b", children: "Datos de Clientes" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full bg-white", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2", children: "Nombre" }), _jsx("th", { className: "px-4 py-2", children: "RUC" }), _jsx("th", { className: "px-4 py-2", children: "Direcci\u00F3n" }), _jsx("th", { className: "px-4 py-2", children: "Acciones" })] }) }), _jsx("tbody", { children: clientes.map(cliente => (_jsxs("tr", { children: [_jsx("td", { className: "border px-4 py-2", children: cliente.nombreCliente }), _jsx("td", { className: "border px-4 py-2", children: cliente.rucCliente }), _jsx("td", { className: "border px-4 py-2", children: cliente.direccionCliente }), _jsxs("td", { className: "border px-4 py-2 flex justify-center", children: [_jsx("button", { className: "bg-yellow-500 text-white p-1 rounded mr-2", onClick: () => handleEdit(cliente), children: "Editar" }), _jsx("button", { className: "bg-red-500 text-white p-1 rounded", onClick: () => handleDelete(cliente._id), children: "Eliminar" })] })] }, cliente._id))) })] }) }), _jsx("button", { className: "mt-4 bg-red-500 text-white p-2 rounded", onClick: () => setShowModalClientes(false), children: "Cerrar" })] }) }))] }));
};
export default DatosClientes;
