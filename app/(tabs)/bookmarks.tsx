import { Text, View } from 'react-native'
import { styles } from '../../styles/auth.styles'

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <Text style={styles.linkText}>No bookmarks saved yet!</Text>
    </View>
  )
}