import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, MessageCircle, Phone, Mail, ChevronRight, Send, Clock } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';

const FAQS = [
  { q: 'How do I reset my PIN?', a: 'Go to Security Center > Change Transaction PIN.' },
  { q: 'Why was my transfer reversed?', a: 'Reversals happen when the recipient account is invalid or inactive.' },
  { q: 'How long does a transfer take?', a: 'Transfers within fmoni are instant. External transfers take up to 30 minutes.' },
  { q: 'How do I increase my transfer limits?', a: 'Upgrade your account tier from the Account Limits page.' },
];

export default function CustomerServiceScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Contact Options */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <GlassCard style={styles.contactCard}>
          <ContactOption icon={<MessageCircle size={22} color={colors.primary} />} label="Live Chat" desc="Available 8am – 10pm daily" badge="Online" />
          <ContactOption icon={<Phone size={22} color={colors.primary} />} label="Call Us" desc="+234 700 FMONI 01" />
          <ContactOption icon={<Mail size={22} color={colors.primary} />} label="Email Support" desc="help@fmoni.app" />
        </GlassCard>

        {/* Send Message */}
        <Text style={styles.sectionTitle}>Send a Message</Text>
        <GlassCard style={styles.messageCard}>
          <TextInput
            style={styles.messageInput}
            placeholder="Describe your issue in detail..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={[styles.sendBtn, !message && { opacity: 0.5 }]} disabled={!message}>
            <Send size={18} color={colors.textWhite} />
            <Text style={styles.sendBtnText}>Send Message</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Response Time */}
        <View style={styles.responseBox}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={styles.responseText}>Average response time: under 30 minutes</Text>
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <TouchableOpacity key={i} style={styles.faqItem} onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <ChevronRight size={18} color={colors.textMuted} style={{ transform: [{ rotate: expandedFaq === i ? '90deg' : '0deg' }] }} />
            </View>
            {expandedFaq === i && <Text style={styles.faqA}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const ContactOption = ({ icon, label, desc, badge }: { icon: React.ReactNode; label: string; desc: string; badge?: string }) => (
  <TouchableOpacity style={styles.contactRow}>
    <View style={styles.contactIcon}>{icon}</View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactDesc}>{desc}</Text>
    </View>
    {badge && <View style={styles.onlineBadge}><Text style={styles.onlineText}>{badge}</Text></View>}
    <ChevronRight size={18} color={colors.textMuted} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  scrollContent: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 14, marginTop: 4 },
  contactCard: { padding: 8, marginBottom: 28 },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.background },
  contactIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  contactDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  onlineBadge: { backgroundColor: 'rgba(39,174,96,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 8 },
  onlineText: { fontSize: 11, color: colors.success, fontWeight: '700' },
  messageCard: { padding: 16, marginBottom: 12 },
  messageInput: { height: 120, fontSize: 14, color: colors.textPrimary, marginBottom: 16, lineHeight: 22 },
  sendBtn: { flexDirection: 'row', backgroundColor: colors.primary, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sendBtnText: { color: colors.textWhite, fontSize: 14, fontWeight: '700', marginLeft: 8 },
  responseBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  responseText: { fontSize: 12, color: colors.textSecondary, marginLeft: 8 },
  faqItem: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  faqA: { fontSize: 13, color: colors.textSecondary, marginTop: 10, lineHeight: 20 },
});
