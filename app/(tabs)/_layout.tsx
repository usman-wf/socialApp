import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS } from "../../constants/colors";

export default function TableLayout() {
  return(    
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: COLORS.surface,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textMuted,
    }}>
      <Tabs.Screen name="index" 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size + 2} />
        )
      }}/>
      <Tabs.Screen name="bookmarks" 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bookmark" color={color} size={size + 2} />
        )
      }}/>
      <Tabs.Screen name="create" 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add" color={color} size={size + 2} />
        )
      }}/>
      <Tabs.Screen name="profile" 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size + 2} />
        )
      }}/>
      <Tabs.Screen name="notifications" 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications" color={color} size={size + 2} />
        )
      }}/>
    </Tabs>
  )
}