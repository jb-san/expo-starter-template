import { useThemePreference } from "@/providers/ThemePreferenceProvider";

export function useColorScheme(): "light" | "dark" {
  return useThemePreference().colorScheme;
}
