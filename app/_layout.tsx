import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors'
import ClerkAndConvexProvider from './providers/ClerkAndConvexProvider'

export default function RootLayout() {
  return (
     <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
          <StatusBar style="light" backgroundColor={COLORS.background} />
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
     </ClerkAndConvexProvider>
  )
}