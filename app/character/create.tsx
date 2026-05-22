import DateInput from "@/components/DateInput";
import { createCharacter } from "@/services/animeApi";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function CreateCharacter() {
  const { animeId } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mainPower, setMainPower] = useState("");
  const [origin, setOrigin] = useState("");
  const [technique, setTechnique] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCreate = async () => {
    setSubmitted(true);
    if (!name || !birthDate || !mainPower || !origin || !technique) return;

    setLoading(true);
    try {
      await createCharacter({
        name,
        birth_date: birthDate,
        main_power: mainPower,
        origin,
        anime_id: Number(animeId),
        techniques: [technique],
      });

      Toast.show({
        type: "success",
        text1: "Personaje creado",
        text2: `"${name}" fue agregado exitosamente.`,
        visibilityTime: 2000,
        position: "top",
      });

      setTimeout(() => {
        router.replace("/(tabs)/screen5"); // ajusta la ruta según tu estructura
      }, 2000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo crear el personaje",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Nuevo personaje</Text>
          <Text style={styles.subtitle}>Completa la información</Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={[styles.input, submitted && !name && styles.inputError]}
            placeholder="Ej. Naruto Uzumaki"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          {submitted && !name && (
            <Text style={styles.errorText}>Este campo es obligatorio</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <DateInput
            value={birthDate}
            onChange={setBirthDate}
            hasError={submitted && !birthDate}
            inputStyle={styles.input}
          />
          {submitted && !birthDate && (
            <Text style={styles.errorText}>Este campo es obligatorio</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Poder principal</Text>
          <TextInput
            style={[styles.input, submitted && !mainPower && styles.inputError]}
            placeholder="Ej. Rasengan"
            placeholderTextColor="#888"
            value={mainPower}
            onChangeText={setMainPower}
          />
          {submitted && !mainPower && (
            <Text style={styles.errorText}>Este campo es obligatorio</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Origen</Text>
          <TextInput
            style={[styles.input, submitted && !origin && styles.inputError]}
            placeholder="Ej. Konoha"
            placeholderTextColor="#888"
            value={origin}
            onChangeText={setOrigin}
          />
          {submitted && !origin && (
            <Text style={styles.errorText}>Este campo es obligatorio</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Técnica principal</Text>
          <TextInput
            style={[styles.input, submitted && !technique && styles.inputError]}
            placeholder="Ej. Kage Bunshin no Jutsu"
            placeholderTextColor="#888"
            value={technique}
            onChangeText={setTechnique}
          />
          {submitted && !technique && (
            <Text style={styles.errorText}>Este campo es obligatorio</Text>
          )}
        </View>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreate}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creando..." : "Crear personaje"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F14",
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1C1C26",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2E2E40",
  },
  backArrow: {
    color: "#A78BFA",
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F0EEFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B6B80",
    marginTop: 2,
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A78BFA",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: "#1C1C26",
    borderWidth: 1,
    borderColor: "#2E2E40",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#F0EEFF",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#7C3AED",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
