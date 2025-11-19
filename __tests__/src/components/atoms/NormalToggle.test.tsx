/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SmoothToggle from '../../../../src/components/atoms/NormalToggle';
import { Animated } from 'react-native';

// Suppress act() warnings for animations
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('An update to Animated') &&
      args[0].includes('was not wrapped in act')
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('SmoothToggle Component', () => {
  // Mock the Animated API methods directly
  beforeEach(() => {
    class MockAnimatedValue {
      private _value: number;
      private _listeners: Set<(data: { value: number }) => void> = new Set();

      constructor(initialValue: number) {
        this._value = initialValue;
      }

      setValue = (value: number) => {
        this._value = value;
        this._listeners.forEach(listener => {
          listener({ value });
        });
      };

      getValue = () => {
        return this._value;
      };

      addListener = (callback: (data: { value: number }) => void) => {
        this._listeners.add(callback);
        return {
          remove: () => this._listeners.delete(callback),
        };
      };

      removeAllListeners = () => {
        this._listeners.clear();
      };

      interpolate = (config: any) => {
        const { inputRange, outputRange } = config;
        if (
          inputRange &&
          outputRange &&
          inputRange.length === outputRange.length
        ) {
          for (let i = 0; i < inputRange.length; i++) {
            if (this._value <= inputRange[i]) {
              return outputRange[i];
            }
          }
          return outputRange[outputRange.length - 1];
        }
        return this._value;
      };

      resetAnimation = jest.fn();

      __getValue = () => {
        return this._value;
      };
    }

    // Mock Animated.Value
    jest.spyOn(Animated, 'Value').mockImplementation((initialValue: number) => {
      return new MockAnimatedValue(initialValue) as any;
    });

    // Mock Animated.timing
    jest.spyOn(Animated, 'timing').mockImplementation(
      (value: any, config: any) =>
        ({
          start: (callback?: (result: { finished: boolean }) => void) => {
            value.setValue(config.toValue);
            if (callback) {
              callback({ finished: true });
            }
          },
        } as any),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByRole } = render(
      <SmoothToggle isOn={false} onPress={mockPress} />,
    );

    fireEvent.press(getByRole('button'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('renders with isOn=false (off state)', () => {
    const { getByTestId } = render(
      <SmoothToggle isOn={false} onPress={() => {}} />,
    );
    expect(getByTestId('track').props.style.backgroundColor).toBe('#e5e7eb');
  });

  it('renders with isOn=true (on state)', () => {
    const { getByTestId } = render(
      <SmoothToggle isOn={true} onPress={() => {}} />,
    );
    expect(getByTestId('track').props.style.backgroundColor).toBe('#e5e7eb');
  });

  it('applies small size preset correctly', () => {
    const { getByTestId } = render(
      <SmoothToggle isOn={false} onPress={() => {}} size="small" />,
    );
    const track = getByTestId('track');
    expect(track.props.style.width).toBe(40);
    expect(track.props.style.height).toBe(20);
  });

  it('applies large size preset correctly', () => {
    const { getByTestId } = render(
      <SmoothToggle isOn={false} onPress={() => {}} size="large" />,
    );
    const track = getByTestId('track');
    expect(track.props.style.width).toBe(80);
    expect(track.props.style.height).toBe(44);
  });
});
