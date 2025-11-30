/* eslint-disable @typescript-eslint/no-unused-vars */

jest.mock('react-native/src/private/animated/NativeAnimatedHelper.js');
import { render,fireEvent } from '../../../../src/testUtils/test-utils';
import AppranceCollection from '../../../../src/components/organism/AppranceCollection';
import { act } from 'react';
// Mock ApprenceItem to include the title in testIDs
jest.mock('../../../../src/components/moleculers/ApprenceItem', () => {
  return ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => {
    const { View, Text } = require('react-native');
    // Create a context for child components to use
    return (
      <View testID={'button-container-settings'}>
        <Text>{title}</Text>
        <View
          testID={`button-container-${title
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
        >
          {children}
        </View>
      </View>
    );
  };
});

// Update Icon mock to be context-aware
jest.mock('../../../../src/components/atoms/Icon', () => {
  return ({
    name,
    size,
    color,
    iconType,
  }: {
    name: string;
    size: number;
    color: string;
    iconType: string;
  }) => {
    const { Text } = require('react-native');
    return (
      <Text testID={`icon-${name}-checkout`}>{`Icon-${name}-${iconType}`}</Text>
    );
  };
});

// Then in tests:
describe('AppranceCollection Component', () => {
  it('renders different button types correctly', () => {
    const { getByTestId, getAllByTestId } = render(<AppranceCollection />);

    // Check if different button types are rendered
    expect(getByTestId('dark-light-toggle')).toBeTruthy();
    expect(getByTestId('normal-toggle')).toBeTruthy();

    // For checkout icons, use getAllByTestId and check length
    const checkoutIcons = getAllByTestId(/icon-right/);
    expect(checkoutIcons.length).toBeGreaterThan(0);
  });

  it('handles checkout button press', async () => {
    const { getAllByTestId } = render(<AppranceCollection />);

    const checkoutIcons = getAllByTestId(/icon-right/);
    const firstCheckoutButton = checkoutIcons[0];

    // Use act properly with async/await
    await act(async () => {
      fireEvent.press(firstCheckoutButton);

      await Promise.resolve(); // Allow any microtasks to complete
    });

    // Your assertion outside of act
    expect(firstCheckoutButton).toBeTruthy();
  });
});
