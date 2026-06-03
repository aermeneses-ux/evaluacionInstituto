import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useTickets } from "./context/TicketContext";

const coloresImportancia = {
    baja: "green",
    media: "orange",
    alta: "red",
};

export default function HomeScreen() {
    const { tickets, eliminarTicket } = useTickets(); 

    return (
        <View style={styles.container}>
            <FlatList
                data={tickets}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <Text style={styles.vacio}>No hay tickets aún</Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.nombre}>{item.nombre}</Text>
                            <View style={[styles.badge, { backgroundColor: coloresImportancia[item.importancia] }]}>
                                <Text style={styles.badgeText}>{item.importancia.toUpperCase()}</Text>
                            </View>
                        </View>
                        <Text style={styles.asunto}>{item.asunto}</Text>
                        <Text style={styles.descripcion}>{item.descripcion}</Text>
                        <Text style={styles.fecha}>{item.fecha}</Text>
                        <View style={styles.botonesRow}>
                            <Link
                                href={{ pathname: "/FormScreen", params: { id: item.id, nombre: item.nombre, asunto: item.asunto, importancia: item.importancia, fecha: item.fecha, descripcion: item.descripcion } }}
                                style={styles.botonEditar}
                            >
                                <Text style={styles.botonTexto}>Editar</Text>
                            </Link>
                            <TouchableOpacity
                                style={styles.botonEliminar}
                                onPress={() => eliminarTicket(item.id!)}
                            >
                                <Text style={styles.botonTexto}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Link href="/FormScreen" style={styles.botonCrear}>
                <Text style={styles.botonCrearTexto}>+ Crear Ticket</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    lista: { padding: 15, paddingBottom: 100 },
    card: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 15, marginBottom: 15 },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    nombre: { color: "white", fontSize: 18, fontWeight: "bold" },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
    asunto: { color: "#ccc", fontSize: 15, marginBottom: 5 },
    descripcion: { color: "#888", fontSize: 13, marginBottom: 5 },
    fecha: { color: "#555", fontSize: 12, marginBottom: 10 },
    botonesRow: { flexDirection: "row", gap: 10 },
    botonEditar: { flex: 1, backgroundColor: "orange", padding: 10, borderRadius: 8, alignItems: "center" },
    botonEliminar: { flex: 1, backgroundColor: "#c0392b", padding: 10, borderRadius: 8, alignItems: "center" },
    botonTexto: { color: "white", fontWeight: "bold" },
    botonCrear: { position: "absolute", bottom: 25, left: 20, right: 20, backgroundColor: "orange", padding: 15, borderRadius: 12, alignItems: "center" },
    botonCrearTexto: { color: "white", fontSize: 18, fontWeight: "bold" },
    vacio: { color: "#888", textAlign: "center", marginTop: 50, fontSize: 16 },
});