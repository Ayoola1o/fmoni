import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ArrowLeft, User, Phone, Mail, MapPin, Camera, Check } from 'lucide-react-native';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';

export default function ProfileDetailsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState(user?.full_name || '');
  const [email, setEmail] = useState('sarah.johnson@example.com');
  const [address, setAddress] = useState('123 Victoria Island, Lagos');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
          <Text style={styles.editBtnText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.full_name.split(' ').map(n => n[0]).join('')}</Text>
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={16} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userRole}>Level 3 Verified Account</Text>
        </View>

        <View style={styles.infoSection}>
          <DetailItem 
            label="Full Name" 
            value={name} 
            icon={<User size={20} color={colors.primary} />} 
            isEditing={isEditing}
            onChangeText={setName}
          />
          <DetailItem 
            label="Phone Number" 
            value={user.phone} 
            icon={<Phone size={20} color={colors.primary} />} 
            isEditing={false} // Phone cannot be edited easily
          />
          <DetailItem 
            label="Email Address" 
            value={email} 
            icon={<Mail size={20} color={colors.primary} />} 
            isEditing={isEditing}
            onChangeText={setEmail}
          />
          <DetailItem 
            label="Home Address" 
            value={address} 
            icon={<MapPin size={20} color={colors.primary} />} 
            isEditing={isEditing}
            onChangeText={setAddress}
          />
        </View>

        <GlassCard style={styles.accountCard}>
          <Text style={styles.cardTitle}>Account Identification</Text>
          <AccountRow label="Account Number" value={user.account_number} />
          <AccountRow label="BVN" value="********421" />
          <AccountRow label="Bank Name" value="Steady Bank (fmoni)" />
        </GlassCard>

        {isEditing && (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailItem = ({ label, value, icon, isEditing, onChangeText }: any) => (
  <View style={styles.detailItem}>
    <View style={styles.detailIcon}>{icon}</View>
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      {isEditing ? (
        <TextInput 
          style={styles.detailInput} 
          value={value} 
          onChangeText={onChangeText}
          autoFocus={label === 'Full Name'}
        />
      ) : (
        <Text style={styles.detailValue}>{value}</Text>
      )}
    </View>
    {!isEditing && label !== 'Phone Number' && <Check size={16} color={colors.success} />}
  </View>
);

const AccountRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.accountRow}>
    <Text style={styles.accountLabel}>{label}</Text>
    <Text style={styles.accountValue}>{value}</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  scrollContent: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textWhite,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  userRole: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
    backgroundColor: 'rgba(42, 157, 143, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  infoSection: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  detailInput: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    padding: 0,
  },
  accountCard: {
    padding: 20,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  accountLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  accountValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  saveBtnText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
