import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { ArticlePage } from "../pages/article.page";
import { ArticleViewPage } from "../pages/articleView.page";
import { SettingsPage } from "../pages/settings.page";

type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  articlePage: ArticlePage;
  articleViewPage: ArticleViewPage;
  settingsPage: SettingsPage;
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

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
});

export { expect } from "@playwright/test";
