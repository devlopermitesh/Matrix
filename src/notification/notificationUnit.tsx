import notifee, {
  AndroidAction,
  AndroidStyle,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import logo from '../asset/Images/logo.png';
export const createTimestampNotification = async (
  imageUrl: string,
  title: string,
  body: string,
  triggerDate: Date,
  notificationId: string,
) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 60 * 3000,
    repeatFrequency: RepeatFrequency.NONE,
    alarmManager: true,
  };
  const action: AndroidAction = {
    title: 'View Details',
    pressAction: {
      id: 'view details',
      launchActivity: 'default',
    },
  };
  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title,
      body,
      android: {
        channelId: 'default',
        sound: 'notification',
        onlyAlertOnce: true,
        smallIcon: 'icon',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: imageUrl || logo,
        },
        actions: [action],
      },
    },
    trigger,
  );

  const checklog = async () => await notifee.getTriggerNotifications();
  console.log('🔍 Scheduled Triggers:', await checklog());
};
