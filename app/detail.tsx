import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function DetailScreen() {
  return (
    <ThemedView style={styles.container}>
      <Link.AppleZoomTarget>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.image}
        />
      </Link.AppleZoomTarget>
      <ThemedText type="title" style={styles.title}>
        Detail
      </ThemedText>
      <ThemedText style={styles.description}>
        On iOS 18+, this screen uses a native zoom transition. The image above
        is the zoom target — it expands from the card on the home screen.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  image: {
    width: 290,
    height: 178,
    borderRadius: 12,
  },
  title: {
    marginTop: 20,
  },
  description: {
    marginTop: 12,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
});
