import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

interface DataCardProps {
  nombre: string;
  poder: string;
  ciudad?: string;
  birth_date?: string;
  anime?: string;
  techniques?: string[];
  extra_data?: string[];
  loading?: boolean;
  visible?: boolean;
}

export default function DataCard({
  nombre,
  poder,
  ciudad,
  birth_date,
  anime,
  techniques = [],
  extra_data = [],
  loading = false,
  visible = true,
}: DataCardProps) {

  if (!visible) return null;

  return (
    <View style={styles.container}>

      {loading ? (

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#007AFF"
          />
        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}

          <View style={styles.header}>

            <View style={styles.avatarContainer}>

              <Text style={styles.avatarText}>
                {nombre.charAt(0)}
              </Text>

            </View>

            <View style={styles.headerInfo}>

              <Text style={styles.nombre}>
                {nombre}
              </Text>

              {anime && (
                <Text style={styles.animeText}>
                  {anime}
                </Text>
              )}

            </View>

          </View>

          {/* DIVIDER */}

          <View style={styles.divider} />

          {/* INFO */}

          <View style={styles.content}>

            <DataRow
              label="Poder Principal"
              value={poder}
            />

            {ciudad && (
              <DataRow
                label="Ciudad Origen"
                value={ciudad}
              />
            )}

            {birth_date && (
              <DataRow
                label="Fecha Nacimiento"
                value={birth_date}
              />
            )}

            {/* TECNICAS */}

            {techniques.length > 0 && (

              <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                  Técnicas
                </Text>

                <View style={styles.tagsContainer}>

                  {techniques.map((tech, index) => (
                    <View
                      key={index}
                      style={styles.tag}
                    >
                      <Text style={styles.tagText}>
                        {tech}
                      </Text>
                    </View>
                  ))}

                </View>

              </View>

            )}

            {/* EXTRA */}

            {extra_data.length > 0 && (

              <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                  Información Extra
                </Text>

                {extra_data.map((item, index) => (
                  <View
                    key={index}
                    style={styles.extraItem}
                  >

                    <View style={styles.bullet} />

                    <Text style={styles.extraText}>
                      {item}
                    </Text>

                  </View>
                ))}

              </View>

            )}

          </View>

        </ScrollView>

      )}

    </View>
  );
}

/* ROW */

function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <View style={styles.dataCard}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",

    borderRadius: 22,

    marginHorizontal: 16,
    marginTop: 18,

    padding: 20,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,

    maxHeight: 550,
  },

  loadingContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarContainer: {
    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: "#007AFF",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  headerInfo: {
    marginLeft: 14,
    flex: 1,
  },

  nombre: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },

  animeText: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 18,
  },

  /* CONTENT */

  content: {
    gap: 14,
  },

  dataCard: {
    backgroundColor: "#F7F8FA",

    paddingVertical: 14,
    paddingHorizontal: 14,

    borderRadius: 14,
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    color: "#000",
    fontWeight: "700",
  },

  /* SECTION */

  section: {
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 12,
  },

  /* TAGS */

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  tag: {
    backgroundColor: "#E8F1FF",

    paddingVertical: 8,
    paddingHorizontal: 12,

    borderRadius: 30,
  },

  tagText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 13,
  },

  /* EXTRA */

  extraItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  bullet: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#007AFF",

    marginTop: 7,
    marginRight: 10,
  },

  extraText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },

});