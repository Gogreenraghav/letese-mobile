import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing, typography } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    const demoUser = { email: email.trim(), name: 'Demo User', id: 1 };
    await login(demoUser, 'demo-token-123');
    setLoading(false);
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>L</Text>
          </View>
          <View style={styles.wordmark}>
            <Text style={styles.wordmarkText}>Letese</Text>
            <Text style={styles.wordmarkDot}>.</Text>
          </View>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Sign In</Text>
            }
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#FFFFFF' },
  scroll:     { flexGrow: 1, justifyContent: 'center', padding: spacing.lg },

  logoWrap:   { alignItems: 'center', marginBottom: spacing.xl },
  logoMark: {
    width: 64, height: 64, borderRadius: 18,
    backgroundColor: 'rgba(30,58,138,0.1)',
    borderWidth: 1, borderColor: 'rgba(30,58,138,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  logoMarkText:   { fontSize: 30, fontWeight: '800', color: '#1E3A8A' },
  wordmark:       { flexDirection: 'row', alignItems: 'baseline' },
  wordmarkText:   { fontSize: 32, fontWeight: '800', color: '#1E3A8A', letterSpacing: -0.5 },
  wordmarkDot:    { fontSize: 36, fontWeight: '800', color: '#22c55e' },
  subtitle:       { fontSize: typography.sm, color: '#4B6CB7', marginTop: 6 },

  card: {
    backgroundColor: '#F8FAFF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(30,58,138,0.12)',
    padding: spacing.lg,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  label: { color: '#1E3A8A', fontSize: typography.sm, fontWeight: '600', marginBottom: 6, marginTop: spacing.sm },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: 'rgba(30,58,138,0.2)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    color: '#1E3A8A', fontSize: typography.base,
    marginBottom: 4,
  },

  btn: {
    backgroundColor: '#1E3A8A',
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.lg,
    elevation: 3,
  },
  btnDisabled: { opacity: 0.6 },
  btnText:     { color: '#FFFFFF', fontWeight: '700', fontSize: typography.base },

  switchRow:   { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  switchText:  { color: '#4B6CB7', fontSize: typography.sm },
  switchLink:  { color: '#22c55e', fontSize: typography.sm, fontWeight: '600' },
});
