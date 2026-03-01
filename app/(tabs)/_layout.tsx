import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? "light"].icon;
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf="house.fill"
          drawable="custom_android_drawable"
          selectedColor={tintColor}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Icon
          sf="gear"
          drawable="custom_settings_drawable"
          selectedColor={tintColor}
        />
        <Label>Explore</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
