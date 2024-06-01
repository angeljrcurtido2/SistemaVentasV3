
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Categoria from './components/Categoria'
import Productos from './components/Productos/Productos'
import EditarProductos from './components/Productos/EditarProductos'
import Proveedor from './components/Productos/Proveedor'
import Caja from './components/Caja/Caja'
import EditarProveedor from './components/Productos/EditarProveedor'
import HistorialCaja from './components/Caja/HistorialCaja'
import DatosEmpresa from './components/DatosEmpresa/DatosEmpresa'
import DatosCliente from './components/DatosCliente/DatosCliente'
import HistorialVentas from './components/HistorialVentas/HistorialVentas'
import HistorialCompras from './components/HistorialCompras/HistorialCompras'
import Dashboard from './components/Dashboard/Dahsboard'
import Ventas from './components/Ventas/Ventas'
import Compras from './components/Compras/Compras'
import './App.css'

function App() {
  return (
    <Router>
    <div className="flex h-screen">
      <div className='w-64'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <Routes>

          <Route path="/categoria" element={<Categoria />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/proveedor" element={<Proveedor />} />
          <Route path="/compras" element={<Compras/>}/>
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/datosempresa" element={<DatosEmpresa />} />
          <Route path="/datoscliente" element={<DatosCliente />} />
          <Route path="/historialcompras" element={<HistorialCompras />} />
          <Route path="/historialcaja" element={<HistorialCaja/>}/>
          <Route path="/historialventas" element={<HistorialVentas />} />
          <Route path="/" element ={<Dashboard/>} />
          <Route path="/editarproductos/:id" element={<EditarProductos/>} />
          <Route path="/editarproveedor/:id" element={<EditarProveedor/>} />
        </Routes>
      </div>
    </div>
  </Router>
  )
}

export default App
