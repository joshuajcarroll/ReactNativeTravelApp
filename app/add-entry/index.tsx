/*import React, { useState } from 'react';
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


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import uuid from 'react-native-uuid';
import { useSQLiteContext } from 'expo-sqlite';
//import { insertEntry } from '../utils/db'; // Update this path if needed

export default function AddEntryScreen() {
  const database = useSQLiteContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Media library access is needed to select images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

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

      const now = new Date();
      const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${now.getFullYear()}`;


      
      await database.runAsync(
        'INSERT INTO journal (id, title, description, imageUri, location, date, coords) VALUES (?, ?, ?, ?, ?, ?, ?)',[
            uuid.v4().toString(),
            title,
            description,
            imageUri,
            locationName || 'Unknown Location',
            formattedDate,
            JSON.stringify(coords),
        ]);
        
      /*const newEntry = {
        id: uuid.v4().toString(),
        title,
        description,
        imageUri,
        location: locationName || 'Unknown Location',
        date: formattedDate,
        coords: JSON.stringify(coords),
      };

      await insertEntry(
        newEntry.id,
        newEntry.title,
        newEntry.location,
        newEntry.date,
        newEntry.imageUri,
        newEntry.description
      );

      Alert.alert('Entry Saved!', `${title} has been added to your journal.`);
      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create entry.');
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

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Tell your story..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {imageUri ? 'Change Image' : 'Pick an Image'}
        </Text>
      </TouchableOpacity>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      ) : null}

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
    marginTop: 10,
  },
  buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
  imageButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  locationText: {
    color: '#ccc',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: 'Caveat_400Regular',
  },
});



import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import uuid from 'react-native-uuid';
import { useSQLiteContext } from 'expo-sqlite';

export default function AddEntryScreen() {
  const database = useSQLiteContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Media library access is needed to select images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

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

      const now = new Date();
      const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${now.getFullYear()}`;

      // Insert entry into SQLite database
      await database.runAsync(
        'INSERT INTO journal (id, title, description, imageUri, location, date, coords) VALUES (?, ?, ?, ?, ?, ?, ?)', [
          uuid.v4().toString(),
          title,
          description,
          imageUri,
          locationName || 'Unknown Location',
          formattedDate,
          JSON.stringify(coords),
        ]
      );

      Alert.alert('Entry Saved!', `${title} has been added to your journal.`);
      router.back(); // Navigate back to the previous screen

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create entry.');
    } finally {
      setLoading(false); // Ensure that loading state is reset even after success or error
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

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Tell your story..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {imageUri ? 'Change Image' : 'Pick an Image'}
        </Text>
      </TouchableOpacity>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      ) : null}

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
    marginTop: 10,
  },
  buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
  imageButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  locationText: {
    color: '#ccc',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: 'Caveat_400Regular',
  },
});
*/

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import uuid from 'react-native-uuid';
import { useSQLiteContext } from 'expo-sqlite';

export default function AddEntryScreen() {
  const database = useSQLiteContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Media library access is needed to select images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

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
      console.log('Geo:', geo);
      if (geo?.[0]) {
        const { city, country } = geo[0];
        const resolvedLocation =`${city}, ${country}`;
        setLocationName(resolvedLocation);
      } else {
        setLocationName('Unknown Location');
      }

      const now = new Date();
      const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${now.getFullYear()}`;

      // Insert entry into SQLite database
      await database.runAsync(
        'INSERT INTO entries (id, title, description, imageUri, location, date, coords) VALUES (?, ?, ?, ?, ?, ?, ?)', [
          uuid.v4().toString(),
          title,
          description,
          imageUri,
          locationName || 'Unknown Location',
          formattedDate,
          JSON.stringify(coords),
        ]
      );

      // Log entry added to the console
      console.log('Entry added to the database:', {
        id: uuid.v4().toString(),
        title,
        description,
        imageUri,
        resolvedLocation: locationName || 'Unknown Location',
        date: formattedDate,
        coords: JSON.stringify(coords),
      });

      Alert.alert('Entry Saved!', `${title} has been added to your journal.`);
      router.back(); // Navigate back to the previous screen

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create entry.');
    } finally {
      setLoading(false); // Ensure that loading state is reset even after success or error
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

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Tell your story..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {imageUri ? 'Change Image' : 'Pick an Image'}
        </Text>
      </TouchableOpacity>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      ) : null}

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
    marginTop: 10,
  },
  buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
  imageButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  locationText: {
    color: '#ccc',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: 'Caveat_400Regular',
  },
});

