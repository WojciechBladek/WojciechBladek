import { faker } from '@faker-js/faker/locale/en';
import { LoginUserModel } from '@_playwright-src/models/login.model';

export function getRandomUserEmail(): LoginUserModel {
  const prepareEmailData = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
  };

  const loginUserEmail: LoginUserModel = {
    email: faker.internet.email({
      firstName: prepareEmailData.userFirstName,
      lastName: prepareEmailData.userLastName,
    }),
  };

  return loginUserEmail;
}
