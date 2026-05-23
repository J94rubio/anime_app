// import { HeaderActions } from "@/components/HeaderActions";
// import { AnimeProvider, useAnime } from "@/context/AnimeContext";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import { Platform, StyleSheet, View } from "react-native";
// import Toast from "react-native-toast-message";

// /* =========================
//    TAB ICON
// ========================= */

// function TabIcon({
//   name,
//   color,
//   focused,
// }: {
//   name: string;
//   color: string;
//   focused: boolean;
//   size: number;
// }) {
//   return (
//     <View style={styles.iconWrapper}>
//       {focused && <View style={styles.activeIndicator} />}
//       <MaterialCommunityIcons name={name as any} size={22} color={color} />
//     </View>
//   );
// }

// /* =========================
//    TABS CONTENT
// ========================= */

// function TabsContent() {
//   const { animes } = useAnime();

//   const hasExtraAnimes = animes.length > 3;

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: true,
//         headerRight: () => <HeaderActions />,

//         tabBarActiveTintColor: "#F5C842",
//         tabBarInactiveTintColor: "rgba(255,255,255,0.35)",

//         tabBarStyle: {
//           backgroundColor: "rgba(10, 8, 20, 0.97)",
//           borderTopColor: "rgba(245, 200, 66, 0.2)",
//           borderTopWidth: 1,
//           height: Platform.OS === "ios" ? 85 : 65,
//           paddingBottom: Platform.OS === "ios" ? 22 : 10,
//           paddingTop: 6,
//         },

//         tabBarLabelStyle: {
//           fontSize: 10,
//           fontWeight: "600",
//           letterSpacing: 0.3,
//           marginTop: 2,
//         },
//       }}
//     >
//       {/* =========================
//           TABS FIJAS (SIEMPRE)
//       ========================= */}

//       <Tabs.Screen
//         name="saintSeiya"
//         options={{
//           title: "Saint Seiya",
//           tabBarIcon: ({ color, focused, size }) => (
//             <TabIcon name="horse" color={color} focused={focused} size={size} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="hunter"
//         options={{
//           title: "Hunter x Hunter",
//           tabBarIcon: ({ color, focused, size }) => (
//             <TabIcon name="flash" color={color} focused={focused} size={size} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="onePiece"
//         options={{
//           title: "One Piece",
//           tabBarIcon: ({ color, focused, size }) => (
//             <TabIcon
//               name="ship-wheel"
//               color={color}
//               focused={focused}
//               size={size}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="resumen"
//         options={{
//           title: "Resumen",
//           tabBarIcon: ({ color, focused, size }) => (
//             <TabIcon
//               name="information"
//               color={color}
//               focused={focused}
//               size={size}
//             />
//           ),
//         }}
//       />

//       {/* =========================
//           TAB DINÁMICA (CONDICIONAL)
//       ========================= */}

//       <Tabs.Screen
//         name="dinamicAnime"
//         options={{
//           title: "Más Animes",

//           href: hasExtraAnimes ? undefined : null,

//           tabBarIcon: ({ color, focused, size }) => (
//             <TabIcon
//               name="dots-horizontal"
//               color={color}
//               focused={focused}
//               size={size}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// /* =========================
//    ROOT LAYOUT
// ========================= */

// export default function RootLayout() {
//   return (
//     <AnimeProvider>
//       <TabsContent />
//       <Toast />
//     </AnimeProvider>
//   );
// }

// /* =========================
//    STYLES
// ========================= */

// const styles = StyleSheet.create({
//   iconWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 40,
//     height: 32,
//   },

//   activeIndicator: {
//     position: "absolute",
//     top: -6,
//     width: 28,
//     height: 2.5,
//     borderRadius: 2,
//     backgroundColor: "#F5C842",
//     shadowColor: "#F5C842",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.9,
//     shadowRadius: 6,
//     elevation: 6,
//   },
// });

import { HeaderActions } from "@/components/HeaderActions";
import { AnimeProvider, useAnime } from "@/context/AnimeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

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
      <MaterialCommunityIcons name={name as any} size={22} color={color} />
    </View>
  );
}

function TabsContent() {
  const { animes } = useAnime();
  const hasExtraAnimes = animes.length > 3;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRight: () => <HeaderActions />,
        headerStyle: {
          backgroundColor: "#0A0814",
          borderBottomColor: "rgba(245,200,66,0.2)",
          borderBottomWidth: 1,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 17,
          color: "#F5C842",
        },
        tabBarActiveTintColor: "#F5C842",
        tabBarInactiveTintColor: "rgba(255,255,255,0.35)",
        tabBarStyle: {
          backgroundColor: "#0A0814",
          borderTopColor: "rgba(245,200,66,0.15)",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 68,
          paddingBottom: Platform.OS === "ios" ? 24 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.4,
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
            <TabIcon
              name="ship-wheel"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="screen5"
        options={{
          title: "Más Animes",
          href: hasExtraAnimes ? undefined : null,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name="dots-horizontal"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="screen4"
        options={{
          title: "Resumen",
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name="information"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <AnimeProvider>
      <TabsContent />
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
