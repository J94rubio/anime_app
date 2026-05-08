import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ImageCounterProps {
  count: number;
  visible?: boolean;
}

export default function ImageCounter({
  count,
  visible = true,
}: ImageCounterProps) {
  if (!visible || count === 0) return null;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="image-multiple" size={20} color="#007AFF" />
      <Text style={styles.text}>{count} Imagen{count !== 1 ? "es" : ""} extraída{count !== 1 ? "s" : ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "arial",
  },
});
