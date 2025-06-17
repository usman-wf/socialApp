import { useSignUp } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/auth.styles'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

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
      {!pendingVerification && (
        <>
          <Text style={styles.title}>Sign Up</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onSignUpPress}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

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
          <Text style={styles.title}>Verify Email</Text>
          <Text style={styles.linkText}>
            We sent a verification code to {emailAddress}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onPressVerify}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
} 