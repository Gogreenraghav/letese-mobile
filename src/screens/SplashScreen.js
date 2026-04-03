import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, StyleSheet, Dimensions,
} from 'react-native';
import { colors } from '../utils/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim  = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Fade + scale in
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1,   duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
      ])
    ).start();

    // Navigate after 2.5s — AuthContext will redirect to Login or Home
    const timer = setTimeout(() => {
      navigation.replace('AuthLoading');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background glow orb */}
      <Animated.View style={[styles.glowOrb, { opacity: glowAnim }]} />

      {/* Grid dots */}
      <View style={styles.grid} pointerEvents="none">
        {Array.from({ length: 120 }).map((_, i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        {/* Logo mark */}
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>L</Text>
        </View>

        {/* Wordmark */}
        <View style={styles.wordmark}>
          <Text style={styles.wordmarkText}>Letese</Text>
          <Text style={styles.wordmarkDot}>.</Text>
        </View>

        <Text style={styles.tagline}>AI-Powered Legal Insurance Analysis</Text>

        {/* Loading bar */}
        <View style={styles.loaderTrack}>
          <Animated.View
            style={[
              styles.loaderFill,
              {
                width: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </Animated.View>

      <Text style={styles.footer}>Letese Legal Consultancy Pvt Ltd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(34,197,94,0.06)',
  },
  grid: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 40,
  },
  dot: {
    width: 2, height: 2, borderRadius: 1,
    backgroundColor: 'rgba(34,197,94,0.15)',
    margin: 20,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoMarkText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.accentGreen,
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  wordmarkText: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  wordmarkDot: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.accentGreen,
    lineHeight: 52,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
    letterSpacing: 0.3,
  },
  loaderTrack: {
    width: 200,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: colors.accentGreen,
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 0.5,
  },
});
