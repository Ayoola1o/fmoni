import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import { 
  Settings, 
  ChevronRight, 
  ShieldCheck, 
  History, 
  BarChart2, 
  CreditCard, 
  ArrowLeftRight, 
  UserRound,
  Headset,
  Gift,
  LogOut,
  Bell,
  Lock,
  Smartphone,
  Clipboard,
  Palette,
  UserX
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import GlassCard from '../../components/GlassCard';

export default function ProfileScreen() {
  const router = useRouter();
  const [showSettings, setShowSettings] = React.useState(false);

  if (showSettings) {
    return <SettingsScreen onBack={() => setShowSettings(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.profileSummary}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SJ</Text>
          </View>
          <View>
            <Text style={styles.name}>Sarah Johnson</Text>
            <Text style={styles.balance}>₦88,967.98</Text>
            <Text style={styles.interest}>Interest Credited Today <Text style={{color: colors.success}}>+₦1.74</Text></Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => setShowSettings(true)}>
          <Settings size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Safety Tips Card */}
        <View style={styles.safetyCard}>
          <View style={styles.safetyInfo}>
            <View style={styles.safetyIcon}>
              <ShieldCheck size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={styles.safetyTitle}>2 Safety Tips</Text>
              <Text style={styles.safetyDesc}>Make your account more secure</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          <MenuItem icon={<History size={20} color={colors.primary} />} label="Transaction History" />
          <MenuItem icon={<BarChart2 size={20} color={colors.primary} />} label="Account Limits" />
          <MenuItem icon={<CreditCard size={20} color={colors.primary} />} label="Bank Card/Account" />
          <MenuItem icon={<ArrowLeftRight size={20} color={colors.primary} />} label="Transfer to Me" />
          <MenuItem icon={<ShieldCheck size={20} color={colors.primary} />} label="Security Center" />
          <MenuItem icon={<Headset size={20} color={colors.primary} />} label="Customer Service Center" />
          <MenuItem icon={<Gift size={20} color={colors.primary} />} label="Invitation" extra="₦4,600 Bonus" />
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => router.replace('/(auth)/login')}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.settingsHeader}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backLink}>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.settingsTitle}>Settings</Text>
      <View style={{ width: 60 }} />
    </View>
    
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.settingsSubtitle}>Configure your fmoni account preferences.</Text>
      
      <View style={styles.menuList}>
        <SettingsItem icon={<Lock size={18} color={colors.textPrimary} />} label="Login Settings" />
        <SettingsItem icon={<CreditCard size={18} color={colors.textPrimary} />} label="Payment Settings" />
        <SettingsItem icon={<Settings size={18} color={colors.textPrimary} />} label="Saving Settings" />
        <SettingsItem icon={<Palette size={18} color={colors.textPrimary} />} label="Homepage Settings" />
        <SettingsItem icon={<ShieldCheck size={18} color={colors.textPrimary} />} label="Security Questions" badge="Not Set" />
        <SettingsItem icon={<Bell size={18} color={colors.textPrimary} />} label="SMS Alert Subscription" />
        <SettingsItem icon={<Clipboard size={18} color={colors.textPrimary} />} label="Access to Clipboard" />
        <SettingsItem icon={<Palette size={18} color={colors.textPrimary} />} label="Themes" />
        <SettingsItem icon={<ShieldCheck size={18} color={colors.textPrimary} />} label="Security Center" />
        <SettingsItem icon={<UserX size={18} color={colors.error} />} label="Close Account" />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const MenuItem = ({ icon, label, extra }: { icon: React.ReactNode, label: string, extra?: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconContainer}>{icon}</View>
    <View style={styles.menuContent}>
      <Text style={styles.menuLabel}>{label}</Text>
      {extra && <Text style={styles.menuExtra}>{extra}</Text>}
    </View>
    <ChevronRight size={18} color={colors.textMuted} />
  </TouchableOpacity>
);

const SettingsItem = ({ icon, label, badge }: { icon: React.ReactNode, label: string, badge?: string }) => (
  <TouchableOpacity style={styles.settingsItem}>
    <View style={styles.settingsIconContainer}>{icon}</View>
    <Text style={styles.settingsLabel}>{label}</Text>
    {badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
    <ChevronRight size={18} color={colors.textMuted} />
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
    padding: 24,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: colors.textWhite,
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  balance: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginVertical: 4,
  },
  interest: {
    fontSize: 12,
    color: colors.textMuted,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  safetyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  safetyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  safetyTitle: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '700',
  },
  safetyDesc: {
    color: colors.textWhite,
    opacity: 0.8,
    fontSize: 11,
  },
  viewBtn: {
    backgroundColor: colors.textWhite,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  viewBtnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  menuList: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuExtra: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 12,
  },
  // Settings Screen Styles
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  settingsIconContainer: {
    marginRight: 16,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: '#FFE8D6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: {
    color: '#FF8C42',
    fontSize: 11,
    fontWeight: '700',
  },
});
