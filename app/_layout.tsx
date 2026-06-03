import { Stack } from "expo-router";
import { TicketProvider } from "./context/TicketContext";

export default function Layout() {
    return (
        <TicketProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Calculadora" }} />
                <Stack.Screen name="HomeScreen" options={{ title: "Mis Tickets" }} />
                <Stack.Screen name="FormScreen" options={{ title: "Crear Ticket" }} />
            </Stack>
        </TicketProvider>
    );
}