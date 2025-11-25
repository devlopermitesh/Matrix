/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import notifee, { EventType } from '@notifee/react-native';

import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Routes from './navigation/router';
import {
  powerOptimizeCheck,
  requestPersmission,
} from './notification/notificationPermission';
import { setCategories } from './notification/notitificationintial';
import { useEffect } from 'react';
import { navigate } from './navigation/Navigationutils';

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
  useEffect(() => {
  const unsubscribe = notifee.onForegroundEvent(({ type }) => {
    if (type === EventType.ACTION_PRESS) {
      navigate('Home')
    }
  });
  return () => unsubscribe();
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
