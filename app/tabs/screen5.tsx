// import React, { useMemo, useState } from "react";

// import {
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// import { useAnime } from "@/context/AnimeContext";

// import DataCard from "@/components/data_card";
// import ImageCounter from "@/components/image_counter";
// import ImagesModal from "@/components/images_modal";
// import SearchCard from "@/components/search_card";

// import { AnimeDetail, searchAnime } from "@/services/animeApi";

// export default function DynamicAnimeScreen() {
//   const { animes, setCharacterForAnime } = useAnime();

//   /* =========================
//      ESTADOS
//   ========================= */

//   const [searchText, setSearchText] = useState("");

//   const [animeData, setAnimeData] = useState<AnimeDetail | null>(null);

//   const [imageCount, setImageCount] = useState(0);

//   const [loading, setLoading] = useState(false);

//   const [modalVisible, setModalVisible] = useState(false);

//   const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);

//   /* =========================
//      ANIMES EXTRA
//      IDs 1,2,3 = BASE
//   ========================= */

//   const extraAnimes = useMemo(() => {
//     return animes.filter(
//       (anime) => anime.id !== 1 && anime.id !== 2 && anime.id !== 3,
//     );
//   }, [animes]);

//   // ANIME SELECCIONADO
//   const selectedAnime = useMemo(() => {
//     return extraAnimes.find((anime) => anime.id === selectedAnimeId);
//   }, [extraAnimes, selectedAnimeId]);

//   // SEARCH
//   const handleSearch = async (silent = false) => {
//     if (!selectedAnime) {
//       Toast.show({
//         type: "error",
//         text1: "Selecciona un anime",
//         text2: "Debes elegir un anime primero",
//       });

//       return;
//     }

//     // INPUT VACÍO
//     if (!searchText.trim()) {
//       Toast.show({
//         type: "error",
//         text1: "Campo vacío",
//         text2: "Por favor ingresa un nombre",
//       });

//       return;
//     }

//     if (!silent) {
//       setLoading(true);
//     }

//     try {
//       console.log("Buscando:", searchText);

//       const results = await searchAnime(searchText);

//       console.log("Resultados:", results);

//       // SIN RESULTADOS
//       if (results.length === 0) {
//         Toast.show({
//           type: "error",
//           text1: "Sin resultados",
//           text2: "No se encontró ningún personaje",
//         });

//         setAnimeData(null);
//         setImageCount(0);

//         return;
//       }

//       // FILTRAR POR ANIME
//       const filtered = results.filter(
//         (item) => Number(item.anime_id) === Number(selectedAnime.id),
//       );

//       // NO PERTENECE
//       if (filtered.length === 0) {
//         Toast.show({
//           type: "info",
//           text1: "Anime incorrecto",
//           text2: `Solo personajes de ${selectedAnime.name}`,
//         });

//         setAnimeData(null);
//         setImageCount(0);

//         return;
//       }

//       // PERSONAJE OK
//       const selected = filtered[0];

//       setAnimeData(selected);

//       setImageCount(selected.imagenes?.length || 0);

//       // GUARDAR EN CONTEXT
//       setCharacterForAnime(selectedAnime.id, selected);

//       if (!silent) {
//         Toast.show({
//           type: "success",
//           text1: "Personaje encontrado",
//           text2: selected.nombre,
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);

//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Error al buscar personaje",
//       });

//       setAnimeData(null);

//       setImageCount(0);
//     } finally {
//       if (!silent) {
//         setLoading(false);
//       }
//     }
//   };

//   // UI

//   return (
//     <ImageBackground
//       source={{
//         uri: "https://raw.githubusercontent.com/J94rubio/anime_images/main/caballeros_del_zodiaco/background/background_1.jpg",
//       }}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <SafeAreaView style={styles.container}>
//           <ScrollView contentContainerStyle={styles.scrollContent}>
//             {/* HEADER */}
//             <View style={styles.header}>
//               <Text style={styles.title}>Animes Adicionales</Text>

//               <Text style={styles.subtitle}>
//                 Selecciona un anime y busca personajes
//               </Text>
//             </View>

//             {/* SELECTOR */}
//             <View style={styles.selectorContainer}>
//               {extraAnimes.map((anime) => (
//                 <TouchableOpacity
//                   key={anime.id}
//                   style={[
//                     styles.selectorItem,

//                     selectedAnimeId === anime.id && styles.selectorItemActive,
//                   ]}
//                   onPress={() => {
//                     setSelectedAnimeId(anime.id);

//                     setAnimeData(null);

//                     setImageCount(0);
//                   }}
//                 >
//                   <Text
//                     style={[
//                       styles.selectorText,

//                       selectedAnimeId === anime.id && styles.selectorTextActive,
//                     ]}
//                   >
//                     {anime.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* SIN ANIMES */}
//             {extraAnimes.length === 0 && (
//               <View style={styles.emptyContainer}>
//                 <Text style={styles.emptyText}>No hay animes adicionales</Text>
//               </View>
//             )}

//             {/* SEARCH */}
//             {extraAnimes.length > 0 && (
//               <SearchCard
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 onSearch={handleSearch}
//                 loading={loading}
//                 placeholder="Buscar personaje..."
//               />
//             )}

//             {/* DATA */}
//             {animeData && (
//               <DataCard
//                 nombre={animeData.nombre}
//                 poder={animeData.poder}
//                 anime={animeData.anime}
//                 ciudad={animeData.ciudad}
//                 birth_date={animeData.birth_date}
//                 techniques={animeData.techniques}
//                 extra_data={animeData.extra_data}
//               />
//             )}

//             {/* COUNTER */}
//             <ImageCounter count={imageCount} visible={!!animeData} />

//             {/* BUTTON */}
//             {animeData && (
//               <TouchableOpacity
//                 style={styles.imageButton}
//                 onPress={() => setModalVisible(true)}
//               >
//                 <MaterialCommunityIcons name="image" size={20} color="#fff" />

//                 <Text style={styles.imageButtonText}>Mostrar Imágenes</Text>
//               </TouchableOpacity>
//             )}
//           </ScrollView>

//           {/* MODAL */}
//           <ImagesModal
//             visible={modalVisible}
//             images={animeData?.imagenes || []}
//             characterId={animeData?.id}
//             onClose={() => setModalVisible(false)}
//             onImageAdded={() => handleSearch(true)}
//           />
//         </SafeAreaView>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },

//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },

//   container: {
//     flex: 1,
//   },

//   scrollContent: {
//     paddingBottom: 100,
//   },

//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 8,
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#fff",
//   },

//   subtitle: {
//     marginTop: 4,
//     fontSize: 14,
//     color: "#E0E0E0",
//   },

//   selectorContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",

//     gap: 8,

//     paddingHorizontal: 16,

//     marginBottom: 12,
//   },

//   selectorItem: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,

//     borderRadius: 20,

//     backgroundColor: "rgba(255,255,255,0.15)",
//   },

//   selectorItemActive: {
//     backgroundColor: "#F5C842",
//   },

//   selectorText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   selectorTextActive: {
//     color: "#000",
//   },

//   emptyContainer: {
//     paddingHorizontal: 16,
//     marginTop: 20,
//   },

//   emptyText: {
//     color: "#fff",
//     fontSize: 15,
//   },

//   imageButton: {
//     flexDirection: "row",

//     backgroundColor: "#007AFF",

//     marginHorizontal: 16,
//     marginTop: 16,

//     paddingVertical: 14,
//     paddingHorizontal: 16,

//     borderRadius: 14,

//     justifyContent: "center",
//     alignItems: "center",

//     gap: 8,
//   },

//   imageButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });

import { router } from "expo-router";
import React, { useMemo, useState } from "react";

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useAnime } from "@/context/AnimeContext";

import DataCard from "@/components/data_card";
import ImageCounter from "@/components/image_counter";
import ImagesModal from "@/components/images_modal";
import SearchCard from "@/components/search_card";

import { AnimeDetail, searchAnime } from "@/services/animeApi";

export default function DynamicAnimeScreen() {
  const { animes, setCharacterForAnime } = useAnime();

  /* =========================
     ESTADOS
  ========================= */

  const [searchText, setSearchText] = useState("");
  const [animeData, setAnimeData] = useState<AnimeDetail | null>(null);
  const [imageCount, setImageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);

  /* =========================
     ANIMES EXTRA
     IDs 1,2,3 = BASE
  ========================= */

  const extraAnimes = useMemo(() => {
    return animes.filter(
      (anime) => anime.id !== 1 && anime.id !== 2 && anime.id !== 3,
    );
  }, [animes]);

  const selectedAnime = useMemo(() => {
    return extraAnimes.find((anime) => anime.id === selectedAnimeId);
  }, [extraAnimes, selectedAnimeId]);

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = async (silent = false) => {
    if (!selectedAnime) {
      Toast.show({
        type: "error",
        text1: "Selecciona un anime",
        text2: "Debes elegir un anime primero",
      });
      return;
    }

    if (!searchText.trim()) {
      Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "Por favor ingresa un nombre",
      });
      return;
    }

    if (!silent) setLoading(true);

    try {
      const results = await searchAnime(searchText);

      if (results.length === 0) {
        Toast.show({
          type: "error",
          text1: "Sin resultados",
          text2: "No se encontró ningún personaje",
        });
        setAnimeData(null);
        setImageCount(0);
        return;
      }

      const filtered = results.filter(
        (item) => Number(item.anime_id) === Number(selectedAnime.id),
      );

      if (filtered.length === 0) {
        Toast.show({
          type: "info",
          text1: "Anime incorrecto",
          text2: `Solo personajes de ${selectedAnime.name}`,
        });
        setAnimeData(null);
        setImageCount(0);
        return;
      }

      const selected = filtered[0];
      setAnimeData(selected);
      setImageCount(selected.imagenes?.length || 0);
      setCharacterForAnime(selectedAnime.id, selected);

      if (!silent) {
        Toast.show({
          type: "success",
          text1: "Personaje encontrado",
          text2: selected.nombre,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error al buscar personaje",
      });
      setAnimeData(null);
      setImageCount(0);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <ImageBackground
      source={{
        uri: "https://raw.githubusercontent.com/J94rubio/anime_images/main/caballeros_del_zodiaco/background/background_1.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.title}>Animes Adicionales</Text>
              <Text style={styles.subtitle}>
                Selecciona un anime y busca personajes
              </Text>
            </View>

            {/* SELECTOR */}
            <View style={styles.selectorContainer}>
              {extraAnimes.map((anime) => (
                <TouchableOpacity
                  key={anime.id}
                  style={[
                    styles.selectorItem,
                    selectedAnimeId === anime.id && styles.selectorItemActive,
                  ]}
                  onPress={() => {
                    setSelectedAnimeId(anime.id);
                    setAnimeData(null);
                    setImageCount(0);
                  }}
                >
                  <Text
                    style={[
                      styles.selectorText,
                      selectedAnimeId === anime.id && styles.selectorTextActive,
                    ]}
                  >
                    {anime.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SIN ANIMES */}
            {extraAnimes.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay animes adicionales</Text>
              </View>
            )}

            {/* BOTÓN AGREGAR PERSONAJE */}
            {selectedAnimeId && (
              <TouchableOpacity
                style={styles.addCharacterButton}
                onPress={() =>
                  router.push({
                    pathname: "/character/create",
                    params: { animeId: selectedAnimeId },
                  })
                }
              >
                <MaterialCommunityIcons
                  name="account-plus"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.addCharacterButtonText}>
                  Agregar personaje
                </Text>
              </TouchableOpacity>
            )}

            {/* SEARCH */}
            {extraAnimes.length > 0 && (
              <SearchCard
                value={searchText}
                onChangeText={setSearchText}
                onSearch={handleSearch}
                loading={loading}
                placeholder="Buscar personaje..."
              />
            )}

            {/* DATA */}
            {animeData && (
              <DataCard
                nombre={animeData.nombre}
                poder={animeData.poder}
                anime={animeData.anime}
                ciudad={animeData.ciudad}
                birth_date={animeData.birth_date}
                techniques={animeData.techniques}
                extra_data={animeData.extra_data}
              />
            )}

            {/* COUNTER */}
            <ImageCounter count={imageCount} visible={!!animeData} />

            {/* BUTTON IMÁGENES */}
            {animeData && (
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => setModalVisible(true)}
              >
                <MaterialCommunityIcons name="image" size={20} color="#fff" />
                <Text style={styles.imageButtonText}>Mostrar Imágenes</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* MODAL */}
          <ImagesModal
            visible={modalVisible}
            images={animeData?.imagenes || []}
            characterId={animeData?.id}
            onClose={() => setModalVisible(false)}
            onImageAdded={() => handleSearch(true)}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#E0E0E0",
  },
  selectorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  selectorItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  selectorItemActive: {
    backgroundColor: "#F5C842",
  },
  selectorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  selectorTextActive: {
    color: "#000",
  },
  emptyContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  emptyText: {
    color: "#fff",
    fontSize: 15,
  },
  addCharacterButton: {
    flexDirection: "row",
    backgroundColor: "#7C3AED",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  addCharacterButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  imageButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
