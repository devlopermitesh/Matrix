import { ThemeColors } from "../constant/theme";
import { useTheme } from "./ThemeContext";
import { StyleSheet } from "react-native";

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  styleCreator: (colors: ThemeColors) => T
) {
  const { colors } = useTheme();
  return styleCreator(colors);
}
