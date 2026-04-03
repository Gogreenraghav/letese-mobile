import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { colors, radius, spacing, typography } from '../utils/theme';

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.register({ name: name.trim(), email: email.trim(), password });
      const { token, ...userData } = res.data;
      await login({ ...userData, is_admin: false }, token);
      navigation.replace('Main');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.glowOrb} />

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>L</Text>
          </View>
          <View style={styles.wordmark}>
            <Text style={styles.wordmarkText}>Letese</Text>
            <Text style={styles.wordmarkDot}>.</Text>
          </View>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Min 6 characters"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#000" />
              : <Text style={styles.btnText}>Create Account</Text>
            }
          </TouchableOpacity>

          <Text style={styles.terms}>
            By registering, you agree to our Terms of Service and Privacy Policy.
          </Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.switchLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPrimary },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: spacing.lg },
  glowOrb: {
    position: 'absolute', top: -80, left: -80,
    width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(34,197,94,0.05)',
  },
  logoWrap: { alignItems: 'center', marginBottom: spacing.xl },
  logoMark: {
    width: 64, height: 64, borderRadius: 18,
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.35)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  logoMarkText: { fontSize: 30, fontWeight: '800', color: colors.accentGreen },
  wordmark: { flexDirection: 'row', alignItems: 'baseline' },
  wordmarkText: { fontSize: 32, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.5 },
  wordmarkDot: { fontSize: 36, fontWeight: '800', color: colors.accentGreen },
  subtitle: { fontSize: typography.sm, color: colors.textSecondary, marginTop: 6 },

  card: {
    backgroundColor: colors.bgSecondary,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.lg,
  },
  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)',
    borderRadius: radius.sm, padding: spacing.sm, marginBottom: spacing.md,
  },
  errorText: { color: '#f87171', fontSize: typography.sm },

  label: { color: colors.textSecondary, fontSize: typography.sm, marginBottom: 6, marginTop: spacing.sm },
  input: {
    backgroundColor: colors.bgTertiary,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    color: colors.textPrimary, fontSize: typography.base,
    marginBottom: 4,
  },
  btn: {
    backgroundColor: colors.accentGreen,
    borderRadius: radius.sm, paddingVertical: 14,
    alignItems: 'center', marginTop: spacing.lg,
    shadowColor: colors.accentGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '700', fontSize: typography.base },

  terms: {
    fontSize: 11, color: 'rgba(255,255,255,0.2)',
    textAlign: 'center', marginTop: spacing.md,
  },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.md },
  switchText: { color: 'rgba(255,255,255,0.4)', fontSize: typography.sm },
  switchLink: { color: colors.accentGreen, fontSize: typography.sm, fontWeight: '600' },
});
