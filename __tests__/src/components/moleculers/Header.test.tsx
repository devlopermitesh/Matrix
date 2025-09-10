import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../../../src/components/organism/Header';
import { navigate } from '../../../../src/navigation/Navigationutils';

// Mock the navigation utility
jest.mock('../../../../src/navigation/Navigationutils', () => ({
  navigate: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<Header />);
    
    // Check if the title text is rendered
    expect(getByText('FocusMatrix')).toBeTruthy();
  });

  it('navigates to Profile when settings icon is pressed', () => {
    const { getByTestId } = render(<Header />);
    

    
    const settingsButton = getByTestId('settings-button');
    fireEvent.press(settingsButton);
    
    expect(navigate).toHaveBeenCalledWith('Profile');
  });

  it('displays the correct images', () => {
    const { getByTestId } = render(<Header />);

    
    expect(getByTestId('tick-icon')).toBeTruthy();
    expect(getByTestId('settings-icon')).toBeTruthy();
  });
});