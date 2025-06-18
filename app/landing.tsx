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

const {  height } = Dimensions.get('window')

export default function LandingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      
      {/* Background with gradient overlay */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: height,
        }}
      />
      
      <View style={landingStyles.container}>
        {/* Header Section */}
        <View style={landingStyles.headerSection}>
          <View style={landingStyles.iconContainer}>
            <Ionicons name="rocket" size={60} color="#fff" />
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
            <Ionicons name="people" size={24} color="#fff" />
            <Text style={landingStyles.featureText}>Connect with Friends</Text>
          </View>
          
          <View style={landingStyles.featureItem}>
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={landingStyles.featureText}>Share Moments</Text>
          </View>
          
          <View style={landingStyles.featureItem}>
            <Ionicons name="globe" size={24} color="#fff" />
            <Text style={landingStyles.featureText}>Explore the World</Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={landingStyles.buttonsSection}>
          <TouchableOpacity
            style={landingStyles.primaryButton}
            onPress={() => router.push('/sign-up')}
            activeOpacity={0.8}
          >
            <Text style={landingStyles.primaryButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#667eea" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
    marginBottom: 5,
  },
  appName: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  buttonsSection: {
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  primaryButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    bottom: -100,
    left: -50,
  },
  decorationCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    bottom: -75,
    right: -20,
  },
}) 