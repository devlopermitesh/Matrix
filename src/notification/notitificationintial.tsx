import notifee, { AndroidStyle } from '@notifee/react-native';
import logo from '../asset/Images/logo.png';
export const addbadge = () => {
  notifee.incrementBadgeCount(1).then(() => console.log('notification count'));
};

export const displayNotification = async (
  title: string,
  message: string,
  image: string,
  categoryId: string,
) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default channel',
  });
  await notifee.displayNotification({
    title: title,
    body: message,
    android: {
      channelId: channelId,
      sound: 'notification',
      onlyAlertOnce: true,
      smallIcon: 'icon',
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: image || logo,
      },
      actions: [
        {
          title: 'okay',
          pressAction: {
            id: categoryId,
            launchActivity: 'default',
          },
        },
      ],
    },
  });
};

export const setCategories = async () => {
  await notifee.setNotificationCategories([
    {
      id: 'reminder-task',
      actions: [
        {
          id: 'reminder-task',
          title: 'okay',
          foreground: true,
        },
      ],
    },
  ]);
};
