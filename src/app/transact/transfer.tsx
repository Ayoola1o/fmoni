import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Alert, FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import {
  ArrowLeft, Search, User, ChevronRight,
  Building2, ChevronDown, Plus
} from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

const BANKS = [
  'Access Bank', 'First Bank', 'GTBank', 'Zenith Bank',
  'UBA', 'Wema Bank', 'Sterling Bank', 'FCMB',
  'Polaris Bank', 'Fidelity Bank', 'Steady Bank (fmoni)',
];

const RECENT_CONTACTS = [
  { id: '1', name: 'James Adenuga', account: '3094857221', bank: 'GTBank' },
  { id: '2', name: 'Amaka Obi', account: '2087654321', bank: 'Access Bank' },
  { id: '3', name: 'Tunde Bello', account: '0091234567', bank: 'First Bank' },
];

export default function TransferScreen() {
  const [step, setStep] = useState(1); // 1: Recipient, 2: Amount & Details
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('GTBank');
  const [showBankList, setShowBankList] = useState(false);
  const [resolvedName, setResolvedName] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleResolveAccount = (num: string) => {
    setAccountNumber(num);
    if (num.length === 10) {
      // Simulate account name resolution
      setTimeout(() => setResolvedName('James Adenuga'), 500);
    } else {
      setResolvedName('');
    }
  };

  const selectContact = (contact: typeof RECENT_CONTACTS[0]) => {
    setAccountNumber(contact.account);
    setSelectedBank(contact.bank);
    setResolvedName(contact.name);
    setStep(2);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!resolvedName) { Alert.alert('Error', 'Please enter a valid 10-digit account number'); return; }
      setStep(2);
    } else if (step === 2) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) { Alert.alert('Error', 'Please enter a valid amount'); return; }
      if (user && numAmount > user.balance) { Alert.alert('Error', 'Insufficient balance'); return; }

      router.push({
        pathname: '/payment/confirmation',
        params: {
          type: 'Bank Transfer',
          amount: String(numAmount),
          recipient: resolvedName,
          bank: selectedBank,
          charges: '10',
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 1 ? router.back() : setStep(1)}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{step === 1 ? 'Send Money' : 'Enter Amount'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2].map(s => (
          <View key={s} style={styles.stepRow}>
            <View style={[styles.stepDot, step >= s && styles.stepDotActive]}>
              <Text style={[styles.stepNum, step >= s && styles.stepNumActive]}>{s}</Text>
            </View>
            {s < 2 && <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />}
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && (
          <>
            {/* Recent Contacts */}
            <Text style={styles.sectionLabel}>Recent Contacts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactsRow}>
              <TouchableOpacity style={styles.addContactBtn}>
                <Plus size={22} color={colors.primary} />
              </TouchableOpacity>
              {RECENT_CONTACTS.map(c => (
                <TouchableOpacity key={c.id} style={styles.contactItem} onPress={() => selectContact(c)}>
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactInitial}>{c.name[0]}</Text>
                  </View>
                  <Text style={styles.contactName} numberOfLines={1}>{c.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.divider}><Text style={styles.dividerText}>Or enter account details</Text></View>

            {/* Bank Picker */}
            <Text style={styles.label}>Select Bank</Text>
            <TouchableOpacity style={styles.bankPicker} onPress={() => setShowBankList(!showBankList)}>
              <Building2 size={20} color={colors.primary} />
              <Text style={styles.bankPickerText}>{selectedBank}</Text>
              <ChevronDown size={18} color={colors.textMuted} />
            </TouchableOpacity>

            {showBankList && (
              <GlassCard style={styles.bankListCard}>
                <FlatList
                  data={BANKS}
                  scrollEnabled={false}
                  keyExtractor={b => b}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.bankListItem}
                      onPress={() => { setSelectedBank(item); setShowBankList(false); }}
                    >
                      <Text style={[styles.bankListText, selectedBank === item && { color: colors.primary, fontWeight: '700' }]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </GlassCard>
            )}

            {/* Account Number */}
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter 10-digit account number"
              keyboardType="number-pad"
              maxLength={10}
              value={accountNumber}
              onChangeText={handleResolveAccount}
            />

            {resolvedName ? (
              <View style={styles.resolvedCard}>
                <User size={18} color={colors.success} />
                <Text style={styles.resolvedName}>{resolvedName}</Text>
              </View>
            ) : null}
          </>
        )}

        {step === 2 && (
          <>
            <GlassCard style={styles.recipientCard}>
              <Text style={styles.recipientLabel}>Sending to</Text>
              <Text style={styles.recipientName}>{resolvedName}</Text>
              <Text style={styles.recipientBank}>{selectedBank} • {accountNumber}</Text>
            </GlassCard>

            <Text style={styles.label}>Amount (₦)</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="numeric"
              autoFocus
              value={amount}
              onChangeText={setAmount}
            />

            {user && (
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceValue}>₦{user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              </View>
            )}

            <Text style={styles.label}>Narration (Optional)</Text>
            <TextInput
              style={styles.inputField}
              placeholder="What is this payment for?"
              value={narration}
              onChangeText={setNarration}
            />
          </>
        )}

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>{step === 1 ? 'Continue' : 'Proceed to Confirm'}</Text>
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
  stepIndicator: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 16, paddingHorizontal: 60,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center' },
  stepDot: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  stepDotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepNum: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  stepNumActive: { color: colors.textWhite },
  stepLine: { width: 60, height: 2, backgroundColor: colors.border },
  stepLineActive: { backgroundColor: colors.primary },
  scrollContent: { padding: 20 },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 14 },
  contactsRow: { marginBottom: 24 },
  addContactBtn: {
    width: 56, height: 56, borderRadius: 28,
    borderWidth: 1.5, borderColor: colors.primary, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  contactItem: { alignItems: 'center', marginRight: 16, width: 60 },
  contactAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.secondary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  contactInitial: { fontSize: 20, fontWeight: '700', color: colors.textWhite },
  contactName: { fontSize: 11, color: colors.textSecondary, textAlign: 'center' },
  divider: { alignItems: 'center', marginVertical: 20 },
  dividerText: { fontSize: 12, color: colors.textMuted, backgroundColor: colors.background, paddingHorizontal: 8 },
  label: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 10, marginTop: 4 },
  bankPicker: {
    height: 56, backgroundColor: colors.surface, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    borderWidth: 1, borderColor: colors.border, marginBottom: 10,
  },
  bankPickerText: { flex: 1, fontSize: 16, color: colors.textPrimary, marginLeft: 12 },
  bankListCard: { padding: 8, marginBottom: 16, maxHeight: 200, overflow: 'hidden' },
  bankListItem: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.background },
  bankListText: { fontSize: 14, color: colors.textSecondary },
  inputField: {
    height: 56, backgroundColor: colors.surface, borderRadius: 16,
    paddingHorizontal: 16, fontSize: 16, color: colors.textPrimary,
    borderWidth: 1, borderColor: colors.border, marginBottom: 16,
  },
  resolvedCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(39, 174, 96, 0.08)', padding: 14,
    borderRadius: 12, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(39, 174, 96, 0.2)',
  },
  resolvedName: { fontSize: 15, fontWeight: '700', color: colors.success, marginLeft: 10 },
  recipientCard: { padding: 20, marginBottom: 24 },
  recipientLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  recipientName: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  recipientBank: { fontSize: 13, color: colors.textSecondary },
  amountInput: {
    fontSize: 40, fontWeight: '900', color: colors.textPrimary,
    textAlign: 'center', marginVertical: 16, padding: 0,
  },
  balanceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surface, padding: 16, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border, marginBottom: 20,
  },
  balanceLabel: { fontSize: 13, color: colors.textSecondary },
  balanceValue: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  nextBtn: {
    backgroundColor: colors.primary, height: 56,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 24, marginBottom: 40,
  },
  nextBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: '700' },
});
