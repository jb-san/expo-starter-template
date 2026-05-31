import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  type ThemePreference,
  useThemePreference,
} from "@/providers/ThemePreferenceProvider";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ThemeIcon = "circle.lefthalf.filled" | "sun.max.fill" | "moon.fill";

type ThemeOption = {
  description: string;
  icon: ThemeIcon;
  label: string;
  value: ThemePreference;
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "system",
    label: "System",
    description: "Follow the device setting automatically.",
    icon: "circle.lefthalf.filled",
  },
  {
    value: "light",
    label: "Light",
    description: "Always use the light appearance.",
    icon: "sun.max.fill",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use the dark appearance.",
    icon: "moon.fill",
  },
];

const ACCENT = "#ea580c"; // orange-600 — matches Colors.light.tint
const MUTED_LIGHT = "#475569"; // slate-600
const MUTED_DARK = "#cbd5e1"; // slate-300
const ICON_TEXT_LIGHT = "#0f172a"; // slate-900
const ICON_TEXT_DARK = "#f1f5f9"; // slate-100

export default function ProfileScreen() {
  const { colorScheme, preference, setPreference } = useThemePreference();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? ICON_TEXT_DARK : ICON_TEXT_LIGHT;
  const mutedColor = isDark ? MUTED_DARK : MUTED_LIGHT;

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          contentContainerClassName="px-5 pt-3 pb-10"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center pt-6 pb-8">
            <View
              className="w-[88px] h-[88px] rounded-full items-center justify-center mb-4 shadow-md"
              style={{ backgroundColor: ACCENT }}
            >
              <Text className="text-white text-3xl font-bold">JB</Text>
            </View>
            <Text className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Jonathan Borg
            </Text>
            <Text className="mt-1 text-[15px] text-slate-600 dark:text-slate-300">
              jonathan@x3m.io
            </Text>
          </View>

          <SectionLabel>Appearance</SectionLabel>
          <Card>
            {THEME_OPTIONS.map((option, index) => {
              const isSelected = preference === option.value;
              const isLast = index === THEME_OPTIONS.length - 1;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={option.label}
                  accessibilityHint={option.description}
                  onPress={() => setPreference(option.value)}
                  className={`flex-row items-center gap-3.5 px-3.5 py-3.5 active:opacity-80 ${
                    isSelected ? "bg-white/70 dark:bg-white/10" : ""
                  }`}
                >
                  <View className="w-9 h-9 rounded-xl items-center justify-center bg-slate-900/5 dark:bg-white/10">
                    <IconSymbol
                      name={option.icon}
                      size={18}
                      color={isSelected ? ACCENT : iconColor}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {option.label}
                    </Text>
                    <Text className="text-[13px] mt-0.5 text-slate-600 dark:text-slate-300">
                      {option.description}
                    </Text>
                  </View>

                  <View
                    className="w-[22px] h-[22px] rounded-full border-2 items-center justify-center"
                    style={{
                      borderColor: isSelected
                        ? ACCENT
                        : isDark
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(15,23,42,0.2)",
                    }}
                  >
                    {isSelected ? (
                      <View
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                    ) : null}
                  </View>

                  {!isLast ? (
                    <View className="absolute left-[62px] right-3.5 bottom-0 h-px bg-slate-900/5 dark:bg-white/10" />
                  ) : null}
                </Pressable>
              );
            })}
          </Card>

          <SectionLabel className="mt-6">Account</SectionLabel>
          <Card>
            <SettingsRow
              icon="person.crop.circle"
              label="Edit profile"
              iconColor={iconColor}
              mutedColor={mutedColor}
            />
            <SettingsRow
              icon="bell.fill"
              label="Notifications"
              iconColor={iconColor}
              mutedColor={mutedColor}
            />
            <SettingsRow
              icon="lock.fill"
              label="Privacy & security"
              iconColor={iconColor}
              mutedColor={mutedColor}
              isLast
            />
          </Card>

          <SectionLabel className="mt-6">Support</SectionLabel>
          <Card>
            <SettingsRow
              icon="questionmark.circle.fill"
              label="Help center"
              iconColor={iconColor}
              mutedColor={mutedColor}
            />
            <SettingsRow
              icon="envelope.fill"
              label="Send feedback"
              iconColor={iconColor}
              mutedColor={mutedColor}
              isLast
            />
          </Card>

          <Text className="text-center mt-7 text-xs text-slate-500 dark:text-slate-400">
            Expo SDK 56 · v1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <Text
      className={`text-xs font-semibold tracking-wider ml-1 mb-2 text-slate-500 dark:text-slate-400 ${className}`}
    >
      {children.toUpperCase()}
    </Text>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="rounded-2xl overflow-hidden bg-slate-900/[0.04] dark:bg-white/[0.06]">
      {children}
    </View>
  );
}

type SettingsRowProps = {
  icon: Parameters<typeof IconSymbol>[0]["name"];
  label: string;
  iconColor: string;
  mutedColor: string;
  isLast?: boolean;
  onPress?: () => void;
};

function SettingsRow({
  icon,
  label,
  iconColor,
  mutedColor,
  isLast,
  onPress,
}: SettingsRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="flex-row items-center gap-3.5 px-3.5 py-3.5 active:opacity-80"
    >
      <View className="w-9 h-9 rounded-xl items-center justify-center bg-slate-900/5 dark:bg-white/10">
        <IconSymbol name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </Text>
      </View>
      <IconSymbol name="chevron.right" size={16} color={mutedColor} />
      {!isLast ? (
        <View className="absolute left-[62px] right-3.5 bottom-0 h-px bg-slate-900/5 dark:bg-white/10" />
      ) : null}
    </Pressable>
  );
}
