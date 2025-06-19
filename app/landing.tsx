import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { COLORS } from '../constants/colors'

const { height } = Dimensions.get('window')

export default function LandingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="light-content" />
      
      {/* Subtle gradient overlay for depth */}
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: height,
          opacity: 0.1,
        }}
      />
      
      <View style={landingStyles.container}>
        {/* Header Section */}
        <View style={landingStyles.headerSection}>
          <View style={landingStyles.iconContainer}>
            <Ionicons name="rocket" size={60} color={COLORS.primary} />
          </View>
          
          <Text style={landingStyles.title}>Welcome to</Text>
          <Text style={landingStyles.appName}>MyApp</Text>
          <Text style={landingStyles.subtitle}>
            Connect, Share, and Discover Amazing Experiences
          </Text>
        </View>

        {/* Features Section */}
        <View style={landingStyles.featuresSection}>
          <View style={landingStyles.featureItem}>
            <Ionicons name="people" size={24} color={COLORS.primary} />
            <Text style={landingStyles.featureText}>Connect with Friends</Text>
          </View>
          
          <View style={landingStyles.featureItem}>
            <Ionicons name="camera" size={24} color={COLORS.accent} />
            <Text style={landingStyles.featureText}>Share Moments</Text>
          </View>
          
          {/*<View style={landingStyles.featureItem}>
            <Ionicons name="globe" size={24} color={COLORS.info} />
            <Text style={landingStyles.featureText}>Explore the World</Text>
          </View>*/}
        </View>

        {/* Buttons Section */}
        <View style={landingStyles.buttonsSection}>
          <TouchableOpacity
            style={landingStyles.primaryButton}
            onPress={() => router.push('/sign-up')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              style={landingStyles.buttonGradient}
            >
              <Text style={landingStyles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={landingStyles.secondaryButton}
            onPress={() => router.push('/sign-in')}
            activeOpacity={0.8}
          >
            <Text style={landingStyles.secondaryButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom decoration */}
        <View style={landingStyles.decorationBottom}>
          <View style={landingStyles.decorationCircle1} />
          <View style={landingStyles.decorationCircle2} />
        </View>
      </View>
    </View>
  )
}

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    color: COLORS.textSecondary,
    fontWeight: '300',
    marginBottom: 5,
  },
  appName: {
    fontSize: 48,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 15,
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    color: COLORS.text,
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  buttonsSection: {
    paddingBottom: 40,
  },
  primaryButton: {
    borderRadius: 30,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  decorationBottom: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    right: -50,
    height: 100,
  },
  decorationCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary + '10',
    bottom: -100,
    left: -50,
  },
  decorationCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.accent + '08',
    bottom: -75,
    right: -20,
  },
}) 