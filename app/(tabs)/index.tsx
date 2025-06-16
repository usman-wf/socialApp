import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { styles } from "../../styles/auth.styles.js";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Link href="/(tabs)/profile" style={styles.link}>profile</Link>
      <Link href="/(tabs)/notifications" style={styles.link}>notification</Link>
      <Image source={{ uri: "https://wallpaperaccess.com/full/123456.jpg" }} style={{ width: 150, height: 150 }} />
    </View>
  );
}
