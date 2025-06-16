import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TableLayout() {
  return(    
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#000",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderTopWidth: 0,
        height: 50,
      },
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#888",     
    }}>
      <Tabs.Screen name="index" 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="bookmarks" 
      options={
        {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          )
        }
      }/>
      <Tabs.Screen name="create" 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="profile" 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="notifications" 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications" color={color} size={size} />
        )
      }}/>
    </Tabs>
  )
}