import notifee, {
  AndroidAction,
  AndroidStyle,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import logo from '../asset/Images/logo.png';

import { createNotificationChannel } from './notitificationintial';

let cachedChannelId: string | null = null;

export const getNotificationChannel = async () => {
  if (!cachedChannelId) {
    cachedChannelId = await createNotificationChannel();
  }
  return cachedChannelId;
};


export const createTimestampNotification = async (
  imageUrl: string,
  title: string,
  body: string,
  triggerDate: Date,
  notificationId: string,
) => {
  try {
       // Check if the trigger date is in the past
    const now = Date.now();
    const triggerTime = triggerDate.getTime();
    
    if (triggerTime <= now) {
      console.log('⏰ Notification time is in the past, skipping silently:', {
        notificationId,
        triggerDate: triggerDate.toISOString(),
        currentTime: new Date(now).toISOString(),
      });
      return; // Silently return without creating notification
    }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerDate.getTime(),
    repeatFrequency: RepeatFrequency.NONE,
    alarmManager: true,
  };
  const action: AndroidAction = {
    title: 'View Details',
    pressAction: {
      id: 'view_details',
      launchActivity: 'default',
    },
  };
  const channelId = await getNotificationChannel();


  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title,
      body,
      android: {
        channelId: channelId,
        sound: 'notification',
        fullScreenAction: {
       id: 'view_details',
       launchActivity: 'default',
       },
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
  } catch (error) {
  console.error('Failed to create notification', error);
  }
};


