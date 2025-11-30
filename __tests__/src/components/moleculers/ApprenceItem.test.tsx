import React from 'react';
import ApprenceItem from '../../../../src/components/moleculers/ApprenceItem';
import { Text } from 'react-native';
import { render } from '../../../../src/testUtils/test-utils';
describe('ApprenceItem Component', () => {
  it('renders title correctly', () => {
    const { getByText } = render(
      <ApprenceItem title="Notifications">
        <Text>Child</Text>
      </ApprenceItem>,
    );

    expect(getByText('Notifications')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ApprenceItem title="Theme">
        <Text>Child Content</Text>
      </ApprenceItem>,
    );

    expect(getByText('Child Content')).toBeTruthy();
  });

  it('applies custom style when passed', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <ApprenceItem title="Custom Style" style={customStyle}>
        <Text>Child</Text>
      </ApprenceItem>,
    );

    const itemOption = getByTestId('item-option');
    const styleArray = itemOption.props.style;
    expect(styleArray[styleArray.length - 1]).toEqual(
      expect.objectContaining(customStyle),
    );
  });
});
