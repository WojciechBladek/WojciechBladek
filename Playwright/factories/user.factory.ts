import { RegisterUser } from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomUserData(): RegisterUser {
  const firstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
  const lastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');

  const registerUserData: RegisterUser = {
    userEmail: faker.internet.email({
      firstName: firstName,
      lastName: lastName,
      provider: 'example.tet',
    }),
    userPassword: faker.internet.password({ prefix: '@#$%^&*(!', length: 15 }),
  };
  return registerUserData;
}
