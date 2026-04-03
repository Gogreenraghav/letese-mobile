import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

const CATEGORIES = [
  { id: "1", label: "Health", icon: "🏥" },
  { id: "2", label: "Motor", icon: "🚗" },
  { id: "3", label: "Term Life", icon: "🛡️" },
  { id: "4", label: "Travel", icon: "✈️" },
  { id: "5", label: "Home", icon: "🏠" },
  { id: "6", label: "Critical Illness", icon: "❤️" },
];

export default function HomeScreen({ navigation }) {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate("Upload", { category: item.label })}
      activeOpacity={0.75}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Letese.</Text>
            <Text style={styles.headerSubtitle}>Legal Consultancy</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroCard}>
          {/* Illustration placeholder — replace with actual image/SVG */}
          <View style={styles.illustrationPlaceholder}>
            <Text style={styles.illustrationEmoji}>📋</Text>
          </View>

          <Text style={styles.headline}>Know Your Policy.</Text>
          <Text style={styles.subtext}>
            Know Your Rights, Get Legal Protection.
          </Text>

          {/* IRDAI Badge */}
          <View style={styles.irdaiBadge}>
            <Text style={styles.irdaiBadgeCheck}>✓</Text>
            <Text style={styles.irdaiBadgeText}>IRDAI Certified Analyzer</Text>
          </View>
        </View>

        {/* Category Section */}
        <Text style={styles.sectionTitle}>Select Policy Category</Text>

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.categoryRow}
          contentContainerStyle={styles.categoryList}
        />

        {/* Bottom CTA Button */}
        <TouchableOpacity
          style={styles.analyzeButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Upload", { category: "General" })}
        >
          <Text style={styles.analyzeButtonText}>Analyze My Policy →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  // Hero Card
  heroCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 24,
    alignItems: "flex-start",
  },
  illustrationPlaceholder: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  illustrationEmoji: {
    fontSize: 56,
  },
  headline: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 16,
  },
  // IRDAI Badge
  irdaiBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22c55e",
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  irdaiBadgeCheck: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 6,
  },
  irdaiBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  // Category Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryRow: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#3B82F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E3A5F",
    textAlign: "center",
  },
  // Analyze Button
  analyzeButton: {
    marginHorizontal: 20,
    marginTop: 28,
    height: 56,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  analyzeButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
