module.exports = {
  __esModule: true,
  default: {
    createChannel: jest.fn(),
    displayNotification: jest.fn(),
    createTriggerNotification: jest.fn(),
    cancelNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
    requestPermission: jest.fn(() =>
      Promise.resolve({ authorizationStatus: 1 }),
    ),
  },
  AndroidImportance: {
    HIGH: 4,
    DEFAULT: 3,
    LOW: 2,
    MIN: 1,
  },
  AndroidStyle: {
    BIGTEXT: 1,
    BIGPICTURE: 2,
    INBOX: 3,
    MESSAGING: 4,
  },
  TriggerType: {
    TIMESTAMP: 0,
    INTERVAL: 1,
  },
  TimeUnit: {
    SECONDS: 0,
    MINUTES: 1,
    HOURS: 2,
    DAYS: 3,
  },
  RepeatFrequency: {
    NONE: -1,
    HOURLY: 0,
    DAILY: 1,
    WEEKLY: 2,
  },
  AndroidAction: {},
  IntervalTrigger: {},
  TimestampTrigger: {},
};
