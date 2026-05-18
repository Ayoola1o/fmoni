import { Stack } from 'expo-router';
import { colors } from '../theme/colors';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Allocations */}
        <Stack.Screen name="allocations/create" options={{ presentation: 'modal', headerShown: false }} />
        {/* Transactions */}
        <Stack.Screen name="transact/transfer" options={{ headerShown: false }} />
        <Stack.Screen name="transact/bills" options={{ headerShown: false }} />
        {/* Payment Flow */}
        <Stack.Screen name="payment/confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="payment/pin" options={{ headerShown: false }} />
        <Stack.Screen name="payment/processing" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="payment/success" options={{ headerShown: false, gestureEnabled: false }} />
        {/* Profile Sub-Pages */}
        <Stack.Screen name="profile/me" options={{ headerShown: false }} />
        <Stack.Screen name="profile/details" options={{ headerShown: false }} />
        <Stack.Screen name="profile/history" options={{ headerShown: false }} />
        <Stack.Screen name="profile/limits" options={{ headerShown: false }} />
        <Stack.Screen name="profile/bank-card" options={{ headerShown: false }} />
        <Stack.Screen name="profile/transfer-to-me" options={{ headerShown: false }} />
        <Stack.Screen name="profile/security" options={{ headerShown: false }} />
        <Stack.Screen name="profile/customer-service" options={{ headerShown: false }} />
        <Stack.Screen name="profile/invitation" options={{ headerShown: false }} />
        {/* Settings Sub-Pages */}
        <Stack.Screen name="settings/[page]" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
