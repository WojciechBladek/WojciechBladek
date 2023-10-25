import { faker } from '@faker-js/faker/locale/en';
import { ProvideFeedbackModel } from '@_playwright-src/models/feedback.model';

export function prepareRandomFeedbackData(contentLength?: number): ProvideFeedbackModel {
  let content: string;

  if (contentLength) {
    content = getRandomText(contentLength);
  } else {
    content = faker.lorem.sentence();
  }

  const prepareFeedbackData: ProvideFeedbackModel = {
    body: content,
    name: faker.internet.userName(),
    phone: getRandomPhoneNumber(),
    email: faker.internet.email(),
  };

  return prepareFeedbackData;
}
function getRandomPhoneNumber(): string {
  const min = 100000000;
  const max = 999999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randomNumber);
}

function getRandomText(number: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let text = '';

  for (let i = 0; i < number; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    text += characters.charAt(randomIndex);
  }

  return text;
}
