import React, { useState, useEffect } from 'react';
import InputText from '../Productos/InputText';
import Button from '../Productos/Button';
import axios from 'axios';

interface Caja {
    _id: string;
    estado: string;
    situacionCaja: string;
    fechaApertura: Date;
    montoInicial: number;
    moneda: number;
    billete: number;
    cheque: number;
    tarjeta: number;
    gastos: number;
    ingresos: number;
    fechaCierre?: Date;
    montoFinal?: number;
}

interface CajaAbierta {
    _id: string;
    estado: string;
    situacionCaja: string;
    fechaApertura: Date;
    montoInicial: number;
    moneda: number;
    billete: number;
    cheque: number;
    tarjeta: number;
    gastos: number;
    ingresos: number;
    fechaCierre?: Date;
    montoFinal?: number;
}

const CajaComponent: React.FC = () => {
    const [montoInicial, setMontoInicial] = useState<number>(0);
    const [montoFinal, setMontoFinal] = useState<number>(0);
    const [moneda, setMoneda] = useState<number>(0);
    const [billete, setBillete] = useState<number>(0);
    const [cheque, setCheque] = useState<number>(0);
    const [tarjeta, setTarjeta] = useState<number>(0);
    const [gastos, setGastos] = useState<number>(0);
    const [ingresos] = useState<number>(0);
    const [cajas, setCajas] = useState<Caja[]>([]);
    const [cajasAbiertas, setCajasAbiertas] = useState<CajaAbierta[]>([]);
    const [mensaje, setMensaje] = useState<string>('');
    const [showModalCierreCaja, setShowModalCierreCaja] = useState<boolean>(false);
    const [showModalAnularCaja, setShowModalAnularCaja] = useState<boolean>(false);
    const [selectedCajaId, setSelectedCajaId] = useState<string | null>(null);
    const [mostrarModalCalcular, setMostrarModalCalcular] = useState<boolean>(false);
    const [totalesVentas, setTotalesVentas] = useState<number | null>(null);
    const [totalesCompras, setTotalesCompras] = useState<number | null>(null);
    const [ingresosVarios, setIngresosVarios] = useState<number>(0);
    const [diferencia, setDiferencia] = useState<number | null>(null);

    useEffect(() => {
        obtenerCajas();
        obtenerCajasAbiertos();
    }, []);

    const abrirCaja = async () => {
        try {
            const response = await axios.post('http://localhost:3001/caja/abrir', {
                montoInicial,
                moneda: 0,
                billete: 0,
                cheque: 0,
                tarjeta: 0,
                gastos: 0,
                ingresos: 0,
            });
            setMensaje(`Caja abierta con éxito: ${JSON.stringify(response.data)}`);
            obtenerCajas();
            obtenerCajasAbiertos();
            setMontoInicial(0);
        } catch (error) {
            setMensaje(`Error al abrir la caja: ${error.response ? error.response.data : error.message}`);
        }
    };

    const cerrarCaja = async (id: string) => {
        try {
            const response = await axios.put(`http://localhost:3001/caja/cerrar/${id}`, {
                montoFinal,
                moneda,
                billete,
                cheque,
                tarjeta,
                gastos,
                ingresos,
            });
            setMensaje(`Caja cerrada con éxito: ${JSON.stringify(response.data)}`);
            obtenerCajas();
            obtenerCajasAbiertos();
            setMontoFinal(0);
        } catch (error) {
            setMensaje(`Error al cerrar la caja: ${error.response ? error.response.data : error.message}`);
        }
    };

    const anularCaja = async (id: string) => {
        try {
            const response = await axios.put(`http://localhost:3001/caja/anular/${id}`);
            setMensaje(`Caja anulada con éxito: ${JSON.stringify(response.data)}`);
            obtenerCajas();
            obtenerCajasAbiertos();
        } catch (error) {
            setMensaje(`Error al anular la caja: ${error.response ? error.response.data : error.message}`);
        }
    };

    const obtenerCajas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/caja/activas');
            setCajas(response.data);
        } catch (error) {
            setMensaje(`Error al obtener las cajas: ${error.response ? error.response.data : error.message}`);
        }
    };

    const obtenerCajasAbiertos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/caja/abiertas');
            setCajasAbiertas(response.data);
        } catch (error) {
            setMensaje(`Error al obtener las cajas: ${error.response ? error.response.data : error.message}`);
        }
    };

    const handleSubmitApertura = (event: React.FormEvent) => {
        event.preventDefault();
        abrirCaja();
    };

    const handleSubmitCierre = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedCajaId) {
            cerrarCaja(selectedCajaId);
        }
    };



    const calcularTotales = async () => {
        try {
            const ventasResponse = await axios.get('http://localhost:3001/ventas/total-del-dia');
            const comprasResponse = await axios.get('http://localhost:3001/compras/total-del-dia');
            const ventas = ventasResponse.data.total;
            const compras = comprasResponse.data.total;
            setTotalesVentas(ventas);
            setTotalesCompras(compras);
            const diferenciaCalculada = ventas - compras + ingresosVarios;
            setDiferencia(diferenciaCalculada);
            setMostrarModalCalcular(true);
        } catch (error) {
            setMensaje(`Error al calcular los totales: ${error.response ? error.response.data : error.message}`);
        }
    };

    const cerrarModalCalcular = () => {
        if (diferencia !== null) {
            setMontoFinal(diferencia);
        }
        setMostrarModalCalcular(false);
        setTotalesVentas(null);
        setTotalesCompras(null);
        setDiferencia(null);
        setIngresosVarios(0);
    };


    return (
        <div>
            <h1 className="font-bold text-center border-b">Apertura de Caja</h1>
            <form onSubmit={handleSubmitApertura}>
                <div className="flex flex-col justify-center items-center gap-4">
                    <label>Monto Inicial de Apertura:</label>
                    <div className="flex ">
                        <InputText
                            type="number"
                            value={montoInicial}
                            onChange={(e) => setMontoInicial(Number(e.target.value))}
                            required id={''} label={''}                        />
                       
                    </div>
                    <div className="flex flex-row gap-4">
                        <button type="submit">Abrir Caja</button>
                        <button onClick={() => setShowModalCierreCaja(true)} type="button">Cerrar Caja</button>
                        <button onClick={() => setShowModalAnularCaja(true)} type="button">Anular Caja</button>
                    </div>
                </div>

            </form>
            {showModalCierreCaja && (

                <div className="modal-background" onClick={() => setShowModalCierreCaja(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h1 className='font-bold border-b text-center'>Cierre de Caja</h1><form onSubmit={handleSubmitCierre}>
                            <div>
                                <label className='font-bold'>Seleccionar Caja:</label>
                                <select className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => setSelectedCajaId(e.target.value)} required>
                                    <option value="">Seleccione una caja</option>
                                    {cajasAbiertas.map((caja) => (
                                        <option key={caja._id} value={caja._id}>
                                            {`Caja - Apertura: ${new Date(caja.fechaApertura).toLocaleString()}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-row items-center gap-4 mt-4'>
                                <label className='font-bold'>Monto Final:</label>
                                <InputText
                                    type="number"
                                    value={montoFinal}
                                    onChange={(e) => setMontoFinal(Number(e.target.value))}
                                    required id={''} label={''} />
                                <Button className='mt-0 border border-gray-300 hover:border-gray-300' type="button" onClick={calcularTotales}>Calcular</Button>
                            </div>
                            <div className='grid grid-cols-3 gap-4 mt-4'>
                                <div className='flex flex-row items-center'>
                                    <label className='font-bold'>Moneda:</label>
                                    <div className='flex flex-row'>
                                        <InputText
                                            type="number"
                                            value={moneda}
                                            onChange={(e) => setMoneda(Number(e.target.value))}
                                            required id={''} label={''} />
                            
                                    </div>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <label className='font-bold'>Billete:</label>
                                    <div className="flex flex-row">
                                        <InputText
                                            type="number"
                                            value={billete}
                                            onChange={(e) => setBillete(Number(e.target.value))}
                                            required id={''} label={''} />
                                        
                                    </div>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <label className='font-bold'>Cheque:</label>
                                    <div className="flex flex-row">
                                        <InputText
                                            type="number"
                                            value={cheque}
                                            onChange={(e) => setCheque(Number(e.target.value))}
                                            required id={''} label={''} />
                                       
                                    </div>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <label className='font-bold'>Tarjeta:</label>
                                    <div className="flex flex-row">
                                        <InputText
                                            type="number"
                                            value={tarjeta}
                                            onChange={(e) => setTarjeta(Number(e.target.value))}
                                            required id={''} label={''} />
                                        
                                    </div>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <label className='font-bold'>Gastos:</label>
                                    <div className="flex flex-row">
                                        <InputText
                                            type="number"
                                            value={gastos}
                                            onChange={(e) => setGastos(Number(e.target.value))}
                                            required id={''} label={''} />
                
                                    </div>
                                </div>
                                setIngresos(Number(e.target.value))
                            </div>
                            <div className="flex justify-center">
                                <Button className='border border-gray-300 hover:border-gray-300' onClick={() => setShowModalCierreCaja(false)} type="submit">Cerrar Caja</Button>
                            </div>
                        </form>
                    </div>
                </div >
            )};
            {showModalAnularCaja && (
                <div className="modal-background" onClick={() => setShowModalAnularCaja(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h1 className='font-bold border-b text-center'>Anulación de Caja</h1>
                        <div className='border rounded pb-2 pt-2'>
                            {cajas.map((caja) => (
                                <div className='flex items-center justify-center' key={caja._id}>
                                    <span>{`Caja - Apertura: ${new Date(caja.fechaApertura).toLocaleString()}`}</span>
                                    <Button className='ml-3 mt-0 border-gray-300' onClick={() => anularCaja(caja._id)}>Anular</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {
                mostrarModalCalcular && (
                    <div className="modal-background" onClick={() => setMostrarModalCalcular(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2 className='text-center font-bold'>Calcular Totales</h2>
                            <div className='border rounded pb-2 pr-2 pl-2 mb-2'>
                                <p className='font-bold'>Total Venta: {totalesVentas !== null ? totalesVentas : 'Cargando...'}</p>
                                <p className='font-bold'>Total Compra: {totalesCompras !== null ? totalesCompras : 'Cargando...'}</p>
                                <div className='font-bold'>
                                    <label>Diferencia: </label>
                                    <span>{diferencia !== null ? diferencia : 'Calculando...'}</span>
                                </div>
                                <div className='font-bold'>
                                    <div className='flex '>
                                        <label className='mt-2 mr-2'>Ingresos Varios:</label>

                                        <InputText
                                            type="number"
                                            value={ingresosVarios}
                                            onChange={(e) => setIngresosVarios(Number(e.target.value))} id={''} label={''}                                        />
                
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center gap-4'>
                                <Button className='border border-gray-300' onClick={() => setDiferencia((totalesVentas || 0) - (totalesCompras || 0) + ingresosVarios)}>Recalcular</Button>
                                <Button className='border border-gray-300' onClick={cerrarModalCalcular}>Cerrar</Button>
                            </div>
                        </div>
                    </div>
                )
            }

            {mensaje && <p>{mensaje}</p>}
        </div >
    );
};

export default CajaComponent;
