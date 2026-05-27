import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorButton from "./components/calculatorButton";
import * as Haptics from "expo-haptics"

export default function App() {
  const [display, setDisplay] = useState("0");

  const handlePress = (value: string) => {
    if (display === "0" && !isNaN(Number(value))) {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const clearAll = () => setDisplay("0");
  const deleteLast = () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  const toggleSign = () => setDisplay((parseFloat(display) * -1).toString());

  const calculate = () => {
    try {
      const result = eval(display.replace("x", "*").replace("÷", "/"));
      setDisplay(result.toString());
    } catch {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setDisplay("0");
      Alert.alert("Errror", "Calculo erroneo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.display}>{display}</Text>

      <View style={styles.row}>
        <CalculatorButton label="C" onPress={clearAll} type="function" />
        <CalculatorButton label="+/-" onPress={toggleSign} type="function" />
        <CalculatorButton label="←" onPress={deleteLast} type="function" />
        <CalculatorButton label="÷" onPress={() => handlePress("÷")} type="operator" />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="7" onPress={() => handlePress("7")} />
        <CalculatorButton label="8" onPress={() => handlePress("8")} />
        <CalculatorButton label="9" onPress={() => handlePress("9")} />
        <CalculatorButton label="x" onPress={() => handlePress("x")} type="operator" />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="4" onPress={() => handlePress("4")} />
        <CalculatorButton label="5" onPress={() => handlePress("5")} />
        <CalculatorButton label="6" onPress={() => handlePress("6")} />
        <CalculatorButton label="-" onPress={() => handlePress("-")} type="operator" />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="1" onPress={() => handlePress("1")} />
        <CalculatorButton label="2" onPress={() => handlePress("2")} />
        <CalculatorButton label="3" onPress={() => handlePress("3")} />
        <CalculatorButton label="+" onPress={() => handlePress("+")} type="operator" />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="0" onPress={() => handlePress("0")} />
        <CalculatorButton label="." onPress={() => handlePress(".")} />
        <CalculatorButton label="=" onPress={calculate} type="operator" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "flex-end", 
    backgroundColor: "#ffd9ab" 
  },
  display: { 
    color: "#3a2509", 
    fontSize: 40, 
    textAlign: "right", 
    padding: 20 
  },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
});
