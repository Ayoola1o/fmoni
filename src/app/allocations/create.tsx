import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { colors } from '../../theme/colors';
import { X, Info, Calendar, Clock, DollarSign } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

export default function CreateAllocationScreen() {
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [dailyAmount, setDailyAmount] = useState('');
  const [autoRelease, setAutoRelease] = useState(true);
  const router = useRouter();

  const handleCreate = () => {
    // Logic to save allocation
    router.back();
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
            Allocations lock your money and release it in daily chunks to help you stay financially stable.
          </Text>
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
              <Text style={styles.configDesc}>Should funds release on Sat & Sun?</Text>
            </View>
            <Switch 
              value={false} 
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.textWhite}
            />
          </View>
        </View>

        <GlassCard style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Duration</Text>
            <Text style={styles.summaryValue}>20 Days</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ends On</Text>
            <Text style={styles.summaryValue}>June 5, 2026</Text>
          </View>
        </GlassCard>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Set Up Allocation</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(42, 157, 143, 0.1)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.primary,
    marginLeft: 12,
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  configSection: {
    marginTop: 10,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  configInfo: {
    flex: 1,
  },
  configLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  configDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summaryCard: {
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  createButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
