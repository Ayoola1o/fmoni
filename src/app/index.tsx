import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { Shield, Sparkles, ArrowRight, Wallet, Lock, TrendingUp, Layers, CheckCircle2 } from 'lucide-react-native';
import GlassCard from '../components/GlassCard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: 'Discipline Budgeting',
    subtitle: 'Daily Spending Allocations',
    desc: 'Lock your funds in custom categories. fmoni releases exactly what you budget every single day to shield you from impulse spending.',
    icon: <Layers size={40} color={colors.primary} />,
    color: '#2A9D8F',
    illustration: () => (
      <View style={styles.illustrationWrap}>
        <GlassCard style={styles.illuCard}>
          <View style={styles.illuHeader}>
            <Layers size={20} color={colors.primary} />
            <Text style={styles.illuTitle}>Lunch Budget</Text>
            <View style={styles.illuBadge}><Text style={styles.illuBadgeText}>Active</Text></View>
          </View>
          <Text style={styles.illuAmount}>₦4,500 <Text style={{ fontSize: 12, color: colors.textSecondary }}>left of ₦10,000</Text></Text>
          <View style={styles.illuProgressBg}>
            <View style={[styles.illuProgressFill, { width: '45%' }]} />
          </View>
          <Text style={styles.illuTime}>Next release: Tomorrow, 8:00 AM</Text>
        </GlassCard>
      </View>
    ),
  },
  {
    title: 'Instant Transfers',
    subtitle: 'Secure 4-Step Payment Flow',
    desc: 'Send money to other bank accounts or pay utility bills in seconds. Track and confirm every step with our bank-grade verification screens.',
    icon: <Wallet size={40} color={colors.accent} />,
    color: '#E9C46A',
    illustration: () => (
      <View style={styles.illustrationWrap}>
        <GlassCard style={styles.illuCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={styles.circleCheck}><CheckCircle2 size={16} color={colors.success} /></View>
            <Text style={styles.stepTitle}>Step 4: Payment Successful</Text>
          </View>
          <Text style={styles.successLabel}>Sent to James Adenuga</Text>
          <Text style={styles.successAmount}>₦25,000.00</Text>
          <View style={styles.divider} />
          <Text style={styles.successReceipt}>Steady Bank • Ref: #TX-98402</Text>
        </GlassCard>
      </View>
    ),
  },
  {
    title: 'Maximum Security',
    subtitle: 'Tiered Verification & Bio Data',
    desc: 'Get highly flexible daily transaction limits up to ₦5,000,000. Guarded by biometrics, instant SMS alerts, and full state-of-the-art security features.',
    icon: <Shield size={40} color={colors.error} />,
    color: '#E76F51',
    illustration: () => (
      <View style={styles.illustrationWrap}>
        <GlassCard style={styles.illuCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: colors.textSecondary, fontWeight: '700' }}>SECURITY SCORE</Text>
            <Text style={{ fontSize: 13, color: colors.success, fontWeight: '900' }}>92/100</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.shieldWrap}><Shield size={28} color={colors.success} /></View>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: colors.textPrimary }}>Tier 3 Verified</Text>
              <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>₦5,000,000 Daily Limit</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    ),
  },
];

export default function IndexScreen() {
  const router = useRouter();
  const [screenMode, setScreenMode] = useState<'splash' | 'onboarding'>('splash');
  const [countdown, setCountdown] = useState(9.9);
  const [slideIndex, setSlideIndex] = useState(0);

  // Animation values
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const slideScroll = useRef<ScrollView>(null);

  useEffect(() => {
    // Fade & scale logo in
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1.05,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Gentle pulsing loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoScale, { toValue: 0.98, duration: 2000, useNativeDriver: true }),
          Animated.timing(logoScale, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        ])
      ).start();
    });

    // Start 9.9 second progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 9900,
      useNativeDriver: false,
    }).start();

    // 9.9s countdown timer decrement
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = Math.max(prev - 0.1, 0);
        return parseFloat(next.toFixed(1));
      });
    }, 100);

    // After 9.9 seconds, navigate/transition to Onboarding Screen
    const timer = setTimeout(() => {
      clearInterval(interval);
      setScreenMode('onboarding');
    }, 9900);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleNextSlide = () => {
    if (slideIndex < ONBOARDING_DATA.length - 1) {
      const nextIdx = slideIndex + 1;
      setSlideIndex(nextIdx);
      slideScroll.current?.scrollTo({ x: nextIdx * SCREEN_WIDTH, animated: true });
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/login');
  };

  if (screenMode === 'splash') {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashContent}>
          {/* Decorative Back Light */}
          <View style={styles.glowLight} />

          {/* Logo container */}
          <Animated.View style={[styles.logoWrap, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
            <Image
              source={require('../../assets/images/fmoni_favco.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Text vision info */}
          <Text style={styles.appTitle}>fmoni</Text>
          <Text style={styles.appSubtitle}>Secure Daily Budgeting & Allocations</Text>

          {/* Countdown timer & progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.timeRow}>
              <Sparkles size={16} color={colors.accent} style={styles.sparkleIcon} />
              <Text style={styles.connectingText}>Establishing Secured Tunnel...</Text>
              <Text style={styles.countdownText}>{countdown}s</Text>
            </View>
            <View style={styles.progressBarBg}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Onboarding Screen View
  return (
    <SafeAreaView style={styles.onboardContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Header */}
      <View style={styles.onboardHeader}>
        <Text style={styles.headerLogo}>fmoni</Text>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slide Carousel */}
      <ScrollView
        ref={slideScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setSlideIndex(index);
        }}
        style={{ flex: 1 }}
      >
        {ONBOARDING_DATA.map((slide, index) => {
          const Illustration = slide.illustration;
          return (
            <View key={index} style={styles.slideFrame}>
              <View style={styles.slideVisual}>
                <Illustration />
              </View>
              
              <View style={styles.slideTextSection}>
                <View style={styles.iconCircle}>
                  {slide.icon}
                </View>
                <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDesc}>{slide.desc}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Footer / Controls */}
      <View style={styles.onboardFooter}>
        {/* Indicators */}
        <View style={styles.indicatorContainer}>
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                slideIndex === index && styles.indicatorDotActive,
              ]}
            />
          ))}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextSlide}>
          <Text style={styles.nextButtonText}>
            {slideIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          <ArrowRight size={18} color={colors.textWhite} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#1E352F', // Very dark forest/mint green for contrast & luxury
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  glowLight: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    backgroundColor: colors.primary,
    opacity: 0.15,
    blurRadius: 100,
    zIndex: -1,
  },
  logoWrap: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.textWhite,
    letterSpacing: 2,
    marginTop: 24,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 60,
    left: 32,
    right: 32,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sparkleIcon: {
    marginRight: 6,
  },
  connectingText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    flex: 1,
  },
  countdownText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accent,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  // Onboarding Styles
  onboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  onboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLogo: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  slideFrame: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'space-between',
  },
  slideVisual: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
  },
  illuCard: {
    width: '100%',
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  illuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  illuTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginLeft: 10,
    flex: 1,
  },
  illuBadge: {
    backgroundColor: 'rgba(42, 157, 143, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  illuBadgeText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '800',
  },
  illuAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  illuProgressBg: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  illuProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  illuTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  circleCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(39, 174, 96, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.success,
  },
  successLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  successAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  successReceipt: {
    fontSize: 11,
    color: colors.textMuted,
  },
  shieldWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(39, 174, 96, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideTextSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  slideSubtitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  slideDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  onboardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginRight: 8,
  },
  indicatorDotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: colors.textWhite,
    fontSize: 15,
    fontWeight: '700',
  },
});
