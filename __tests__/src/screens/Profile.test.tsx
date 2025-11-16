// __tests__/Profile.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Profile from '../../../src/screens/Profile';

// Mock useAccount hook
jest.mock('../../../src/state/userState', () => ({
  __esModule: true,
  default: () => ({
    user: {
      name: 'Test User',
      email: 'test@example.com',
    },
  }),
}));

// Mock goBack function
jest.mock('../../../src/navigation/Navigationutils', () => ({
  goBack: jest.fn(),
}));

// Mocks

jest.mock('../../../src/components/atoms/Icon', () => (props: any) => {
  const { Text } = require('react-native');
  return <Text accessibilityLabel={`icon-${props.name}`}>{props.name}</Text>;
});

describe('Profile Screen', () => {
  it('renders correctly with header and content', () => {
    const { getByText, getByLabelText, getByTestId } = render(<Profile />);

    // Header title
    expect(getByText('Settings')).toBeTruthy();

    // Back button
    const backButton = getByTestId('backButton');
    expect(backButton).toBeTruthy();

    // Check that Icon with name 'angle-left' is rendered
    expect(getByLabelText('icon-angle-left')).toBeTruthy();
  });

  it('calls goBack when back button is pressed', () => {
    const { getByTestId } = render(<Profile />);
    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    const { goBack } = require('../../../src/navigation/Navigationutils');
    expect(goBack).toHaveBeenCalled();
  });
});
