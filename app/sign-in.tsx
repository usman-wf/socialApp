import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/auth.styles'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        Alert.alert('Error', 'Sign in failed. Please try again.')
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      Alert.alert('Error', err.errors?.[0]?.message || 'An error occurred during sign in.')
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

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed" size={32} color="#fff" />
        </View>
        
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account to continue</Text>
        
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
            placeholder="Enter your password"
            placeholderTextColor="#adb5bd"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            secureTextEntry
            autoComplete="password"
          />
        </View>
        
        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onSignInPress}
          disabled={loading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={loading ? ['#adb5bd', '#adb5bd'] : ['#667eea', '#764ba2']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
            {!loading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don&apos;t have an account? </Text>
          <Link href="/sign-up" style={styles.link}>
            Sign up
          </Link>
        </View>
      </View>
    </View>
  )
} 