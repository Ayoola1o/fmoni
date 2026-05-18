import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, ShieldCheck, Fingerprint, Smartphone, Key, Eye, EyeOff, Lock, AlertTriangle, ChevronRight } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

export default function SecurityCenterScreen() {
  const router = useRouter();
  const [biometrics, setBiometrics] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [transactionAlert, setTransactionAlert] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Security Score */}
        <GlassCard style={styles.scoreCard}>
          <View style={styles.scoreTop}>
            <ShieldCheck size={32} color={colors.success} />
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.scoreLabel}>Security Score</Text>
              <Text style={styles.scoreValue}>Good</Text>
            </View>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNum}>72</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
          </View>
          <View style={styles.scoreBg}>
            <View style={[styles.scoreFill, { width: '72%' }]} />
          </View>
          <Text style={styles.scoreHint}>Enable biometrics to improve your score.</Text>
        </GlassCard>

        {/* Security Toggles */}
        <Text style={styles.sectionTitle}>Authentication</Text>
        <GlassCard style={styles.toggleCard}>
          <ToggleRow
            icon={<Fingerprint size={20} color={colors.primary} />}
            label="Biometric Login"
            desc="Use fingerprint or face ID to log in"
            value={biometrics}
            onToggle={setBiometrics}
          />
          <ToggleRow
            icon={<Smartphone size={20} color={colors.primary} />}
            label="Two-Factor Auth (2FA)"
            desc="Require OTP for every login"
            value={twoFactor}
            onToggle={setTwoFactor}
          />
          <ToggleRow
            icon={<AlertTriangle size={20} color={colors.warning} />}
            label="Transaction Alerts"
            desc="Get notified for every transaction"
            value={transactionAlert}
            onToggle={setTransactionAlert}
          />
        </GlassCard>

        {/* Security Actions */}
        <Text style={styles.sectionTitle}>Security Actions</Text>
        <GlassCard style={styles.actionsCard}>
          <ActionRow icon={<Key size={20} color={colors.primary} />} label="Change Transaction PIN" />
          <ActionRow icon={<Lock size={20} color={colors.primary} />} label="Change Login Password" />
          <ActionRow icon={<Eye size={20} color={colors.warning} />} label="View Active Sessions" />
          <ActionRow icon={<EyeOff size={20} color={colors.error} />} label="Freeze Account" isDanger />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const ToggleRow = ({ icon, label, desc, value, onToggle }: any) => (
  <View style={styles.toggleRow}>
    <View style={styles.toggleIcon}>{icon}</View>
    <View style={styles.toggleInfo}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Text style={styles.toggleDesc}>{desc}</Text>
    </View>
    <Switch value={value} onValueChange={onToggle} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.textWhite} />
  </View>
);

const ActionRow = ({ icon, label, isDanger }: { icon: React.ReactNode; label: string; isDanger?: boolean }) => (
  <TouchableOpacity style={styles.actionRow}>
    <View style={[styles.actionIcon, isDanger && { backgroundColor: 'rgba(231,111,81,0.1)' }]}>{icon}</View>
    <Text style={[styles.actionLabel, isDanger && { color: colors.error }]}>{label}</Text>
    <ChevronRight size={18} color={isDanger ? colors.error : colors.textMuted} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20 },
  scoreCard: { padding: 20, marginBottom: 28 },
  scoreTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  scoreLabel: { fontSize: 12, color: colors.textSecondary },
  scoreValue: { fontSize: 20, fontWeight: '800', color: colors.success },
  scoreCircle: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'baseline' },
  scoreNum: { fontSize: 32, fontWeight: '900', color: colors.textPrimary },
  scoreMax: { fontSize: 14, color: colors.textMuted, marginLeft: 2 },
  scoreBg: { height: 8, backgroundColor: colors.background, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  scoreFill: { height: '100%', backgroundColor: colors.success, borderRadius: 4 },
  scoreHint: { fontSize: 12, color: colors.textSecondary },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12, marginTop: 4 },
  toggleCard: { padding: 8, marginBottom: 28 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.background },
  toggleIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  toggleInfo: { flex: 1 },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  toggleDesc: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  actionsCard: { padding: 8, marginBottom: 40 },
  actionRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.background },
  actionIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  actionLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
});
