import React from 'react';
import { render } from '@testing-library/react-native';
import Day from '../../../../src/components/atoms/Day';

jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  const mockFromNow = jest.fn(() => '2 hours ago');
  const mockExtend = jest.fn();

  const mockDayjs = (date?: string) => {
    const instance = actualDayjs(date);
    instance.fromNow = mockFromNow;
    return instance;
  };

  mockDayjs.extend = mockExtend;
  return mockDayjs;
});
describe('Day component', () => {
  it('renders relative time from dayjs', () => {
    const { getByText } = render(<Day date="2025-09-07T10:00:00Z" />);
    expect(getByText('2 hours ago')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByText } = render(
      <Day date="2025-09-07T10:00:00Z" style={{ backgroundColor: 'red' }} />,
    );
    const text = getByText('2 hours ago');
    expect(text.parent?.parent?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'red' }),
      ]),
    );
  });
});
