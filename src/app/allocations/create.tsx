import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Switch, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { colors } from '../../theme/colors';
import { X, Info, Calendar, Clock, DollarSign, AlertCircle, Bus, Coffee, ShoppingBag, Home, Briefcase, Utensils } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

const CATEGORY_ICONS = [
  { id: 'bus', Icon: Bus, label: 'Transport' },
  { id: 'utensils', Icon: Utensils, label: 'Food' },
  { id: 'shopping', Icon: ShoppingBag, label: 'Shopping' },
  { id: 'home', Icon: Home, label: 'Housing' },
  { id: 'work', Icon: Briefcase, label: 'Work' },
  { id: 'coffee', Icon: Coffee, label: 'Leisure' },
];

export default function CreateAllocationScreen() {
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [dailyAmount, setDailyAmount] = useState('');
  const [autoRelease, setAutoRelease] = useState(true);
  const [weekendRelease, setWeekendRelease] = useState(false);
  const [startDate, setStartDate] = useState(getTodayStr());
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('bus');
  const [error, setError] = useState('');
  const { createAllocation, user } = useAuth();
  const router = useRouter();

  function getTodayStr() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  const computeDuration = () => {
    const total = parseFloat(totalAmount);
    const daily = parseFloat(dailyAmount);
    if (isNaN(total) || isNaN(daily) || daily === 0) return { days: 0, endDateStr: '' };
    const days = Math.ceil(total / daily);
    const end = new Date();
    end.setDate(end.getDate() + days);
    return {
      days,
      endDateStr: end.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
  };

  const { days, endDateStr } = computeDuration();

  const handleCreate = async () => {
    setError('');
    const total = parseFloat(totalAmount);
    const daily = parseFloat(dailyAmount);

    if (!name) { setError('Please enter an allocation name'); return; }
    if (isNaN(total) || total <= 0) { setError('Please enter a valid total amount'); return; }
    if (isNaN(daily) || daily <= 0) { setError('Please enter a valid daily amount'); return; }
    if (user && total > user.balance) { setError('Insufficient available balance to lock'); return; }
    if (daily > total) { setError('Daily release cannot exceed total amount'); return; }

    await createAllocation(name, total, daily);
    Alert.alert('Success', 'Allocation created! Funds have been locked.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ presentation: 'modal', headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <X size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>New Allocation</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoBox}>
          <Info size={20} color={colors.primary} />
          <Text style={styles.infoText}>
            Allocations lock funds and release them daily, helping you budget with discipline.
          </Text>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <AlertCircle size={16} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Category icons */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {CATEGORY_ICONS.map(({ id, Icon, label }) => (
            <TouchableOpacity
              key={id}
              style={[styles.categoryItem, selectedCategory === id && styles.categoryItemActive]}
              onPress={() => setSelectedCategory(id)}
            >
              <Icon size={22} color={selectedCategory === id ? colors.primary : colors.textMuted} />
              <Text style={[styles.categoryLabel, selectedCategory === id && { color: colors.primary }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Allocation Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Transport for work"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Total Amount to Lock (₦)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 20,000"
          keyboardType="numeric"
          value={totalAmount}
          onChangeText={setTotalAmount}
        />

        <Text style={styles.label}>Daily Release Amount (₦)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 1,000"
          keyboardType="numeric"
          value={dailyAmount}
          onChangeText={setDailyAmount}
        />

        {/* Calendar / Duration */}
        <Text style={styles.label}>Start Date</Text>
        <View style={styles.dateRow}>
          <Calendar size={20} color={colors.primary} />
          <Text style={styles.dateText}>{startDate}</Text>
        </View>

        {days > 0 && (
          <GlassCard style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Plan Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>{days} Days</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated End Date</Text>
              <Text style={styles.summaryValue}>{endDateStr}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Locked</Text>
              <Text style={[styles.summaryValue, { color: colors.primary }]}>
                ₦{parseFloat(totalAmount || '0').toLocaleString()}
              </Text>
            </View>
          </GlassCard>
        )}

        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          
          <View style={styles.configRow}>
            <View style={styles.configInfo}>
              <Text style={styles.configLabel}>Auto-Release</Text>
              <Text style={styles.configDesc}>Release funds automatically at 8:00 AM</Text>
            </View>
            <Switch 
              value={autoRelease} 
              onValueChange={setAutoRelease}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.textWhite}
            />
          </View>

          <View style={styles.configRow}>
            <View style={styles.configInfo}>
              <Text style={styles.configLabel}>Weekend Release</Text>
              <Text style={styles.configDesc}>Release funds on Saturday & Sunday?</Text>
            </View>
            <Switch 
              value={weekendRelease} 
              onValueChange={setWeekendRelease}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.textWhite}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Lock Funds & Activate</Text>
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
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  closeBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20 },
  infoBox: {
    flexDirection: 'row', backgroundColor: 'rgba(42, 157, 143, 0.1)',
    padding: 16, borderRadius: 16, marginBottom: 24, alignItems: 'center',
  },
  infoText: { flex: 1, fontSize: 13, color: colors.primary, marginLeft: 12, lineHeight: 18 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(231, 111, 81, 0.1)',
    padding: 12, borderRadius: 12, marginBottom: 20,
  },
  errorText: { color: colors.error, fontSize: 13, marginLeft: 8, fontWeight: '600' },
  label: {
    fontSize: 14, fontWeight: '600', color: colors.textSecondary,
    marginBottom: 8, marginLeft: 4,
  },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  categoryItem: {
    alignItems: 'center', width: '30%', padding: 12,
    borderRadius: 14, marginBottom: 10, marginRight: '3%',
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
  },
  categoryItemActive: { borderColor: colors.primary, backgroundColor: 'rgba(42, 157, 143, 0.06)' },
  categoryLabel: { fontSize: 11, color: colors.textMuted, marginTop: 4, fontWeight: '600' },
  input: {
    height: 56, backgroundColor: colors.surface, borderRadius: 16,
    paddingHorizontal: 16, fontSize: 16, color: colors.textPrimary,
    marginBottom: 20, borderWidth: 1, borderColor: colors.border,
  },
  dateRow: {
    flexDirection: 'row', alignItems: 'center',
    height: 56, backgroundColor: colors.surface, borderRadius: 16,
    paddingHorizontal: 16, marginBottom: 20,
    borderWidth: 1, borderColor: colors.border,
  },
  dateText: { fontSize: 16, color: colors.textPrimary, marginLeft: 12 },
  summaryCard: { padding: 16, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: colors.textSecondary },
  summaryValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  configSection: { marginTop: 10, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  configRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surface, padding: 16, borderRadius: 16,
    marginBottom: 12, borderWidth: 1, borderColor: colors.border,
  },
  configInfo: { flex: 1 },
  configLabel: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  configDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  createButton: {
    backgroundColor: colors.primary, height: 56, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: 40,
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  createButtonText: { color: colors.textWhite, fontSize: 16, fontWeight: '700' },
});
