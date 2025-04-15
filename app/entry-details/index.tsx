/*import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';

const database = SQLite.useSQLiteContext();

export default function EntryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<{title: string; description: string; image: string; location: string; date: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadData();
    setLoading(false);
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#666" />;
  }

  const loadData = async () => {
    const result = await database.getFirstAsync<{title: string; description: string; image: string; location: string; date: string}>(
      'SELECT title, description, imageUri AS image, location, date FROM journal WHERE id = ?;',
        [parseInt (id as string)]);
    if (result) {
        setEntry(result);
        }
  }

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Entry not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>

      {entry.image ? (
        <Image source={{ uri: entry.image }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>No image available</Text>
      )}

      <Text style={styles.description}>{entry.description}</Text>

      <View style={styles.meta}>
        <Text style={styles.label}>Location:</Text>
        <Text>{entry.location}</Text>
      </View>

      <View style={styles.meta}>
        <Text style={styles.label}>Date:</Text>
        <Text>{entry.date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  noImage: {
    color: '#aaa',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});
*/

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';

const database = SQLite.useSQLiteContext();

export default function EntryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<{
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM journal WHERE id = ?;',
          [parseInt(id as string)]
        );

        if (result) {
          setEntry(result);
        }
      } catch (error) {
        console.error('Failed to load entry:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#666" />;
  }

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Entry not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>

      {entry.image ? (
        <Image source={{ uri: entry.image }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>No image available</Text>
      )}

      <Text style={styles.description}>{entry.description}</Text>

      <View style={styles.meta}>
        <Text style={styles.label}>Location:</Text>
        <Text>{entry.location}</Text>
      </View>

      <View style={styles.meta}>
        <Text style={styles.label}>Date:</Text>
        <Text>{entry.date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  noImage: {
    color: '#aaa',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

