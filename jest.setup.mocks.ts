/* eslint-disable @typescript-eslint/no-explicit-any */

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
jest.mock('react-native-vector-icons/Octicons', () => 'Icon');

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('./src/notification/notificationUnit', () => ({
  createTimestampNotification: jest.fn(() => Promise.resolve()),
  createIntervalNotification: jest.fn(() => Promise.resolve()),
  cancelNotification: jest.fn(() => Promise.resolve()),
}));

jest.mock('./src/notification/registerTriggers', () => ({
  registerTriggers: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-sqlite-2', () => ({
  openDatabase: jest.fn(() => ({
    transaction: (cb: any, errorCb?: any, successCb?: any) => {
      const tx = {
        executeSql: jest.fn((query, params, success) => {
          success?.(
            {},
            {
              rows: {
                length: 1,
                item: () => ({ id: 1, name: 'Test', iscompleted: 0 }),
              },
            },
          );
        }),
      };
      cb(tx);
      successCb?.();
    },
  })),
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockMMKVInstance = {
  set: jest.fn(),
  getString: jest.fn().mockImplementation((key: string) => {
    if (key === 'user') return 'mocked-value';
    return undefined;
  }),
  delete: jest.fn(),
};
