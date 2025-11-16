/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Routes from './navigation/router';
import {
  powerOptimizeCheck,
  requestPersmission,
} from './notification/notificationPermission';
import { setCategories } from './notification/notitificationintial';
import { useEffect } from 'react';

function App() {
  const persmissionChecks = async () => {
    await requestPersmission();
    setCategories();
    if (Platform.OS === 'android') {
      powerOptimizeCheck();
    }
  };
  useEffect(() => {
    (async () => {
      await persmissionChecks();
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
