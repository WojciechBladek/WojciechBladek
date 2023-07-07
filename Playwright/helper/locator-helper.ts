export class LocatorHelper {
  constructor() {}
  async getTestId(testId: string) {
    return `[data-testid="${testId}"]`;
  }
}
