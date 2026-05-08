import React, { useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAnime } from "@/context/AnimeContext";

const { width } = Dimensions.get("window");

const imageSize = width / 3.5;

export default function Screen4() {

  const {
    saintSeiyaCharacter,
    hunterCharacter,
    onePieceCharacter,
  } = useAnime();

  const [modalVisible, setModalVisible] =
    useState(false);

  const allImages = [
    ...(saintSeiyaCharacter?.imagenes || []),
    ...(hunterCharacter?.imagenes || []),
    ...(onePieceCharacter?.imagenes || []),
  ];

  const renderCharacterCard = (
    title: string,
    icon: string,
    character: any
  ) => {

    if (!character) {
      return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>

            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={icon as any}
                size={22}
                color="#fff"
              />
            </View>

            <Text style={styles.cardTitle}>
              {title}
            </Text>

          </View>

          <Text style={styles.emptyText}>
            No se ha consultado ningún personaje
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.card}>

        {/* HEADER */}
        <View style={styles.cardHeader}>

          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={icon as any}
              size={22}
              color="#fff"
            />
          </View>

          <Text style={styles.cardTitle}>
            {title}
          </Text>

        </View>

        {/* IMAGE */}
        <View style={styles.characterImageContainer}>

          <Image
            source={{
              uri: character.imagenes?.[0],
            }}
            style={styles.characterImage}
            resizeMode="cover"
          />

        </View>

        {/* INFO */}
        <View style={styles.infoContainer}>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Nombre
            </Text>

            <Text style={styles.value}>
              {character.nombre}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Técnica Principal
            </Text>

            <Text style={styles.value}>
              {character.poder}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Fecha Nacimiento
            </Text>

            <Text style={styles.value}>
              {character.birth_date}
            </Text>
          </View>

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.title}>
            Resumen General
          </Text>

          <Text style={styles.subtitle}>
            Últimos personajes consultados
          </Text>

        </View>

        {/* CARDS */}

        {renderCharacterCard(
          "Caballeros del Zodiaco",
          "horse",
          saintSeiyaCharacter
        )}

        {renderCharacterCard(
          "Hunter x Hunter",
          "lightning-bolt",
          hunterCharacter
        )}

        {renderCharacterCard(
          "One Piece",
          "ship-wheel",
          onePieceCharacter
        )}

        {/* BUTTON */}

        {allImages.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >

            <MaterialCommunityIcons
              name="image-multiple"
              size={22}
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Ver galería completa
            </Text>

          </TouchableOpacity>
        )}

      </ScrollView>

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >

        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>

            {/* HEADER */}
            <View style={styles.modalHeader}>

              <Text style={styles.modalTitle}>
                Galería de Personajes
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >

                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#000"
                />

              </TouchableOpacity>

            </View>

            {/* IMAGES */}
            <FlatList
              data={allImages}
              keyExtractor={(_, index) =>
                index.toString()
              }
              numColumns={3}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 20,
              }}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>

                  <View style={styles.circleContainer}>

                    <Image
                      source={{ uri: item }}
                      style={styles.image}
                      resizeMode="cover"
                    />

                  </View>

                </View>
              )}
            />

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  scrollContent: {
    paddingBottom: 120,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",

    marginHorizontal: 16,
    marginTop: 16,

    padding: 18,

    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#007AFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  characterImageContainer: {
    alignItems: "center",
    marginBottom: 18,
  },

  characterImage: {
    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor: "#EAEAEA",
  },

  infoContainer: {
    gap: 12,
  },

  infoRow: {
    backgroundColor: "#F7F8FA",

    paddingVertical: 12,
    paddingHorizontal: 14,

    borderRadius: 12,
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    color: "#000",
    fontWeight: "700",
  },

  emptyText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },

  button: {
    flexDirection: "row",

    backgroundColor: "#007AFF",

    marginHorizontal: 16,
    marginTop: 24,

    paddingVertical: 14,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    gap: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  /* MODAL */

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",

    height: "80%",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },

  circleContainer: {
    width: imageSize,
    height: imageSize,

    borderRadius: imageSize / 2,

    overflow: "hidden",

    backgroundColor: "#F0F0F0",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 4,
  },

  image: {
    width: "100%",
    height: "100%",
  },

});