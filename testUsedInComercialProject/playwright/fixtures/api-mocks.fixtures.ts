import { Page } from "@playwright/test";

const mockApiResponseUserMe = async (
  page: Page,
  endpoint: string,
  objectJson: object
) => {
  await page.route(`*/**/${endpoint}`, async (route) => {
    const json = objectJson;
    await route.fulfill({ json });
  });
};
// In params set userRole - admin/user
// in param userId set userId from apiRequest response
const userMeMock = (userRole, userId) => {
  const json = {
    nickname: null,
    email: userRole,
    firstName: null,
    lastName: null,
    registrationStatus: "require_profile_update",
    id: userId,
    organisation: null,
    notifications: true,
    reminders: false,
    role: 0,
    hideLastName: false,
    validityTimeInDays: null,
    plan: null,
  };
  return json;
};
export const mockJson = {
  userMeMock,
  mockApiResponseUserMe,
};
