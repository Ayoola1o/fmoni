import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

export default function PaymentConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    type = 'Payment',
    amount = '0',
    recipient = '',
    bank = '',
    charges = '10',
  } = params as any;

  const txId = `TXN${Date.now().toString().slice(-8)}`;
  const numAmount = parseFloat(amount);
  const numCharges = parseFloat(charges);
  const total = numAmount + numCharges;

  const handleProceed = () => {
    router.push({
      pathname: '/payment/pin',
      params: { type, amount, recipient, bank, txId, charges },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>You are paying</Text>
          <Text style={styles.amount}>₦{numAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>

        <GlassCard style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Transaction Details</Text>
          {!!type && <DetailRow label="Type" value={String(type)} />}
          {!!recipient && <DetailRow label="Recipient / Service" value={String(recipient)} />}
          {!!bank && <DetailRow label="Bank / Provider" value={String(bank)} />}
          <DetailRow label="Amount" value={`₦${numAmount.toLocaleString()}`} />
          <DetailRow label="Charges" value={`₦${numCharges.toLocaleString()}`} />
          <DetailRow label="Total Debit" value={`₦${total.toLocaleString()}`} bold />
          <DetailRow label="Reference ID" value={txId} />
        </GlassCard>

        <View style={styles.warningCard}>
          <AlertTriangle size={18} color={colors.warning} />
          <Text style={styles.warningText}>
            Ensure you have verified all details. fmoni cannot reverse a successful transaction.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Info size={18} color={colors.primary} />
          <Text style={styles.infoText}>
            You will be asked for your 6-digit transaction PIN to authorize this payment.
          </Text>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleProceed}>
          <Text style={styles.confirmBtnText}>Confirm & Enter PIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, bold && { color: colors.primary, fontWeight: '800' }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20 },
  amountSection: { alignItems: 'center', marginVertical: 32 },
  amountLabel: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  amount: { fontSize: 40, fontWeight: '900', color: colors.textPrimary },
  detailsCard: { padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.background,
  },
  detailLabel: { fontSize: 13, color: colors.textSecondary },
  detailValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, maxWidth: '55%', textAlign: 'right' },
  warningCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: 'rgba(244, 162, 97, 0.1)',
    padding: 16, borderRadius: 16, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(244, 162, 97, 0.3)',
  },
  warningText: { flex: 1, fontSize: 13, color: colors.warning, marginLeft: 10, lineHeight: 18 },
  infoCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: 'rgba(42, 157, 143, 0.08)',
    padding: 16, borderRadius: 16, marginBottom: 32,
    borderWidth: 1, borderColor: 'rgba(42, 157, 143, 0.2)',
  },
  infoText: { flex: 1, fontSize: 13, color: colors.primary, marginLeft: 10, lineHeight: 18 },
  confirmBtn: {
    backgroundColor: colors.primary, height: 56,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  confirmBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: '700' },
  cancelBtn: {
    height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border,
  },
  cancelBtnText: { color: colors.textSecondary, fontSize: 16, fontWeight: '600' },
});
