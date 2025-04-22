/*import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Caveat_400Regular } from "@expo-google-fonts/caveat";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

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

  const createJournalDatabase = async (db: SQLiteDatabase) => {
    console.log("Creating journal database");
    // Create the journal table if it doesn't exist
    await db.execAsync( 
      "CREATE TABLE IF NOT EXISTS entries (id TEXT PRIMARY KEY,title TEXT,description TEXT,imageUri TEXT, location TEXT,date TEXT,coords TEXT);"
    );
  };

  return (
  <SQLiteProvider databaseName="travel-journal.db" onInit={createJournalDatabase} >
    <Stack 
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
      <Stack.Screen name="add-entry/index" options={{ headerTitle: 'Add An Entry' }} />
    </Stack>
  </SQLiteProvider>
  )
}
*/

import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Caveat_400Regular': require('../assets/fonts/Caveat-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or show a splash screen
  }

  const createJournalDatabase = async (db: SQLiteDatabase) => {
    console.log("Creating journal database");
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS entries (id TEXT PRIMARY KEY,title TEXT,description TEXT,imageUri TEXT, location TEXT,date TEXT,coords TEXT);"
    );
  };

  return (
    <SQLiteProvider databaseName="travel-journal.db" onInit={createJournalDatabase}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#222' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Caveat_400Regular' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Travel Journal' }} />
        <Stack.Screen name="home/index" options={{ headerTitle: 'My Entries' }} />
        <Stack.Screen name="add-entry/index" options={{ headerTitle: 'Add An Entry' }} />
        <Stack.Screen name="entry-details/[id]" options={{ headerTitle: 'Entry Details' }} />
        <Stack.Screen name="edit-entry/[id]" options={{ headerTitle: 'Edit Entry' }} />
      </Stack>
    </SQLiteProvider>
  );
}
