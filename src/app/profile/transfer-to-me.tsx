import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, Share2, Copy, QrCode, User, Smartphone } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

export default function TransferToMeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send money to me on fmoni!\nName: ${user?.full_name}\nAccount: ${user?.account_number}\nBank: Steady Bank (fmoni)`,
      });
    } catch (_) {}
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer to Me</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Share your details so others can send you money easily.</Text>

        {/* QR Code Placeholder */}
        <GlassCard style={styles.qrCard}>
          <View style={styles.qrBox}>
            <QrCode size={120} color={colors.secondary} strokeWidth={1.2} />
          </View>
          <Text style={styles.qrName}>{user.full_name}</Text>
          <Text style={styles.qrAccount}>{user.account_number}</Text>
          <Text style={styles.qrBank}>Steady Bank (fmoni)</Text>
          <View style={styles.qrDivider} />
          <Text style={styles.qrScan}>Scan QR Code to send money</Text>
        </GlassCard>

        {/* Account Details */}
        <GlassCard style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Account Details</Text>
          <DetailRow icon={<User size={18} color={colors.primary} />} label="Account Name" value={user.full_name} />
          <DetailRow icon={<Smartphone size={18} color={colors.primary} />} label="Account Number" value={user.account_number} />
          <DetailRow icon={<QrCode size={18} color={colors.primary} />} label="Bank" value="Steady Bank (fmoni)" />
        </GlassCard>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Share2 size={20} color={colors.textWhite} />
          <Text style={styles.shareBtnText}>Share My Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.copyBtn}>
          <Copy size={20} color={colors.primary} />
          <Text style={styles.copyBtnText}>Copy Account Number</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIcon}>{icon}</View>
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24, textAlign: 'center' },
  qrCard: { alignItems: 'center', padding: 28, marginBottom: 20 },
  qrBox: {
    width: 180, height: 180, backgroundColor: colors.background,
    borderRadius: 20, justifyContent: 'center', alignItems: 'center',
    marginBottom: 20, borderWidth: 1, borderColor: colors.border,
  },
  qrName: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  qrAccount: { fontSize: 22, fontWeight: '900', color: colors.primary, letterSpacing: 2, marginBottom: 4 },
  qrBank: { fontSize: 13, color: colors.textSecondary, marginBottom: 16 },
  qrDivider: { width: '80%', height: 1, backgroundColor: colors.border, marginBottom: 12 },
  qrScan: { fontSize: 12, color: colors.textMuted },
  detailsCard: { padding: 20, marginBottom: 24 },
  detailsTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.background },
  detailIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  detailContent: { flex: 1 },
  detailLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  detailValue: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  shareBtn: { flexDirection: 'row', backgroundColor: colors.primary, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  shareBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: '700', marginLeft: 10 },
  copyBtn: { flexDirection: 'row', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: colors.primary, marginBottom: 40 },
  copyBtnText: { color: colors.primary, fontSize: 16, fontWeight: '700', marginLeft: 10 },
});
