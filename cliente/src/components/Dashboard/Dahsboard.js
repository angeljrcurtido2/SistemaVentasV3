import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';
const Dashboard = () => {
    const [totalVentas, setTotalVentas] = useState(0);
    const [cantidadVentas, setCantidadVentas] = useState(0);
    const [gananciaAcumulada, setGananciaAcumulada] = useState(0);
    const [ventasPorDia, setVentasPorDia] = useState([]);
    const [gananciasPorDia, setGananciasPorDia] = useState([]);
    const [dias, setDias] = useState([]);
    const [gananciaAcumulada30Dias, setGananciaAcumulada30Dias] = useState(0);
    const [cantidadVentas30Dias, setCantidadVentas30Dias] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://server-1-r6r7.onrender.com/ventas');
                const ventas = response.data;
                let totalVentas = 0;
                let cantidadVentas = 0;
                let gananciaAcumulada = 0;
                const ventasPorDia = {};
                const gananciasPorDia = {};
                const dias = [];
                let gananciaAcumulada30Dias = 0;
                let cantidadVentas30Dias = 0;
                for (let i = 29; i >= 0; i--) {
                    const dia = moment().subtract(i, 'days').format('YYYY-MM-DD');
                    dias.push(dia);
                    ventasPorDia[dia] = 0;
                    gananciasPorDia[dia] = 0;
                }
                ventas.forEach((venta) => {
                    if (venta.estado !== 'anulado') {
                        totalVentas += venta.PrecioVentaTotal;
                        cantidadVentas += 1;
                        gananciaAcumulada += venta.Ganancias;
                        const fechaVenta = moment(venta.fechaVenta).format('YYYY-MM-DD');
                        if (ventasPorDia[fechaVenta] !== undefined) {
                            ventasPorDia[fechaVenta] += venta.PrecioVentaTotal;
                        }
                        if (gananciasPorDia[fechaVenta] !== undefined) {
                            gananciasPorDia[fechaVenta] += venta.Ganancias;
                        }
                        if (dias.includes(fechaVenta)) {
                            cantidadVentas30Dias += 1;
                        }
                    }
                });
                gananciaAcumulada30Dias = dias.reduce((acc, dia) => acc + gananciasPorDia[dia], 0);
                setTotalVentas(totalVentas);
                setCantidadVentas(cantidadVentas);
                setGananciaAcumulada(gananciaAcumulada);
                setVentasPorDia(dias.map(dia => ventasPorDia[dia]));
                setGananciasPorDia(dias.map(dia => gananciasPorDia[dia]));
                setDias(dias);
                setGananciaAcumulada30Dias(gananciaAcumulada30Dias);
                setCantidadVentas30Dias(cantidadVentas30Dias);
            }
            catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const barVentasData = {
        labels: dias,
        datasets: [
            {
                label: 'Total de Ventas (últimos 30 días)',
                data: ventasPorDia,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
    const barGananciasData = {
        labels: dias,
        datasets: [
            {
                label: 'Ganancias (últimos 30 días)',
                data: gananciasPorDia,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    const doughnutData = {
        labels: ['Total de Ventas', 'Cantidad de Ventas', 'Ganancia Acumulada'],
        datasets: [
            {
                label: 'Estadísticas de Ventas',
                data: [totalVentas, cantidadVentas, gananciaAcumulada],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4 border-b", children: "Informes Generales" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-4", children: [_jsxs("div", { className: "bg-red-500 text-white rounded-lg p-4 shadow", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Total de Ventas del Mes" }), _jsx("p", { className: "text-2xl", children: totalVentas })] }), _jsxs("div", { className: "bg-blue-500 text-white rounded-lg p-4 shadow", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Cantidad de Ventas Realizadas (\u00DAltimos 30 d\u00EDas)" }), _jsx("p", { className: "text-2xl", children: cantidadVentas30Dias })] }), _jsxs("div", { className: "bg-green-500 text-white rounded-lg p-4 shadow", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Ganancia Acumulada (\u00DAltimos 30 d\u00EDas)" }), _jsx("p", { className: "text-2xl", children: gananciaAcumulada30Dias })] }), _jsxs("div", { className: "bg-yellow-500 text-white rounded-lg p-4 shadow", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Cantidad de Ventas Realizadas" }), _jsx("p", { className: "text-2xl", children: cantidadVentas })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white shadow rounded-lg p-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Total de Ventas (\u00FAltimos 30 d\u00EDas)" }), _jsx(Bar, { data: barVentasData })] }), _jsxs("div", { className: "bg-white shadow rounded-lg p-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Estad\u00EDsticas de Ventas" }), _jsx(Doughnut, { data: doughnutData })] }), _jsxs("div", { className: "bg-white shadow rounded-lg p-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Ganancias (\u00FAltimos 30 d\u00EDas)" }), _jsx(Bar, { data: barGananciasData })] })] })] }));
};
export default Dashboard;
