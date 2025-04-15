import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type JournalEntry = {
  id: string;
  title: string;
  description?: string;
  imageUri?: string;
  location: string;
  date: string;
};

export default function HomeScreen() {
  const database = useSQLiteContext();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const router = useRouter();

  const loadData = async () => {
    const result = await database.getAllAsync<JournalEntry>("SELECT * FROM journal");
    setEntries(result);
  }
  // Dummy data for now
  useEffect(
    useCallback (() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Travel Journal</Text>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>No entries yet — start journaling your adventures!</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.entryCard}>
              <Text style={styles.entryTitle}>{item.title}</Text>
              <Text style={styles.entryMeta}>{item.location}</Text>
              <Text style={styles.entryMeta}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('./add-entry')}>
        <Text style={styles.addButtonText}>+ Add Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#222' },
  title: {
    fontSize: 36,
    fontFamily: 'Caveat_400Regular',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Caveat_400Regular',
    color: '#aaa',
    marginTop: 50,
    textAlign: 'center',
  },
  entryCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  entryTitle: {
    fontSize: 22,
    fontFamily: 'Caveat_400Regular',
    marginBottom: 6,
  },
  entryMeta: {
    fontSize: 16,
    fontFamily: 'Caveat_400Regular',
    color: '#555',
  },
  addButton: {
    backgroundColor: '#61dafb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  addButtonText: {
    fontSize: 20,
    fontFamily: 'Caveat_400Regular',
    color: '#000',
  },
});
