import { supabase } from "@/lib/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    console.log("LOGOUT ERROR:", error);

    // fuerza navegación inmediata
    router.replace("/auth/login");
    router.dismissAll?.();
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
      <MaterialCommunityIcons name="logout" size={24} color="#F5C842" />
    </TouchableOpacity>
  );
}
