import notifee from '@notifee/react-native';
export const addbadge = () => {
  notifee.incrementBadgeCount(1).then(() => console.log('notification count'));
};


export const createNotificationChannel = async () => {
  const channelId = await notifee.createChannel({
    id: 'reminders',
    name: 'Task Reminders',
    importance: 4, // HIGH,
    sound:"notification_sound"
  });
  return channelId;
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
