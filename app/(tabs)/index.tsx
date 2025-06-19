import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { api } from '../../convex/_generated/api';

export default function Index() {
  const posts = useQuery(api.posts.getFeedPosts);

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
            {posts === undefined ? 
              "Loading your feed..." : 
              posts.length === 0 ? 
                "Posts from people you follow will appear here." :
                `You have ${posts.length} posts in your feed.`
            }
          </Text>
        </View>

        {/* Future: Posts will be displayed here */}
        {posts && posts.length > 0 && (
          <View style={homeStyles.postsSection}>
            <Text style={homeStyles.sectionTitle}>Recent Posts</Text>
            {/* Posts will be rendered here in future */}
            <Text style={homeStyles.comingSoon}>Post display coming soon...</Text>
          </View>
        )}
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
  postsSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  comingSoon: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
