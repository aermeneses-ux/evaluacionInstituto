import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTickets, Ticket } from "./context/TicketContext";

export default function FormScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { crearTicket, editarTicket } = useTickets();

    const esEdicion = !!params.id;

    const [nombre, setNombre] = useState(params.nombre as string || "");
    const [asunto, setAsunto] = useState(params.asunto as string || "");
    const [importancia, setImportancia] = useState(params.importancia as string || "baja");
    const [fecha, setFecha] = useState(params.fecha as string || "");
    const [descripcion, setDescripcion] = useState(params.descripcion as string || "");
    const [tipo, setTipo] = useState<"fisico" | "virtual">((params.tipo as "fisico" | "virtual") || "fisico");
    const [factura, setFactura] = useState(params.factura === "true");

    const validarFecha = (valor: string) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/; // dd/mm/aaaa
        return regex.test(valor);
    };

    const handleGuardar = () => {
        if (!validarFecha(fecha)) {
            alert("La fecha debe tener el formato dd/mm/aaaa");
            return;
        }

        const ticket: Ticket = {
            id: params.id as string,
            nombre,
            asunto,
            importancia: importancia as "baja" | "media" | "alta",
            fecha,
            descripcion,
            tipo, // ✅ ya es "fisico" | "virtual"
            factura: factura ? "true" : "false", // ✅ string literal
        };

        if (esEdicion) {
            editarTicket(ticket);
        } else {
            crearTicket({
                nombre,
                asunto,
                importancia: importancia as "baja" | "media" | "alta",
                fecha,
                descripcion,
                tipo,
                factura: factura ? "true" : "false",
            });
        }
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Ticket" : "Nuevo Ticket"}</Text>

            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

            <Text style={styles.label}>Asunto</Text>
            <TextInput style={styles.input} value={asunto} onChangeText={setAsunto} />

            <Text style={styles.label}>Importancia</Text>
            <View style={styles.importanciaContainer}>
                {["baja", "media", "alta"].map((nivel) => (
                    <TouchableOpacity
                        key={nivel}
                        style={[
                            styles.importanciaBtn,
                            importancia === nivel && styles.importanciaBtnActivo,
                        ]}
                        onPress={() => setImportancia(nivel)}
                    >
                        <Text style={styles.importanciaText}>{nivel.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Fecha (dd/mm/aaaa)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: 03/06/2026"
                value={fecha}
                onChangeText={setFecha}
            />

            <Text style={styles.label}>Tipo</Text>
            <View style={styles.importanciaContainer}>
                {["fisico", "virtual"].map((opcion) => (
                    <TouchableOpacity
                        key={opcion}
                        style={[
                            styles.importanciaBtn,
                            tipo === opcion && styles.importanciaBtnActivo,
                        ]}
                        onPress={() => setTipo(opcion as "fisico" | "virtual")}
                    >
                        <Text style={styles.importanciaText}>{opcion.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Factura</Text>
            <Switch value={factura} onValueChange={setFactura} />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
                <Text style={styles.botonTexto}>{esEdicion ? "Guardar Cambios" : "Crear Ticket"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 20 },
    titulo: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    label: { color: "white", fontSize: 16, marginTop: 15 },
    input: { backgroundColor: "#333", color: "white", borderRadius: 10, padding: 12, fontSize: 16 },
    textArea: { height: 100, textAlignVertical: "top" },
    importanciaContainer: { flexDirection: "row", gap: 10 },
    importanciaBtn: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: "#333", alignItems: "center" },
    importanciaBtnActivo: { borderWidth: 2, borderColor: "white" },
    importanciaText: { color: "white", fontWeight: "bold" },
    botonGuardar: { backgroundColor: "orange", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 30 },
    botonTexto: { color: "white", fontSize: 18, fontWeight: "bold" },
});
