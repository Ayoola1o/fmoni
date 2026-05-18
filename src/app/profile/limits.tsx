import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, TrendingUp, TrendingDown, ShieldCheck, Info } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

const LIMITS = [
  { label: 'Daily Transfer Limit', used: 50000, total: 200000, color: colors.primary },
  { label: 'Single Transfer Limit', used: 0, total: 50000, color: colors.success },
  { label: 'Daily ATM Withdrawal', used: 20000, total: 100000, color: colors.accent },
  { label: 'Monthly Transaction Cap', used: 350000, total: 1000000, color: colors.warning },
];

export default function AccountLimitsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Limits</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tierCard}>
          <View style={styles.tierLeft}>
            <ShieldCheck size={28} color={colors.success} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.tierLabel}>Current Tier</Text>
              <Text style={styles.tierValue}>Tier 3 - Fully Verified</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnText}>Max Tier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Info size={16} color={colors.primary} />
          <Text style={styles.infoText}>
            Upgrade your account tier to increase your daily transaction limits.
          </Text>
        </View>

        {LIMITS.map((item) => {
          const pct = Math.min((item.used / item.total) * 100, 100);
          return (
            <GlassCard key={item.label} style={styles.limitCard}>
              <View style={styles.limitHeader}>
                <Text style={styles.limitLabel}>{item.label}</Text>
                <Text style={styles.limitUsed}>
                  ₦{item.used.toLocaleString()} / ₦{item.total.toLocaleString()}
                </Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: item.color }]} />
              </View>
              <Text style={styles.limitRemaining}>
                ₦{(item.total - item.used).toLocaleString()} remaining
              </Text>
            </GlassCard>
          );
        })}

        <GlassCard style={styles.noteCard}>
          <Text style={styles.noteTitle}>Tier Upgrade Requirements</Text>
          <LimitNote label="Tier 1" desc="Phone number only — ₦50k/day limit" done />
          <LimitNote label="Tier 2" desc="BVN linked — ₦200k/day limit" done />
          <LimitNote label="Tier 3" desc="NIN + Address verification — ₦5M/day limit" done />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const LimitNote = ({ label, desc, done }: { label: string; desc: string; done?: boolean }) => (
  <View style={styles.limitNote}>
    <ShieldCheck size={16} color={done ? colors.success : colors.textMuted} />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={[styles.limitNoteLabel, done && { color: colors.success }]}>{label}</Text>
      <Text style={styles.limitNoteDesc}>{desc}</Text>
    </View>
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
  tierCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.secondary, padding: 20, borderRadius: 20, marginBottom: 16,
  },
  tierLeft: { flexDirection: 'row', alignItems: 'center' },
  tierLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 2 },
  tierValue: { fontSize: 15, fontWeight: '700', color: colors.textWhite },
  upgradeBtn: {
    backgroundColor: colors.accent, paddingHorizontal: 14,
    paddingVertical: 6, borderRadius: 10,
  },
  upgradeBtnText: { fontSize: 12, fontWeight: '700', color: colors.textPrimary },
  infoBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 143, 0.08)',
    padding: 12, borderRadius: 12, marginBottom: 24,
    borderWidth: 1, borderColor: 'rgba(42, 157, 143, 0.2)',
  },
  infoText: { flex: 1, fontSize: 13, color: colors.primary, marginLeft: 10, lineHeight: 18 },
  limitCard: { padding: 16, marginBottom: 14 },
  limitHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  limitLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  limitUsed: { fontSize: 12, color: colors.textSecondary },
  progressBg: {
    height: 8, backgroundColor: colors.background, borderRadius: 4, overflow: 'hidden', marginBottom: 6,
  },
  progressFill: { height: '100%', borderRadius: 4 },
  limitRemaining: { fontSize: 11, color: colors.textMuted },
  noteCard: { padding: 20, marginTop: 8 },
  noteTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  limitNote: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  limitNoteLabel: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  limitNoteDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
