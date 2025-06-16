import { useUser } from '@clerk/clerk-expo'
import { Image, Text, View } from 'react-native'
import { styles } from '../../styles/auth.styles'

export default function ProfileScreen() {
  const { user } = useUser()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {user && (
        <View style={{ alignItems: 'center' }}>
          {user.imageUrl && (
            <Image 
              source={{ uri: user.imageUrl }} 
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} 
            />
          )}
          
          <Text style={[styles.linkText, { fontSize: 18, marginBottom: 10 }]}>
            Email: {user.emailAddresses[0]?.emailAddress}
          </Text>
          
          <Text style={[styles.linkText, { fontSize: 18, marginBottom: 10 }]}>
            First Name: {user.firstName || 'Not set'}
          </Text>
          
          <Text style={[styles.linkText, { fontSize: 18, marginBottom: 10 }]}>
            Last Name: {user.lastName || 'Not set'}
          </Text>
          
          <Text style={[styles.linkText, { fontSize: 14, color: '#999' }]}>
            User ID: {user.id}
          </Text>
        </View>
      )}
    </View>
  )
}