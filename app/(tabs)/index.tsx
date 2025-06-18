import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Index() {
  const { signOut } = useAuth()
  //const { user } = useUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/sign-in')
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to sign out')
    }
  }

  return (
    <View style={homeStyles.container}>
      <ScrollView style={homeStyles.content} showsVerticalScrollIndicator={false}>
        {/* Empty state for posts feed */}
        <View style={homeStyles.emptyState}>
          <View style={homeStyles.emptyIcon}>
            <Ionicons name="home-outline" size={64} color={COLORS.textMuted} />
          </View>
          
          <Text style={homeStyles.emptyTitle}>Welcome to Your Feed</Text>
          <Text style={homeStyles.emptyDescription}>
            Posts from people you follow will appear here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Account for status bar
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
});
