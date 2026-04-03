import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/theme';

// Intermediate screen: waits for AsyncStorage restore, then routes correctly
export default function AuthLoadingScreen({ navigation }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      navigation.replace(user ? 'Main' : 'Login');
    }
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accentGreen} />
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
});
