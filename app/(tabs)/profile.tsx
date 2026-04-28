import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  type ThemePreference,
  useThemePreference,
} from "@/providers/ThemePreferenceProvider";
import { Pressable, StyleSheet, View } from "react-native";

const THEME_OPTIONS: {
  description: string;
  label: string;
  value: ThemePreference;
}[] = [
  {
    value: "system",
    label: "System",
    description: "Follow the device setting automatically.",
  },
  {
    value: "light",
    label: "Light",
    description: "Always use the light appearance.",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use the dark appearance.",
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { preference, setPreference } = useThemePreference();
  const tintColor = Colors[colorScheme].tint;
  const borderColor =
    colorScheme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.10)";
  const selectedBackground =
    colorScheme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(2,132,199,0.08)";

  return (
    <ThemedView style={styles.container}>
      <View style={styles.avatar}>
        <ThemedText style={styles.avatarText}>JB</ThemedText>
      </View>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText style={styles.subtitle}>
        Choose how the app should look across iOS, Android, and the web.
      </ThemedText>

      <ThemedView
        style={styles.card}
        lightColor="rgba(15,23,42,0.03)"
        darkColor="rgba(255,255,255,0.05)"
      >
        <ThemedText type="subtitle">Color Scheme</ThemedText>
        <ThemedText style={styles.cardDescription}>
          System follows your device. Light and Dark override it everywhere.
        </ThemedText>

        <View style={styles.optionList}>
          {THEME_OPTIONS.map((option) => {
            const isSelected = preference === option.value;

            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                onPress={() => setPreference(option.value)}
                style={({ pressed }) => [
                  styles.optionButton,
                  {
                    backgroundColor: isSelected
                      ? selectedBackground
                      : "transparent",
                    borderColor: isSelected ? tintColor : borderColor,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.optionIndicator,
                    {
                      borderColor: isSelected ? tintColor : borderColor,
                      backgroundColor: isSelected ? tintColor : "transparent",
                    },
                  ]}
                />
                <View style={styles.optionContent}>
                  <ThemedText type="defaultSemiBold">{option.label}</ThemedText>
                  <ThemedText style={styles.optionDescription}>
                    {option.description}
                  </ThemedText>
                </View>
              </Pressable>
            );
          })}
        </View>

        <ThemedText style={styles.statusText}>
          Active appearance: {formatThemeLabel(colorScheme)}. Preference:{" "}
          {formatThemeLabel(preference)}.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function formatThemeLabel(value: ThemePreference | "light" | "dark") {
  return value.charAt(0).toUpperCase() + value.slice(1);
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
    maxWidth: 360,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    marginTop: 28,
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  cardDescription: {
    opacity: 0.7,
  },
  optionList: {
    gap: 12,
    marginTop: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  optionIndicator: {
    width: 14,
    height: 14,
    borderRadius: 999,
    borderWidth: 2,
    flexShrink: 0,
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  optionDescription: {
    opacity: 0.68,
  },
  statusText: {
    marginTop: 8,
    opacity: 0.7,
  },
});
