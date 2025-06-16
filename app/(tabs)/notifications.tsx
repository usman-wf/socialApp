import { Text, View } from 'react-native'
import { styles } from '../../styles/auth.styles'

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.linkText}>No notifications yet!</Text>
    </View>
  )
}

