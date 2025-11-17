import React from 'react';
import { render } from '@testing-library/react-native';
import Icontitle from '../../../../src/components/atoms/Icontitle';
import { IconThemeType } from '../../../../src/data/constant';

describe('Icontitle Component', () => {
  it('renders with bell icon', () => {
    const { getByText, getByRole } = render(
      <Icontitle name="Notifications" Icontype="bell" />,
    );
    expect(getByText('Notifications')).toBeTruthy();
    expect(getByRole('image')).toBeTruthy();
  });

  it('renders with info icon', () => {
    const { getByText } = render(
      <Icontitle name="Information" Icontype="info" />,
    );
    expect(getByText('Information')).toBeTruthy();
  });

  it('renders with theme icon', () => {
    const { getByText } = render(<Icontitle name="Theme" Icontype="theme" />);
    expect(getByText('Theme')).toBeTruthy();
  });

  it('falls back to theme icon for unknown Icontype', () => {
    const { getByText } = render(
      <Icontitle name="DefaultTest" Icontype={'unknown' as IconThemeType} />,
    );
    expect(getByText('DefaultTest')).toBeTruthy();
  });
});
