import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const DEFAULT_COVERED = [
  'Hospitalization expenses',
  'Day care procedures',
  'Ambulance charges',
  'Pre/Post hospitalization (60/90 days)',
  'Organ donor expenses',
];

const DEFAULT_EXCLUSIONS = [
  'Pre-existing diseases (2yr wait)',
  'Cosmetic procedures',
  'Self-inflicted injuries',
  'War/terrorism',
];

const AnalysisScreen = ({ navigation, route }) => {
  const {
    category = 'Health Insurance',
    policyNumber = 'HDFC-HP-2024',
    fileName = '',
    analysisResult = null,
    policyId = null,
  } = route?.params || {};

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch from backend if policyId is available
  useEffect(() => {
    if (policyId) {
      fetchAnalysis(policyId);
    }
  }, [policyId]);

  const fetchAnalysis = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://69.62.83.21:3010/api/analysis/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        setError('Failed to fetch analysis data');
      }
    } catch (err) {
      setError('Could not connect to server');
      console.warn('Analysis fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Resolve data priority: API > route.params > defaults
  const resolvedData = apiData || analysisResult || {};

  const coverageScore =
    resolvedData.coverageScore ?? resolvedData.score ?? 72;

  const coveredItems =
    (resolvedData.coverage && resolvedData.coverage.length > 0)
      ? resolvedData.coverage
      : (resolvedData.covered && resolvedData.covered.length > 0)
        ? resolvedData.covered
        : DEFAULT_COVERED;

  const exclusionItems =
    (resolvedData.exclusions && resolvedData.exclusions.length > 0)
      ? resolvedData.exclusions
      : (resolvedData.excluded && resolvedData.excluded.length > 0)
        ? resolvedData.excluded
        : DEFAULT_EXCLUSIONS;

  const policyName = resolvedData.policyName || 'HDFC Health Plus Policy';
  const policyStatus = resolvedData.status || 'Active';

  const handleGetCertificate = () => {
    navigation.navigate('Certificate', {
      policyData: {
        category,
        policyNumber,
        fileName,
        policyName,
        policyStatus,
        coverageScore,
        coveredItems,
        exclusionItems,
        analysisResult: resolvedData,
      },
    });
  };

  const progressWidth = `${Math.min(Math.max(coverageScore, 0), 100)}%`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {policyName}
          </Text>
        </View>

        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>{policyStatus}</Text>
        </View>
      </View>

      {/* Subheader */}
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>Analyzed by Letese AI</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Loading overlay for API fetch */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#3B82F6" />
            <Text style={styles.loadingText}>Fetching latest analysis…</Text>
          </View>
        )}

        {/* Error notice (non-blocking) */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠ {error}. Showing cached data.</Text>
          </View>
        )}

        {/* Coverage Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Your Coverage Score</Text>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>

          <Text style={styles.scoreValue}>{coverageScore}% Protected</Text>
        </View>

        {/* What's Covered Section */}
        <View style={styles.coveredCard}>
          <Text style={styles.coveredHeader}>✅ What's Covered</Text>
          {coveredItems.map((item, index) => (
            <View key={`covered-${index}`} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Exclusions Section */}
        <View style={styles.exclusionsCard}>
          <Text style={styles.exclusionsHeader}>❌ Exclusions</Text>
          {exclusionItems.map((item, index) => (
            <View key={`excluded-${index}`} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Bottom spacing for fixed button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.certificateButton}
          onPress={handleGetCertificate}
          activeOpacity={0.85}
        >
          <Text style={styles.certificateButtonText}>Get Certificate →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // ── Header ───────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#1E293B',
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.2,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },

  // ── Subheader ─────────────────────────────────────────────
  subHeaderContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  subHeaderText: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
  },

  // ── Scroll ────────────────────────────────────────────────
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },

  // ── Loading / Error ───────────────────────────────────────
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 8,
  },
  errorBanner: {
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F97316',
  },
  errorText: {
    fontSize: 12,
    color: '#9A3412',
  },

  // ── Coverage Score Card ───────────────────────────────────
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 14,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: 0.3,
  },

  // ── What's Covered Card ───────────────────────────────────
  coveredCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  coveredHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 12,
  },

  // ── Exclusions Card ───────────────────────────────────────
  exclusionsCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  exclusionsHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12,
  },

  // ── Bullet Items ──────────────────────────────────────────
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    fontSize: 16,
    color: '#64748B',
    marginRight: 8,
    marginTop: -1,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },

  // ── Bottom Button ─────────────────────────────────────────
  bottomSpacer: {
    height: 80,
  },
  bottomButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  certificateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  certificateButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});

export default AnalysisScreen;
