import { createAnime } from "@/services/animeApi";
import { router } from "expo-router";
import { useState } from "react";
import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Toast from "react-native-toast-message";

type AnimeCreated = {
  id: number;
  name: string;
};

export default function CreateAnime() {
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [createdAnime, setCreatedAnime] = useState<AnimeCreated | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "Ingresa un nombre de anime",
      });
      return;
    }

    try {
      const anime = await createAnime(name);

      setCreatedAnime(anime);
      setModalVisible(true);
      setName("");

      // ✅ TOAST DE ÉXITO
      Toast.show({
        type: "success",
        text1: "Anime creado",
        text2: `${anime.name} fue creado correctamente`,
      });
    } catch (error: any) {
      setErrorMsg(error?.message ?? "No se pudo crear el anime");
      setModalVisible(true);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message ?? "No se pudo crear el anime",
      });
    }
  };

  const handleNo = () => {
    setModalVisible(false);
    setCreatedAnime(null);
    setErrorMsg(null);
  };

  const handleSi = () => {
    if (!createdAnime) return;

    setModalVisible(false);
    setErrorMsg(null);

    router.push({
      pathname: "/character/create",
      params: { animeId: createdAnime.id },
    });
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ alignSelf: "flex-start" }}
      >
        <Text style={{ fontSize: 16, color: "#007AFF" }}>← Atrás</Text>
      </TouchableOpacity>

      {/* INPUT */}
      <TextInput
        placeholder="Nombre del anime"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
        }}
      />

      <Button title="Crear anime" onPress={handleCreate} />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 24,
              width: "100%",
              gap: 16,
            }}
          >
            {errorMsg ? (
              <>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "red" }}
                >
                  ❌ Error
                </Text>
                <Text>{errorMsg}</Text>

                <Button title="Cerrar" onPress={handleNo} />
              </>
            ) : (
              <>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  ✅ Anime creado
                </Text>

                <Text>
                  <Text style={{ fontWeight: "600" }}>
                    {createdAnime?.name}
                  </Text>{" "}
                  fue creado exitosamente.
                </Text>

                <Text>¿Deseas agregar un personaje a este anime?</Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <TouchableOpacity onPress={handleNo}>
                    <Text style={{ color: "#666", fontSize: 16 }}>No</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleSi}>
                    <Text
                      style={{
                        color: "#007AFF",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Sí, agregar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// import { useAnime } from "@/context/AnimeContext";
// import { createAnime } from "@/services/animeApi";

// import { router } from "expo-router";

// import { useState } from "react";

// import {
//   Modal,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";

// export default function CreateAnime() {
//   const { addAnime } = useAnime();

//   const [name, setName] = useState("");

//   const [modalVisible, setModalVisible] = useState(false);

//   const [createdAnime, setCreatedAnime] = useState<{
//     id: string;
//     name: string;
//   } | null>(null);

//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   /* =========================
//      CREAR ANIME
//   ========================= */

//   const handleCreate = async () => {
//     // VALIDAR INPUT
//     if (!name.trim()) {
//       setErrorMsg("Debes ingresar un nombre");

//       setModalVisible(true);

//       return;
//     }

//     try {
//       const anime = await createAnime(name);

//       // AGREGAR AL CONTEXT GLOBAL
//       addAnime({
//         id: Number(anime.id),
//         name: anime.name,
//       });

//       setName("");

//       setCreatedAnime(anime);

//       setErrorMsg(null);

//       setModalVisible(true);
//     } catch (error: any) {
//       setErrorMsg(error?.message || "No se pudo crear el anime");

//       setModalVisible(true);
//     }
//   };

//   /* =========================
//      MODAL NO
//   ========================= */

//   const handleNo = () => {
//     setModalVisible(false);

//     setCreatedAnime(null);

//     setErrorMsg(null);
//   };

//   /* =========================
//      MODAL SÍ
//   ========================= */

//   const handleSi = () => {
//     if (!createdAnime) return;

//     setModalVisible(false);

//     router.push({
//       pathname: "/character/create",

//       params: {
//         animeId: createdAnime.id,
//       },
//     });
//   };

//   /* =========================
//      UI
//   ========================= */

//   return (
//     <View
//       style={{
//         flex: 1,

//         padding: 20,

//         backgroundColor: "#F5F6FA",
//       }}
//     >
//       {/* BOTÓN ATRÁS */}
//       <TouchableOpacity
//         onPress={() => router.back()}
//         style={{
//           alignSelf: "flex-start",

//           marginBottom: 20,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 16,

//             color: "#007AFF",

//             fontWeight: "600",
//           }}
//         >
//           ← Atrás
//         </Text>
//       </TouchableOpacity>

//       {/* TITLE */}
//       <Text
//         style={{
//           fontSize: 28,

//           fontWeight: "700",

//           marginBottom: 8,

//           color: "#000",
//         }}
//       >
//         Crear Anime
//       </Text>

//       <Text
//         style={{
//           color: "#666",

//           marginBottom: 24,
//         }}
//       >
//         Agrega un nuevo anime a la aplicación
//       </Text>

//       {/* INPUT */}
//       <TextInput
//         placeholder="Nombre del anime"
//         value={name}
//         onChangeText={setName}
//         style={{
//           borderWidth: 1,

//           borderColor: "#DDD",

//           backgroundColor: "#FFF",

//           paddingHorizontal: 14,

//           paddingVertical: 14,

//           borderRadius: 14,

//           fontSize: 16,

//           marginBottom: 20,
//         }}
//       />

//       {/* BUTTON */}
//       <TouchableOpacity
//         onPress={handleCreate}
//         style={{
//           backgroundColor: "#007AFF",

//           paddingVertical: 16,

//           borderRadius: 14,

//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{
//             color: "#FFF",

//             fontSize: 16,

//             fontWeight: "700",
//           }}
//         >
//           Crear Anime
//         </Text>
//       </TouchableOpacity>

//       {/* MODAL */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View
//           style={{
//             flex: 1,

//             backgroundColor: "rgba(0,0,0,0.5)",

//             justifyContent: "center",

//             alignItems: "center",

//             padding: 30,
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "#FFF",

//               borderRadius: 18,

//               padding: 24,

//               width: "100%",
//             }}
//           >
//             {/* ERROR */}
//             {errorMsg ? (
//               <>
//                 <Text
//                   style={{
//                     fontSize: 22,

//                     fontWeight: "700",

//                     color: "#FF3B30",

//                     marginBottom: 14,
//                   }}
//                 >
//                   Error
//                 </Text>

//                 <Text
//                   style={{
//                     fontSize: 15,

//                     color: "#444",

//                     marginBottom: 24,
//                   }}
//                 >
//                   {errorMsg}
//                 </Text>

//                 <TouchableOpacity
//                   onPress={handleNo}
//                   style={{
//                     backgroundColor: "#007AFF",

//                     paddingVertical: 14,

//                     borderRadius: 12,

//                     alignItems: "center",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "#FFF",

//                       fontWeight: "700",

//                       fontSize: 15,
//                     }}
//                   >
//                     Cerrar
//                   </Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <>
//                 {/* SUCCESS */}
//                 <Text
//                   style={{
//                     fontSize: 22,

//                     fontWeight: "700",

//                     marginBottom: 14,
//                   }}
//                 >
//                   Anime creado
//                 </Text>

//                 <Text
//                   style={{
//                     fontSize: 15,

//                     color: "#444",

//                     marginBottom: 10,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontWeight: "700",
//                     }}
//                   >
//                     {createdAnime?.name}
//                   </Text>{" "}
//                   fue creado exitosamente.
//                 </Text>

//                 <Text
//                   style={{
//                     fontSize: 15,

//                     color: "#444",

//                     marginBottom: 24,
//                   }}
//                 >
//                   ¿Deseas agregar un personaje ahora?
//                 </Text>

//                 {/* ACTIONS */}
//                 <View
//                   style={{
//                     flexDirection: "row",

//                     justifyContent: "flex-end",

//                     gap: 14,
//                   }}
//                 >
//                   <TouchableOpacity onPress={handleNo}>
//                     <Text
//                       style={{
//                         color: "#666",

//                         fontSize: 16,
//                       }}
//                     >
//                       No
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity onPress={handleSi}>
//                     <Text
//                       style={{
//                         color: "#007AFF",

//                         fontSize: 16,

//                         fontWeight: "700",
//                       }}
//                     >
//                       Sí, agregar
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }
