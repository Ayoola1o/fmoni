import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, ShieldCheck, TrendingUp, User, Mail, MapPin, Phone, ArrowUpRight, ArrowDownLeft, Edit2 } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

export default function MeDetailsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) return null;

  const initials = user.full_name.split(' ').map((n: string) => n[0]).join('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => router.push('/profile/details')}>
          <Edit2 size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{user.full_name}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>

        {/* ── Section 1: Tier Level ── */}
        <Text style={styles.sectionLabel}>Tier Level</Text>
        <GlassCard style={styles.tierCard}>
          <View style={styles.tierRow}>
            <View style={styles.tierIconWrap}>
              <ShieldCheck size={28} color={colors.success} />
            </View>
            <View style={styles.tierInfo}>
              <Text style={styles.tierTitle}>Tier 3 — Fully Verified</Text>
              <Text style={styles.tierDesc}>BVN, NIN & Address confirmed</Text>
            </View>
            <View style={styles.tierBadge}>
              <Text style={styles.tierBadgeText}>MAX</Text>
            </View>
          </View>

          <View style={styles.tierBenefits}>
            <TierBenefit icon={<ShieldCheck size={14} color={colors.success} />} label="₦5,000,000 daily transfer limit" />
            <TierBenefit icon={<ShieldCheck size={14} color={colors.success} />} label="Unlimited ATM withdrawals" />
            <TierBenefit icon={<ShieldCheck size={14} color={colors.success} />} label="Priority customer support" />
          </View>
        </GlassCard>

        {/* ── Section 2: Daily Transaction Limits ── */}
        <Text style={styles.sectionLabel}>Daily Transaction Limits</Text>
        <GlassCard style={styles.limitsCard}>
          <LimitRow
            icon={<ArrowUpRight size={18} color={colors.error} />}
            label="Daily Transfer Out"
            used={50000}
            total={5000000}
          />
          <LimitRow
            icon={<ArrowDownLeft size={18} color={colors.success} />}
            label="Daily Transfer In"
            used={450000}
            total={10000000}
          />
          <LimitRow
            icon={<TrendingUp size={18} color={colors.primary} />}
            label="Monthly Spend"
            used={350000}
            total={1000000}
          />

          <TouchableOpacity style={styles.viewLimitsBtn} onPress={() => router.push('/profile/limits')}>
            <Text style={styles.viewLimitsBtnText}>View Full Limits</Text>
            <ArrowUpRight size={14} color={colors.primary} />
          </TouchableOpacity>
        </GlassCard>

        {/* ── Section 3: Bio Data ── */}
        <Text style={styles.sectionLabel}>Bio Data</Text>
        <GlassCard style={styles.bioCard}>
          <BioRow icon={<User size={18} color={colors.primary} />} label="Full Name" value={user.full_name} />
          <BioRow icon={<Phone size={18} color={colors.primary} />} label="Phone Number" value={user.phone} />
          <BioRow icon={<Mail size={18} color={colors.primary} />} label="Email Address" value="sarah.johnson@example.com" />
          <BioRow icon={<MapPin size={18} color={colors.primary} />} label="Home Address" value="123 Victoria Island, Lagos" />
          <BioRow icon={<ShieldCheck size={18} color={colors.primary} />} label="Account Number" value={user.account_number} />

          <TouchableOpacity style={styles.editBioBtn} onPress={() => router.push('/profile/details')}>
            <Edit2 size={14} color={colors.primary} />
            <Text style={styles.editBioBtnText}>Edit Bio Data</Text>
          </TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const TierBenefit = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View style={styles.tierBenefit}>
    {icon}
    <Text style={styles.tierBenefitText}>{label}</Text>
  </View>
);

const LimitRow = ({ icon, label, used, total }: { icon: React.ReactNode; label: string; used: number; total: number }) => {
  const pct = Math.min((used / total) * 100, 100);
  return (
    <View style={styles.limitRow}>
      <View style={styles.limitRowLeft}>
        <View style={styles.limitIcon}>{icon}</View>
        <View>
          <Text style={styles.limitLabel}>{label}</Text>
          <Text style={styles.limitUsed}>₦{used.toLocaleString()} of ₦{total.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.miniBar}>
        <View style={[styles.miniBarFill, { width: `${pct}%` as any }]} />
      </View>
    </View>
  );
};

const BioRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <View style={styles.bioRow}>
    <View style={styles.bioIcon}>{icon}</View>
    <View style={styles.bioContent}>
      <Text style={styles.bioLabel}>{label}</Text>
      <Text style={styles.bioValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: '800', color: colors.textWhite },
  userName: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  userPhone: { fontSize: 13, color: colors.textSecondary },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10, marginTop: 8 },
  // Tier
  tierCard: { padding: 20, marginBottom: 24 },
  tierRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  tierIconWrap: { width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(39,174,96,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  tierInfo: { flex: 1 },
  tierTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  tierDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  tierBadge: { backgroundColor: colors.accent, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tierBadgeText: { fontSize: 11, fontWeight: '900', color: colors.textPrimary },
  tierBenefits: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 },
  tierBenefit: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tierBenefitText: { fontSize: 13, color: colors.textSecondary, marginLeft: 10 },
  // Limits
  limitsCard: { padding: 20, marginBottom: 24 },
  limitRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  limitRowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  limitIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  limitLabel: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  limitUsed: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  miniBar: { width: 60, height: 6, backgroundColor: colors.background, borderRadius: 3, overflow: 'hidden', marginLeft: 8 },
  miniBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  viewLimitsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  viewLimitsBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary, marginRight: 4 },
  // Bio
  bioCard: { padding: 16, marginBottom: 40 },
  bioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.background },
  bioIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  bioContent: { flex: 1 },
  bioLabel: { fontSize: 11, color: colors.textSecondary, marginBottom: 2 },
  bioValue: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  editBioBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  editBioBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary, marginLeft: 6 },
});
