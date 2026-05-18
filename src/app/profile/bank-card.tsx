import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, CreditCard, Building2, Plus, MoreVertical, Check } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

const LINKED_ACCOUNTS = [
  { id: '1', bankName: 'GTBank', accountNumber: '0091234567', accountName: 'Test User', isDefault: true },
  { id: '2', bankName: 'Access Bank', accountNumber: '1234567890', accountName: 'Test User', isDefault: false },
];

export default function BankCardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Card / Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* fmoni Virtual Card */}
        <View style={styles.virtualCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardNetwork}>fmoni</Text>
            <CreditCard size={28} color={colors.textWhite} opacity={0.8} />
          </View>
          <Text style={styles.cardNumber}>**** **** **** 7221</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardDetailLabel}>Card Holder</Text>
              <Text style={styles.cardDetailValue}>Test User</Text>
            </View>
            <View>
              <Text style={styles.cardDetailLabel}>Expires</Text>
              <Text style={styles.cardDetailValue}>05/29</Text>
            </View>
            <View>
              <Text style={styles.cardDetailLabel}>Type</Text>
              <Text style={styles.cardDetailValue}>Verve</Text>
            </View>
          </View>
        </View>

        {/* Linked Bank Accounts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Plus size={18} color={colors.primary} />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {LINKED_ACCOUNTS.map((account) => (
          <GlassCard key={account.id} style={styles.accountCard}>
            <View style={styles.bankIcon}>
              <Building2 size={22} color={colors.primary} />
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.bankName}>{account.bankName}</Text>
              <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              <Text style={styles.accountName}>{account.accountName}</Text>
            </View>
            <View style={styles.accountRight}>
              {account.isDefault && (
                <View style={styles.defaultBadge}>
                  <Check size={12} color={colors.success} />
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
              <TouchableOpacity style={styles.moreBtn}>
                <MoreVertical size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          </GlassCard>
        ))}

        <TouchableOpacity style={styles.addAccountBtn}>
          <Plus size={20} color={colors.primary} />
          <Text style={styles.addAccountText}>Add New Bank Account</Text>
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
  virtualCard: {
    backgroundColor: colors.secondary, borderRadius: 24,
    padding: 24, marginBottom: 32,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  cardNetwork: { fontSize: 22, fontWeight: '900', color: colors.textWhite, letterSpacing: 1 },
  cardNumber: { fontSize: 22, fontWeight: '700', color: colors.textWhite, letterSpacing: 4, marginBottom: 28 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  cardDetailLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  cardDetailValue: { fontSize: 13, fontWeight: '700', color: colors.textWhite },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  addBtn: { flexDirection: 'row', alignItems: 'center' },
  addBtnText: { fontSize: 14, color: colors.primary, fontWeight: '700', marginLeft: 4 },
  accountCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, marginBottom: 12,
  },
  bankIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  accountInfo: { flex: 1 },
  bankName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  accountNumber: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  accountName: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  accountRight: { alignItems: 'flex-end' },
  defaultBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginBottom: 6,
  },
  defaultText: { fontSize: 11, color: colors.success, fontWeight: '700', marginLeft: 4 },
  moreBtn: { padding: 4 },
  addAccountBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.primary, borderStyle: 'dashed',
    height: 56, borderRadius: 16, marginTop: 8,
  },
  addAccountText: { fontSize: 14, fontWeight: '700', color: colors.primary, marginLeft: 10 },
});
