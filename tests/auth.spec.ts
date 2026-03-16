import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";

const timestamp = Date.now();
const testUser = {
  username: `user${timestamp}`,
  email: `user${timestamp}@test.com`,
  password: "password123",
};

test("Register a new user", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.register(
    testUser.username,
    testUser.email,
    testUser.password,
  );
});

test("Login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password);
});

test("Login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testUser.email, "wrongpassword");
  await expect(page.getByText("credentials invalid")).toBeVisible();
});
