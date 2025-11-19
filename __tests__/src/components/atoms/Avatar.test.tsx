import React from 'react';

import { render } from '@testing-library/react-native';
import Avatar from '../../../../src/components/atoms/Avatar';

describe('Avatar Test', () => {
  it('Name first letter should be display', () => {
    const name = 'Rahul';
    const { getByText } = render(<Avatar name={name} />);
    expect(getByText(name.slice(0, 1))).toBeTruthy();
  });
});
