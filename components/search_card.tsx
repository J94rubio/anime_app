import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SearchCardProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  loading?: boolean;
  placeholder?: string;
}

export default function SearchCard({
  value,
  onChangeText,
  onSearch,
  loading = false,
  placeholder = "Buscar personaje...",
}: SearchCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.glassOverlay} />
      <Text style={styles.label}>Nombre</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!loading}
          placeholderTextColor="rgba(120, 120, 150, 0.6)"
        />
        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={onSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <MaterialCommunityIcons name="magnify" size={22} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  // Capa interna que simula el brillo del glass
  glassOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(50, 50, 80, 0.65)",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.55)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "rgba(20, 20, 40, 0.85)",
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: "rgba(0, 122, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.3)",
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
});