import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

export default function EditEntryScreen() {
  const { id } = useLocalSearchParams();
  const database = useSQLiteContext();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadEntry = async () => {
      const entryId = Array.isArray(id) ? id[0] : id;

      try {
        const entry = await database.getFirstAsync<{
          title: string;
          description: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, location, date FROM entries WHERE id = ?;',
          entryId
        );

        if (entry) {
          setTitle(entry.title);
          setDescription(entry.description);
          setLocation(entry.location);
          setDate(entry.date);
        }
      } catch (error) {
        console.error('Failed to load entry for editing:', error);
      }
    };

    loadEntry();
  }, [id]);

  const handleSave = async () => {
    const entryId = Array.isArray(id) ? id[0] : id;

    try {
      await database.runAsync(
        'UPDATE entries SET title = ?, description = ?, location = ?, date = ? WHERE id = ?;',
        [title, description, location, date, entryId]
      );
      Alert.alert('Saved', 'Journal entry updated successfully!');
      router.back(); // or router.push(`/entry-details/${entryId}`)
    } catch (error) {
      console.error('Failed to update entry:', error);
      Alert.alert('Error', 'Failed to update entry.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Date</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222',
    flexGrow: 1,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
});
