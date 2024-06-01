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
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.centeredText}>Comercial: {venta.comercial}</Text>
                    <Text style={styles.centeredText}>R.U.C: {venta.rucempresa}</Text>
                    <Text style={styles.centeredText}>Número de Timbrado: {venta.numeroTimbrado}</Text>
                    <Text style={styles.centeredText}>Teléfono: {venta.telefono}</Text>
                    <Text style={styles.centeredText}>Dirección: {venta.direccion}</Text>
                    <Text>Cliente: {venta.cliente}</Text>
                    <Text>R.U.C: {venta.ruccliente}</Text>               
                    <Text>N° Interno: {venta.numeroInterno}</Text>
                    <Text>N° Factura: {venta.numeroFactura}</Text>
                    <Text>Fecha Venta: {
                        new Date(venta.fechaVenta).getDate() + '/' +
                        (new Date(venta.fechaVenta).getMonth() + 1) + '/' +
                        new Date(venta.fechaVenta).getFullYear()
                    }
                    </Text>

                </View>
                <View style={styles.section}>
                    <Text style={styles.centeredText}>Productos</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Producto</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Cantidad</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Precio Unit.</Text>
                            </View>
                        </View>
                        {venta.productos.map((producto, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{producto.nombreProducto}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{producto.cantidad}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{producto.precioVenta}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.section}>
                    <Text>Total: {venta.PrecioVentaTotal.toLocaleString('es')}</Text>
                    <Text>Iva 10%: {venta.Iva10.toFixed(2)}</Text>
                    <Text>Iva 5%: {venta.Iva5.toFixed(2)}</Text>
                    <Text style={styles.centeredText}>¡Gracias por la Preferencia!</Text>
                </View>
            </Page>
        </Document>
    );
};

export default TicketPDF;