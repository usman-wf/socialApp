import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { COLORS } from '../../constants/colors'
import { api } from '../../convex/_generated/api'

export default function CreateScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl)
  const sharePost = useMutation(api.posts.sharePost)


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to pick image')
    }
  }

  const uploadImage = async (imageUri: string) => {
    try {
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl()
      
      // Create FormData for upload
      const formData = new FormData()
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'post-image.jpg',
      } as any)

      // Upload image to Convex storage
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      return result.storageId
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const handleCreatePost = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image')
      return
    }

    if (!caption.trim()) {
      Alert.alert('Error', 'Please add a caption')
      return
    }

    setUploading(true)

    try {
      // Upload image and get storage ID
      const storageId = await uploadImage(selectedImage)
      
      // Create and share post with uploaded image
      await sharePost({
        caption: caption.trim(),
        imageUrl: selectedImage, // This will be replaced with actual URL
        storageId,
      })

      Alert.alert('Success', 'Post created successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error) {
      console.error('Post creation error:', error)
      Alert.alert('Error', 'Failed to create post. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={createStyles.container}>
        {/* Header */}
        <View style={createStyles.header}>
          <TouchableOpacity onPress={() => router.back()} style={createStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={createStyles.headerSpacer} />
          <TouchableOpacity 
            onPress={handleCreatePost}
            disabled={!selectedImage || !caption.trim() || uploading}
            style={[
              createStyles.shareButton,
              (!selectedImage || !caption.trim() || uploading) && createStyles.shareButtonDisabled
            ]}
          >
            {uploading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={createStyles.shareButtonText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={createStyles.content} showsVerticalScrollIndicator={false}>
          {/* Image Selection Area */}
          <TouchableOpacity 
            style={createStyles.imageContainer}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            {selectedImage ? (
              <View style={createStyles.imageWrapper}>
                <Image source={{ uri: selectedImage }} style={createStyles.selectedImage} />
                <TouchableOpacity 
                  style={createStyles.removeImageButton}
                  onPress={removeImage}
                >
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
                             <View style={createStyles.placeholderContainer}>
                 <Ionicons name="camera" size={52} color={COLORS.primary} />
                <Text style={createStyles.placeholderText}>Tap to select photo</Text>
                <Text style={createStyles.placeholderSubtext}>or tap anywhere on screen</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Caption Input */}
          <View style={createStyles.captionContainer}>
            <Text style={createStyles.captionLabel}>Caption</Text>
                         <TextInput
               style={createStyles.captionInput}
               placeholder="Write a caption..."
               placeholderTextColor={COLORS.placeholder}
              value={caption}
              onChangeText={setCaption}
              multiline
              maxLength={500}
              textAlignVertical="top"
            />
            <Text style={createStyles.characterCount}>{caption.length}/500</Text>
          </View>

          {/* Additional Options */}
                     <View style={createStyles.optionsContainer}>
             <TouchableOpacity style={createStyles.optionItem}>
               <Ionicons name="location-outline" size={22} color={COLORS.accent} />
               <Text style={createStyles.optionText}>Add Location</Text>
             </TouchableOpacity>
             
             <TouchableOpacity style={createStyles.optionItem}>
               <Ionicons name="people-outline" size={22} color={COLORS.accent} />
               <Text style={createStyles.optionText}>Tag People</Text>
             </TouchableOpacity>
           </View>
        </ScrollView>

        {/* Tap anywhere overlay for image selection */}
        {!selectedImage && (
          <TouchableOpacity 
            style={createStyles.tapOverlay}
            onPress={pickImage}
            activeOpacity={1}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const createStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
  },
  headerSpacer: {
    flex: 1,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center' as const,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  shareButtonDisabled: {
    backgroundColor: COLORS.secondary,
    opacity: 0.6,
    shadowOpacity: 0,
  },
  shareButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 16,
  },
  imageContainer: {
    height: 300,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed' as const,
    marginBottom: 24,
    overflow: 'hidden' as const,
    backgroundColor: COLORS.card,
  },
  imageWrapper: {
    position: 'relative' as const,
    width: '100%' as const,
    height: '100%' as const,
  },
  selectedImage: {
    width: '100%' as const,
    height: '100%' as const,
    borderRadius: 14,
  },
  removeImageButton: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    backgroundColor: COLORS.danger,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: COLORS.danger,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: COLORS.text,
    marginTop: 16,
    textAlign: 'center' as const,
  },
  placeholderSubtext: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center' as const,
  },
  captionContainer: {
    marginBottom: 20,
  },
  captionLabel: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: COLORS.text,
    marginBottom: 12,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 120,
    backgroundColor: COLORS.input,
    textAlignVertical: 'top' as const,
  },
  characterCount: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'right' as const,
    marginTop: 8,
  },
  optionsContainer: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginLeft: 16,
    fontWeight: '500' as const,
  },
  tapOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
}

