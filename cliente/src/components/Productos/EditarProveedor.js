import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import InputText from './InputText';
import Button from './Button';
/*import { AiFillDelete } from "react-icons/ai";
import fondo from '../../assets/fondo4.jpg';*/
const EditarProveedor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [ruc, setRuc] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const res = await axios.get(`https://server-1-r6r7.onrender.com/proveedor/${id}`);
                setNombreEmpresa(res.data.nombreEmpresa);
                setRuc(res.data.ruc);
                setDireccion(res.data.direccion);
                setTelefono(res.data.telefono);
            }
            catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };
        fetchCategoria();
    }, [id]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const categoria = { nombreEmpresa, ruc, direccion, telefono };
        try {
            const response = await axios.put(`https://server-1-r6r7.onrender.com/proveedor/${id}`, categoria);
            console.log("Por aqui viene", response.data);
            navigate('/proveedor');
        }
        catch {
            console.log(categoria);
            console.error('Error al actualizar el proveedor');
        }
    };
    const handleDeleteProveedor = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`https://server-1-r6r7.onrender.com/proveedor/${id}`);
            console.log("Eliminado", response.data);
            navigate('/proveedor');
        }
        catch {
            console.error('Error al eliminar el proveedor');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("h1", { className: 'border-b w-full text-center font-bold mb-4', children: "Editar Proveedor" }), _jsxs("div", { className: "grid grid-cols-2 gap-1 ml-9 mr-9", children: [_jsxs("div", { className: "max-w-md", children: [_jsx(InputText, { id: "nombreEmpresa", label: "Nombre de la Empresa", value: nombreEmpresa, onChange: (e) => setNombreEmpresa(e.target.value) }), _jsx(InputText, { id: "ruc", label: "Ruc Empresa", value: ruc, onChange: (e) => setRuc(e.target.value) })] }), _jsxs("div", { className: "max-w-md", children: [_jsx(InputText, { id: "direccion", label: "Direcci\u00F3n", value: direccion, onChange: (e) => setDireccion(e.target.value) }), _jsx(InputText, { id: "telefono", label: "Tel\u00E9fono", value: telefono, onChange: (e) => setTelefono(e.target.value) })] })] }), _jsxs("div", { className: 'flex justify-center', children: [_jsx(Button, { className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', type: 'submit', children: "Actualizar" }), _jsx(Button, { className: 'shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none', onClick: handleDeleteProveedor, type: 'button', children: "Eliminar" })] })] }));
};
export default EditarProveedor;
