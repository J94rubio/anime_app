// import React from "react";
// import {
//   Modal,
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   Dimensions,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// interface ImagesModalProps {
//   visible: boolean;
//   images: string[];
//   onClose: () => void;
// }

// const { width } = Dimensions.get("window");

// const COLUMNS = 3;
// const LIST_PADDING = 16;
// const ITEM_GAP = 12;

// // Ancho disponible descontando padding lateral y gaps entre columnas
// const availableWidth = width - LIST_PADDING * 2 - ITEM_GAP * (COLUMNS - 1);
// const imageSize = availableWidth / COLUMNS;

// export default function ImagesModal({
//   visible,
//   images,
//   onClose,
// }: ImagesModalProps) {
//   const renderImage = ({ item, index }: { item: string; index: number }) => {
//     // Columna 0 y 1 tienen margen derecho; columna 2 no
//     const column = index % COLUMNS;
//     const isLastColumn = column === COLUMNS - 1;

//     return (
//       <View
//         style={[
//           styles.imageContainer,
//           { marginRight: isLastColumn ? 0 : ITEM_GAP },
//         ]}
//       >
//         <View style={styles.circleContainer}>
//           <Image
//             source={{ uri: item }}
//             style={styles.image}
//             resizeMode="cover"
//             fadeDuration={300}
//           />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Galería de Imágenes</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <MaterialCommunityIcons name="close" size={28} color="#007AFF" />
//           </TouchableOpacity>
//         </View>

//         {/* GALERÍA */}
//         {images.length > 0 ? (
//           <FlatList
//             data={images}
//             renderItem={renderImage}
//             keyExtractor={(_, index) => `image-${index}`}
//             numColumns={COLUMNS}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.listContent}
//             columnWrapperStyle={styles.columnWrapper}
//           />
//         ) : (
//           <View style={styles.emptyContainer}>
//             <MaterialCommunityIcons name="image-off" size={48} color="#999" />
//             <Text style={styles.emptyText}>No hay imágenes disponibles</Text>
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: LIST_PADDING,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E5EA",
//   },

//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#000",
//   },

//   closeButton: {
//     padding: 4,
//   },

//   listContent: {
//     padding: LIST_PADDING,
//   },

//   // Alinea las filas al inicio (evita que se estiren con flex)
//   columnWrapper: {
//     justifyContent: "flex-start",
//     marginBottom: ITEM_GAP,
//   },

//   // Tamaño fijo calculado — sin flex: 1
//   imageContainer: {
//     width: imageSize,
//     alignItems: "center",
//   },

//   circleContainer: {
//     width: imageSize,
//     height: imageSize,
//     borderRadius: imageSize / 2,
//     overflow: "hidden",
//     backgroundColor: "#F0F0F0",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 4,
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//   },

//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#999",
//   },
// });

import React, { useState } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import { addCharacterImage } from "@/services/animeApi";

interface ImagesModalProps {
  visible: boolean;

  images: string[];

  onClose: () => void;

  characterId?: number;

  onImageAdded?: () => void;
}

const { width } = Dimensions.get("window");

const COLUMNS = 3;

const LIST_PADDING = 16;

const ITEM_GAP = 12;

// ANCHO DISPONIBLE
const availableWidth = width - LIST_PADDING * 2 - ITEM_GAP * (COLUMNS - 1);

const imageSize = availableWidth / COLUMNS;

export default function ImagesModal({
  visible,
  images,
  onClose,
  characterId,
  onImageAdded,
}: ImagesModalProps) {
  const [showInput, setShowInput] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const renderImage = ({ item, index }: { item: string; index: number }) => {
    const column = index % COLUMNS;

    const isLastColumn = column === COLUMNS - 1;

    return (
      <View
        style={[
          styles.imageContainer,

          {
            marginRight: isLastColumn ? 0 : ITEM_GAP,
          },
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

  /* =========================
     AGREGAR IMAGEN
  ========================= */

  const handleAddImage = async () => {
    if (!imageUrl.trim()) {
      Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "Ingresa una URL",
      });
      return;
    }

    try {
      setLoading(true);

      console.log("ENVIANDO URL:", imageUrl);

      await addCharacterImage(characterId!, imageUrl);

      setImageUrl("");
      setShowInput(false);

      onImageAdded?.();
    } catch (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo guardar la imagen",
      });
    } finally {
      setLoading(false);
    }
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

        {/* INPUT AGREGAR IMAGEN */}
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="https://imagen.com/foto.jpg"
              value={imageUrl}
              onChangeText={setImageUrl}
              style={styles.input}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddImage}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? "Guardando..." : "Guardar"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

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

        {/* BOTÓN AGREGAR */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowInput((prev) => !prev)}
          >
            <MaterialCommunityIcons name="camera-plus" size={22} color="#fff" />

            <Text style={styles.addButtonText}>
              {showInput ? "Cancelar" : "Agregar Imagen"}
            </Text>
          </TouchableOpacity>
        </View>
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

  inputContainer: {
    padding: 16,

    gap: 12,
  },

  input: {
    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 12,

    paddingHorizontal: 14,

    paddingVertical: 14,

    fontSize: 15,
  },

  saveButton: {
    backgroundColor: "#007AFF",

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",

    fontSize: 15,

    fontWeight: "700",
  },

  listContent: {
    padding: LIST_PADDING,

    paddingBottom: 120,
  },

  columnWrapper: {
    justifyContent: "flex-start",

    marginBottom: ITEM_GAP,
  },

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

  footer: {
    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    padding: 16,

    backgroundColor: "#fff",

    borderTopWidth: 1,

    borderTopColor: "#E5E5EA",
  },

  addButton: {
    flexDirection: "row",

    backgroundColor: "#34C759",

    paddingVertical: 16,

    borderRadius: 14,

    justifyContent: "center",

    alignItems: "center",

    gap: 10,
  },

  addButtonText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "700",
  },
});
