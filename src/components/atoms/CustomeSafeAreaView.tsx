import { StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomeSafeAreaView = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default CustomeSafeAreaView;
