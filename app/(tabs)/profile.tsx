import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.avatar}>
        <ThemedText style={styles.avatarText}>JB</ThemedText>
      </View>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText style={styles.subtitle}>
        This tab was added with a single NativeTabs.Trigger block.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#A1CEDC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    opacity: 0.6,
  },
});
