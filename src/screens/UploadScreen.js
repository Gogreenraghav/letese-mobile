import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const INSURERS = ["HDFC", "LIC", "Star Health", "Bajaj", "ICICI"];

export default function UploadScreen({ navigation, route }) {
  const category = route?.params?.category || "General";
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedInsurer, setSelectedInsurer] = useState(null);
  const [policyNumber, setPolicyNumber] = useState("");

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Could not open document picker. Please try again.");
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) {
      Alert.alert("No File Selected", "Please upload your policy PDF first.");
      return;
    }
    Alert.alert(
      "Analysis Started",
      "Analyzing your " + category + " policy. This may take a moment."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>&#8592;</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Letese.</Text>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{category} Insurance</Text>
          </View>
        </View>

        {/* Upload Box */}
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={handlePickDocument}
          activeOpacity={0.75}
        >
          <Text style={styles.uploadIcon}>📄</Text>
          <Text style={styles.uploadTitle}>
            {selectedFile ? selectedFile.name : "Upload Your Policy PDF"}
          </Text>
          <Text style={styles.uploadSubtext}>
            {selectedFile
              ? "Tap to change file"
              : "We'll analyze every clause for you"}
          </Text>
          {!selectedFile && (
            <View style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Browse Files</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Insurer Chips */}
        <Text style={styles.sectionLabel}>Select Your Insurer</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {INSURERS.map((insurer) => (
            <TouchableOpacity
              key={insurer}
              style={[
                styles.chip,
                selectedInsurer === insurer && styles.chipSelected,
              ]}
              onPress={() =>
                setSelectedInsurer(
                  selectedInsurer === insurer ? null : insurer
                )
              }
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedInsurer === insurer && styles.chipTextSelected,
                ]}
              >
                {insurer}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Policy Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your policy number"
            placeholderTextColor="#9CA3AF"
            value={policyNumber}
            onChangeText={setPolicyNumber}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>

        {/* Start Analysis Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartAnalysis}
          activeOpacity={0.85}
        >
          <Text style={styles.startButtonText}>Start Analysis →</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          🔒 Your documents are 100% secure & private
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingBottom: 40 },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: { fontSize: 20, color: "#111827", fontWeight: "600" },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#000000", flex: 1 },
  categoryPill: {
    backgroundColor: "#EFF6FF",
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  categoryPillText: { color: "#3B82F6", fontSize: 12, fontWeight: "600" },
  // Upload Box
  uploadBox: {
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FBFF",
  },
  uploadIcon: { fontSize: 52, marginBottom: 12 },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  uploadButtonText: { color: "#3B82F6", fontSize: 14, fontWeight: "600" },
  // Insurer Chips
  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  chipsContainer: { paddingHorizontal: 20, gap: 10 },
  chip: {
    backgroundColor: "#F3F4F6",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chipSelected: { backgroundColor: "#EFF6FF", borderColor: "#3B82F6" },
  chipText: { fontSize: 13, color: "#4B5563", fontWeight: "500" },
  chipTextSelected: { color: "#3B82F6", fontWeight: "600" },
  // Input
  inputContainer: { marginHorizontal: 20, marginTop: 24 },
  textInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FAFAFA",
  },
  // Start Button
  startButton: {
    marginHorizontal: 20,
    marginTop: 24,
    height: 56,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  // Footer
  footerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#22c55e",
    fontWeight: "500",
    paddingHorizontal: 20,
  },
});
