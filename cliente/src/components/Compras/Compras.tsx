import React, { useState, useEffect, useMemo } from 'react';
import InputText from '../Productos/InputText';
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import Button from '../Productos/Button';
import CrearProductos from '../Productos/Productos'
import { GrCheckboxSelected } from "react-icons/gr";
import { BsInfoCircleFill } from "react-icons/bs";
import axios from 'axios';

const Compras: React.FC = () => {
    const [proveedor, setProveedor] = useState('');
    const [productoId, setProductoId] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalProductos, setShowModalProductos] = useState(false);
    const [precioCompra, setPrecioCompra] = useState('');
     // Agregar estado para las cajas abiertas
const [cajasAbiertas, setCajasAbiertas] = useState([]);

    const [Telefono, setTelefono] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [compras2, setCompras2] = useState([]);
    const [facturaNumero, setFacturaNumero] = useState('');
    const [showModalCompras, setShowModalCompras] = useState(false);
    const [showModalCrearProducto, setShowModalCrearProducto] = useState(false);


    const productsPerPage = 5;

    const [compras, setCompras] = useState([]); // Nuevo estado para almacenar las compras
    // Crea un nuevo estado para los detalles del proveedor
    const [proveedorDetalles, setProveedorDetalles] = useState({ proveedor: '', facturaNumero: '', Telefono: '', Direccion: '' });

    useEffect(() => {
        axios.get('http://localhost:3001/caja/abiertas')
            .then(response => {
                setCajasAbiertas(response.data);
            })
            .catch(error => {
                console.error('Error fetching cajas abiertas:', error);
            });
    }, []);

    // Verificar si hay una caja abierta para el día actual
const hayCajaAbiertaHoy = cajasAbiertas.some(caja => {
    const fechaApertura = new Date(caja.fechaApertura);
    const hoy = new Date();
    return fechaApertura.getDate() === hoy.getDate() &&
        fechaApertura.getMonth() === hoy.getMonth() &&
        fechaApertura.getFullYear() === hoy.getFullYear();
});
    
    
    // Actualiza el estado proveedorDetalles cuando cambie alguno de sus valores
    useEffect(() => {
        setProveedorDetalles({
            proveedor,
            facturaNumero,
            Telefono,
            Direccion
        });
    }, [proveedor, facturaNumero, Telefono, Direccion]);

    const handleAddProduct = () => {
        // Verifica que todos los campos estén llenos
        if (!productoId || !nombreProducto || !cantidad || !precioCompra) {
            alert('Por favor, completa todos los campos del producto');
            return;
        }

        const producto = {
            productoId,
            nombreProducto,
            cantidad,
            precioCompra
        };
        setCompras(prevCompras => [...prevCompras, producto]);
        setProductoId('');
        setNombreProducto('');
        setCantidad('');
        setPrecioCompra('');
    };

    const handleSubmit = async () => {
        // Verifica que todos los campos estén llenos
        if (!proveedorDetalles.proveedor || !proveedorDetalles.facturaNumero || !proveedorDetalles.Telefono || !proveedorDetalles.Direccion || compras.length === 0) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            // Combina los productos y los detalles del proveedor en un solo objeto
            const data = { productos: compras, ...proveedorDetalles };
            const response = await axios.post('http://localhost:3001/compras', data);
            console.log(response.data);
            alert('Compras realizadas con éxito');
            setCompras([]); // Vaciamos la lista de productos
            setProveedorDetalles({ proveedor: '', facturaNumero: '', Telefono: '', Direccion: '' }); // Vaciamos los detalles del proveedor
        } catch (error) {
            console.error('Error al realizar las compras:', error);
        }
    };
    const handleShowModal = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proveedor');
            console.log(response.data);
            setProveedores(response.data);
            setShowModal(true);
        }
        catch (error) {
            console.error('Error al obtener los proveedores:', error);
        }


    };
    const handleShowModalProductos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/productos');
            console.log(response.data);
            setProductos(response.data);
            setShowModalProductos(true);
        }
        catch (error) {
            console.error('Error al obtener los productos:', error);
        }

    };
    // Define la función que se ejecuta al pulsar el botón
    const handleShowModalCompras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/compras');
            setCompras2(response.data);
            setShowModalCompras(true);
        } catch (error) {
            console.error('Error al obtener las compras:', error);
        }
    };



    //Eliminar Producto Agregado 
    const handleDeleteProduct = (index) => {
        const newCompras = [...compras];
        newCompras.splice(index, 1);
        setCompras(newCompras)
    }

    // Define la función que se ejecuta al cerrar el modal

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleCloseModalProductos = () => {
        setShowModalProductos(false);
    }
    const handleDeleteCompras = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/compras/${id}`);
            //Actualizar la lista de compras despues de eliminar
            handleShowModalCompras();

        } catch (error) {
            console.error('Error al eliminar la compra', error)
        }
    }

    // Divide los productos en páginas
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

    // Define la cantidad de compras por página
    const comprasPerPage = 5;
    //Filtrar por numero de factura
    const handleFacturaNumeroChange = (event) => {
        setFacturaNumero(event.target.value);
    };
    // Aplica el filtro a todas las compras
    const allFilteredCompras = useMemo(() => {
        if (facturaNumero === '') {
            return compras2;
        } else {
            return compras2.filter(compra => compra.facturaNumero === facturaNumero);
        }
    }, [facturaNumero, compras2]);

    // Divide las compras en páginas
    const indexOfLastCompra = currentPage * comprasPerPage;
    const indexOfFirstCompra = indexOfLastCompra - comprasPerPage;
    const filteredCompras = allFilteredCompras.slice(indexOfFirstCompra, indexOfLastCompra);


    return (
        hayCajaAbiertaHoy ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <h1 className="text-4xl font-bold text-center text-gray-800 py-2 border-b w-full ">Crear Compras</h1>
            <div className="grid grid-cols-3 gap-4 ml-9 mr-9">
                <div className='flex'>
                    <div className='flex-1'>
                        <InputText
                                type="text"
                                label='Proveedor'
                                value={proveedor}
                                onChange={(e) => setProveedor(e.target.value)}
                                placeholder="Proveedor"
                                className="flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" // Añade esta línea
                                id={''}                        />
                    </div>
                    <Button className='mt-6' type="button" onClick={handleShowModal}><GrCheckboxSelected /></Button>
                </div>
                <div className='flex'>
                    <div className='flex-1'>
                        <InputText
                                type="text"
                                label='Producto'
                                value={nombreProducto} // Cambiado a nombreProducto
                                placeholder="Nombre del producto" id={''} />
                    </div>
                    <Button className='mt-6' type="button" onClick={handleShowModalProductos}><GrCheckboxSelected /></Button>
                </div>
                <InputText type="number" label="Cantidad" value={cantidad.toString()} onChange={(e) => setCantidad(e.target.value)} placeholder="Cantidad" id={''} />
                <div className='flex'>
                    <InputText type="number" label="Precio Compra" value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value.toString())} placeholder="Precio de compra" id={''} />
                </div>
                <InputText type="text" label="Número de factura" value={facturaNumero} onChange={(e) => setFacturaNumero(e.target.value)} placeholder="Número de factura" id={''} />
                <InputText type="text" label="Teléfono" value={Telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono del proveedor por cualquier eventualidad" id={''} />
                <InputText type="text" label="Dirección" value={Direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" id={''} />

            </div>
            <div className="flex justify-center">
                <Button type="button" onClick={handleAddProduct}>Agregar Producto</Button>
                <Button className='mr-5 ml-5' type="submit">Realizar Compras</Button>
                <Button onClick={handleShowModalCompras} type="button" className='mr-4'>Ver Compras</Button>
            </div>
            {/* Nueva tabla para mostrar los productos */}
            <div className="flex justify-center items-center mt-9 font-bold ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 font-bold text-center '>
                        <tr>
                            <th className='px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200'>N°</th>
                            <th className='px-6 py-3'>Nombre del Producto</th>
                            <th className='px-6 py-3 bg-gray-50 dark:bg-gray-800'>Cantidad</th>
                            <th className='px-6 py-3'>Precio de Compra</th>
                            <th className='px-6 py-3 bg-gray-50 dark:bg-gray-800 text-xs'>Total</th>
                            <th className='px-6 py-3'>Acción</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {compras.map((compra, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='border'>{compra.nombreProducto}</td>
                                <td className='border'>{compra.cantidad}</td>
                                <td className='border'>{compra.precioCompra}</td>
                                <td className='border'>{compra.precioCompra * compra.cantidad}</td>
                                <td className='border text-center pb-2'><Button onClick={() => handleDeleteProduct(index)} type='button'><AiFillDelete /></Button></td>
                            </tr>
                        ))}
                        <tr>
                            <td className='text-xl border-t-2 border-gray-100 text-center'>Total</td>
                            <td className=' text-xl'>
                                {compras.reduce((total, compra) => total + compra.precioCompra * compra.cantidad, 0)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal-background" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h1 className='border-b font-bold text-center text-'>Proveedores</h1>
                        <table className='table-auto border w-full'>
                            <thead>
                                <tr className='bg-gray-800 text-white'>
                                    <th className="border-r">N°:</th>
                                    <th className="border-r">Nombre:</th>
                                    <th className="border-r">RUC:</th>
                                    <th className="border-r">Dirección:</th>
                                    <th className="border-r">Teléfono:</th>
                                    <th className='border-r'>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proveedores.map((proveedor, index) => (
                                    <tr key={proveedor._id}>
                                        <td className="border">{index + 1}</td>
                                        <td className="border">{proveedor.nombreEmpresa}</td>
                                        <td className="border">{proveedor.ruc}</td>
                                        <td className="border">{proveedor.direccion}</td>
                                        <td className="border">{proveedor.telefono}</td>
                                        <td> <Button
                                            type='button'
                                            onClick={() => {
                                                setProveedor(proveedor.nombreEmpresa);
                                                setShowModal(false);
                                            }}
                                        >
                                            Seleccionar
                                        </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Button onClick={handleCloseModal}>Cerrar</Button>
                    </div>
                </div>
            )}
            {showModalProductos && (
                <div className="modal-background" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h1 className='border-b font-bold text-center text-'>Productos</h1>
                        <table className='table-auto border w-full'>
                            <thead>
                                <tr className='bg-gray-800 text-white'>
                                    <th className="border-r">N°:</th>
                                    <th className="border-r">Nombre:</th>
                                    <th className="border-r">Categoria:</th>
                                    <th className="border-r">P.Compra:</th>
                                    <th className="border-r">P.Venta:</th>
                                    <th className='border-r'>F.Venc.:</th>
                                    <th className='border-r'>S.Min.:</th>
                                    <th className='border-r'>S.Act.:</th>
                                    <th className='border-r'>Iva.:</th>
                                    <th className='border-r'>Proveedor.:</th>
                                    <th className='border-r'>U.Medida:</th>
                                    <th className='border-r'>Acciones:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((producto, index) => (
                                    <tr key={producto._id}>
                                        <td className="border">{index + 1}</td>
                                        <td className="border">{producto.nombreProducto}</td>
                                        <td className="border">{producto.categoria}</td>
                                        <td className="border">{producto.precioCompra}</td>
                                        <td className="border">{producto.precioVenta}</td>
                                        <td className="border">{producto.fechaVencimiento}</td>
                                        <td className="border">{producto.stockMinimo}</td>
                                        <td className="border">{producto.stockActual}</td>
                                        <td className="border">{producto.Iva}</td>
                                        <td className="border">{producto.proveedor}</td>
                                        <td className="border">{producto.unidadMedida}</td>
                                        <Button
                                            type='button'
                                            onClick={() => {
                                                setProductoId(producto._id);
                                                setNombreProducto(producto.nombreProducto);
                                                setShowModalProductos(false);
                                            }}
                                        >
                                            Seleccionar
                                        </Button>

                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center">
                            <button type='button' className='shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                <IoArrowUndoSharp />
                            </button>
                            <span className='font-bold text-xl mt-3'>{currentPage}</span>
                            <button type='button' className='shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(productos.length / productsPerPage)}>
                                <IoArrowRedo />
                            </button>
                        </div>
                        <Button onClick={handleCloseModalProductos}>Cerrar</Button>
                        <Button onClick={() => setShowModalCrearProducto(true)}>CrearProductoNuevo</Button>
                    </div>
                </div>
            )}
            {showModalCrearProducto && (
                <div className="modal-background" onClick={() => setShowModalCrearProducto(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div onClick={() => setShowModalCrearProducto(false)}>
                        <CrearProductos  />
                        </div>
                    </div>
                </div>
            )}
            {showModalCompras && (
                <div className="modal-background" onClick={() => setShowModalCompras(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h1 className='border-b font-bold text-center text-'>Compras</h1>

                        <div className='flex'>
                            <div className='flex-1'>
                                <InputText id="facturaNumero" label="FacturaNumero" value={facturaNumero} onChange={handleFacturaNumeroChange} />
                            </div>
                            <Button><BsInfoCircleFill /></Button>
                        </div>
                        <table className='table-auto border w-full'>
                            <thead>
                                <tr className='bg-gray-800 text-white'>
                                    <th>Proveedor</th>
                                    <th>FacturaNumero</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio de compra</th>
                                    <th>Total de la compra</th>
                                    <th>Fecha</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCompras.map(compra => (
                                    <tr key={compra._id}>
                                        <td className="border">{compra.proveedor}</td>
                                        <td className="border">{compra.facturaNumero}</td>
                                        <td className="border">{compra.nombreProducto}</td>
                                        <td className="border">{compra.cantidad}</td>
                                        <td className="border">{compra.precioCompra}</td>
                                        <td className="border">{compra.precioCompraTotal}</td>
                                        <td className="border">{new Date(compra.fecha).toLocaleDateString()}</td>
                                        <td className="border"><Button onClick={() => handleDeleteCompras(compra._id)} type='button'><AiFillDelete /></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center">
                            <button type='button' className='shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                <IoArrowUndoSharp />
                            </button>
                            <span className='font-bold text-xl mt-3'>{currentPage}</span>
                            <button type='button' className='shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(compras2.length / comprasPerPage)}>
                                <IoArrowRedo />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
  ) : (
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">No hay caja abierta para el día de hoy</h1>
    </div>
)
);
};

export default Compras;