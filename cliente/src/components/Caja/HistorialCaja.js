import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
const HistorialCaja = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://server-1-r6r7.onrender.com/caja');
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            }
            catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filterData = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const filtered = data.filter(caja => {
            const date = new Date(caja.fechaApertura);
            return date >= start && date <= end;
        });
        setFilteredData(filtered);
    };
    if (loading)
        return _jsx("div", { className: "text-center mt-4", children: "Loading..." });
    if (error)
        return _jsx("div", { className: "text-center mt-4 text-red-500", children: error });
    return (_jsxs("div", { className: "container mx-auto p-4 overflow-auto h-[500px] ", children: [_jsx("h1", { className: "font-bold text-center", children: "Historial Cajas" }), _jsxs("div", { className: "mb-4 flex flex-row gap-4 justify-center border rounded", children: [_jsxs("div", { className: 'flex', children: [_jsx("label", { className: 'mt-4 font-bold', htmlFor: "", children: "Fecha Inicio:" }), _jsx("input", { type: "date", value: startDate, onChange: e => setStartDate(e.target.value) })] }), _jsxs("div", { className: 'flex', children: [_jsx("label", { className: 'mt-4 font-bold', htmlFor: "", children: "Fecha Fin:" }), _jsx("input", { type: "date", value: endDate, onChange: e => setEndDate(e.target.value) })] }), _jsx("button", { className: 'mt-2 mb-2 border border-gray-300', onClick: filterData, children: "Filtrar" })] }), _jsxs("table", { className: "min-w-full bg-white border border-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 px-4 border-b", children: "Fecha Apertura" }), _jsx("th", { className: "py-2 px-4 border-b", children: "Fecha Cierre" }), _jsx("th", { className: "py-2 px-4 border-b", children: "Monto Inicial" }), _jsx("th", { className: "py-2 px-4 border-b", children: "Monto Final" }), _jsx("th", { className: "py-2 px-4 border-b", children: "Situaci\u00F3n Caja" })] }) }), _jsx("tbody", { children: filteredData.map((caja) => (_jsxs("tr", { className: 'text-center', children: [_jsx("td", { className: "py-2 px-4 border-b", children: new Date(caja.fechaApertura).toLocaleString() }), _jsx("td", { className: "py-2 px-4 border-b", children: caja.fechaCierre ? new Date(caja.fechaCierre).toLocaleString() : 'N/A' }), _jsx("td", { className: "py-2 px-4 border-b", children: caja.montoInicial }), _jsx("td", { className: "py-2 px-4 border-b", children: caja.montoFinal ? caja.montoFinal : 'N/A' }), _jsx("td", { className: "py-2 px-4 border-b", children: caja.situacionCaja })] }, caja._id))) })] })] }));
};
export default HistorialCaja;
