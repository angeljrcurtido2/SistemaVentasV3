import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
const DatosEmpresa = () => {
    const [empresaData, setEmpresaData] = useState({ Comercial: '', Ruc: '', Timbrado: '', Telefono: '', Direccion: '' });
    const [empresas, setEmpresas] = useState([]);
    const [showModalDatos, setShowModalDatos] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingEmpresaId, setEditingEmpresaId] = useState(null);
    const fetchEmpresas = () => {
        axios.get('https://server-1-r6r7.onrender.com/datos-empresa')
            .then(response => {
            setEmpresas(response.data);
        })
            .catch(error => {
            console.error('Error fetching empresas:', error);
        });
    };
    useEffect(() => {
        fetchEmpresas();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmpresaData({ ...empresaData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editingEmpresaId) {
            axios.put(`https://server-1-r6r7.onrender.com/datos-empresa/${editingEmpresaId}`, empresaData)
                .then(() => {
                fetchEmpresas();
                alert("Datos Actualizados Correctamente");
                resetForm();
            })
                .catch(error => {
                console.error('Error updating empresa:', error);
            });
        }
        else {
            axios.post('https://server-1-r6r7.onrender.com/datos-empresa', empresaData)
                .then(() => {
                alert("Datos Creados Correctamente");
                fetchEmpresas();
                resetForm();
            })
                .catch(error => {
                console.error('Error creating empresa:', error);
                alert("Error al Crear Datos de Empresa");
            });
        }
    };
    const handleEdit = (empresa) => {
        setIsEditing(true);
        setEditingEmpresaId(empresa._id);
        setEmpresaData(empresa);
    };
    const handleDelete = (empresaId) => {
        axios.delete(`https://server-1-r6r7.onrender.com/datos-empresa/${empresaId}`)
            .then(() => {
            fetchEmpresas();
            alert("Datos Eliminados Correctamente");
        })
            .catch(error => {
            console.error('Error deleting empresa:', error);
        });
    };
    const resetForm = () => {
        setIsEditing(false);
        setEditingEmpresaId(null);
        setEmpresaData({ Comercial: '', Ruc: '', Timbrado: '', Telefono: '', Direccion: '' });
    };
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text- font-bold border-b mb-4 text-center", children: isEditing ? 'Editar Empresa' : 'Crear Empresa' }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: 'grid grid-cols-3 gap-4', children: [_jsx("input", { type: "text", name: "Comercial", placeholder: "Comercial", value: empresaData.Comercial, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsx("input", { type: "text", name: "Ruc", placeholder: "Ruc", value: empresaData.Ruc, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsx("input", { type: "text", name: "Timbrado", placeholder: "Timbrado", value: empresaData.Timbrado, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsx("input", { type: "text", name: "Telefono", placeholder: "Telefono", value: empresaData.Telefono, onChange: handleInputChange, className: "w-full p-2 border rounded" }), _jsx("input", { type: "text", name: "Direccion", placeholder: "Direccion", value: empresaData.Direccion, onChange: handleInputChange, className: "w-full p-2 border rounded" })] }), _jsxs("div", { className: 'flex justify-center', children: [_jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded", children: isEditing ? 'Actualizar Empresa' : 'Crear Empresa' }), _jsx("button", { className: "ml-3 bg-blue-500 text-white p-2 rounded", type: "button", onClick: () => setShowModalDatos(true), children: "Ver Datos Empresas" })] })] }), showModalDatos && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-center border-b", children: "Datos de Empresas" }), _jsx("div", { className: "overflow-x-auto max-h-60", children: _jsxs("table", { className: "min-w-full bg-white", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2", children: "Comercial" }), _jsx("th", { className: "px-4 py-2", children: "Ruc" }), _jsx("th", { className: "px-4 py-2", children: "Timbrado" }), _jsx("th", { className: "px-4 py-2", children: "Telefono" }), _jsx("th", { className: "px-4 py-2", children: "Direccion" }), _jsx("th", { className: "px-4 py-2", children: "Acciones" })] }) }), _jsx("tbody", { children: empresas.map(empresa => (_jsxs("tr", { children: [_jsx("td", { className: "border px-4 py-2", children: empresa.Comercial }), _jsx("td", { className: "border px-4 py-2", children: empresa.Ruc }), _jsx("td", { className: "border px-4 py-2", children: empresa.Timbrado }), _jsx("td", { className: "border px-4 py-2", children: empresa.Telefono }), _jsx("td", { className: "border px-4 py-2", children: empresa.Direccion }), _jsxs("td", { className: "border px-4 py-4 flex", children: [_jsx("button", { className: "bg-yellow-500 text-white p-1 rounded mr-2", onClick: () => handleEdit(empresa), children: "Editar" }), _jsx("button", { className: "bg-red-500 text-white p-1 rounded", onClick: () => handleDelete(empresa._id), children: "Eliminar" })] })] }, empresa._id))) })] }) }), _jsx("button", { className: "mt-4 bg-red-500 text-white p-2 rounded", onClick: () => setShowModalDatos(false), children: "Cerrar" })] }) }))] }));
};
export default DatosEmpresa;
