// MUI
import { extendTheme } from '@chakra-ui/react';

export const ThemeStore = () => {
  const lightTheme = extendTheme({
    palette: {
      primary: "blue",
      type: 'light',
    },
  });

  const darkTheme = extendTheme({
    palette: {
      primary: "purple",
      type: 'dark',
    },
  });

  return {
    theme: lightTheme,
    isDarkMode: false,

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.theme = this.isDarkMode ? darkTheme : lightTheme;
      console.log('Theme DarkMode:', this.theme.palette.type);
    },
  };
};

export type ThemeStoreT = ReturnType<typeof ThemeStore>;
