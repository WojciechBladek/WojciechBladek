import { faker } from "@faker-js/faker";
const conditions = ["yes", "no"];
const typeOfFeedback = ["Thanks", "Question", "Opinion", "Request", "Concern"];
const isSensitive = ["yes", "no"];

const getRandomNumber = (myMin, myMax) =>
  Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;

export interface User {
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly gender: string;
  readonly age: number;
  readonly conditions: string;
}

export interface NewStoryContent {
  readonly content: string;
  readonly isSensitive: string;
  readonly typeOfFeedback: string;
  readonly feedbackLocatin: string;
  readonly organisation: string;
}

export const createUser = (user?: Partial<User>): User => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  email: faker.internet.email(),
  gender: faker.person.sex(),
  age: faker.number.int(50),
  conditions: conditions[getRandomNumber(0, 1)],
});

export const createNewStoryContent = (
  story?: Partial<NewStoryContent>
): NewStoryContent => ({
  content: faker.word.words(),
  isSensitive: "no",
  typeOfFeedback: typeOfFeedback[getRandomNumber(0, 4)],
  feedbackLocatin: faker.location.country(),
  organisation: "EC",
});
