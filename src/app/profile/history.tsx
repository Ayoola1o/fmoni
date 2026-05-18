import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

const mockTransactions = [
  { id: '1', title: 'Transport Release', subtitle: 'Daily Allocation', amount: 1000.00, type: 'in', date: 'Today, 8:00 AM' },
  { id: '2', title: 'Starbucks Coffee', subtitle: 'Food & Drink', amount: -3500.00, type: 'out', date: 'Yesterday, 4:15 PM' },
  { id: '3', title: 'Salary Deposit', subtitle: 'Tech Corp Ltd', amount: 450000.00, type: 'in', date: 'May 12, 10:00 AM' },
  { id: '4', title: 'DSTV Subscription', subtitle: 'Bills', amount: -12500.00, type: 'out', date: 'May 10, 2:30 PM' },
  { id: '5', title: 'Transfer to James', subtitle: 'Banking', amount: -5000.00, type: 'out', date: 'May 08, 11:20 AM' },
  { id: '6', title: 'MTN Airtime', subtitle: 'Utilities', amount: -1000.00, type: 'out', date: 'May 05, 9:15 AM' },
];

export default function HistoryScreen() {
  const [filter, setFilter] = useState('all'); // all, in, out
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesFilter = filter === 'all' || (filter === 'in' ? tx.type === 'in' : tx.type === 'out');
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity>
          <Calendar size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TabButton label="All" active={filter === 'all'} onPress={() => setFilter('all')} />
        <TabButton label="Income" active={filter === 'in'} onPress={() => setFilter('in')} />
        <TabButton label="Expenses" active={filter === 'out'} onPress={() => setFilter('out')} />
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TransactionItem 
            title={item.title}
            subtitle={item.subtitle}
            amount={item.amount}
            type={item.type}
            date={item.date}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const TabButton = ({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.tab, active && styles.activeTab]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
  </TouchableOpacity>
);

const TransactionItem = ({ title, subtitle, amount, type, date }: any) => (
  <TouchableOpacity style={styles.txItem}>
    <View style={[styles.iconContainer, { backgroundColor: type === 'in' ? 'rgba(42, 157, 143, 0.1)' : 'rgba(231, 111, 81, 0.1)' }]}>
      {type === 'in' ? (
        <ArrowDownLeft size={20} color={colors.success} />
      ) : (
        <ArrowUpRight size={20} color={colors.error} />
      )}
    </View>
    <View style={styles.txInfo}>
      <Text style={styles.txTitle}>{title}</Text>
      <Text style={styles.txSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.txAmountContainer}>
      <Text style={[styles.txAmount, { color: type === 'in' ? colors.success : colors.textPrimary }]}>
        {type === 'in' ? '+' : ''}₦{Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.txDate}>{date}</Text>
    </View>
  </TouchableOpacity>
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
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.textPrimary,
  },
  filterBtn: {
    width: 48,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.textWhite,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  txSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  txAmountContainer: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  txDate: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
