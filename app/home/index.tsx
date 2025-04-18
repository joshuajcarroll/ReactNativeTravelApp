/*import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
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

  // Dummy data for now
  useEffect(() => {
    
    const loadData = async () => {
      try {
        const result = await database.getAllAsync<JournalEntry>('SELECT * FROM entries;');
        setEntries(result);
      } catch (error) {
        console.error('Failed to load entries:', error);
      }
      
    }
    loadData();
   /* setEntries([
      { id: '1', title: 'Paris Getaway', location: 'Paris, France', date: '2024-06-12' },
      { id: '2', title: 'Hiking Alps', location: 'Zermatt, Switzerland', date: '2024-07-03' },
    ]);
  }, []);

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
            <TouchableOpacity style={styles.entryCard} onPress={() => router.push(`/entry-details/${item.id}`)}>
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

*/

import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await database.getAllAsync<JournalEntry>(
          'SELECT * FROM entries;'
        );
        setEntries(result);
      } catch (error) {
        console.error('Failed to load entries:', error);
      }
    };
    loadData();
  }, []);

  const deleteEntry = async (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await database.runAsync('DELETE FROM entries WHERE id = ?', id);
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
          } catch (err) {
            console.error('Failed to delete entry:', err);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Travel Journal</Text>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>
          No entries yet — start journaling your adventures!
        </Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entryCard}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => router.push(`/entry-details/${item.id}`)}
              >
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryMeta}>{item.location}</Text>
                <Text style={styles.entryMeta}>{item.date}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteEntry(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('./add-entry')}
      >
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
    flexDirection: 'row',
    alignItems: 'center',
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
  deleteButton: {
    backgroundColor: '#aa3333',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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

