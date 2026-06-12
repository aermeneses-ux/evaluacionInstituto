import { StyleSheet } from "react-native";

export const evaluationStyles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: "600", color: "#333", marginBottom: 20, textAlign: "center" },
    subtitle: { fontSize: 18, fontWeight: "500", marginTop: 30, marginBottom: 10, color: "#555" },
    topic: { fontSize: 16, fontStyle: "italic", marginBottom: 20, color: "#444" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#fff" },
    card: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: "#ddd", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    buttonRowLeft: { flexDirection: "row", justifyContent: "flex-start", marginTop: 10 },
    button: { backgroundColor: "#eee", padding: 12, borderRadius: 6, width: 50, alignItems: "center", marginRight: 8 },
    buttonGreen: { backgroundColor: "#4CAF50" },
    buttonYellow: { backgroundColor: "#FFD700" },
    buttonRed: { backgroundColor: "#FF4C4C" },
    buttonText: { fontSize: 16, fontWeight: "600", color: "#000" },
    label: { marginTop: 8, fontSize: 14, fontStyle: "italic", color: "#333" },
    result: { fontSize: 16, fontWeight: "500", marginTop: 10 },
    buttonSave: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
    studentButton: { padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10, backgroundColor: "#f9f9f9" },
    studentSelected: { backgroundColor: "#d0f0c0", borderColor: "#4CAF50" },
    studentText: { fontSize: 16 },
    criteriaText: { fontSize: 16, marginBottom: 10, fontWeight: "500" },
    commentBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, minHeight: 80, backgroundColor: "#f5f5f5", textAlignVertical: "top" },
});
