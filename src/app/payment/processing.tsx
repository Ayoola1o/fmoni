import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../theme/colors';
import { Loader } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

export default function PaymentProcessingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { performTransfer } = useAuth();

  const { type, amount, recipient, bank, txId, charges } = params as any;

  useEffect(() => {
    // Spinning animation
    Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 1200, useNativeDriver: true })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    // Perform transaction and navigate to success after 2.5 seconds
    const timer = setTimeout(async () => {
      const parsedAmount = parseFloat(amount || '0');
      const parsedCharges = parseFloat(charges || '0');
      await performTransfer(parsedAmount + parsedCharges);

      router.replace({
        pathname: '/payment/success',
        params: { type, amount, recipient, bank, txId, charges, status: 'success' },
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.iconCircle}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Loader size={48} color={colors.primary} />
            </Animated.View>
          </View>
        </Animated.View>

        <Text style={styles.title}>Processing Payment...</Text>
        <Text style={styles.subtitle}>
          Please wait while we process your {type?.toLowerCase() || 'payment'}. Do not close this screen.
        </Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>₦{parseFloat(amount || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          {!!recipient && <Text style={styles.detailSub}>{recipient}</Text>}
        </View>

        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <DotAnim key={i} delay={i * 250} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const DotAnim = ({ delay }: { delay: number }) => {
  const anim = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    }, delay);
  }, []);
  return <Animated.View style={[styles.dot, { opacity: anim }]} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  pulseRing: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(42, 157, 143, 0.08)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 40,
  },
  iconCircle: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: 'rgba(42, 157, 143, 0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 },
  subtitle: {
    fontSize: 14, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 22, marginBottom: 40,
  },
  detailsBox: {
    backgroundColor: colors.surface, borderRadius: 16,
    padding: 20, alignItems: 'center', width: '100%',
    borderWidth: 1, borderColor: colors.border, marginBottom: 40,
  },
  detailLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  detailValue: { fontSize: 28, fontWeight: '900', color: colors.textPrimary },
  detailSub: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  dotsContainer: { flexDirection: 'row' },
  dot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: colors.primary, marginHorizontal: 5,
  },
});
