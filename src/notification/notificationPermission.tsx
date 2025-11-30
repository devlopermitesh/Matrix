import notifee from '@notifee/react-native';
import { Alert } from 'react-native';
import { mmkvStorage } from '../state/storage';

export const requestPersmission = async () => {
  await notifee.requestPermission();
  await notifee.setBadgeCount(0);
};

export const powerOptimizeCheck = async () => {
  //get wather is already done
  const persmissionGiven = mmkvStorage.getItem('powerOptimizeCheck');
  if (persmissionGiven) return;
  // 1. get info on the device and the Power Manager settings
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    // 2. ask your users to adjust their settings
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => {
            await notifee.openPowerManagerSettings();
            mmkvStorage.setItem('powerOptimizeCheck', 'true');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
};
