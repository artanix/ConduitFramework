import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { ArticlePage } from "../pages/article.page";
import { ArticleViewPage } from "../pages/articleView.page";

type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  articlePage: ArticlePage;
  articleViewPage: ArticleViewPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },

  articleViewPage: async ({ page }, use) => {
    const articleViewPage = new ArticleViewPage(page);
    await use(articleViewPage);
  },
});

export { expect } from "@playwright/test";
