import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import { useRouter } from "expo-router";

import { login } from "@/services/auth.service";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await login(email, password);

      router.replace("/tabs");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Anime App 🔥</Text>

        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text style={styles.registerText}>
            ¿No tienes cuenta?{" "}
            <Text style={styles.registerHighlight}>Crear cuenta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0814",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#151122",
    borderRadius: 24,
    padding: 24,

    borderWidth: 1,
    borderColor: "rgba(245, 200, 66, 0.15)",
  },

  title: {
    color: "#F5C842",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#A0A0A0",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#221B35",
    color: "#FFFFFF",

    paddingVertical: 16,
    paddingHorizontal: 16,

    borderRadius: 14,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    fontSize: 15,
  },

  loginButton: {
    backgroundColor: "#F5C842",

    paddingVertical: 16,

    borderRadius: 14,

    alignItems: "center",

    marginTop: 6,
  },

  loginButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerText: {
    color: "#B0B0B0",
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
  },

  registerHighlight: {
    color: "#F5C842",
    fontWeight: "bold",
  },
});
