import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/auth.styles'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [codeFocused, setCodeFocused] = useState(false)

  const onSignUpPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      const errorMessage = err.errors?.[0]?.message || 'An error occurred during sign up.'
      
      // Provide helpful message for password breach errors
      if (errorMessage.toLowerCase().includes('breach') || errorMessage.toLowerCase().includes('pwned')) {
        Alert.alert(
          'Password Security Issue', 
          'This password has been found in a data breach. Please use a completely unique password that you\'ve never used elsewhere.'
        )
      } else {
        Alert.alert('Error', errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return

    setLoading(true)
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
        Alert.alert('Error', 'Verification failed. Please try again.')
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      Alert.alert('Error', err.errors?.[0]?.message || 'An error occurred during verification.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.formContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#667eea" />
        </TouchableOpacity>

        {!pendingVerification && (
          <>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name="person-add" size={32} color="#fff" />
            </View>
            
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and start your journey today</Text>
            
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={[styles.input, emailFocused && styles.inputFocused]}
                placeholder="Enter your email"
                placeholderTextColor="#adb5bd"
                value={emailAddress}
                onChangeText={setEmailAddress}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
            
            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder="Create a strong password"
                placeholderTextColor="#adb5bd"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry
                autoComplete="password"
              />
            </View>
            
            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onSignUpPress}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={loading ? ['#adb5bd', '#adb5bd'] : ['#667eea', '#764ba2']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Text>
                {!loading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <Link href="/sign-in" style={styles.link}>
                Sign in
              </Link>
            </View>
          </>
        )}

        {pendingVerification && (
          <>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={32} color="#fff" />
            </View>
            
            <Text style={styles.title}>Verify Email</Text>
            <Text style={styles.subtitle}>
              We sent a verification code to {emailAddress}
            </Text>
            
            {/* Verification Code Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Verification Code</Text>
              <TextInput
                style={[styles.input, codeFocused && styles.inputFocused]}
                placeholder="Enter verification code"
                placeholderTextColor="#adb5bd"
                value={code}
                onChangeText={setCode}
                onFocus={() => setCodeFocused(true)}
                onBlur={() => setCodeFocused(false)}
                keyboardType="number-pad"
              />
            </View>
            
            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onPressVerify}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={loading ? ['#adb5bd', '#adb5bd'] : ['#667eea', '#764ba2']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Verifying...' : 'Verify Email'}
                </Text>
                {!loading && <Ionicons name="checkmark" size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
} 