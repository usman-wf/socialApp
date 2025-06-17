import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClerkAndConvexProvider from './providers/ClerkAndConvexProvider'


export default function RootLayout() {
  return (
     <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
          <Slot />
          </SafeAreaView>
          </SafeAreaProvider>
     </ClerkAndConvexProvider>
        

  )
}