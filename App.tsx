import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import LoggedOutNav from "./navigator/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, TOKEN, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigator/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const token = await AsyncStorage.getItem(TOKEN);
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }
        await persistCache({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
        });
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
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
          <View onLayout={onLayoutRootView} />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
