import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

function Routes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="tabs" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <Toast />
    </>
  );
}

// import { AuthProvider, useAuth } from "@/context/AuthContext";
// import { router, Stack } from "expo-router";
// import { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";
// import Toast from "react-native-toast-message";

// function Routes() {
//   const { loading, user } = useAuth(); // ← agrega user

//   useEffect(() => {
//     if (loading) return;

//     if (user) {
//       router.replace("/(tabs)"); // ← autenticado → tabs
//     } else {
//       router.replace("/auth/login"); // ← no autenticado → login
//     }
//   }, [loading, user]);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#F5C842" />
//       </View>
//     );
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="auth" />
//       <Stack.Screen name="tabs" />
//     </Stack>
//   );
// }

// export default function Layout() {
//   return (
//     <>
//       <AuthProvider>
//         <Routes />
//       </AuthProvider>
//       <Toast />
//     </>
//   );
// }
