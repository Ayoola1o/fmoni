import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Share, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, Gift, Share2, Copy, Users, TrendingUp, ChevronRight } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

export default function InvitationScreen() {
  const router = useRouter();
  const referralCode = 'FMONI-SARAH-9485';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on fmoni and get ₦1,000 bonus! Use my code: ${referralCode}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite & Earn</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={styles.giftIconContainer}>
            <Gift size={60} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Invite Friends, Get ₦1,000</Text>
          <Text style={styles.heroSubtitle}>
            Share your code with friends and earn ₦1,000 for every person who signs up and completes their first transaction.
          </Text>
        </View>

        <GlassCard style={styles.rewardCard}>
          <View style={styles.rewardRow}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardLabel}>Total Earned</Text>
              <Text style={styles.rewardValue}>₦4,600.00</Text>
            </View>
            <View style={styles.rewardDivider} />
            <View style={styles.rewardItem}>
              <Text style={styles.rewardLabel}>Successful Invites</Text>
              <Text style={styles.rewardValue}>4</Text>
            </View>
          </View>
        </GlassCard>

        <View style={styles.codeSection}>
          <Text style={styles.sectionLabel}>Your Referral Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn}>
              <Copy size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Share2 size={20} color={colors.textWhite} />
          <Text style={styles.shareBtnText}>Share Invite Link</Text>
        </TouchableOpacity>

        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <StepItem 
            icon={<Share2 size={18} color={colors.primary} />} 
            title="Share your code" 
            desc="Send your referral code to your friends." 
          />
          <StepItem 
            icon={<Users size={18} color={colors.primary} />} 
            title="Friend signs up" 
            desc="They enter your code during registration." 
          />
          <StepItem 
            icon={<TrendingUp size={18} color={colors.primary} />} 
            title="Get rewarded" 
            desc="Receive ₦1,000 once they complete a transfer." 
          />
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const StepItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <View style={styles.stepItem}>
    <View style={styles.stepIcon}>{icon}</View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 32,
  },
  giftIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(42, 157, 143, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  rewardCard: {
    padding: 24,
    marginBottom: 32,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardItem: {
    flex: 1,
    alignItems: 'center',
  },
  rewardLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  rewardDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  codeSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  codeText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  copyBtn: {
    marginLeft: 16,
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  shareBtnText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  howItWorks: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
