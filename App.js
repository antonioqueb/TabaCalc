import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Screens
import HomeScreen from './app/screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
