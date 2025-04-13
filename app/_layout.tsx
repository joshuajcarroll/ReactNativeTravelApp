import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Caveat_400Regular } from "@expo-google-fonts/caveat";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function RootLayout() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Caveat-Regular': require('../assets/fonts/Caveat-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a fallback loader component if you like
  }
  return <Stack 
            screenOptions={{
              headerStyle: {
                backgroundColor: '#222',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Caveat_400Regular', 
              },
            }}>;
            <Stack.Screen name="index" options={{ title: 'Travel Journal' }} />
            <Stack.Screen name="home/index" options={{ headerTitle: 'My Entries' }} />
          </Stack>
}
