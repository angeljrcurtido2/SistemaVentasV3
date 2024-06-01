import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiDashboard3Fill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdManageHistory } from "react-icons/md";
import { FaDropbox } from "react-icons/fa6";
import { RiFolderHistoryFill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
    const menuItems = [
        { name: 'Inicio', icon: _jsx(RiDashboard3Fill, {}), route: '/' },
        { name: 'Categorias', icon: _jsx(RiDashboard3Fill, {}), route: '/categoria' },
        { name: 'Productos', icon: _jsx(BiCategoryAlt, {}), route: '/productos' },
        { name: 'Proveedores', icon: _jsx(FaBox, {}), route: '/proveedor' },
        { name: 'Compras', icon: _jsx(FaMoneyBillTransfer, {}), route: '/compras' },
        { name: 'Ventas', icon: _jsx(FaMoneyBillTransfer, {}), route: '/ventas' },
        { name: 'Historial Ventas', icon: _jsx(MdManageHistory, {}), route: '/historialventas' },
        { name: 'Historial Compras', icon: _jsx(MdManageHistory, {}), route: '/historialcompras' },
        { name: 'Apertura de Caja', icon: _jsx(FaDropbox, {}), route: '/caja' },
        { name: 'Historial Aperturas', icon: _jsx(RiFolderHistoryFill, {}), route: '/historialcaja' },
        { name: 'Actualizar Datos', icon: _jsx(MdManageHistory, {}), route: '/datosempresa' },
        { name: 'Agregar Clientes', icon: _jsx(MdManageHistory, {}), route: '/datoscliente' },
    ];
    return (_jsxs("div", { className: "w-64 min-h-screen bg-gray-800 text-white p-6", children: [_jsxs("h1", { className: "text-2xl flex", children: [_jsx(BsMenuButtonWide, { className: "mt-2", size: 20 }), "Men\u00FA"] }), _jsx("nav", { children: menuItems.map((item, index) => (_jsx(Link, { to: item.route, className: "flex items-center hover:bg-gray-700 hover:rounded-md py-1 text-gray-200 mb-3 mt-2 hover:text-white px-4", children: typeof item === 'string' ? item : (_jsxs(_Fragment, { children: [item.icon, item.name] })) }, index))) })] }));
};
export default Sidebar;
