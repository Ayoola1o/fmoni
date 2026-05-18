import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { 
  Plus, 
  Layers,
  ArrowRight,
  TrendingUp,
  History,
  Info,
  Play,
  Bus,
  Utensils
} from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

export default function AllocationsScreen() {
  const router = useRouter();
  const { user, setUser } = useAuth() as any;

  const handleSimulateRelease = () => {
    if (!user) return;
    const amount = 1000;
    if (user.locked_balance < amount) return;

    setUser({
      ...user,
      balance: user.balance + amount,
      locked_balance: user.locked_balance - amount
    });
  };

  // Mock data for allocations - uses lucide icon names instead of emoji
  const activeAllocations = [
    { 
      id: '1', 
      name: 'Transport for Work', 
      total: 20000, 
      remaining: 13000, 
      daily: 1000, 
      iconName: 'bus',
      nextRelease: 'Tomorrow, 8:00 AM'
    },
    { 
      id: '2', 
      name: 'Lunch Budget', 
      total: 10000, 
      remaining: 4500, 
      daily: 500, 
      iconName: 'utensils',
      nextRelease: 'Tomorrow, 8:00 AM'
    }
  ];

  const getAllocIcon = (iconName: string) => {
    if (iconName === 'bus') return <Bus size={24} color={colors.primary} />;
    if (iconName === 'utensils') return <Utensils size={24} color={colors.primary} />;
    return <Layers size={24} color={colors.primary} />;
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Allocations</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/allocations/create')}>
          <Plus size={20} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.statsRow}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statLabel}>Locked Funds</Text>
            <Text style={styles.statValue}>₦{user?.locked_balance.toLocaleString()}</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Active Plans</Text>
              <TouchableOpacity style={styles.miniBtn} onPress={handleSimulateRelease}>
                <Play size={12} color={colors.textWhite} />
                <Text style={styles.miniBtnText}>Release 1k</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.statValue}>2</Text>
          </GlassCard>
        </View>

        <View style={styles.infoBox}>
          <Info size={18} color={colors.primary} />
          <Text style={styles.infoText}>Your locked funds are automatically released to your main wallet based on your rules.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Allocations</Text>
        </View>

        {activeAllocations.map((alloc) => (
          <GlassCard key={alloc.id} style={styles.allocCard}>
            <View style={styles.allocHeader}>
              <View style={styles.iconBox}>
                {getAllocIcon(alloc.iconName)}
              </View>
              <View style={styles.allocInfo}>
                <Text style={styles.allocName}>{alloc.name}</Text>
                <Text style={styles.allocDaily}>₦{alloc.daily.toLocaleString()} daily</Text>
              </View>
              <TouchableOpacity>
                <ArrowRight size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${(alloc.remaining / alloc.total) * 100}%` }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.remainingText}>₦{alloc.remaining.toLocaleString()} left</Text>
                <Text style={styles.totalText}>of ₦{alloc.total.toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.allocFooter}>
              <Text style={styles.nextText}>Next release: {alloc.nextRelease}</Text>
            </View>
          </GlassCard>
        ))}

        <TouchableOpacity style={styles.historyBtn}>
          <History size={18} color={colors.textSecondary} />
          <Text style={styles.historyText}>View Allocation History</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    padding: 16,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  miniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  miniBtnText: {
    color: colors.textWhite,
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(42, 157, 143, 0.05)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 143, 0.1)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 10,
    lineHeight: 18,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  allocCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  allocHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  allocInfo: {
    flex: 1,
  },
  allocName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  allocDaily: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
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
  remainingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  allocFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  nextText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  historyBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 10,
  },
  historyText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    marginLeft: 8,
  },
});
