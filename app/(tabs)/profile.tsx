import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/colors'

export default function ProfileScreen() {
  const { user } = useUser()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut()
              router.replace('/landing')
            } catch (error) {
              console.log(error)
              Alert.alert('Error', 'Failed to sign out')
            }
          },
        },
      ]
    )
  }

  return (
    <View style={profileStyles.container}>
      <ScrollView 
        style={profileStyles.content} 
        contentContainerStyle={profileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={profileStyles.headerSection}>
          <View style={profileStyles.avatarContainer}>
            {user?.imageUrl ? (
              <Image 
                source={{ uri: user.imageUrl }} 
                style={profileStyles.profileImage}
              />
            ) : (
              <View style={profileStyles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color={COLORS.textSecondary} />
              </View>
            )}
            
            <TouchableOpacity style={profileStyles.editButton}>
              <Ionicons name="camera" size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <Text style={profileStyles.displayName}>
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'
            }
          </Text>
          
          <Text style={profileStyles.userEmail}>
            {user?.emailAddresses[0]?.emailAddress || 'No email'}
          </Text>
        </View>

        {/* Stats Section */}
        <View style={profileStyles.statsSection}>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statNumber}>0</Text>
            <Text style={profileStyles.statLabel}>Posts</Text>
          </View>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statNumber}>0</Text>
            <Text style={profileStyles.statLabel}>Following</Text>
          </View>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statNumber}>0</Text>
            <Text style={profileStyles.statLabel}>Followers</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Account Information</Text>
          
          <View style={profileStyles.infoCard}>
            <View style={profileStyles.infoItem}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
              <View style={profileStyles.infoText}>
                <Text style={profileStyles.infoLabel}>Email</Text>
                <Text style={profileStyles.infoValue}>
                  {user?.emailAddresses[0]?.emailAddress || 'Not set'}
                </Text>
              </View>
            </View>

            <View style={profileStyles.divider} />

            <View style={profileStyles.infoItem}>
              <Ionicons name="person-outline" size={20} color={COLORS.accent} />
              <View style={profileStyles.infoText}>
                <Text style={profileStyles.infoLabel}>First Name</Text>
                <Text style={profileStyles.infoValue}>
                  {user?.firstName || 'Not set'}
                </Text>
              </View>
            </View>

            <View style={profileStyles.divider} />

            <View style={profileStyles.infoItem}>
              <Ionicons name="person-outline" size={20} color={COLORS.accent} />
              <View style={profileStyles.infoText}>
                <Text style={profileStyles.infoLabel}>Last Name</Text>
                <Text style={profileStyles.infoValue}>
                  {user?.lastName || 'Not set'}
                </Text>
              </View>
            </View>

            <View style={profileStyles.divider} />

            <View style={profileStyles.infoItem}>
              <Ionicons name="key-outline" size={20} color={COLORS.info} />
              <View style={profileStyles.infoText}>
                <Text style={profileStyles.infoLabel}>User ID</Text>
                <Text style={[profileStyles.infoValue, profileStyles.userIdText]}>
                  {user?.id || 'Not available'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={profileStyles.actionButton}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={profileStyles.actionText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={profileStyles.actionButton}>
            <Ionicons name="settings-outline" size={20} color={COLORS.secondary} />
            <Text style={profileStyles.actionText}>Settings</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={profileStyles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color={COLORS.info} />
            <Text style={profileStyles.actionText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Sign Out Section */}
        <View style={profileStyles.section}>
          <TouchableOpacity style={profileStyles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
            <Text style={profileStyles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 100, // Extra space for tab bar and Sign Out button
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  userIdText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 56,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    marginLeft: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  signOutText: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: '600',
    marginLeft: 12,
  },
});