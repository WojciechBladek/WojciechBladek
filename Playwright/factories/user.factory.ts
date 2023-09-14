import { RegisterUser } from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomUserData(): RegisterUser {
  const registerUserData: RegisterUser = {
    userEmail: faker.internet.email({ provider: 'example.test' }),
    userPassword: faker.internet.password({ prefix: '@#$%^&*(!', length: 15 }),
  };
  return registerUserData;
}
