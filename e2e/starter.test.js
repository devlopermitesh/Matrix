describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("2 is testing", () => {
    expect(2).toBeTruthy()
  })
});
