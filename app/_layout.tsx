import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, View, StyleSheet } from "react-native";
import { AnimeProvider } from "@/context/AnimeContext";
import Toast from "react-native-toast-message";

// Ícono activo con indicador dorado superior
function TabIcon({
  name,
  color,
  focused,
}: {
  name: string;
  color: string;
  focused: boolean;
  size: number;
}) {
  return (
    <View style={styles.iconWrapper}>
      {focused && <View style={styles.activeIndicator} />}
      <MaterialCommunityIcons
        name={name as any}
        size={22}
        color={color}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AnimeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#F5C842",   // dorado
          tabBarInactiveTintColor: "rgba(255,255,255,0.35)",

          tabBarStyle: {
            backgroundColor: "rgba(10, 8, 20, 0.97)", // casi negro con tinte morado
            borderTopColor: "rgba(245, 200, 66, 0.2)", // borde dorado sutil
            borderTopWidth: 1,
            height: Platform.OS === "ios" ? 85 : 65,
            paddingBottom: Platform.OS === "ios" ? 22 : 10,
            paddingTop: 6,
          },

          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            letterSpacing: 0.3,
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Saint Seiya",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="horse" color={color} focused={focused} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="screen2"
          options={{
            title: "Hunter x Hunter",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="flash" color={color} focused={focused} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="screen3"
          options={{
            title: "One Piece",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="ship-wheel" color={color} focused={focused} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="screen4"
          options={{
            title: "Resumen",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="information" color={color} focused={focused} size={size} />
            ),
          }}
        />
      </Tabs>

      <Toast />
    </AnimeProvider>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 32,
  },
  // Línea dorada superior en el tab activo
  activeIndicator: {
    position: "absolute",
    top: -6,
    width: 28,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "#F5C842",
    shadowColor: "#F5C842",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },
});