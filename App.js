import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
      style={styles.container}
    >
      <Text>Plate Pilot App!</Text>
      <StatusBar style="auto" />
      {/* Your content */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
