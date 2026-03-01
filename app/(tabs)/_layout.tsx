import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, Text, View } from "react-native";

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginHorizontal: 8,
            marginBottom: Platform.OS === "ios" ? 0 : 8,
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
            borderRadius: 12,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              backgroundColor: tintColor,
              marginRight: 12,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 13,
                color: colorScheme === "dark" ? "#fff" : "#000",
              }}
            >
              Now Playing
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colorScheme === "dark" ? "#aaa" : "#666",
              }}
            >
              Artist — Song Title
            </Text>
          </View>
        </View>
      </NativeTabs.BottomAccessory>
    </NativeTabs>
  );
}
