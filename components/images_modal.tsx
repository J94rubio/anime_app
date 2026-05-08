import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ImagesModalProps {
  visible: boolean;
  images: string[];
  onClose: () => void;
}

const { width } = Dimensions.get("window");

const COLUMNS = 3;
const LIST_PADDING = 16;
const ITEM_GAP = 12;

// Ancho disponible descontando padding lateral y gaps entre columnas
const availableWidth = width - LIST_PADDING * 2 - ITEM_GAP * (COLUMNS - 1);
const imageSize = availableWidth / COLUMNS;

export default function ImagesModal({
  visible,
  images,
  onClose,
}: ImagesModalProps) {
  const renderImage = ({ item, index }: { item: string; index: number }) => {
    // Columna 0 y 1 tienen margen derecho; columna 2 no
    const column = index % COLUMNS;
    const isLastColumn = column === COLUMNS - 1;

    return (
      <View
        style={[
          styles.imageContainer,
          { marginRight: isLastColumn ? 0 : ITEM_GAP },
        ]}
      >
        <View style={styles.circleContainer}>
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
            fadeDuration={300}
          />
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Galería de Imágenes</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={28} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* GALERÍA */}
        {images.length > 0 ? (
          <FlatList
            data={images}
            renderItem={renderImage}
            keyExtractor={(_, index) => `image-${index}`}
            numColumns={COLUMNS}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="image-off" size={48} color="#999" />
            <Text style={styles.emptyText}>No hay imágenes disponibles</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: LIST_PADDING,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },

  closeButton: {
    padding: 4,
  },

  listContent: {
    padding: LIST_PADDING,
  },

  // Alinea las filas al inicio (evita que se estiren con flex)
  columnWrapper: {
    justifyContent: "flex-start",
    marginBottom: ITEM_GAP,
  },

  // Tamaño fijo calculado — sin flex: 1
  imageContainer: {
    width: imageSize,
    alignItems: "center",
  },

  circleContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#999",
  },
});