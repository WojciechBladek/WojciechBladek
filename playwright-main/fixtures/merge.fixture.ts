import { pageObjectTest } from '@_playwright-main/fixtures/page-object.fixture';
import { registerUserTest } from '@_playwright-main/fixtures/register.fixture';
import { mergeTests } from 'playwright/test';

export { expect } from '@playwright/test';

export const test = mergeTests(pageObjectTest, registerUserTest);
