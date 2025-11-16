import { NavigationContainer } from '@react-navigation/native';
import AuthStack, { AuthStackParamList } from './AuthStack';
import AppStack, { AppStackParamList } from './AppStack';
import { navigationRef } from './Navigationutils';

export type StackScreen = AuthStackParamList & AppStackParamList;

const Routes = (): React.JSX.Element => {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* eslint-disable-next-line no-constant-condition */}
      {false ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default Routes;
