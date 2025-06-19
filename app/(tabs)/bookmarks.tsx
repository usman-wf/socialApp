import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function BookmarksScreen() {
  return (
    <View style={bookmarkStyles.container}>
      <ScrollView style={bookmarkStyles.content} showsVerticalScrollIndicator={false}>
        {/* Empty State */}
        <View style={bookmarkStyles.emptyState}>
          <View style={bookmarkStyles.emptyIcon}>
            <Ionicons name="bookmark-outline" size={64} color={COLORS.textMuted} />
          </View>
          
          <Text style={bookmarkStyles.emptyTitle}>No Bookmarks Yet</Text>
          <Text style={bookmarkStyles.emptyDescription}>
            When you bookmark posts, they&apos;ll appear here for easy access later.
          </Text>
        </View>

        {/* Info Cards */}
        <View style={bookmarkStyles.infoSection}>
          <View style={bookmarkStyles.infoCard}>
            <Ionicons name="heart-outline" size={24} color={COLORS.danger} />
            <View style={bookmarkStyles.infoText}>
              <Text style={bookmarkStyles.infoTitle}>Save Posts You Love</Text>
              <Text style={bookmarkStyles.infoSubtitle}>
                Tap the bookmark icon on any post to save it here
              </Text>
            </View>
          </View>

          <View style={bookmarkStyles.infoCard}>
            <Ionicons name="folder-outline" size={24} color={COLORS.accent} />
            <View style={bookmarkStyles.infoText}>
              <Text style={bookmarkStyles.infoTitle}>Organize Collections</Text>
              <Text style={bookmarkStyles.infoSubtitle}>
                Create custom collections to organize your saved content
              </Text>
            </View>
          </View>

      {/*<View style={bookmarkStyles.infoCard}>
          <Ionicons name="share-outline" size={24} color={COLORS.info} />
          <View style={bookmarkStyles.infoText}>
            <Text style={bookmarkStyles.infoTitle}>Quick Access</Text>
            <Text style={bookmarkStyles.infoSubtitle}>
              Access your saved posts anytime, even when offline
            </Text>
          </View>
        </View>*/}
        </View>
      </ScrollView>
    </View>
  )
}

const bookmarkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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
    maxWidth: 280,
  },
  infoSection: {
    marginTop: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});