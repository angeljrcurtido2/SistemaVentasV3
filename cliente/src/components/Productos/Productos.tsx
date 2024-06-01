import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fondo from '../../assets/fondo4.jpg';
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaBookReader } from "react-icons/fa";
import { TiInfoOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import './style.css';



const Productos = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterProductName, setFilterProductName] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [highlightExpired, setHighlightExpired] = useState(false);
    const [highlightLowStock, setHighlightLowStock] = useState(false);
    const [selectedIva, setSelectedIva] = useState('all');

    const navigate = useNavigate();
    useEffect(() => {
        let filtered = products;

        if (filterProductName) {
            filtered = filtered.filter(product => product.nombreProducto.toLowerCase().includes(filterProductName.toLowerCase()));
        }

        if (filterCategory) {
            filtered = filtered.filter(product => product.categoria.toLowerCase().includes(filterCategory.toLowerCase()));
        }

        if (highlightExpired) {
            filtered = filtered.filter(product => new Date() > new Date(product.fechaVencimiento));
        }

        if (highlightLowStock) {
            filtered = filtered.filter(product => product.stockActual <= product.stockMinimo);
        }

        if (selectedIva !== 'all') {
            filtered = filtered.filter(product => {
                let productIva = product.Iva;
                if (typeof productIva === 'string') {
                    productIva = productIva.replace('%', ''); // quitar el signo de porcentaje si existe
                }
                return productIva === selectedIva;
            });
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [products, filterProductName, filterCategory, highlightExpired, highlightLowStock, selectedIva]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const getProducts = async () => {
        const response = await fetch('http://localhost:3001/productos');
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const [nombreProducto, setNombreProducto] = useState('');
    const [precioCompra, setPrecioCompra] = useState<number | ''>('');
    const [precioVenta, setPrecioVenta] = useState<number | ''>('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [stockMinimo, setStockMinimo] = useState<number | ''>('');
    const [Iva, setIva] = useState('');
    const [stockActual, setStockActual] = useState<number | ''>('');
    const [ubicacion, setUbicacion] = useState('');
    const [codigoBarra, setCodigoBarra] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');
    const [categoria, setCategoria] = useState('Universal');

    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const getProveedores = async () => {
        const response = await fetch('http://localhost:3001/proveedor');
        const data = await response.json();
        setProveedores(data);
    }

    const getCategorias = async () => {
        const response = await fetch('http://localhost:3001/categorias');
        const data = await response.json();
        setCategorias(data);
    }

    useEffect(() => {
        getProveedores();
        getCategorias();
    }, []);

    const handleEdit = (_id: string) => {
        navigate(`/editarproductos/${_id}`);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const producto = {
            nombreProducto,
            codigoBarra,
            precioCompra: precioCompra === '' ? 0 : precioCompra,
            precioVenta: precioVenta === '' ? 0 : precioVenta,
            fechaVencimiento,
            stockMinimo: stockMinimo === '' ? 0 : stockMinimo,
            Iva,
            stockActual: stockActual === '' ? 0 : stockActual,
            ubicacion,
            proveedor,
            unidadMedida,
            categoria
        };

        // Verificar que los campos obligatorios estén completos
        if (!nombreProducto || !codigoBarra || fechaVencimiento === '' || Iva === '' || !ubicacion || !proveedor || !unidadMedida || !categoria) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            await axios.post('http://localhost:3001/productos', producto);
            alert('Producto creado con éxito');
            getProducts();
            setNombreProducto('');
            setCodigoBarra('');
            setPrecioCompra('');
            setPrecioVenta('');
            setFechaVencimiento('');
            setStockMinimo('');
            setIva('');
            setStockActual('');
            setUbicacion('');
            setProveedor('');
            setUnidadMedida('');
            setCategoria('');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form className="w-full h-full" style={{ backgroundImage: `url(${fondo})` }}>
            <h1 className="text-4xl font-bold text-center text-gray-800 py-2 border-b w-full ">Crear Producto</h1>
            <div className="grid grid-cols-3 gap-4 ml-9 mr-9">
                <div className="mb-5">
                    <label htmlFor="nombreProducto">Nombre del producto</label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" id="nombreProducto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
                    <label htmlFor="nombreProducto">Codigo de Barra del producto</label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" id="codigoBarra" value={codigoBarra} onChange={(e) => setCodigoBarra(e.target.value)} />
                    <label htmlFor="precioCompra">Precio de compra</label>
                    <div className="flex">
                        <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" id="precioCompra" value={precioCompra} onChange={(e) => setPrecioCompra(Number(e.target.value))} />
                        <button type='button' className='ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ' onClick={() => setPrecioCompra('')}><AiFillDelete /></button>
                    </div>
                    <label htmlFor="precioVenta">Precio de venta</label>
                    <div className='flex'>
                        <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" id="precioVenta" value={precioVenta} onChange={(e) => setPrecioVenta(Number(e.target.value))} />
                        <button type='button' className='ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ' onClick={() => setPrecioVenta('')}><AiFillDelete /></button>
                    </div>

                </div>
                <div className="mb-5">
                    <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="date" id="fechaVencimiento" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />

                    <label htmlFor="stockMinimo">Stock mínimo</label>
                    <div className='flex'>
                        <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" id="stockMinimo" value={stockMinimo} onChange={(e) => setStockMinimo(Number(e.target.value))} />
                        <button type='button' className='ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ' onClick={() => setStockMinimo('')}><AiFillDelete /></button>
                    </div>
                    <select className="shadow-sm w-[20%] mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={(e) => setIva(e.target.value)} id="Iva">
                        <option value='all'>Iva</option>
                        <option value='10%'>10%</option>
                        <option value='5%'>5%</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="stockActual">Stock actual</label>
                    <div className='flex'>
                        <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" id="stockMinimo" value={stockActual} onChange={(e) => setStockActual(Number(e.target.value))} />
                        <button type='button' className='ml-2 className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" ' onClick={() => setStockActual('')}><AiFillDelete /></button>
                    </div>
                    <label htmlFor="ubicacion">Ubicación</label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                    <select className="shadow-sm mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" id="categoria" value={proveedor} onChange={(e) => setProveedor(e.target.value)}>
                        <option value="">Selecciona un Proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor._id} value={proveedor.nombreEmpresa}>{proveedor.nombreEmpresa}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-5">
                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" name="unidadMedida" id="unidadMedida" value={unidadMedida} onChange={(e) => setUnidadMedida(e.target.value)} >
                        <option value="">
                            Selecciona Unidad de Medida:
                        </option>
                        <option value="Unidad">
                            Unidad
                        </option>
                        <option value="Kilogramo">
                            Kilogramo
                        </option>
                        <option value="Litro">
                            Litro
                        </option>
                    </select>
                </div>
                <div className="mb-5">
                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Selecciona una Categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none" type="button" onClick={handleSubmit}>Crear producto</button>
                <button className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none ml-4" type="button" onClick={() => setShowModal(true)}>Ver Productos</button>
            </div>
            {showModal && (
                <div className="modal-background" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between mb-2">
                            <input type="text" placeholder="Filtrar por nombre de producto" onChange={(e) => setFilterProductName(e.target.value)} />
                            <input type="text" placeholder="Filtrar por categoría" onChange={(e) => setFilterCategory(e.target.value)} />
                            <div className='flex'>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" onChange={(e) => setHighlightExpired(e.target.checked)} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Vencidos</span>
                                </label>
                                <label className="inline-flex items-center cursor-pointer ml-4">
                                    <input type="checkbox" className="sr-only peer" onChange={(e) => setHighlightLowStock(e.target.checked)} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-300"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Stock Mínimo</span>
                                </label>
                                <select onChange={(e) => setSelectedIva(e.target.value)}>
                                    <option value="all">Iva</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                </select>
                                <div className='mt-1'>
                                    <TiInfoOutline className="ml-2 cursor-pointer" onClick={() => setShowModal2(true)} />
                                </div>
                            </div>
                        </div>
                        <table className='table-auto border w-full'>
                            <thead>
                                <tr className='bg-gray-800 text-white'>
                                    <th className="border-r">N°</th>
                                    <th className="border-r">Producto</th>
                                    <th className="border-r">Categoria</th>
                                    <th className="border-r">P.Compra</th>
                                    <th className="border-r">P.Venta</th>
                                    <th className="border-r">Fecha Venc</th>
                                    <th className="border-r">Stock Min</th>
                                    <th className="border-r">Stock Act</th>
                                    <th className="border-r">Iva</th>
                                    <th className="border-r">Ubicación</th>
                                    <th className="border-r">Proveedor</th>
                                    <th className="border-r">Un.Medida</th>
                                    <th className="border-r">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='border'>
                                {currentProducts.map((product, index) => {
                                    const date = new Date(product.fechaVencimiento);
                                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                    const isExpired = new Date() > date;
                                    const isLowStock = product.stockActual <= product.stockMinimo;


                                    return (
                                        <tr key={product._id} className={`${isExpired && highlightExpired ? 'bg-red-300' : ''} ${isLowStock && highlightLowStock ? 'bg-yellow-300' : ''}`}>
                                            <td className="border">{index + 1}</td>
                                            <td className="border">{product.nombreProducto}</td>
                                            <td className="border">{product.categoria}</td>
                                            <td className="border">{product.precioCompra}</td>
                                            <td className="border">{product.precioVenta}</td>
                                            <td className="border">{formattedDate}</td>
                                            <td className="border">{product.stockMinimo}</td>
                                            <td className="border">{product.stockActual}</td>
                                            <td className="border">{product.Iva}</td>
                                            <td className="border">{product.ubicacion}</td>
                                            <td className="border">{product.proveedor}</td>
                                            <td className="border">{product.unidadMedida}</td>
                                            <td className="border">
                                                <button
                                                    className="shadow-xl hover:bg-gray-800 hover:text-white transform hover:scale-70 transition-all duration-200 hover:border-none ml-4 mr-4 mt-1 mb-1 text-sm"
                                                    type='button'
                                                    onClick={() => handleEdit(product._id)} // Añade un manejador de eventos onClick aquí
                                                >
                                                    <FiEdit />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="flex justify-center">
                            <button type='button' className='shadow-xl mt-2 mr-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                <IoArrowUndoSharp />
                            </button>
                            <span className='font-bold text-xl mt-3'>{currentPage}</span>
                            <button type='button' className='shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}>
                                <IoArrowRedo />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showModal2 && (
                <div className="modal-background" onClick={() => setShowModal2(false)}>
                    <div className="modal-content flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                        <h1 className='font-bold border-b w-full text-center mb-2'>Informaciones</h1>
                        <div className='items-start'>
                            <p className="mb-4 flex"><FaBookReader className='mt-1 mr-2' />La opción 'vencido' al activar va resaltar en rojo todos productos con fecha de vencimiento cumplidos y pasados.</p>
                            <p className="mb-4 flex"><FaBookReader className='mt-1 mr-2' />La opción 'Stock Minimo' al activar va resaltar en amarillo todos productos con stock minimos cumplidos y pasados.</p>
                            <p className="mb-4 flex"><FaBookReader className='mt-1 mr-2' />La opción 'Iva' al seleccionar un valor va filtrar los productos con el IVA seleccionado.</p>
                        </div>
                        <button className='shadow-xl mt-2 ml-2  hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none' type='button' onClick={() => setShowModal2(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default Productos;