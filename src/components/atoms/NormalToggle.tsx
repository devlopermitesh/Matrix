import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

type SmoothToggleProps = {
  isOn: boolean;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
};

const SIZE_PRESETS = {
  small: { trackWidth: 40, trackHeight: 20, circle: 16, padding: 2 },
  medium: { trackWidth: 60, trackHeight: 34, circle: 30, padding: 2 },
  large: { trackWidth: 80, trackHeight: 44, circle: 40, padding: 4 },
};

const SmoothToggle: React.FC<SmoothToggleProps> = ({ isOn, onPress, size = 'medium' }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const { trackWidth, trackHeight, circle, padding } = SIZE_PRESETS[size];

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [padding, trackWidth - circle - padding],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e5e7eb', '#34d399'],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animated.View
        style={{
          width: trackWidth,
          height: trackHeight,
          borderRadius: trackHeight / 2,
          padding: padding,
          justifyContent: 'center',
          backgroundColor,
        }}
      >
        <Animated.View
          style={{
            width: circle,
            height: circle,
            borderRadius: circle / 2,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            elevation: 2,
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SmoothToggle;
