import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { 
  Wallet, 
  Send, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  TrendingUp,
  Lock,
  Bell,
  Search,
  Bus
} from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import ActionButton from '../../components/ActionButton';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const recentTransactions = [
    { id: '1', title: 'Transport Release', subtitle: 'Daily Allocation', amount: '+₦1,000.00', type: 'allocation', time: '8:00 AM' },
    { id: '2', title: 'Starbucks Coffee', subtitle: 'Food & Drink', amount: '-₦3,500.00', type: 'expense', time: 'Yesterday' },
    { id: '3', title: 'Salary Deposit', subtitle: 'Tech Corp Ltd', amount: '+₦450,000.00', type: 'income', time: 'May 12' },
  ];

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileSection} onPress={() => router.push('/profile/me')}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{user.full_name[0]}</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.userName}>{user.full_name.split(' ')[0]}!</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Search size={22} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.notificationDot} />
              <Bell size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Balance Card */}
        <GlassCard style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceLabelRow}>
              <Wallet size={18} color={colors.textWhite} opacity={0.8} />
              <Text style={styles.balanceLabel}>Total Balance</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.accountNumText}>**** {user.account_number.slice(-4)}</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.balanceAmount}>₦{user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          
          <View style={styles.balanceFooter}>
            <View style={styles.lockedSection}>
              <Lock size={14} color={colors.accent} />
              <Text style={styles.lockedText}>Locked: ₦{user.locked_balance.toLocaleString()}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Steady Bank</Text>
            </View>
          </View>
        </GlassCard>

        {/* Quick Actions */}
        <View style={styles.actionGrid}>
          <ActionButton icon={<Send size={24} color={colors.textWhite} />} label="Send" color={colors.primary} />
          <ActionButton icon={<Plus size={24} color={colors.textWhite} />} label="Add Money" color={colors.secondary} />
          <ActionButton icon={<TrendingUp size={24} color={colors.textWhite} />} label="Invest" color={colors.accent} />
          <ActionButton icon={<CreditCard size={24} color={colors.textWhite} />} label="Bills" color="#6C63FF" />
        </View>

        {/* Active Allocation Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Allocation</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Manage</Text>
            </TouchableOpacity>
          </View>
          
          <GlassCard style={styles.allocationCard}>
            <View style={styles.allocationHeader}>
              <View style={styles.allocationIcon}>
                <Bus size={22} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.allocationName}>Transport for Work</Text>
                <Text style={styles.allocationDesc}>₦1,000 released daily (Mon - Fri)</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '65%' }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>₦13,000 left</Text>
                <Text style={styles.progressTotal}>of ₦20,000</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Recent Transactions */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/profile/history')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map((tx) => (
            <TouchableOpacity key={tx.id} style={styles.txItem}>
              <View style={styles.txIconContainer}>
                {tx.type === 'allocation' ? (
                  <ArrowDownLeft size={20} color={colors.success} />
                ) : tx.type === 'income' ? (
                  <ArrowDownLeft size={20} color={colors.primary} />
                ) : (
                  <ArrowUpRight size={20} color={colors.error} />
                )}
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[
                  styles.txAmount,
                  { color: tx.amount.startsWith('+') ? colors.success : colors.textPrimary }
                ]}>
                  {tx.amount}
                </Text>
                <Text style={styles.txTime}>{tx.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    zIndex: 1,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  balanceCard: {
    backgroundColor: colors.secondary,
    padding: 24,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceLabel: {
    color: colors.textWhite,
    opacity: 0.8,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  accountNumText: {
    color: colors.textWhite,
    opacity: 0.6,
    fontSize: 12,
  },
  balanceAmount: {
    color: colors.textWhite,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 24,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  lockedSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockedText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: '700',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  allocationCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  allocationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  allocationIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  allocationName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  allocationDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  progressTotal: {
    fontSize: 12,
    color: colors.textMuted,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  txIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  txSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  txTime: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },
});
