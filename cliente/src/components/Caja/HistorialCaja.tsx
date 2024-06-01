import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistorialCaja: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/caja');
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            } catch (err) {
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

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 overflow-auto h-[500px] ">
            <h1 className="font-bold text-center">Historial Cajas</h1>
            <div className="mb-4 flex flex-row gap-4 justify-center border rounded">

                <div className='flex'>
                    <label className='mt-4 font-bold' htmlFor="">Fecha Inicio:</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className='flex'>
                <label className='mt-4 font-bold' htmlFor="">Fecha Fin:</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <button className='mt-2 mb-2 border border-gray-300' onClick={filterData}>Filtrar</button>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Fecha Apertura</th>
                        <th className="py-2 px-4 border-b">Fecha Cierre</th>
                        <th className="py-2 px-4 border-b">Monto Inicial</th>
                        <th className="py-2 px-4 border-b">Monto Final</th>
                        <th className="py-2 px-4 border-b">Situación Caja</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((caja) => (
                        <tr key={caja._id} className='text-center'>
                            <td className="py-2 px-4 border-b">{new Date(caja.fechaApertura).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">{caja.fechaCierre ? new Date(caja.fechaCierre).toLocaleString() : 'N/A'}</td>
                            <td className="py-2 px-4 border-b">{caja.montoInicial}</td>
                            <td className="py-2 px-4 border-b">{caja.montoFinal ? caja.montoFinal : 'N/A'}</td>
                            <td className="py-2 px-4 border-b">{caja.situacionCaja}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistorialCaja;