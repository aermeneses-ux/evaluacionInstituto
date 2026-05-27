import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";  

interface Props {
  label: string;
  onPress: () => void;
  type?: "number" | "operator" | "function";
}

const CalculatorButton: React.FC<Props> = ({ label, onPress, type = "number" }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "operator" && styles.operator,
        type === "function" && styles.function,
      ]}
      onPress={() => {
        Haptics.selectionAsync(); 
        onPress()
      }}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#cba075",
    alignItems: "center",
    justifyContent: "center",
  },
  operator: {
    backgroundColor: "#996b42",
  },
  function: {
    backgroundColor: "#643c23",
  },
  text: {
    color: "black",
    fontSize: 20,
  },
});

export default CalculatorButton;
