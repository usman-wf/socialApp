import { Text, View } from 'react-native'
import { styles } from '../../styles/auth.styles'

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <Text style={styles.linkText}>Create something new!</Text>
    </View>
  )
}