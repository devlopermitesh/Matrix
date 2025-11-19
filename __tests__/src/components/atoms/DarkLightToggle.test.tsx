import { fireEvent, render } from '@testing-library/react-native';
import DarkLightToggle from '../../../../src/components/atoms/DarkLightToggle';

describe('Dark Light Toggle Button test', () => {
  it('if IsDark true then render moon', () => {
    const { getByLabelText, queryByLabelText } = render(
      <DarkLightToggle isDark={true} onPress={() => {}} />,
    );
    expect(getByLabelText('moon Icon')).toBeTruthy();
    expect(queryByLabelText('Sun Icon')).toBeTruthy();
  });
  it('shows Sun when isDark is false', () => {
    const { getByLabelText, queryByLabelText } = render(
      <DarkLightToggle isDark={false} onPress={() => {}} />,
    );

    expect(getByLabelText('Sun Icon')).toBeTruthy();
    expect(queryByLabelText('moon Icon')).toBeTruthy();
  });
  it('on Press working', () => {
    const mockfn = jest.fn();
    const { getByRole } = render(
      <DarkLightToggle isDark={true} onPress={mockfn} />,
    );
    fireEvent.press(getByRole('button'));
    expect(mockfn).toHaveBeenCalledTimes(1);
  });
});
