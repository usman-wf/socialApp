import { Tabs } from "expo-router";


export default function TableLayout() {
  return(
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="bookmarks" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="notifications" />
    </Tabs>
  )
}