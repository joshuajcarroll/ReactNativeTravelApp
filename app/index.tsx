import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Caveat_400Regular } from '@expo-google-fonts/caveat';

export default function LandingScreen() {
  const router = useRouter();

 
 const [fontsLoaded] = useFonts({
    Caveat_400Regular,
  });

  if (!fontsLoaded) return null;
  return (
    <ImageBackground
      source={require('../assets/eiffel.jpg')} // Local image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: 'Caveat_400Regular' }]}>
          Welcome to Your Travel Journal
        </Text>
        <Text style={styles.subtitle}>Capture your memories wherever you are.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./home')}>
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: '600',
  },
});
