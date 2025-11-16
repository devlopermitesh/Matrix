import { CommonActions } from '@react-navigation/native';
import {
  goBack,
  navigate,
  resetAndnavigate,
} from '../../../src/navigation/Navigationutils';
import { AppStackParamList } from '../../../src/navigation/AppStack';

jest.mock('@react-navigation/native', () => {
  const ActualNav = jest.requireActual('@react-navigation/native');
  return {
    ...ActualNav,
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn().mockReturnValue(true),
      dispatch: jest.fn(),
    })),
    CommonActions: {
      navigate: jest.fn(),
      reset: jest.fn(),
      goBack: jest.fn(),
    },
    StackActions: {
      push: jest.fn(),
    },
  };
});

describe('Navigate function', () => {
  it('should navigate to a route', async () => {
    const routeName = 'TestRoute' as keyof AppStackParamList;
    const Params = { key: 'wal' };
    await navigate(routeName, Params);
    expect(CommonActions.navigate).toHaveBeenCalledWith({
      name: 'TestRoute',
      params: { key: 'wal' },
    });
  });
  it('should navigate to go back to previous route', async () => {
    await goBack();
    expect(CommonActions.goBack).toHaveBeenCalled();
  });

  it('should  reset And navigate', async () => {
    const routeName = 'TestRoute' as keyof AppStackParamList;
    await resetAndnavigate(routeName);
    expect(CommonActions.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: routeName }],
    });
  });
});
