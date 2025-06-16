import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'

const Index = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />
  } else {
    return <Redirect href="/sign-in" />
  }
}

export default Index