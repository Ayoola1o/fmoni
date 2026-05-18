import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch, Alert, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, Lock, CreditCard, PiggyBank, LayoutDashboard, ShieldCheck, Bell, Clipboard, Palette, UserX, ChevronRight, Eye, EyeOff, Check } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

// ─── Master Settings Router ──────────────────────────────────────────────────
export default function SettingsDetailScreen() {
  const { page } = useLocalSearchParams<{ page: string }>();

  const pages: Record<string, React.ReactNode> = {
    login: <LoginSettingsPage />,
    payment: <PaymentSettingsPage />,
    savings: <SavingsSettingsPage />,
    homepage: <HomepageSettingsPage />,
    security: <SecurityQuestionsPage />,
    sms: <SmsAlertPage />,
    clipboard: <ClipboardPage />,
    themes: <ThemesPage />,
    close: <CloseAccountPage />,
  };

  return (pages[page as string] as any) || <LoginSettingsPage />;
}

// ─── Shared Header ────────────────────────────────────────────────────────────
const PageHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

// ─── 1. Login Settings ────────────────────────────────────────────────────────
const LoginSettingsPage = () => {
  const [biometric, setBiometric] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Login Settings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<ShieldCheck size={20} color={colors.primary} />} label="Biometric Login" desc="Use fingerprint or face ID" value={biometric} onToggle={setBiometric} />
        </GlassCard>
        <Text style={styles.sectionTitle}>Change Login PIN</Text>
        <GlassCard style={styles.card}>
          <View style={styles.pinInputRow}>
            <Lock size={18} color={colors.textMuted} />
            <TextInput style={styles.pinInput} placeholder="Current PIN" secureTextEntry={!showPin} value={pin} onChangeText={setPin} keyboardType="number-pad" maxLength={6} />
            <TouchableOpacity onPress={() => setShowPin(p => !p)}>
              {showPin ? <EyeOff size={18} color={colors.textMuted} /> : <Eye size={18} color={colors.textMuted} />}
            </TouchableOpacity>
          </View>
          <View style={styles.pinInputRow}>
            <Lock size={18} color={colors.textMuted} />
            <TextInput style={styles.pinInput} placeholder="New PIN (6 digits)" secureTextEntry value={newPin} onChangeText={setNewPin} keyboardType="number-pad" maxLength={6} />
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Success', 'PIN updated successfully')}>
            <Text style={styles.actionBtnText}>Update PIN</Text>
          </TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 2. Payment Settings ──────────────────────────────────────────────────────
const PaymentSettingsPage = () => {
  const [requirePin, setRequirePin] = useState(true);
  const [saveRecipients, setSaveRecipients] = useState(true);
  const [limit, setLimit] = useState('50000');
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Payment Settings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<Lock size={20} color={colors.primary} />} label="Require PIN for every transfer" desc="Extra security for all payments" value={requirePin} onToggle={setRequirePin} />
          <SwitchRow icon={<CreditCard size={20} color={colors.primary} />} label="Save Recipients" desc="Quickly resend to previous contacts" value={saveRecipients} onToggle={setSaveRecipients} />
        </GlassCard>
        <Text style={styles.sectionTitle}>Daily Transfer Limit</Text>
        <GlassCard style={styles.card}>
          <View style={styles.limitInputRow}>
            <Text style={styles.currencySign}>₦</Text>
            <TextInput style={styles.limitInput} value={limit} onChangeText={setLimit} keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Saved', `Daily limit set to ₦${parseInt(limit).toLocaleString()}`)}>
            <Text style={styles.actionBtnText}>Save Limit</Text>
          </TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 3. Savings Settings ──────────────────────────────────────────────────────
const SavingsSettingsPage = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [roundUp, setRoundUp] = useState(false);
  const [investSpend, setInvestSpend] = useState(false);
  const [percentage, setPercentage] = useState('5');
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Savings Settings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<PiggyBank size={20} color={colors.primary} />} label="Auto-Save" desc="Save a % of every income automatically" value={autoSave} onToggle={setAutoSave} />
          <SwitchRow icon={<ChevronRight size={20} color={colors.primary} />} label="Round-Up Savings" desc="Round transactions up and save the change" value={roundUp} onToggle={setRoundUp} />
          <SwitchRow icon={<Check size={20} color={colors.primary} />} label="InvestSpend" desc="Micro-invest on every purchase" value={investSpend} onToggle={setInvestSpend} />
        </GlassCard>
        {autoSave && (
          <>
            <Text style={styles.sectionTitle}>Auto-Save Percentage</Text>
            <GlassCard style={styles.card}>
              <View style={styles.limitInputRow}>
                <TextInput style={styles.limitInput} value={percentage} onChangeText={setPercentage} keyboardType="numeric" />
                <Text style={styles.currencySign}>%</Text>
              </View>
              <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Saved', `Auto-save set to ${percentage}%`)}>
                <Text style={styles.actionBtnText}>Save</Text>
              </TouchableOpacity>
            </GlassCard>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 4. Homepage Settings ─────────────────────────────────────────────────────
const HomepageSettingsPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [showAlloc, setShowAlloc] = useState(true);
  const [showTx, setShowTx] = useState(true);
  const [showInvest, setShowInvest] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Homepage Settings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.hint}>Choose what sections appear on your home dashboard.</Text>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<LayoutDashboard size={20} color={colors.primary} />} label="Show Balance Card" desc="Main balance visible on home" value={showBalance} onToggle={setShowBalance} />
          <SwitchRow icon={<LayoutDashboard size={20} color={colors.primary} />} label="Show Allocations" desc="Daily spending section on home" value={showAlloc} onToggle={setShowAlloc} />
          <SwitchRow icon={<LayoutDashboard size={20} color={colors.primary} />} label="Show Recent Transactions" desc="Last 3 transactions on home" value={showTx} onToggle={setShowTx} />
          <SwitchRow icon={<LayoutDashboard size={20} color={colors.primary} />} label="Show Investments" desc="InvestSpend summary on home" value={showInvest} onToggle={setShowInvest} />
        </GlassCard>
        <TouchableOpacity style={styles.saveAllBtn} onPress={() => Alert.alert('Saved', 'Homepage layout updated.')}>
          <Text style={styles.actionBtnText}>Save Layout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 5. Security Questions ────────────────────────────────────────────────────
const SecurityQuestionsPage = () => {
  const questions = ['What is your mother\'s maiden name?', 'What was your first pet\'s name?', 'What city were you born in?'];
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Security Questions" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.hint}>Your security question helps us verify your identity if you lose access to your account.</Text>
        <Text style={styles.sectionTitle}>Select a Question</Text>
        <GlassCard style={styles.card}>
          {questions.map((q, i) => (
            <TouchableOpacity key={i} style={styles.questionRow} onPress={() => setSelected(i)}>
              <View style={[styles.radio, selected === i && styles.radioActive]}>
                {selected === i && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.questionText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </GlassCard>
        <Text style={styles.sectionTitle}>Your Answer</Text>
        <TextInput style={styles.answerInput} placeholder="Enter your answer..." value={answer} onChangeText={setAnswer} />
        <TouchableOpacity style={styles.saveAllBtn} onPress={() => Alert.alert('Saved', 'Security question updated.')}>
          <Text style={styles.actionBtnText}>Save Security Question</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 6. SMS Alert ─────────────────────────────────────────────────────────────
const SmsAlertPage = () => {
  const [credit, setCredit] = useState(true);
  const [debit, setDebit] = useState(true);
  const [login, setLogin] = useState(false);
  const [promo, setPromo] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="SMS Alert Subscription" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.hint}>Manage which alerts you receive via SMS. Standard carrier rates may apply.</Text>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<Bell size={20} color={colors.success} />} label="Credit Alerts" desc="When money is received" value={credit} onToggle={setCredit} />
          <SwitchRow icon={<Bell size={20} color={colors.error} />} label="Debit Alerts" desc="When money is spent" value={debit} onToggle={setDebit} />
          <SwitchRow icon={<Bell size={20} color={colors.primary} />} label="Login Alerts" desc="When your account is accessed" value={login} onToggle={setLogin} />
          <SwitchRow icon={<Bell size={20} color={colors.accent} />} label="Promotional SMS" desc="Offers and updates from fmoni" value={promo} onToggle={setPromo} />
        </GlassCard>
        <TouchableOpacity style={styles.saveAllBtn} onPress={() => Alert.alert('Saved', 'SMS preferences updated.')}>
          <Text style={styles.actionBtnText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 7. Clipboard ─────────────────────────────────────────────────────────────
const ClipboardPage = () => {
  const [allow, setAllow] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Access to Clipboard" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.hint}>Allowing clipboard access lets fmoni auto-fill OTP and account numbers you copy.</Text>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<Clipboard size={20} color={colors.primary} />} label="Allow Clipboard Access" desc="Auto-paste copied OTPs and numbers" value={allow} onToggle={setAllow} />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 8. Themes ────────────────────────────────────────────────────────────────
const THEMES = [
  { id: 'light', label: 'Light (Default)', primary: '#2A9D8F', bg: '#F8FBFA' },
  { id: 'dark', label: 'Dark Mode', primary: '#2A9D8F', bg: '#121212' },
  { id: 'ocean', label: 'Ocean Blue', primary: '#0077B6', bg: '#F0F7FF' },
  { id: 'earth', label: 'Earth Tones', primary: '#A0522D', bg: '#FFF8F0' },
];
const ThemesPage = () => {
  const [selected, setSelected] = useState('light');
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Themes" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.hint}>Personalise your fmoni experience. Theme changes apply on next launch.</Text>
        {THEMES.map(t => (
          <TouchableOpacity key={t.id} style={[styles.themeCard, selected === t.id && styles.themeCardActive]} onPress={() => setSelected(t.id)}>
            <View style={[styles.themePreview, { backgroundColor: t.bg, borderColor: t.primary }]}>
              <View style={[styles.themeAccent, { backgroundColor: t.primary }]} />
            </View>
            <Text style={[styles.themeLabel, selected === t.id && { color: colors.primary }]}>{t.label}</Text>
            {selected === t.id && <Check size={20} color={colors.primary} />}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.saveAllBtn} onPress={() => Alert.alert('Theme Applied', 'Restart the app to see full effect.')}>
          <Text style={styles.actionBtnText}>Apply Theme</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── 9. Close Account ─────────────────────────────────────────────────────────
const CloseAccountPage = () => {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Close Account" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dangerBox}>
          <UserX size={40} color={colors.error} />
          <Text style={styles.dangerTitle}>Close Your Account</Text>
          <Text style={styles.dangerDesc}>
            This action is permanent. Your data, balance, and all allocations will be deleted. Ensure you withdraw all funds before proceeding.
          </Text>
        </View>
        <GlassCard style={styles.card}>
          <SwitchRow icon={<UserX size={20} color={colors.error} />} label="I understand this is permanent" desc="I have withdrawn all my funds" value={confirmed} onToggle={setConfirmed} />
        </GlassCard>
        <TouchableOpacity
          style={[styles.dangerBtn, !confirmed && { opacity: 0.4 }]}
          disabled={!confirmed}
          onPress={() => Alert.alert('Request Submitted', 'Your account closure request has been received. Our team will contact you within 24 hours.')}
        >
          <Text style={styles.dangerBtnText}>Request Account Closure</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Shared Components ────────────────────────────────────────────────────────
const SwitchRow = ({ icon, label, desc, value, onToggle }: any) => (
  <View style={styles.switchRow}>
    <View style={styles.switchIcon}>{icon}</View>
    <View style={styles.switchInfo}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Text style={styles.switchDesc}>{desc}</Text>
    </View>
    <Switch value={value} onValueChange={onToggle} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.textWhite} />
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20, paddingBottom: 60 },
  hint: { fontSize: 13, color: colors.textSecondary, marginBottom: 20, lineHeight: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginBottom: 12, marginTop: 8 },
  card: { padding: 8, marginBottom: 24 },
  switchRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.background },
  switchIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  switchInfo: { flex: 1 },
  switchLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  switchDesc: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  pinInputRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.background },
  pinInput: { flex: 1, fontSize: 16, color: colors.textPrimary, marginLeft: 12 },
  limitInputRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  currencySign: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginRight: 8 },
  limitInput: { flex: 1, fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  actionBtn: { backgroundColor: colors.primary, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', margin: 12 },
  actionBtnText: { color: colors.textWhite, fontSize: 15, fontWeight: '700' },
  saveAllBtn: { backgroundColor: colors.primary, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  questionRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.background },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  questionText: { flex: 1, fontSize: 13, color: colors.textPrimary, lineHeight: 18 },
  answerInput: { height: 56, backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 16, fontSize: 16, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border, marginBottom: 24 },
  themeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1.5, borderColor: colors.border },
  themeCardActive: { borderColor: colors.primary },
  themePreview: { width: 48, height: 48, borderRadius: 12, borderWidth: 2, justifyContent: 'flex-end', padding: 6, marginRight: 14 },
  themeAccent: { height: 10, borderRadius: 4 },
  themeLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  dangerBox: { alignItems: 'center', backgroundColor: 'rgba(231,111,81,0.08)', padding: 28, borderRadius: 20, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(231,111,81,0.2)' },
  dangerTitle: { fontSize: 20, fontWeight: '800', color: colors.error, marginTop: 16, marginBottom: 10 },
  dangerDesc: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  dangerBtn: { backgroundColor: colors.error, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  dangerBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: '700' },
});
