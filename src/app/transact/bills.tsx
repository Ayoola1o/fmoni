import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../theme/colors';
import {
  ArrowLeft, Smartphone, Zap, Tv, Globe,
  ChevronDown, CheckCircle2
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

const providersMap: Record<string, { id: string; name: string; color: string }[]> = {
  Airtime: [
    { id: 'mtn', name: 'MTN', color: '#FFCC00' },
    { id: 'airtel', name: 'Airtel', color: '#FF0000' },
    { id: 'glo', name: 'Glo', color: '#009900' },
    { id: '9mobile', name: '9mobile', color: '#006633' },
  ],
  Data: [
    { id: 'mtn', name: 'MTN', color: '#FFCC00' },
    { id: 'airtel', name: 'Airtel', color: '#FF0000' },
    { id: 'glo', name: 'Glo', color: '#009900' },
    { id: '9mobile', name: '9mobile', color: '#006633' },
  ],
  Electricity: [
    { id: 'ikedc', name: 'Ikeja Electric', color: '#E76F51' },
    { id: 'ekedc', name: 'Eko Electric', color: '#4361EE' },
    { id: 'aedc', name: 'Abuja Electric', color: '#F7B801' },
    { id: 'eedc', name: 'Enugu Electric', color: '#2A9D8F' },
  ],
  'Cable TV': [
    { id: 'dstv', name: 'DSTV', color: '#0056B3' },
    { id: 'gotv', name: 'GOTV', color: '#28A745' },
    { id: 'startimes', name: 'StarTimes', color: '#FFC107' },
  ],
};

const typeIcon = {
  Airtime: Smartphone,
  Data: Globe,
  Electricity: Zap,
  'Cable TV': Tv,
};

export default function BillsScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const billType = type || 'Airtime';
  const providers = providersMap[billType] || providersMap.Airtime;
  const BillIcon = typeIcon[billType as keyof typeof typeIcon] || Smartphone;

  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [identifier, setIdentifier] = useState(''); // phone, meter, or smartcard
  const [amount, setAmount] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const identifierLabel =
    billType === 'Electricity' ? 'Meter Number'
    : billType === 'Cable TV' ? 'SmartCard Number'
    : 'Phone Number';

  const identifierPlaceholder =
    billType === 'Electricity' ? 'Enter meter number'
    : billType === 'Cable TV' ? 'Enter smartcard number'
    : '0800 000 0000';

  const handleProceed = () => {
    if (!identifier) { Alert.alert('Error', `Please enter your ${identifierLabel}`); return; }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) { Alert.alert('Error', 'Please enter a valid amount'); return; }
    if (user && numAmount > user.balance) { Alert.alert('Error', 'Insufficient balance'); return; }

    router.push({
      pathname: '/payment/confirmation',
      params: {
        type: `${billType} - ${selectedProvider.name}`,
        amount: String(numAmount),
        recipient: identifier,
        bank: selectedProvider.name,
        charges: '10',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay {billType}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Type Badge */}
        <View style={styles.typeBadge}>
          <View style={styles.typeBadgeIcon}>
            <BillIcon size={24} color={colors.primary} />
          </View>
          <Text style={styles.typeBadgeText}>{billType} Payment</Text>
        </View>

        {/* Provider selection */}
        <Text style={styles.label}>Select Provider</Text>
        <View style={styles.providerGrid}>
          {providers.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.providerCard, selectedProvider.id === p.id && styles.providerCardActive]}
              onPress={() => setSelectedProvider(p)}
            >
              <View style={[styles.providerDot, { backgroundColor: p.color }]} />
              <Text style={[styles.providerName, selectedProvider.id === p.id && styles.providerNameActive]}>
                {p.name}
              </Text>
              {selectedProvider.id === p.id && <CheckCircle2 size={16} color={colors.primary} style={{ marginLeft: 'auto' }} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Identifier */}
        <Text style={styles.label}>{identifierLabel}</Text>
        <View style={styles.inputWrapper}>
          <BillIcon size={20} color={colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={identifierPlaceholder}
            keyboardType={billType === 'Electricity' || billType === 'Cable TV' ? 'number-pad' : 'phone-pad'}
            value={identifier}
            onChangeText={setIdentifier}
          />
        </View>

        {/* Amount */}
        <Text style={styles.label}>Amount (₦)</Text>
        <TextInput
          style={styles.inputFull}
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Quick Amounts */}
        <View style={styles.quickAmounts}>
          {[200, 500, 1000, 2000, 5000].map((amt) => (
            <TouchableOpacity key={amt} style={styles.amtBtn} onPress={() => setAmount(amt.toString())}>
              <Text style={styles.amtBtnText}>₦{amt.toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Balance Info */}
        {user && (
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceValue}>₦{user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
          <Text style={styles.proceedBtnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContent: { padding: 20 },
  typeBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 143, 0.08)',
    padding: 16, borderRadius: 16, marginBottom: 28,
    borderWidth: 1, borderColor: 'rgba(42, 157, 143, 0.2)',
  },
  typeBadgeIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  typeBadgeText: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  label: {
    fontSize: 14, fontWeight: '600',
    color: colors.textSecondary, marginBottom: 10, marginTop: 4,
  },
  providerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  providerCard: {
    width: '48%', backgroundColor: colors.surface,
    padding: 14, borderRadius: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border,
  },
  providerCardActive: { borderColor: colors.primary, backgroundColor: 'rgba(42, 157, 143, 0.05)' },
  providerDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  providerName: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  providerNameActive: { color: colors.primary },
  inputWrapper: { position: 'relative', justifyContent: 'center', marginBottom: 20 },
  inputIcon: { position: 'absolute', left: 16, zIndex: 1 },
  input: {
    height: 56, backgroundColor: colors.surface, borderRadius: 16,
    paddingLeft: 48, paddingRight: 16, fontSize: 16,
    color: colors.textPrimary, borderWidth: 1, borderColor: colors.border,
  },
  inputFull: {
    height: 56, backgroundColor: colors.surface, borderRadius: 16,
    paddingHorizontal: 16, fontSize: 20, fontWeight: '700',
    color: colors.textPrimary, borderWidth: 1, borderColor: colors.border, marginBottom: 12,
  },
  quickAmounts: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  amtBtn: {
    backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, marginRight: 8, marginBottom: 8,
    borderWidth: 1, borderColor: colors.border,
  },
  amtBtnText: { fontSize: 13, fontWeight: '600', color: colors.primary },
  balanceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 28,
    backgroundColor: colors.surface, padding: 16,
    borderRadius: 14, borderWidth: 1, borderColor: colors.border,
  },
  balanceLabel: { fontSize: 13, color: colors.textSecondary },
  balanceValue: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  proceedBtn: {
    backgroundColor: colors.primary, height: 56,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 40,
  },
  proceedBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: '700' },
});
