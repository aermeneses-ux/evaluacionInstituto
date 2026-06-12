import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Calculadora" }} />
            <Stack.Screen name="evaluation" options={{ title: "Evaluacion docente" }} />
            <Stack.Screen name="parameters" options={{ title: "Parametrosr" }} />
        </Stack>
    );
}