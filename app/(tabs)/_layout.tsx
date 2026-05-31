import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme].icon;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          drawable="custom_android_drawable"
          selectedColor={tintColor}
        />
        <NativeTabs.Trigger.Badge>3</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Icon
          sf="gear"
          drawable="custom_settings_drawable"
          selectedColor={tintColor}
        />
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf="person.fill"
          selectedColor={tintColor}
        />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.BottomAccessory>
        <NowPlayingBar colorScheme={colorScheme} />
      </NativeTabs.BottomAccessory>
    </NativeTabs>
  );
}

function NowPlayingBar({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const isDark = colorScheme === "dark";
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  const mutedColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 14,
        marginBottom: Platform.OS === "ios" ? 0 : 8,
      }}
    >
      <IconSymbol name="music.note" size={20} color={mutedColor} />

      <View style={{ minWidth: 0, marginLeft: 10, marginRight: 12, alignItems: "center" }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: textColor,
          }}
        >
          Midnight City
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            marginTop: 1,
            color: mutedColor,
          }}
        >
          M83
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? "Pause" : "Play"}
        onPress={() => setIsPlaying((p) => !p)}
        hitSlop={8}
        style={({ pressed }) => ({
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.55 : 1,
        })}
      >
        <IconSymbol
          name={isPlaying ? "pause.fill" : "play.fill"}
          size={22}
          color={textColor}
        />
      </Pressable>
    </View>
  );
}
