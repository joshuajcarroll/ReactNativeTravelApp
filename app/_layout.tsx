import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  return <Stack 
            screenOptions={{
              headerStyle: {
                backgroundColor: '#222',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Caveat_400Regular', // custom font for header title (optional)
              },
            }}/>;
}
