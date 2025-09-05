/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Routes from './navigation/router';

function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Routes/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
