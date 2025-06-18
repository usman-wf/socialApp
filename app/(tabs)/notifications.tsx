import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function NotificationsScreen() {
  return (
    <View style={notificationStyles.container}>
      <ScrollView style={notificationStyles.content} showsVerticalScrollIndicator={false}>
        {/* Empty State */}
        <View style={notificationStyles.emptyState}>
          <View style={notificationStyles.emptyIcon}>
            <Ionicons name="notifications-outline" size={64} color={COLORS.textMuted} />
          </View>
          
          <Text style={notificationStyles.emptyTitle}>No Notifications</Text>
          <Text style={notificationStyles.emptyDescription}>
            When you receive likes, comments, or follows, they&apos;ll appear here.
          </Text>
        </View>

        {/* Notification Types */}
        <View style={notificationStyles.typesSection}>
          <Text style={notificationStyles.sectionTitle}>Notification Types</Text>
          
          <View style={notificationStyles.typeCard}>
            <View style={[notificationStyles.typeIcon, { backgroundColor: COLORS.danger }]}>
              <Ionicons name="heart" size={20} color={COLORS.text} />
            </View>
            <View style={notificationStyles.typeText}>
              <Text style={notificationStyles.typeTitle}>Likes</Text>
              <Text style={notificationStyles.typeSubtitle}>
                When someone likes your posts
              </Text>
            </View>
          </View>

          <View style={notificationStyles.typeCard}>
            <View style={[notificationStyles.typeIcon, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="chatbubble" size={20} color={COLORS.text} />
            </View>
            <View style={notificationStyles.typeText}>
              <Text style={notificationStyles.typeTitle}>Comments</Text>
              <Text style={notificationStyles.typeSubtitle}>
                When someone comments on your posts
              </Text>
            </View>
          </View>

          <View style={notificationStyles.typeCard}>
            <View style={[notificationStyles.typeIcon, { backgroundColor: COLORS.accent }]}>
              <Ionicons name="person-add" size={20} color={COLORS.text} />
            </View>
            <View style={notificationStyles.typeText}>
              <Text style={notificationStyles.typeTitle}>Follows</Text>
              <Text style={notificationStyles.typeSubtitle}>
                When someone starts following you
              </Text>
            </View>
          </View>

          <View style={notificationStyles.typeCard}>
            <View style={[notificationStyles.typeIcon, { backgroundColor: COLORS.info }]}>
              <Ionicons name="share" size={20} color={COLORS.text} />
            </View>
            <View style={notificationStyles.typeText}>
              <Text style={notificationStyles.typeTitle}>Shares</Text>
              <Text style={notificationStyles.typeSubtitle}>
                When someone shares your content
              </Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={notificationStyles.settingsSection}>
          <Text style={notificationStyles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={notificationStyles.settingItem}>
            <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
            <Text style={notificationStyles.settingText}>Notification Settings</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={notificationStyles.settingItem}>
            <Ionicons name="volume-high-outline" size={24} color={COLORS.warning} />
            <Text style={notificationStyles.settingText}>Sound & Vibration</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const notificationStyles = StyleSheet.create({
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
  typesSection: {
    marginTop: 40,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  typeCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    flex: 1,
    marginLeft: 16,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  typeSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    marginLeft: 16,
  },
});

