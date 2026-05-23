import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { login } from "@/services/auth.service";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(lineAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const lineWidth = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

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
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTag}>ANIME APP</Text>
          <Animated.View style={[styles.topBarLine, { width: lineWidth }]} />
        </View>

        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Headline editorial */}
          <View style={styles.heroSection}>
            <Text style={styles.heroEyebrow}>Bienvenido de vuelta</Text>
            <Text style={styles.heroTitle}>Tu mundo{"\n"}animado.</Text>
            <Text style={styles.heroMeta}>— Accede a tu cuenta</Text>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>CORREO</Text>
              <TextInput
                placeholder="nombre@correo.com"
                placeholderTextColor="#4A4642"
                value={email}
                onChangeText={setEmail}
                style={[
                  styles.fieldInput,
                  emailFocused && styles.fieldInputFocused,
                ]}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <View
                style={[
                  styles.fieldUnderline,
                  emailFocused && styles.fieldUnderlineFocused,
                ]}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>CONTRASEÑA</Text>
              <TextInput
                placeholder="••••••••••"
                placeholderTextColor="#4A4642"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={[
                  styles.fieldInput,
                  passwordFocused && styles.fieldInputFocused,
                ]}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <View
                style={[
                  styles.fieldUnderline,
                  passwordFocused && styles.fieldUnderlineFocused,
                ]}
              />
            </View>

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Olvidé mi contraseña →</Text>
            </TouchableOpacity>
          </View>

          {/* Acciones */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              activeOpacity={0.88}
            >
              <Text style={styles.loginBtnText}>Ingresar</Text>
              <View style={styles.loginBtnArrow}>
                <Text style={styles.loginBtnArrowText}>→</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerBtn}
              onPress={() => router.push("/auth/register")}
              activeOpacity={0.7}
            >
              <Text style={styles.registerBtnText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>Anime App · 2025</Text>
          <View style={styles.footerDot} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const CHARCOAL = "#141210"; // fondo base — casi negro cálido
const SURFACE = "#1E1B18"; // superficie de carta
const INK_LIGHT = "#EDE8E1"; // texto principal sobre oscuro
const INK_MID = "#7A746C"; // texto secundario/muted
const INK_DIM = "#2E2B27"; // líneas y bordes sutiles
const ACCENT = "#C4692A"; // terracota — mismo acento, ahora vibra más sobre oscuro

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CHARCOAL,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 56,
  },

  topBarTag: {
    fontSize: 10,
    fontWeight: "700",
    color: INK_MID,
    letterSpacing: 3,
  },

  topBarLine: {
    height: 1,
    backgroundColor: INK_DIM,
  },

  content: {
    flex: 1,
  },

  heroSection: {
    marginBottom: 48,
  },

  heroEyebrow: {
    fontSize: 12,
    color: ACCENT,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 52,
    fontWeight: "800",
    color: INK_LIGHT,
    lineHeight: 56,
    letterSpacing: -1.5,
    marginBottom: 16,
  },

  heroMeta: {
    fontSize: 14,
    color: INK_MID,
    fontStyle: "italic",
    letterSpacing: 0.5,
  },

  form: {
    marginBottom: 40,
    gap: 28,
  },

  fieldGroup: {},

  fieldLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: INK_MID,
    letterSpacing: 2.5,
    marginBottom: 10,
  },

  fieldInput: {
    fontSize: 17,
    color: INK_LIGHT,
    paddingVertical: 8,
    backgroundColor: "transparent",
    letterSpacing: 0.2,
  },

  fieldInputFocused: {
    color: INK_LIGHT,
  },

  fieldUnderline: {
    height: 1,
    backgroundColor: INK_DIM,
    marginTop: 4,
  },

  fieldUnderlineFocused: {
    backgroundColor: ACCENT,
    height: 1.5,
  },

  forgotRow: {
    alignSelf: "flex-start",
    marginTop: -8,
  },

  forgotText: {
    fontSize: 13,
    color: INK_MID,
    letterSpacing: 0.3,
  },

  actions: {
    gap: 16,
  },

  loginBtn: {
    backgroundColor: INK_LIGHT,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingLeft: 28,
    paddingRight: 20,
  },

  loginBtnText: {
    color: CHARCOAL,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  loginBtnArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
  },

  loginBtnArrowText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  registerBtn: {
    borderWidth: 1,
    borderColor: INK_DIM,
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: "center",
  },

  registerBtnText: {
    color: INK_MID,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 48,
  },

  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: INK_DIM,
  },

  footerText: {
    fontSize: 11,
    color: INK_DIM,
    letterSpacing: 1.5,
  },
});
