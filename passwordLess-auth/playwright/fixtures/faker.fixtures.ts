import { faker } from '@faker-js/faker';

const fakerFirstName = faker.person.firstName();
const fakerLastName = faker.person.lastName();
const fakerOrganisationName = faker.company.name();
const fakerOrganisationAcronym = faker.company.catchPhraseDescriptor();

export const Faker = {
  fakerFirstName,
  fakerLastName,
  fakerOrganisationAcronym,
  fakerOrganisationName,
};
