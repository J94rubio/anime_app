import { supabase } from "@/lib/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export function HeaderActions() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  const handleAddAnime = () => {
    router.push("/anime/create");
  };

  return (
    <View style={{ flexDirection: "row", gap: 14, marginRight: 12 }}>
      {/* ADD ANIME */}
      <TouchableOpacity onPress={handleAddAnime}>
        <MaterialCommunityIcons name="plus-circle" size={26} color="#F5C842" />
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="#F5C842" />
      </TouchableOpacity>
    </View>
  );
}
