import React from 'react';
import { StyleSheet, View, ViewStyle, Platform } from 'react-native';
import { colors } from '../theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function GlassCard({ children, style }: GlassCardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
        backgroundColor: colors.surfaceGlass,
        borderWidth: 1,
        borderColor: colors.borderGlass,
      },
    }),
  },
});
