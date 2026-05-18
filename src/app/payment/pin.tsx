import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, Delete } from 'lucide-react-native';

const PIN_LENGTH = 6;

export default function PinEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const { type, amount, recipient, bank, txId, charges } = params as any;

  const handleKey = (key: string) => {
    setError('');
    if (key === 'DEL') {
      setPin(p => p.slice(0, -1));
      return;
    }
    if (pin.length >= PIN_LENGTH) return;
    const newPin = pin + key;
    setPin(newPin);

    if (newPin.length === PIN_LENGTH) {
      // Validate PIN against known PIN
      if (newPin === '199910') {
        // Navigate to processing
        setTimeout(() => {
          router.replace({
            pathname: '/payment/processing',
            params: { type, amount, recipient, bank, txId, charges },
          });
        }, 300);
      } else {
        setError('Incorrect PIN. Please try again.');
        setPin('');
      }
    }
  };

  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'DEL'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter PIN</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Enter your 6-digit transaction PIN to confirm</Text>
        <Text style={styles.amountLabel}>
          ₦{parseFloat(amount || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>

        {/* PIN Dots */}
        <View style={styles.dotsRow}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < pin.length && styles.dotFilled,
                error && { borderColor: colors.error },
              ]}
            />
          ))}
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {/* Numpad */}
        <View style={styles.numpad}>
          {KEYS.map((key, i) => {
            if (key === '') return <View key={i} style={styles.keyEmpty} />;
            if (key === 'DEL') {
              return (
                <TouchableOpacity key={i} style={styles.key} onPress={() => handleKey('DEL')}>
                  <Delete size={24} color={colors.textPrimary} />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity key={i} style={styles.key} onPress={() => handleKey(key)}>
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 12, textAlign: 'center' },
  amountLabel: { fontSize: 32, fontWeight: '900', color: colors.textPrimary, marginBottom: 32 },
  dotsRow: { flexDirection: 'row', marginBottom: 16 },
  dot: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 2, borderColor: colors.border,
    marginHorizontal: 10,
  },
  dotFilled: { backgroundColor: colors.primary, borderColor: colors.primary },
  errorText: { fontSize: 13, color: colors.error, fontWeight: '600', marginBottom: 16 },
  numpad: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', width: '100%', marginTop: 24,
  },
  key: {
    width: '30%', height: 72,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  keyEmpty: { width: '30%', height: 72 },
  keyText: { fontSize: 28, fontWeight: '600', color: colors.textPrimary },
});
