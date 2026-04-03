import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';

const NAVY = '#1e3a5f';
const CREAM = '#FAFAF5';
const LIGHT_GREY = '#f0ede6';

const formatDate = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const d = date.getDate().toString().padStart(2, '0');
  const m = months[date.getMonth()];
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
};

const CertificateScreen = ({ route }) => {
  const params = route?.params || {};
  const policyHolder = params.policyHolder || 'Rajesh Kumar';
  const policyName = params.policyName || 'HDFC Health Plus';
  const category = params.category || 'Health Insurance';
  const issueDate = formatDate(new Date());

  const handleFeatureComingSoon = () => {
    Alert.alert('Coming Soon', 'Feature coming soon');
  };

  const tableRows = [
    { label: 'Policyholder:', value: policyHolder },
    { label: 'Policy:', value: policyName },
    { label: 'Type:', value: category },
    { label: 'Issue Date:', value: issueDate },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Outer decorative double-border container */}
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* Corner flourishes */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Certificate content */}
            <View style={styles.certificateContent}>
              {/* Header */}
              <View style={styles.headerSection}>
                <Text style={styles.brandName}>Letese.</Text>
                <Text style={styles.companySubtitle}>LEGAL CONSULTANCY PVT. LTD.</Text>
                <View style={styles.divider} />
              </View>

              {/* Title */}
              <Text style={styles.certificateTitle}>
                Certificate of{'\n'}Policy Protection
              </Text>

              {/* Body text */}
              <Text style={styles.bodyText}>
                This certifies that the following insurance policy has been reviewed and analyzed
                by our expert legal team. We commit to providing professional claim support.
              </Text>

              {/* Details table */}
              <View style={styles.table}>
                {tableRows.map((row, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      index < tableRows.length - 1 && styles.tableRowBorder,
                    ]}
                  >
                    <View style={styles.tableLabelCell}>
                      <Text style={styles.tableLabelText}>{row.label}</Text>
                    </View>
                    <View style={styles.tableValueCell}>
                      <Text style={styles.tableValueText}>{row.value}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                {/* Advocate Signature */}
                <View style={styles.signatureSection}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureText}>Advocate Signature</Text>
                  <Text style={styles.regText}>Reg. No. LLC/2023/001</Text>
                </View>

                {/* Stamp */}
                <View style={styles.stamp}>
                  <Text style={styles.stampTopText}>LETESE</Text>
                  <Text style={styles.stampCheckmark}>✓</Text>
                  <Text style={styles.stampBottomText}>VERIFIED</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleFeatureComingSoon}
            activeOpacity={0.8}
          >
            <Text style={styles.downloadButtonText}>⬇ Download Certificate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleFeatureComingSoon}
            activeOpacity={0.8}
          >
            <Text style={styles.shareButtonText}>↗ Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: CREAM,
  },

  /* Outer double-border */
  outerBorder: {
    borderWidth: 2,
    borderColor: NAVY,
    borderRadius: 4,
    padding: 5,
    backgroundColor: CREAM,
  },
  innerBorder: {
    borderWidth: 1,
    borderColor: NAVY,
    borderRadius: 2,
    padding: 20,
    position: 'relative',
    backgroundColor: CREAM,
  },

  /* Corner flourishes */
  corner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderColor: NAVY,
  },
  cornerTL: {
    top: -1,
    left: -1,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    top: -1,
    right: -1,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },

  /* Certificate content */
  certificateContent: {
    alignItems: 'center',
  },

  /* Header */
  headerSection: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NAVY,
    fontFamily: 'serif',
    letterSpacing: 1,
  },
  companySubtitle: {
    fontSize: 11,
    color: NAVY,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: NAVY,
    width: '100%',
    marginTop: 12,
    opacity: 0.4,
  },

  /* Certificate title */
  certificateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 30,
  },

  /* Body text */
  bodyText: {
    fontSize: 13,
    color: NAVY,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 18,
    paddingHorizontal: 4,
  },

  /* Details table */
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: NAVY,
    marginBottom: 24,
    borderRadius: 2,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 38,
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: NAVY,
  },
  tableLabelCell: {
    flex: 2,
    backgroundColor: LIGHT_GREY,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: NAVY,
  },
  tableLabelText: {
    fontSize: 12,
    color: NAVY,
    fontWeight: '600',
  },
  tableValueCell: {
    flex: 3,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tableValueText: {
    fontSize: 12,
    color: NAVY,
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 8,
  },

  /* Advocate signature */
  signatureSection: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 16,
  },
  signatureLine: {
    height: 1,
    backgroundColor: NAVY,
    width: '80%',
    marginBottom: 6,
  },
  signatureText: {
    fontSize: 14,
    color: NAVY,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  regText: {
    fontSize: 10,
    color: NAVY,
    marginTop: 3,
    opacity: 0.7,
  },

  /* Circular stamp */
  stamp: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: NAVY,
    backgroundColor: CREAM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampTopText: {
    fontSize: 9,
    color: NAVY,
    fontWeight: '600',
    letterSpacing: 2,
    position: 'absolute',
    top: 12,
  },
  stampCheckmark: {
    fontSize: 26,
    color: NAVY,
    fontWeight: 'bold',
  },
  stampBottomText: {
    fontSize: 8,
    color: NAVY,
    fontWeight: '600',
    letterSpacing: 1.5,
    position: 'absolute',
    bottom: 12,
  },

  /* Buttons */
  buttonsContainer: {
    marginTop: 20,
    gap: 12,
  },
  downloadButton: {
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: NAVY,
  },
  shareButtonText: {
    color: NAVY,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CertificateScreen;
