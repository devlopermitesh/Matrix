import { NavigationContainer } from '@react-navigation/native';
import AuthStack, { AuthStackParamList } from './AuthStack';
import AppStack, { AppStackParamList } from './AppStack';
import { navigationRef } from './Navigationutils';
import useAccount from '../state/userState';

export type StackScreen = AuthStackParamList & AppStackParamList;

const Routes = (): React.JSX.Element => {
  const {firstVisit}=useAccount()
  return (
    <NavigationContainer ref={navigationRef}>
      {/* eslint-disable-next-line no-constant-condition */}
      {firstVisit ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default Routes;
