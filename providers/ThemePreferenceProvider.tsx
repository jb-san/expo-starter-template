import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";

export type ThemePreference = "system" | "light" | "dark";

type ThemePreferenceContextValue = {
  colorScheme: "light" | "dark";
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const STORAGE_KEY = "theme-preference";

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(
  null
);
const isTestEnv = process.env.NODE_ENV === "test";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

export function ThemePreferenceProvider({
  children,
}: PropsWithChildren) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [hasHydrated, setHasHydrated] = useState(Platform.OS !== "web");
  const [hasLoadedPreference, setHasLoadedPreference] = useState(isTestEnv);
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (isTestEnv) {
      return;
    }

    let isMounted = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (!isMounted || !isThemePreference(value)) {
          return;
        }

        setPreference(value);
      })
      .finally(() => {
        if (isMounted) {
          setHasLoadedPreference(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isTestEnv) {
      return;
    }

    setColorScheme(preference);
  }, [preference, setColorScheme]);

  useEffect(() => {
    if (isTestEnv || !hasLoadedPreference) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, preference).catch(() => {
      // Ignore storage failures and keep the in-memory preference active.
    });
  }, [hasLoadedPreference, preference]);

  const resolvedColorScheme: "light" | "dark" =
    hasHydrated && colorScheme === "dark" ? "dark" : "light";

  const value = useMemo(
    () => ({
      colorScheme: resolvedColorScheme,
      preference,
      setPreference,
    }),
    [preference, resolvedColorScheme]
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);

  if (!context) {
    throw new Error(
      "useThemePreference must be used within a ThemePreferenceProvider"
    );
  }

  return context;
}
