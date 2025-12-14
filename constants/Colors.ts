/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * These colors are imported from Tailwind's default color palette.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Import Tailwind's colors
import colors from "tailwindcss/colors";

export const Colors = {
  light: {
    text: colors.slate[900], // Dark slate for text
    background: colors.white, // White background
    tint: colors.sky[600], // Sky blue for tint
    icon: colors.slate[500], // Medium slate for icons
    tabIconDefault: colors.slate[500],
    tabIconSelected: colors.sky[600],
  },
  dark: {
    text: colors.slate[100], // Light slate for text
    background: colors.slate[900], // Very dark slate for background
    tint: colors.white, // White for tint
    icon: colors.slate[400], // Light-medium slate for icons
    tabIconDefault: colors.slate[400],
    tabIconSelected: colors.white,
  },
};
