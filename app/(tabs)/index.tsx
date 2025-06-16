import { useAuth, useUser } from '@clerk/clerk-expo';
import { Link, router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/auth.styles.js";

export default function Index() {
  const { signOut } = useAuth()
  const { user } = useUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/sign-in')
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      
      {user && (
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={styles.linkText}>
            Hello, {user.emailAddresses[0]?.emailAddress || 'User'}!
          </Text>
          {user.imageUrl && (
            <Image 
              source={{ uri: user.imageUrl }} 
              style={{ width: 60, height: 60, borderRadius: 30, marginTop: 10 }} 
            />
          )}
        </View>
      )}

      <Link href="/(tabs)/profile" style={styles.link}>Profile</Link>
      <Link href="/(tabs)/notifications" style={styles.link}>Notifications</Link>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#dc3545', marginTop: 30 }]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      
      <Image source={{ uri: "https://wallpaperaccess.com/full/123456.jpg" }} style={{ width: 150, height: 150, marginTop: 20 }} />
    </View>
  );
}
