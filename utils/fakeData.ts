// utils/fakeData.ts
import { faker } from "@faker-js/faker";

export const generateArticle = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  tagList: [faker.lorem.word()],
});

export type Article = ReturnType<typeof generateArticle>;
