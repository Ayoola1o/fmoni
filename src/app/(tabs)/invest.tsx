import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Switch, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  ChevronRight, 
  Info,
  Wallet,
  Calendar,
  Plus
} from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

export default function InvestScreen() {
  const [showGoalCreator, setShowGoalCreator] = useState(false);

  if (showGoalCreator) {
    return <GoalCreator onBack={() => setShowGoalCreator(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invest & Save</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* InvestSpend Feature Promo */}
        <GlassCard style={styles.promoCard}>
          <View style={styles.promoHeader}>
            <Text style={styles.promoBadge}>New Feature</Text>
            <Text style={styles.promoTitle}>Introducing InvestSpend</Text>
          </View>
          <Text style={styles.promoDesc}>
            Automatically invest a percentage of every purchase into a diversified micro-portfolio. Grow your wealth effortlessly.
          </Text>
          
          <View style={styles.featureList}>
            <FeatureItem icon={<TrendingUp size={18} color={colors.primary} />} label="Automated Investing" desc="Set a percentage." />
            <FeatureItem icon={<Rocket size={18} color={colors.primary} />} label="Access to Portfolios" desc="Managed fund entry." />
            <FeatureItem icon={<Target size={18} color={colors.primary} />} label="Passive Growth" desc="Build wealth automatically." />
          </View>

          <TouchableOpacity style={styles.activateBtn}>
            <Text style={styles.activateBtnText}>Activate InvestSpend (Beta)</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Savings Goals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Savings Goals</Text>
            <TouchableOpacity onPress={() => setShowGoalCreator(true)}>
              <Plus size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <GlassCard style={styles.emptyGoalCard}>
            <View style={styles.goalIconContainer}>
              <Target size={40} color={colors.primary} opacity={0.5} />
            </View>
            <Text style={styles.emptyGoalTitle}>No active goals</Text>
            <Text style={styles.emptyGoalDesc}>Create your first savings goal to start building your future.</Text>
            <TouchableOpacity style={styles.createGoalBtn} onPress={() => setShowGoalCreator(true)}>
              <Text style={styles.createGoalBtnText}>Create Your First Goal</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const GoalCreator = ({ onBack }: { onBack: () => void }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Goal Creator</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.rocketSection}>
          <Text style={styles.creatorTitle}>Create Your First Savings Goal</Text>
          <View style={styles.rocketIllustration}>
            <Rocket size={80} color={colors.primary} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Goal Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. New Laptop"
            value={goalName}
            onChangeText={setGoalName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Target Amount</Text>
          <View style={styles.amountInputWrapper}>
            <Text style={styles.currencyPrefix}>₦</Text>
            <TextInput
              style={[styles.input, { paddingLeft: 30 }]}
              placeholder="150,000.00"
              keyboardType="numeric"
              value={targetAmount}
              onChangeText={setTargetAmount}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Target Date</Text>
          <View style={styles.inputWithIcon}>
            <Calendar size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { paddingLeft: 44 }]}
              placeholder="July 20, 2026"
              value={targetDate}
              onChangeText={setTargetDate}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Funding Source</Text>
          <TouchableOpacity style={styles.pickerBtn}>
            <Text style={styles.pickerText}>Checking Account</Text>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.recurringRow}>
          <Text style={styles.recurringLabel}>Recurring Save</Text>
          <View style={styles.recurringControl}>
            <Text style={styles.recurringValue}>Monthly</Text>
            <Switch 
              value={true} 
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.textWhite}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.setGoalBtn} onPress={onBack}>
          <Text style={styles.setGoalBtnText}>Set My Goal</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, label, desc }: { icon: React.ReactNode, label: string, desc: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>{icon}</View>
    <View>
      <Text style={styles.featureLabel}>{label}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  backBtn: {
    padding: 10,
  },
  backBtnText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  promoCard: {
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promoHeader: {
    marginBottom: 12,
  },
  promoBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  promoDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  featureList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(42, 157, 143, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  featureDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activateBtn: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activateBtnText: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '700',
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
  emptyGoalCard: {
    alignItems: 'center',
    padding: 32,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyGoalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyGoalDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  createGoalBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createGoalBtnText: {
    color: colors.textWhite,
    fontWeight: '700',
  },
  rocketSection: {
    alignItems: 'center',
    marginVertical: 32,
  },
  creatorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  rocketIllustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(42, 157, 143, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amountInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  currencyPrefix: {
    position: 'absolute',
    left: 16,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    zIndex: 1,
  },
  inputWithIcon: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  pickerBtn: {
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  recurringRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recurringLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  recurringControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recurringValue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 10,
  },
  setGoalBtn: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  setGoalBtnText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
