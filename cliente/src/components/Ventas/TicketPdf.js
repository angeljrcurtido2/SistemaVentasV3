import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    centeredText: {
        textAlign: 'center',
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "33%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 17
    }
});
const TicketPDF = ({ venta }) => {
    return (_jsx(Document, { children: _jsxs(Page, { size: "A4", style: styles.page, children: [_jsxs(View, { style: styles.section, children: [_jsxs(Text, { style: styles.centeredText, children: ["Comercial: ", venta.comercial] }), _jsxs(Text, { style: styles.centeredText, children: ["R.U.C: ", venta.rucempresa] }), _jsxs(Text, { style: styles.centeredText, children: ["N\u00FAmero de Timbrado: ", venta.numeroTimbrado] }), _jsxs(Text, { style: styles.centeredText, children: ["Tel\u00E9fono: ", venta.telefono] }), _jsxs(Text, { style: styles.centeredText, children: ["Direcci\u00F3n: ", venta.direccion] }), _jsxs(Text, { children: ["Cliente: ", venta.cliente] }), _jsxs(Text, { children: ["R.U.C: ", venta.ruccliente] }), _jsxs(Text, { children: ["N\u00B0 Interno: ", venta.numeroInterno] }), _jsxs(Text, { children: ["N\u00B0 Factura: ", venta.numeroFactura] }), _jsxs(Text, { children: ["Fecha Venta: ", new Date(venta.fechaVenta).getDate() + '/' +
                                    (new Date(venta.fechaVenta).getMonth() + 1) + '/' +
                                    new Date(venta.fechaVenta).getFullYear()] })] }), _jsxs(View, { style: styles.section, children: [_jsx(Text, { style: styles.centeredText, children: "Productos" }), _jsxs(View, { style: styles.table, children: [_jsxs(View, { style: styles.tableRow, children: [_jsx(View, { style: styles.tableCol, children: _jsx(Text, { style: styles.tableCell, children: "Producto" }) }), _jsx(View, { style: styles.tableCol, children: _jsx(Text, { style: styles.tableCell, children: "Cantidad" }) }), _jsx(View, { style: styles.tableCol, children: _jsx(Text, { style: styles.tableCell, children: "Precio Unit." }) })] }), venta.productos.map((producto, index) => (_jsxs(View, { style: styles.tableRow, children: [_jsx(View, { style: styles.tableCol, children: _jsx(Text, { style: styles.tableCell, children: producto.nombreProducto }) }), _jsx(View, { style: styles.tableCol, children: _jsx(Text, { style: styles.tableCell, children: producto.cantidad }) }), _jsx(View, { style: styles.tableCol, children: _jsx(Text, { style: styles.tableCell, children: producto.precioVenta }) })] }, index)))] })] }), _jsxs(View, { style: styles.section, children: [_jsxs(Text, { children: ["Total: ", venta.PrecioVentaTotal.toLocaleString('es')] }), _jsxs(Text, { children: ["Iva 10%: ", venta.Iva10.toFixed(2)] }), _jsxs(Text, { children: ["Iva 5%: ", venta.Iva5.toFixed(2)] }), _jsx(Text, { style: styles.centeredText, children: "\u00A1Gracias por la Preferencia!" })] })] }) }));
};
export default TicketPDF;
