import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import InputText from './InputText';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Proveedor = () => {
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [ruc, setRuc] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const proveedor = {
            nombreEmpresa,
            ruc,
            direccion,
            telefono
        };
        //Verificación si nada esta vacio
        if (!nombreEmpresa || !ruc || !direccion || !telefono) {
            console.log(proveedor);
            alert('Todos los campos son obligatorios');
            return;
        }
        try {
            await axios.post('https://server-1-r6r7.onrender.com/proveedor', proveedor);
            alert('Proveedor creado correctamente');
        }
        catch (error) {
            console.error('Error al crear el proveedor:');
        }
    };
    const handleShowModal = async () => {
        try {
            const response = await axios.get('https://server-1-r6r7.onrender.com/proveedor');
            console.log(response.data);
            setCategorias(response.data);
            setShowModal(true);
        }
        catch (error) {
            console.error('Error al obtener los proveedores:', error);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("h1", { className: 'border-b w-full text-center font-bold mb-4', children: "Proveedor" }), _jsxs("div", { className: "grid grid-cols-2 gap-1 ml-9 mr-9", children: [_jsxs("div", { className: "max-w-md", children: [_jsx(InputText, { id: "nombreEmpresa", label: "Nombre de la Empresa", value: nombreEmpresa, onChange: (e) => setNombreEmpresa(e.target.value) }), _jsx(InputText, { id: "ruc", label: "Ruc Empresa", value: ruc, onChange: (e) => setRuc(e.target.value) })] }), _jsxs("div", { className: "max-w-md", children: [_jsx(InputText, { id: "direccion", label: "Direcci\u00F3n", value: direccion, onChange: (e) => setDireccion(e.target.value) }), _jsx(InputText, { id: "telefono", label: "Tel\u00E9fono", value: telefono, onChange: (e) => setTelefono(e.target.value) })] })] }), _jsxs("div", { className: 'flex justify-center mt-3', children: [_jsx(Button, { className: 'mr-3', type: 'submit', children: "Crear Proveedor" }), _jsx(Button, { onClick: handleShowModal, type: "button", children: "Ver Proveedores" })] }), showModal && (_jsx("div", { className: "modal-background", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("h1", { className: 'border-b font-bold text-center text-', children: "Categor\u00EDas" }), _jsxs("table", { className: 'table-auto border w-full', children: [_jsx("thead", { children: _jsxs("tr", { className: 'bg-gray-800 text-white', children: [_jsx("th", { className: "border-r", children: "N\u00B0:" }), _jsx("th", { className: "border-r", children: "Nombre:" }), _jsx("th", { className: "border-r", children: "RUC:" }), _jsx("th", { className: "border-r", children: "Direcci\u00F3n:" }), _jsx("th", { className: "border-r", children: "Tel\u00E9fono:" }), _jsx("th", { className: 'border-r', children: "Accion" })] }) }), _jsx("tbody", { children: categorias.map((categoria, index) => (_jsxs("tr", { children: [_jsx("td", { className: "border", children: index + 1 }), _jsx("td", { className: "border", children: categoria.nombreEmpresa }), _jsx("td", { className: "border", children: categoria.ruc }), _jsx("td", { className: "border", children: categoria.direccion }), _jsx("td", { className: "border", children: categoria.telefono }), _jsx("td", { children: _jsx(Button, { type: 'button', onClick: () => navigate(`/editarproveedor/${categoria._id}`), children: "Editar" }) })] }, categoria._id))) })] }), _jsx(Button, { onClick: handleCloseModal, children: "Cerrar" })] }) }))] }));
};
export default Proveedor;
