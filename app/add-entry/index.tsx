import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import uuid from 'react-native-uuid';

export default function AddEntryScreen() {
  const [title, setTitle] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAddEntry = async () => {
    setLoading(true);
    let coords = null;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need location permission to tag your entry.');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      const geo = await Location.reverseGeocodeAsync(coords);
      if (geo?.[0]) {
        const { city, country } = geo[0];
        setLocationName(`${city}, ${country}`);
      } else {
        setLocationName('Unknown Location');
      }

      const newEntry = {
        id: uuid.v4().toString(),

        title,
        location: locationName || 'Unknown Location',
        date: new Date().toISOString().split('T')[0],
        coords,
      };

      // Save newEntry to SQLite here
      console.log('New Entry:', newEntry);
      Alert.alert('Entry Saved!', `${title} has been added to your journal.`);
      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Where were you?"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddEntry} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Save Entry</Text>}
      </TouchableOpacity>

      {locationName ? <Text style={styles.locationText}>📍 {locationName}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 20 },
  label: { fontSize: 20, marginBottom: 10, color: '#fff', fontFamily: 'Caveat_400Regular' },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#61dafb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
  locationText: {
    color: '#ccc',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: 'Caveat_400Regular',
  },
});
