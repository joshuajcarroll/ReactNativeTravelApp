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


import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';



export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
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

    console.log('Received ID:', id);
    console.log('Type of ID:', typeof id);

    const loadData = async () => {
      try {
        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          id as string // Ensure id is passed as a string
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



import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
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

    console.log('Received ID:', id);
    console.log('Type of ID:', typeof id);

    const loadData = async () => {
      try {
        // Ensure id is a string before querying
        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          [id] // Passing as an array in case the query expects it
        );

        if (result) {
          setEntry(result);
        } else {
          console.warn('No entry found for ID:', id);
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
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
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

    console.log('Received ID:', id);
    console.log('Type of ID:', typeof id);

    const loadData = async () => {
      try {
        // Ensure that id is a string, if it's an array, take the first element
        const idString = Array.isArray(id) ? id[0] : id;

        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          idString // Ensure id is passed as a string
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


import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
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

    console.log('Received ID:', id);
    console.log('Type of ID:', typeof id);

    const loadData = async () => {
      try {
        // Ensure that id is a string, if it's an array, take the first element
        const idString = Array.isArray(id) ? id[0] : id;

        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          idString // Ensure id is passed as a string
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#222',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 15,
    borderRadius: 8,
  },
  noImage: {
    color: '#fff',
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
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
});


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<{
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const idString = Array.isArray(id) ? id[0] : id;

        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          idString
        );

        if (result) {
          setEntry(result);

          // Dynamically calculate image height
          if (result.image) {
            Image.getSize(
              result.image,
              (width, height) => {
                const ratio = screenWidth / width;
                setImageHeight(height * ratio);
              },
              (error) => {
                console.error('Error getting image size:', error);
                setImageHeight(400); // fallback
              }
            );
          }
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
        <Image
          source={{ uri: entry.image }}
          style={[styles.image, { height: imageHeight ?? 400 }]}
        />
      ) : (
        <Text style={styles.noImage}>No image available</Text>
      )}

      <Text style={styles.description}>{entry.description}</Text>

      {/*<View style={styles.meta}>
        <Text style={styles.label}>Location:</Text>
        <Text>{entry.location}</Text>
      </View>*

      <View style={styles.meta}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.date}>{entry.date}</Text>
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#222',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontFamily: 'Caveat_400Regular',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  noImage: {
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Caveat_400Regular',
    fontSize: 20,
    marginBottom: 20,
    lineHeight: 22,
    color: '#fff',
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  date: {
    color: '#fff',
    fontFamily: 'Caveat_400Regular',
    fontSize: 20,
  },
});


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PinchGestureHandler,
  GestureHandlerRootView,
  GestureEvent,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
//import { Image } from 'expo-image';

export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<{
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();

  // Reanimated gesture values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler<GestureEvent<PinchGestureHandlerEventPayload>>({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1, { duration: 200 });
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateX.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });
    },
  });

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const idString = Array.isArray(id) ? id[0] : id;

        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          idString
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{entry.title}</Text>

        {entry.image ? (
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={styles.imageWrapper}>
              <PinchGestureHandler onGestureEvent={pinchHandler}>
                <Animated.Image
                  source={{ uri: entry.image }}
                  style={[styles.image, animatedImageStyle, { width: width - 40 }]}
                  resizeMode="contain"
                />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
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
          <Text style={styles.date}>{entry.date}</Text>
        </View>
      </Animated.ScrollView>
    </GestureHandlerRootView>
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#222',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 400,
    marginBottom: 15,
  },
  image: {
    height: 400,
    borderRadius: 8,
  },
  noImage: {
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  date: {
    color: '#fff',
    fontFamily: 'Caveat_400Regular',
    fontSize: 20,
  },
});



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Button,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PinchGestureHandler,
  GestureHandlerRootView,
  GestureEvent,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export default function EntryDetailsScreen() {
  const database = SQLite.useSQLiteContext();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [entry, setEntry] = useState<{
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  // Reanimated gesture values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler<GestureEvent<PinchGestureHandlerEventPayload>>({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1, { duration: 200 });
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateX.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });
    },
  });

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const idString = Array.isArray(id) ? id[0] : id;

        const result = await database.getFirstAsync<{
          title: string;
          description: string;
          image: string;
          location: string;
          date: string;
        }>(
          'SELECT title, description, imageUri AS image, location, date FROM entries WHERE id = ?;',
          idString
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{entry.title}</Text>

        {entry.image ? (
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={styles.imageWrapper}>
              <PinchGestureHandler onGestureEvent={pinchHandler}>
                <Animated.Image
                  source={{ uri: entry.image }}
                  style={[styles.image, animatedImageStyle, { width: width - 40 }]}
                  resizeMode="contain"
                />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        ) : (
          <Text style={styles.noImage}>No image available</Text>
        )}

        <Text style={styles.description}>{entry.description}</Text>

        <View style={styles.meta}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.location}>{entry.location}</Text>
        </View>

        <View style={styles.meta}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.date}>{entry.date}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Edit Entry" onPress={() => router.push(`/edit-entry/${id}`)} />
        </View>
      </Animated.ScrollView>
    </GestureHandlerRootView>
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#222',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontFamily: 'Caveat_400Regular',
    fontSize: 26,
    marginBottom: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 400,
    marginBottom: 15,
  },
  image: {
    height: 400,
    borderRadius: 8,
  },
  noImage: {
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  date: {
    color: '#fff',
    fontFamily: 'Caveat_400Regular',
    fontSize: 20,
  },
  location: {
    color: '#fff',
    fontFamily: 'Caveat_400Regular',
    fontSize: 20,
  },
  buttonWrapper: {
    marginTop: 30,
  },
});
*/

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type JournalEntry = {
  id: string;
  title: string;
  description?: string;
  imageUri?: string;
  location: string;
  date: string;
};

export default function EntryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const database = useSQLiteContext();
  const router = useRouter();
  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadEntry = async () => {
        try {
          const results = await database.getAllAsync<JournalEntry>(
            'SELECT * FROM entries WHERE id = ?;',
            id
          );

          if (results.length > 0) {
            setEntry(results[0]);
          } else {
            setEntry(null);
          }
        } catch (error) {
          console.error('Failed to load entry:', error);
        }
      };

      loadEntry();
    }, [id, database])
  );

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Entry not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.meta}>{entry.location}</Text>
      <Text style={styles.meta}>{entry.date}</Text>
      {entry.description ? (
        <Text style={styles.description}>{entry.description}</Text>
      ) : (
        <Text style={styles.description}>No description provided.</Text>
      )}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(`/edit-entry/${entry.id}`)}
      >
        <Text style={styles.editText}>Edit Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222',
    flexGrow: 1,
  },
  message: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    fontFamily: 'Caveat_400Regular',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Caveat_400Regular',
    color: '#fff',
    marginBottom: 10,
  },
  meta: {
    fontSize: 18,
    fontFamily: 'Caveat_400Regular',
    color: '#aaa',
    marginBottom: 5,
  },
  description: {
    fontSize: 20,
    fontFamily: 'Caveat_400Regular',
    color: '#ddd',
    marginTop: 20,
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: '#61dafb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  editText: {
    fontSize: 20,
    fontFamily: 'Caveat_400Regular',
    color: '#000',
  },
});

