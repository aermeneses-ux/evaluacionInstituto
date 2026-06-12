import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView, FlatList, Modal } from "react-native";
import { Student, CriteriaKeys, ParametersKeys } from "./types/evaluationTypes";
import { criteriaTexts } from "./constants/criteriaText";
import { parameterTexts } from "./constants/parameterText";
import { labels } from "./constants/labels";
import { evaluationStyles as styles } from "./styles/evaluationStyles";

const students: Student[] = [
    { cedula: "0102030405", name: "Juan Pérez", grade: "3er semestre", career: "Desarrollo de Software" },
    { cedula: "0203040506", name: "María López", grade: "4to semestre", career: "Desarrollo de Software" },
    { cedula: "0304050607", name: "Carlos Sánchez", grade: "5to semestre", career: "Desarrollo de Software" },
    { cedula: "0987654321", name: "Angel Peñanieto", grade: "5to semestre", career: "Desarrollo de Software" },
];

export default function EvaluationPage() {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        professorName: "",
        criteria: {
            presentation: 0,
            quality: 0,
            mastery: 0,
            clarity: 0,
            satisfaction: 0,
        } as Record<CriteriaKeys, number>,
        parameters: {
            proactivity: 0,
            delivery: 0,
            compliance: 0,
            depth: 0,
            objectives: 0,
            methodology: 0,
            contribution: 0,
        } as Record<ParametersKeys, number>,
        comments: "",
    });

    // Filtrar estudiantes por nombre o cédula
    const filteredStudents = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.cedula.includes(search)
    );

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setSearch(student.name);
        setShowDropdown(false);
    };

    const calculateScores = () => {
        const criteriaValues = Object.values(form.criteria);
        const criteriaAvg = criteriaValues.reduce((a, b) => a + b, 0) / criteriaValues.length;
        const criteriaScore = (criteriaAvg / 4) * 3;

        const paramValues = Object.values(form.parameters);
        const paramAvg = paramValues.reduce((a, b) => a + b, 0) / paramValues.length;
        const paramScore = (paramAvg / 10) * 7;

        return {
            criteriaScore: criteriaScore.toFixed(2),
            paramScore: paramScore.toFixed(2),
            finalScore: (criteriaScore + paramScore).toFixed(2),
        };
    };

    const scores = calculateScores();

    const handleSubmit = () => {
        if (!selectedStudent) {
            alert("Selecciona un alumno primero");
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmSave = () => {
        setShowConfirm(false);
        const commentsToShow = form.comments.trim() === "" ? "Ninguna" : form.comments;
        alert(
            `-SIMULACION- Evaluación guardada exitosamente:\nProfesor: ${form.professorName}\nAlumno: ${selectedStudent?.name}\nNota criterios: ${scores.criteriaScore}\nNota parámetros: ${scores.paramScore}\nNota final: ${scores.finalScore}\nComentarios: ${commentsToShow}`
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Evaluación del Proyecto</Text>

            {/* Nombre del profesor ****temporal**** */}
            <TextInput
                style={styles.input}
                placeholder="Nombre del profesor"
                value={form.professorName}
                onChangeText={(text) => setForm({ ...form, professorName: text })}
            />

            {/* Buscador dinámico de estudiantes */}
            <Text style={styles.subtitle}>Buscar alumno</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe nombre o cédula"
                value={search}
                onChangeText={(text) => {
                    setSearch(text);
                    setShowDropdown(true);
                }}
            />

            {showDropdown && filteredStudents.length > 0 && (
                <FlatList
                    data={filteredStudents}
                    keyExtractor={(item) => item.cedula}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        backgroundColor: "#fff",
                        maxHeight: 150,
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.studentButton}
                            onPress={() => handleSelectStudent(item)}
                        >
                            <Text style={styles.studentText}>
                                {item.name} - {item.grade} ({item.career})
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {showDropdown && filteredStudents.length === 0 && (
                <Text style={{ color: "red", marginTop: 10 }}>No se encontró ningún alumno</Text>
            )}

            {/* Tema del proyecto */}
            <Text style={styles.subtitle}>Tema del Proyecto</Text>
            <Text style={styles.topic}>
                Integración y Gestión de Vacantes de Empleo a través de un Sistema Frontend y Backend Escalable y Seguro
            </Text>

            {/* Criterios */}
            <Text style={styles.subtitle}>Criterios (sobre 4)</Text>
            {Object.keys(criteriaTexts).map((key) => {
                const typedKey = key as CriteriaKeys;
                return (
                    <View key={typedKey} style={styles.card}>
                        <Text style={styles.criteriaText}>{criteriaTexts[typedKey]}</Text>
                        <View style={styles.buttonRowLeft}>
                            {[4, 3, 2, 1].map((val) => (
                                <TouchableOpacity
                                    key={val}
                                    style={[
                                        styles.button,
                                        form.criteria[typedKey] === val && (
                                            val >= 3 ? styles.buttonGreen : val === 2 ? styles.buttonYellow : styles.buttonRed
                                        ),
                                    ]}
                                    onPress={() => setForm({ ...form, criteria: { ...form.criteria, [typedKey]: val } })}
                                >
                                    <Text style={styles.buttonText}>{val}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {form.criteria[typedKey] > 0 && (
                            <Text style={styles.label}>{labels[form.criteria[typedKey]]}</Text>
                        )}
                    </View>
                );
            })}

            {/* Parámetros */}
            <Text style={styles.subtitle}>Parámetros del Proyecto Empresarial (sobre 10)</Text>
            {(Object.keys(parameterTexts) as ParametersKeys[]).map((key) => (
                <View key={key} style={styles.card}>
                    <Text style={styles.criteriaText}>{parameterTexts[key]}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nota"
                        keyboardType="numeric"
                        value={form.parameters[key].toString()}
                        onChangeText={(text) =>
                            setForm({ ...form, parameters: { ...form.parameters, [key]: Number(text) } })
                        }
                    />
                </View>
            ))}

            {/* Resultados */}
            <Text style={styles.result}>Nota criterios (máx 3): {scores.criteriaScore}</Text>
            <Text style={styles.result}>Nota parámetros (máx 7): {scores.paramScore}</Text>
            <Text style={styles.result}>Nota final: {scores.finalScore}</Text>

            {/* Comentarios */}
            <View style={styles.card}>
                <Text style={styles.subtitle}>Comentarios / Observaciones</Text>
                <TextInput
                    style={styles.commentBox}
                    placeholder="Opcional"
                    placeholderTextColor="#999"
                    multiline
                    value={form.comments}
                    onChangeText={(text) => setForm({ ...form, comments: text })}
                />
            </View>

            {/* Botón guardar */}
            <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

            {/* Modal de confirmación */}
            <Modal visible={showConfirm} transparent animationType="slide">
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        borderRadius: 10,
                        width: "90%"
                    }}>
                        <Text style={styles.title}>Confirmar Evaluación</Text>
                        <Text>Profesor: {form.professorName}</Text>
                        <Text>Alumno: {selectedStudent?.name}</Text>
                        <Text>Nota criterios: {scores.criteriaScore}</Text>
                        <Text>Nota parámetros: {scores.paramScore}</Text>
                        <Text>Nota final: {scores.finalScore}</Text>
                        <Text>Comentarios: {form.comments.trim() === "" ? "Ninguna" : form.comments}</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                            <TouchableOpacity
                                style={[styles.button, { flex: 1, marginRight: 10, backgroundColor: "#FF4C4C" }]}
                                onPress={() => setShowConfirm(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, { flex: 1, backgroundColor: "#4CAF50" }]}
                                onPress={handleConfirmSave}
                            >
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}