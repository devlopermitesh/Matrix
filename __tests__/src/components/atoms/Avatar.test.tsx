import React from 'react';

import Avatar from '../../../../src/components/atoms/Avatar';
import { render } from '../../../../src/testUtils/test-utils';
describe('Avatar Test', () => {
  it('Name first letter should be display', () => {
    const name = 'Rahul';
    const { getByText } = render(<Avatar name={name} />);
    expect(getByText(name.slice(0, 1))).toBeTruthy();
  });
});
