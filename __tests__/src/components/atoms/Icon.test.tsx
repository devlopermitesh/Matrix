import React from 'react';
import { render } from '@testing-library/react-native';
import Icon from '../../../../src/components/atoms/Icon';

// Mock react-native-vector-icons (otherwise it will try to load native font files)
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcon');
jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesomeIcon');
jest.mock('react-native-vector-icons/Ionicons', () => 'IoniconsIcon');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesignIcon');
jest.mock('react-native-vector-icons/Octicons', () => 'Octicons');

describe('Icon Component', () => {
  it('renders Material icon by default', () => {
    const { getByLabelText } = render(<Icon name="home" />);
    expect(getByLabelText('MaterialIcon')).toBeTruthy();
  });

  it('renders MaterialCommunity icon', () => {
    const { getByLabelText } = render(
      <Icon name="account" iconType="material-community" />,
    );
    expect(getByLabelText('MaterialCommunity')).toBeTruthy();
  });

  it('renders FontAwesome icon', () => {
    const { getByLabelText } = render(
      <Icon name="star" iconType="font-awesome" />,
    );
    expect(getByLabelText('FontAwesomeIcon')).toBeTruthy();
  });

  it('renders Ionicons icon', () => {
    const { getByLabelText } = render(
      <Icon name="ios-home" iconType="ionicons" />,
    );
    expect(getByLabelText('IoniconsIcon')).toBeTruthy();
  });

  it('renders AntDesign icon', () => {
    const { getByLabelText } = render(
      <Icon name="plus" iconType="ant-design" />,
    );
    expect(getByLabelText('AntDesignIcon')).toBeTruthy();
  });

  it('renders Octicons icon', () => {
    const { getByLabelText } = render(
      <Icon name="alert" iconType="Octicons" />,
    );
    expect(getByLabelText('Octicons')).toBeTruthy();
  });

  it('applies custom size and color', () => {
    const { getByLabelText } = render(
      <Icon name="home" size={30} color="red" iconType="material" />,
    );
    const element = getByLabelText('MaterialIcon');
    expect(element.props.size).toBe(30);
    expect(element.props.color).toBe('red');
  });
});
