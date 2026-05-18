import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../theme/colors';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react-native';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {
    type = 'Payment',
    amount = '0',
    recipient = '',
    bank = '',
    txId = `TXN${Date.now().toString().slice(-8)}`,
    charges = '0',
    status = 'success',
  } = params as any;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 8 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const isSuccess = status === 'success';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <View style={[styles.iconCircle, { backgroundColor: isSuccess ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 111, 81, 0.1)' }]}>
            {isSuccess
              ? <CheckCircle2 size={80} color={colors.success} />
              : <XCircle size={80} color={colors.error} />
            }
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <Text style={styles.statusTitle}>{isSuccess ? 'Payment Successful!' : 'Payment Failed'}</Text>
          <Text style={styles.statusAmount}>₦{parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          <Text style={styles.statusDesc}>
            {isSuccess
              ? `Your ${type} was completed successfully.`
              : 'Something went wrong. Please try again.'}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.receiptCard, { opacity: fadeAnim }]}>
          {!!recipient && <ReceiptRow label="Recipient / Service" value={String(recipient)} />}
          {!!bank && <ReceiptRow label="Bank / Provider" value={String(bank)} />}
          <ReceiptRow label="Amount" value={`₦${parseFloat(amount).toLocaleString()}`} />
          <ReceiptRow label="Charges" value={`₦${parseFloat(charges).toLocaleString()}`} />
          <ReceiptRow label="Transaction ID" value={String(txId)} highlight />
          <ReceiptRow label="Date & Time" value={new Date().toLocaleString()} />
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Keep your Transaction ID safe. Use it to track or dispute this transaction.
            </Text>
          </View>
        </Animated.View>

        <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>Share Receipt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const ReceiptRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <View style={styles.receiptRow}>
    <Text style={styles.receiptLabel}>{label}</Text>
    <Text style={[styles.receiptValue, highlight && { color: colors.primary }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  iconWrapper: { marginBottom: 24 },
  iconCircle: {
    width: 140, height: 140, borderRadius: 70,
    justifyContent: 'center', alignItems: 'center',
  },
  statusTitle: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, marginBottom: 8 },
  statusAmount: { fontSize: 32, fontWeight: '900', color: colors.textPrimary, marginBottom: 8 },
  statusDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 32 },
  receiptCard: {
    width: '100%', backgroundColor: colors.surface, borderRadius: 24,
    padding: 20, marginBottom: 24,
    borderWidth: 1, borderColor: colors.border,
  },
  receiptRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.background,
  },
  receiptLabel: { fontSize: 13, color: colors.textSecondary },
  receiptValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, maxWidth: '60%', textAlign: 'right' },
  warningBox: {
    marginTop: 12, backgroundColor: 'rgba(244, 162, 97, 0.1)',
    padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(244, 162, 97, 0.3)',
  },
  warningText: { fontSize: 11, color: colors.warning, lineHeight: 16, textAlign: 'center' },
  homeBtn: {
    width: '100%', backgroundColor: colors.primary,
    height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  homeBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: '700' },
  shareBtn: {
    width: '100%', borderWidth: 1.5, borderColor: colors.primary,
    height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
  },
  shareBtnText: { color: colors.primary, fontSize: 16, fontWeight: '700' },
});
