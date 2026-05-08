import React, { useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useAnime } from "@/context/AnimeContext";

import SearchCard from "@/components/search_card";
import DataCard from "@/components/data_card";
import ImageCounter from "@/components/image_counter";
import ImagesModal from "@/components/images_modal";

import {
  searchAnime,
  AnimeDetail,
} from "@/services/animeApi";

const ANIME_ID = 1; // Caballeros del Zodiaco

export default function Screen1() {

  const [searchText, setSearchText] =
    useState("");

  const [animeData, setAnimeData] =
    useState<AnimeDetail | null>(null);

  const [imageCount, setImageCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  /* CONTEXT */
  const {
    setSaintSeiyaCharacter,
  } = useAnime();

  const handleSearch = async () => {

    // INPUT VACÍO
    if (!searchText.trim()) {

      Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2:
          "Por favor ingresa un nombre",
      });

      return;
    }

    setLoading(true);

    try {

      console.log(
        "Buscando:",
        searchText
      );

      const results =
        await searchAnime(searchText);

      console.log(
        "Resultados obtenidos:",
        results
      );

      // NO EXISTE
      if (results.length === 0) {

        Toast.show({
          type: "error",
          text1: "Sin resultados",
          text2:
            "No se encontró ningún personaje",
        });

        setAnimeData(null);
        setImageCount(0);

        return;
      }

      // FILTRO
      const filtered = results.filter(
        (item) =>
          item.anime_id === ANIME_ID
      );

      // NO PERTENECE
      if (filtered.length === 0) {

        Toast.show({
          type: "info",
          text1: "Anime incorrecto",
          text2:
            "Solo se permiten personajes de Caballeros del Zodiaco",
        });

        setAnimeData(null);
        setImageCount(0);

        return;
      }

      // OK
      const selected = filtered[0];

      setAnimeData(selected);

      setImageCount(
        selected.imagenes?.length || 0
      );

      // CONTEXT
      setSaintSeiyaCharacter(selected);

      Toast.show({
        type: "success",
        text1: "Personaje encontrado",
        text2: selected.nombre,
      });

    } catch (error) {

      console.error(
        "Error completo:",
        error
      );

      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          "Error al buscar. Verifica tu conexión.",
      });

      setAnimeData(null);
      setImageCount(0);

    } finally {

      setLoading(false);

    }
  };

  return (

    <ImageBackground
      source={{
        uri: "https://raw.githubusercontent.com/J94rubio/anime_images/main/caballeros_del_zodiaco/background/background_1.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >

      {/* OVERLAY OSCURO */}
      <View style={styles.overlay}>

        <SafeAreaView style={styles.container}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.scrollContent
            }
          >

            {/* HEADER */}
            <View style={styles.header}>

              <Text style={styles.title}>
                Caballeros del Zodiaco
              </Text>

              <Text style={styles.subtitle}>
                Busca tus personajes favoritos
              </Text>

            </View>

            {/* SEARCH */}
            <SearchCard
              value={searchText}
              onChangeText={setSearchText}
              onSearch={handleSearch}
              loading={loading}
              placeholder="Buscar personaje..."
            />

            {/* DATA */}
            {animeData && (
              <DataCard
                nombre={animeData.nombre}
                poder={animeData.poder}
                anime={animeData.anime}
                ciudad={animeData.ciudad}
                birth_date={
                  animeData.birth_date
                }
                techniques={
                  animeData.techniques
                }
                extra_data={
                  animeData.extra_data
                }
              />
            )}

            {/* COUNTER */}
            <ImageCounter
              count={imageCount}
              visible={!!animeData}
            />

            {/* BUTTON */}
            {animeData && (

              <TouchableOpacity
                style={styles.imageButton}
                onPress={() =>
                  setModalVisible(true)
                }
              >

                <MaterialCommunityIcons
                  name="image"
                  size={20}
                  color="#fff"
                />

                <Text
                  style={
                    styles.imageButtonText
                  }
                >
                  Mostrar Imágenes
                </Text>

              </TouchableOpacity>

            )}

          </ScrollView>

          {/* MODAL */}
          <ImagesModal
            visible={modalVisible}
            images={
              animeData?.imagenes || []
            }
            onClose={() =>
              setModalVisible(false)
            }
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
    backgroundColor:
      "rgba(0,0,0,0.45)",
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
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#E0E0E0",
  },

  imageButton: {

    flexDirection: "row",

    backgroundColor: "#007AFF",

    marginHorizontal: 16,
    marginTop: 16,

    paddingVertical: 14,
    paddingHorizontal: 16,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },

  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

});