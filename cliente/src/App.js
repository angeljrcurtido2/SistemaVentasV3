import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categoria from './components/Categoria';
import Productos from './components/Productos/Productos';
import EditarProductos from './components/Productos/EditarProductos';
import Proveedor from './components/Productos/Proveedor';
import Caja from './components/Caja/Caja';
import EditarProveedor from './components/Productos/EditarProveedor';
import HistorialCaja from './components/Caja/HistorialCaja';
import DatosEmpresa from './components/DatosEmpresa/DatosEmpresa';
import DatosCliente from './components/DatosCliente/DatosCliente';
import HistorialVentas from './components/HistorialVentas/HistorialVentas';
import HistorialCompras from './components/HistorialCompras/HistorialCompras';
import Dashboard from './components/Dashboard/Dahsboard';
import Ventas from './components/Ventas/Ventas';
import Compras from './components/Compras/Compras';
import './App.css';
function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "flex h-screen", children: [_jsx("div", { className: 'w-64', children: _jsx(Sidebar, {}) }), _jsx("div", { className: 'flex-grow', children: _jsxs(Routes, { children: [_jsx(Route, { path: "/categoria", element: _jsx(Categoria, {}) }), _jsx(Route, { path: "/productos", element: _jsx(Productos, {}) }), _jsx(Route, { path: "/proveedor", element: _jsx(Proveedor, {}) }), _jsx(Route, { path: "/compras", element: _jsx(Compras, {}) }), _jsx(Route, { path: "/ventas", element: _jsx(Ventas, {}) }), _jsx(Route, { path: "/caja", element: _jsx(Caja, {}) }), _jsx(Route, { path: "/datosempresa", element: _jsx(DatosEmpresa, {}) }), _jsx(Route, { path: "/datoscliente", element: _jsx(DatosCliente, {}) }), _jsx(Route, { path: "/historialcompras", element: _jsx(HistorialCompras, {}) }), _jsx(Route, { path: "/historialcaja", element: _jsx(HistorialCaja, {}) }), _jsx(Route, { path: "/historialventas", element: _jsx(HistorialVentas, {}) }), _jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/editarproductos/:id", element: _jsx(EditarProductos, {}) }), _jsx(Route, { path: "/editarproveedor/:id", element: _jsx(EditarProveedor, {}) })] }) })] }) }));
}
export default App;
