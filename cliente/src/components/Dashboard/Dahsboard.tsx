import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';


interface Venta {
  estado: string;
  fechaVenta: string;
  PrecioVentaTotal: number;
  Ganancias: number;
}

const Dashboard: React.FC = () => {
  const [totalVentas, setTotalVentas] = useState(0);
  const [cantidadVentas, setCantidadVentas] = useState(0);
  const [gananciaAcumulada, setGananciaAcumulada] = useState(0);
  const [ventasPorDia, setVentasPorDia] = useState<number[]>([]);
  const [gananciasPorDia, setGananciasPorDia] = useState<number[]>([]);
  const [dias, setDias] = useState<string[]>([]);
  const [gananciaAcumulada30Dias, setGananciaAcumulada30Dias] = useState(0);
  const [cantidadVentas30Dias, setCantidadVentas30Dias] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ventas');
        const ventas: Venta[] = response.data;

        let totalVentas = 0;
        let cantidadVentas = 0;
        let gananciaAcumulada = 0;
        const ventasPorDia: { [key: string]: number } = {};
        const gananciasPorDia: { [key: string]: number } = {};
        const dias: string[] = [];
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
      } catch (error) {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 border-b">Informes Generales</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-red-500 text-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">Total de Ventas del Mes</h2>
          <p className="text-2xl">{totalVentas}</p>
        </div>
        <div className="bg-blue-500 text-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">Cantidad de Ventas Realizadas (Últimos 30 días)</h2>
          <p className="text-2xl">{cantidadVentas30Dias}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">Ganancia Acumulada (Últimos 30 días)</h2>
          <p className="text-2xl">{gananciaAcumulada30Dias}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">Cantidad de Ventas Realizadas</h2>
          <p className="text-2xl">{cantidadVentas}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total de Ventas (últimos 30 días)</h2>
          <Bar data={barVentasData} />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Estadísticas de Ventas</h2>
          <Doughnut data={doughnutData} />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Ganancias (últimos 30 días)</h2>
          <Bar data={barGananciasData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;