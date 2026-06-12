import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 20 }}>
                Pantalla Principal
            </Text>

            <Button
                title="Ir a Evaluación de Instituto"
                onPress={() => router.push("/evaluation")}
            />
        </View>
    );
}