import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { ShieldCheck, Delete } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PINSetupScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1: Create, 2: Confirm
  const router = useRouter();

  const handleNumberPress = (num: string) => {
    if (step === 1) {
      if (pin.length < 4) {
        const newPin = pin + num;
        setPin(newPin);
        if (newPin.length === 4) {
          setTimeout(() => setStep(2), 300);
        }
      }
    } else {
      if (confirmPin.length < 4) {
        const newConfirmPin = confirmPin + num;
        setConfirmPin(newConfirmPin);
        if (newConfirmPin.length === 4) {
          if (pin === newConfirmPin) {
            handleComplete();
          } else {
            alert("PINs don't match. Please try again.");
            setConfirmPin('');
            setPin('');
            setStep(1);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    if (step === 1) {
      setPin(pin.slice(0, -1));
    } else {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  const handleComplete = () => {
    // In a real app, save the PIN to secure storage/backend
    router.replace('/(tabs)');
  };

  const currentDisplayPin = step === 1 ? pin : confirmPin;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <ShieldCheck size={32} color={colors.primary} />
        </View>
        <Text style={styles.title}>{step === 1 ? 'Set Up Your Secure PIN' : 'Confirm Your Secure PIN'}</Text>
        <Text style={styles.subtitle}>
          {step === 1 
            ? 'Create a 4-digit PIN for quick, secure access.' 
            : 'Enter the PIN again to confirm.'}
        </Text>
      </View>

      <View style={styles.pinDisplay}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[
            styles.pinDot,
            currentDisplayPin.length > i && styles.pinDotFilled
          ]} />
        ))}
      </View>

      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity 
            key={num} 
            style={styles.key} 
            onPress={() => handleNumberPress(num.toString())}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.key} />
        <TouchableOpacity 
          style={styles.key} 
          onPress={() => handleNumberPress('0')}
        >
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.key} 
          onPress={handleDelete}
        >
          <Delete size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 60,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    marginHorizontal: 12,
  },
  pinDotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.8,
    justifyContent: 'center',
  },
  key: {
    width: width * 0.25,
    height: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
