import { pageObjectTest } from './page-object.fixture';
import { mergeTests } from 'playwright/test';

export { expect } from '@playwright/test';

export const test = mergeTests(pageObjectTest);
