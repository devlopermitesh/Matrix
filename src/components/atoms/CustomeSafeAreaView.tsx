import { StatusBar, ViewStyle } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomeSafeAreaView = ({ children,style }: {  style?: ViewStyle, children: React.ReactNode }) => {
  return (
    <SafeAreaView style={[{height:"100%"},style]}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default CustomeSafeAreaView;
