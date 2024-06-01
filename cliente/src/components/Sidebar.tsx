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
    { name: 'Inicio', icon: <RiDashboard3Fill />, route: '/' },
    { name: 'Categorias', icon: <RiDashboard3Fill />, route: '/categoria' },
    { name: 'Productos', icon: <BiCategoryAlt />, route: '/productos' },
    { name: 'Proveedores', icon: <FaBox/>, route: '/proveedor' },
    { name: 'Compras', icon: <FaMoneyBillTransfer/>, route: '/compras' },
    { name: 'Ventas', icon: <FaMoneyBillTransfer />, route: '/ventas' },
    { name: 'Historial Ventas', icon: <MdManageHistory/>, route: '/historialventas' },
    { name: 'Historial Compras', icon: <MdManageHistory />, route: '/historialcompras' },
    { name: 'Apertura de Caja', icon: <FaDropbox />, route: '/caja' },
    { name: 'Historial Aperturas', icon: <RiFolderHistoryFill/>, route: '/historialcaja' },
    { name: 'Actualizar Datos', icon: <MdManageHistory/>, route: '/datosempresa' },
    { name: 'Agregar Clientes', icon: <MdManageHistory/>, route: '/datoscliente' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-2xl flex"><BsMenuButtonWide className="mt-2" size={20} />Menú</h1>
      <nav>
      {menuItems.map((item, index) => (
          <Link key={index} to={item.route} className="flex items-center hover:bg-gray-700 hover:rounded-md py-1 text-gray-200 mb-3 mt-2 hover:text-white px-4">
            {typeof item === 'string' ? item : (
              <>
                {item.icon}
                {item.name}
              </>
            )}
          </Link>
      ))}
      </nav>
    </div>
  );
};

export default Sidebar;