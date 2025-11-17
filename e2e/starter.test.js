/* eslint-env jest, detox */
/* eslint-disable @typescript-eslint/no-unused-vars */
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('2 is testing', () => {
    expect(2).toBeTruthy();
  });
});
