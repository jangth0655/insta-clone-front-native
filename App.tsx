import { Fragment, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import LoggedOutNav from "./navigator/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { View, Appearance } from "react-native";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
        const imageToLoad = [require("./assets/favicon.png")];
        const imagePromises = imageToLoad.map((image) =>
          Asset.loadAsync(image)
        );
        return Promise.all([...imagePromises, ...fontPromises]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <LoggedOutNav />
        <View onLayout={onLayoutRootView} />
      </NavigationContainer>
    </ThemeProvider>
  );
}
