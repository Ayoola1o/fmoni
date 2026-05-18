import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import { 
  Send, 
  QrCode, 
  ChevronRight, 
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Zap,
  Tv,
  Globe
} from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useRouter } from 'expo-router';

export default function TransactScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('send');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Transact</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'send' && styles.activeTab]} 
          onPress={() => setActiveTab('send')}
        >
          <Text style={[styles.tabText, activeTab === 'send' && styles.activeTabText]}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pay' && styles.activeTab]} 
          onPress={() => setActiveTab('pay')}
        >
          <Text style={[styles.tabText, activeTab === 'pay' && styles.activeTabText]}>Pay Bills</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {activeTab === 'send' ? (
          <>
            {/* Quick Send */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Send</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentContacts}>
                <ContactItem name="Add New" isAdd />
                <ContactItem name="James" />
                <ContactItem name="Amaka" />
                <ContactItem name="Tunde" />
                <ContactItem name="Sarah" />
              </ScrollView>
            </View>

            {/* Transfer Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transfer Options</Text>
              <TransferOption 
                icon={<User size={20} color={colors.primary} />} 
                title="To fmoni User" 
                desc="Send to phone, email or tag" 
                onPress={() => router.push('/transact/transfer')}
              />
              <TransferOption 
                icon={<ArrowUpRight size={20} color={colors.primary} />} 
                title="To Other Banks" 
                desc="Send to any Nigerian bank account" 
                onPress={() => router.push('/transact/transfer')}
              />
              <TransferOption 
                icon={<QrCode size={20} color={colors.primary} />} 
                title="Scan QR Code" 
                desc="Pay merchants or friends via QR" 
              />
            </View>
          </>
        ) : (
          <>
            {/* Bill Categories */}
            <View style={styles.billGrid}>
              <BillCategory 
                icon={<Smartphone size={24} color="#FF8C42" />} 
                label="Airtime" 
                onPress={() => router.push({ pathname: '/transact/bills', params: { type: 'Airtime' } })}
              />
              <BillCategory 
                icon={<Globe size={24} color="#4361EE" />} 
                label="Data" 
                onPress={() => router.push({ pathname: '/transact/bills', params: { type: 'Data' } })}
              />
              <BillCategory 
                icon={<Zap size={24} color="#F7B801" />} 
                label="Electricity" 
                onPress={() => router.push({ pathname: '/transact/bills', params: { type: 'Electricity' } })}
              />
              <BillCategory 
                icon={<Tv size={24} color="#7209B7" />} 
                label="Cable TV" 
                onPress={() => router.push({ pathname: '/transact/bills', params: { type: 'Cable TV' } })}
              />
            </View>

            {/* Recent Bills */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Payments</Text>
                <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
              </View>
              <TransferOption 
                icon={<Smartphone size={20} color={colors.textSecondary} />} 
                title="MTN Airtime - 0803..." 
                desc="₦2,000.00 • Success" 
              />
              <TransferOption 
                icon={<Zap size={20} color={colors.textSecondary} />} 
                title="Ikeja Electric" 
                desc="₦5,500.00 • Success" 
              />
            </View>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ContactItem = ({ name, isAdd }: { name: string, isAdd?: boolean }) => (
  <TouchableOpacity style={styles.contactItem}>
    <View style={[styles.contactAvatar, isAdd && styles.addAvatar]}>
      {isAdd ? <Send size={20} color={colors.primary} /> : <Text style={styles.contactInitial}>{name[0]}</Text>}
    </View>
    <Text style={styles.contactName}>{name}</Text>
  </TouchableOpacity>
);

const TransferOption = ({ icon, title, desc, onPress }: { icon: React.ReactNode, title: string, desc: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <View style={styles.optionIcon}>{icon}</View>
    <View style={styles.optionInfo}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDesc}>{desc}</Text>
    </View>
    <ChevronRight size={18} color={colors.textMuted} />
  </TouchableOpacity>
);

const BillCategory = ({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.billItem} onPress={onPress}>
    <View style={styles.billIconContainer}>{icon}</View>
    <Text style={styles.billLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  recentContacts: {
    flexDirection: 'row',
  },
  contactItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 60,
  },
  contactAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addAvatar: {
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  contactInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  contactName: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  optionDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  billGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  billItem: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  billIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
